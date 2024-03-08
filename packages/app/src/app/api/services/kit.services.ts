import { NextApiRequest, NextApiResponse } from "next";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import {
  FINE_TUNED_STACKS,
  IFINE_TUNED_STACKS_TEMP,
  PARENT_KITS,
} from "@/data/stack";
import HttpException from "../lib/exception";
import { addCollaboratorToRepo } from "../lib/github";
import prisma from "../../../prisma/prisma";
import { NextRequest } from "next/server";

class KitService {
  // get child template consumptions
  async getUsersConsumptions(kitName: string) {
    // check if kitName is valid
    const kit =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === kitName) ?? null;

    if (!kit) {
      throw new HttpException(
        RESPONSE_CODE.KIT_NOT_FOUND,
        "kit not found",
        404
      );
    }

    const _kits = await prisma.templateConsumption.findMany({
      where: {
        name: kitName.toLowerCase(),
      },
    });

    const totalInstall = _kits.reduce((acc, curr) => acc + curr.used_count, 0);

    // get used by avatars
    const usersAvatars: string[] = [];

    for (const t of _kits) {
      const user = await prisma.users.findFirst({ where: { uId: t.uId } });
      if (user && !usersAvatars.includes(user?.avatar as string)) {
        usersAvatars.push(user.avatar as string);
      }
    }

    return {
      name: kitName,
      installs: totalInstall,
      users: {
        images: usersAvatars,
        count: usersAvatars.length,
      },
    };
  }

  async kitDetails(req: NextRequest) {
    const { id } = (req as any)?.user;
    const { pathname } = new URL(req.url);
    const _splitUrl = pathname.split("/");
    const kit_name = _splitUrl[_splitUrl.length - 1].toLowerCase();
    const kit =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === kit_name) ?? null;

    if (!kit) {
      throw new HttpException(
        RESPONSE_CODE.KIT_NOT_FOUND,
        "kit not found",
        404
      );
    }

    const user = await prisma.users.findFirst({ where: { uId: id } });

    // check if user is eligible for this kit (admin, tester)
    const defaultEligibleUsers = ["admin", "tester"];

    // if user is not admin or tester, check if user has purchased this kit
    if (user && !defaultEligibleUsers.includes(user?.role as string)) {
      const purchasedKits = await prisma.purchasedItem.findMany({
        where: { uId: id },
      });

      // compare if user has purchased this template based on the template parent_id not name.
      const purchased =
        purchasedKits.find((t) => t.temp_id?.toLowerCase() === kit.parent_id) ??
        null;

      if (!purchased) {
        throw new HttpException(
          RESPONSE_CODE.NOT_ELIGIBLE,
          "not eligible for this kit.",
          400
        );
      }
    }

    return sendResponse.success(RESPONSE_CODE.SUCCESS, "success", 200, {
      name: kit?.name.toLowerCase(),
      available: kit?.available,
      lang: kit.language ?? null,
    });
  }

  async inviteToRepo(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const kitName = await req.json();
    const user = await prisma.users.findFirst({ where: { uId: userId } });
    const gh_name = user?.gh_username;

    // check if kitName is valid
    const kit =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === kitName) ?? null;

    if (!kit) {
      throw new HttpException(
        RESPONSE_CODE.KIT_NOT_FOUND,
        "kit not found",
        404
      );
    }

    // check if user has been invited to the repo
    const ghInvites = await prisma.invites.findFirst({
      where: {
        uId: userId,
        kit_name: kitName as string,
      },
    });

    if (!ghInvites) {
      const collabInvited = await addCollaboratorToRepo(
        gh_name as string,
        kitName as string
      );
      if (collabInvited) {
        return sendResponse.success(
          RESPONSE_CODE.SUCCESS,
          "Collaborator invited",
          200
        );
      }
      throw new HttpException(
        RESPONSE_CODE.FAILED_INVITING_COLLABORATOR,
        `Something went wrong inviting @${gh_name} as collaborator.`,
        400
      );
    }
    sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      "Collaborator invited already",
      200
    );
  }

  // invoke from cli
  async storeKitsConsumption(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const { searchParams } = new URL(req.url);
    const tempName = searchParams.get("template")?.toLowerCase();

    // check if tempName is valid
    const template =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === tempName) ?? null;

    if (!template) {
      throw new HttpException(
        RESPONSE_CODE.KIT_NOT_FOUND,
        "template not found",
        404
      );
    }

    const _template = await prisma.templateConsumption.findFirst({
      where: {
        name: tempName as string,
        uId: userId,
      },
    });

    const user = await prisma.users.findFirst({ where: { uId: userId } });

    if (!_template) {
      // store template consumption
      await prisma.templateConsumption.create({
        data: {
          uId: userId,
          name: tempName as string,
          used_count: 1,
        },
      });

      console.log(
        `Template consumption stored for [user: @${user?.gh_username}] [template: ${tempName}]`
      );
      return sendResponse.success(RESPONSE_CODE.SUCCESS, `success`, 200);
    }

    // update template consumption
    const prevCount = _template?.used_count ?? 0;
    await prisma.templateConsumption.update({
      where: {
        id: _template.id,
      },
      data: { used_count: prevCount + 1 },
    });

    console.log(
      `Template consumption updated for [user: @${user?.gh_username}] [template: ${tempName}]`
    );
    return sendResponse.success(RESPONSE_CODE.SUCCESS, `success`, 200);
  }

  // get specific template consumption/installs
  async getKitConsumption(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const template = searchParams.get("template");
    const consumptions = await this.getUsersConsumptions(template as string);

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      `success`,
      200,
      consumptions
    );
  }

  async getKits(req: NextRequest) {
    const child_templates: IFINE_TUNED_STACKS_TEMP[] = [];

    // get child templates
    PARENT_KITS.forEach(async (t) => {
      if (t.available) {
        const children = FINE_TUNED_STACKS.find((s) => s.parent_id === t.id);
        if (children) {
          child_templates.push(children);
        }
      }
    });

    let installs = 0;
    let usersImages = [];
    let templates = [];

    // get installs and users images for each child template
    for (const child of child_templates) {
      const parent = PARENT_KITS.find((t) => t.id === child.parent_id);
      const _consumptions = await this.getUsersConsumptions(
        child.name.toLowerCase()
      );
      installs += _consumptions.installs;
      usersImages.push(..._consumptions.users.images);

      templates.push({
        ...parent,
        installs: _consumptions.installs,
        users: {
          images: _consumptions.users.images,
          count: _consumptions.users.count,
        },
      });
    }

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      "success",
      200,
      templates
    );
  }
}

const kitService = new KitService();
export default kitService;
