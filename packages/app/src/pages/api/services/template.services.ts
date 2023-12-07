import { NextApiRequest, NextApiResponse } from "next";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import {
  FINE_TUNED_STACKS,
  IFINE_TUNED_STACKS_TEMP,
  PARENT_TEMPLATES,
} from "@/data/stack";
import HttpException from "../lib/exception";
import { addCollaboratorToRepo } from "../lib/github";
import prisma from "../config/prisma";

class TemplateService {
  // get child template consumptions
  async getUsersConsumptions(tempName: string) {
    // check if tempName is valid
    const template =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === tempName) ?? null;

    if (!template) {
      throw new HttpException(
        RESPONSE_CODE.TEMPLATE_NOT_FOUND,
        "template not found",
        404
      );
    }

    const _template = await prisma.templateConsumption.findMany({
      where: {
        name: tempName.toLowerCase(),
      },
    });

    console.log({ _template });

    const totalInstall = _template.reduce(
      (acc, curr) => acc + curr.used_count,
      0
    );

    // get used by avatars
    const usersAvatars: string[] = [];

    for (const t of _template) {
      const user = await prisma.user.findFirst({ where: { uId: t.uId } });
      if (user && !usersAvatars.includes(user?.avatar as string)) {
        usersAvatars.push(user.avatar as string);
      }
    }

    return {
      name: tempName,
      installs: totalInstall,
      users: {
        images: usersAvatars,
        count: usersAvatars.length,
      },
    };
  }

  async templateDetails(req: NextApiRequest, res: NextApiResponse) {
    const { id } = (req as any)?.user;
    const temp_name = (req?.query?.temp_name as string)?.toLowerCase();
    const template =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === temp_name) ?? null;

    if (!template) {
      throw new HttpException(
        RESPONSE_CODE.TEMPLATE_NOT_FOUND,
        "template not found",
        404
      );
    }

    const purchasedTemplates = await prisma.purchasedItem.findMany({
      where: { uId: id },
    });

    const purchased =
      purchasedTemplates.find(
        (t) => t.template_name?.toLowerCase() === temp_name.toLowerCase()
      ) ?? null;

    if (!purchased) {
      throw new HttpException(
        RESPONSE_CODE.NOT_ELIGIBLE,
        "not eligible for this template.",
        400
      );
    }

    sendResponse.success(res, RESPONSE_CODE.SUCCESS, "success", 200, {
      name: template?.name.toLowerCase(),
      available: template?.available,
    });
  }

  async inviteToRepo(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const tempName = req?.body?.temp_name;
    const user = await prisma.user.findFirst({ where: { uId: userId } });
    const gh_name = user?.gh_username;

    // check if tempName is valid
    const template =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === tempName) ?? null;

    if (!template) {
      throw new HttpException(
        RESPONSE_CODE.TEMPLATE_NOT_FOUND,
        "template not found",
        404
      );
    }

    // check if user has been invited to the repo
    const ghInvites = await prisma.invites.findFirst({
      where: {
        uId: userId,
        template_name: tempName as string,
      },
    });

    if (!ghInvites) {
      const collabInvited = await addCollaboratorToRepo(
        gh_name as string,
        tempName as string
      );
      if (collabInvited) {
        return sendResponse.success(
          res,
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
      res,
      RESPONSE_CODE.SUCCESS,
      "Collaborator invited already",
      200
    );
  }

  // invoke from cli
  async storeTemplateConsumption(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const tempName = req?.query?.template;

    // check if tempName is valid
    const template =
      FINE_TUNED_STACKS.find((t) => t.name.toLowerCase() === tempName) ?? null;

    if (!template) {
      throw new HttpException(
        RESPONSE_CODE.TEMPLATE_NOT_FOUND,
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

    const user = await prisma.user.findFirst({ where: { uId: userId } });

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
      sendResponse.success(res, RESPONSE_CODE.SUCCESS, `success`, 200);
      return;
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
    sendResponse.success(res, RESPONSE_CODE.SUCCESS, `success`, 200);
  }

  // get specific template consumption/installs
  async getTemplateConsumption(req: NextApiRequest, res: NextApiResponse) {
    const consumptions = await this.getUsersConsumptions(
      req?.query?.template as string
    );

    sendResponse.success(
      res,
      RESPONSE_CODE.SUCCESS,
      `success`,
      200,
      consumptions
    );
  }

  async getTemplates(req: NextApiRequest, res: NextApiResponse) {
    const child_templates: IFINE_TUNED_STACKS_TEMP[] = [];

    // get child templates
    PARENT_TEMPLATES.forEach(async (t) => {
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
      const parent = PARENT_TEMPLATES.find((t) => t.id === child.parent_id);
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
      res,
      RESPONSE_CODE.SUCCESS,
      "success",
      200,
      templates
    );
  }
}

export default new TemplateService();
