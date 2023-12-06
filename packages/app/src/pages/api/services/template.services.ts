import { NextApiRequest, NextApiResponse } from "next";
import { Invites, TemplateConsumption, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import { isUserEligibleForStack } from "@/lib/utils";
import {
  FINE_TUNED_STACKS,
  IFINE_TUNED_STACKS_TEMP,
  PARENT_TEMPLATES,
} from "@/data/stack";
import HttpException from "../lib/exception";
import { addCollaboratorToRepo } from "../lib/github";

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

    const _template = await TemplateConsumption.find({
      name: (tempName as string).toLowerCase(),
    });

    const totalInstall = _template.reduce(
      (acc, curr) => acc + curr.used_count,
      0
    );

    // get used by avatars
    const usersAvatars: string[] = [];

    for (const t of _template) {
      const user = await User.findOne({ uId: t.uId });
      if (!usersAvatars.includes(user.avatar)) {
        usersAvatars.push(user.avatar);
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
    const { id, pricing_plan } = (req as any)?.user;
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

    const isUserEligible = isUserEligibleForStack(
      temp_name as string,
      pricing_plan
    );

    if (!isUserEligible) {
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
    const user = await User.findOne({ uId: userId });
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
    const ghInvites = await Invites.findOne({
      uId: userId,
      temp_name: tempName,
    });

    if (!ghInvites) {
      const collabInvited = await addCollaboratorToRepo(
        user?.proj_plan,
        gh_name,
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

    const _template = await TemplateConsumption.findOne({
      name: tempName,
      uId: userId,
    });

    const user = await User.findOne({ uId: userId });

    if (!_template) {
      // store template consumption
      await TemplateConsumption.create({
        uId: userId,
        name: tempName,
        used_count: 1,
      });

      console.log(
        `Template consumption stored for [user: @${user?.gh_username}] [template: ${tempName}]`
      );
      sendResponse.success(res, RESPONSE_CODE.SUCCESS, `success`, 200);
      return;
    }

    // update template consumption
    const prevCount = _template?.used_count ?? 0;
    await TemplateConsumption.updateOne(
      { uId: userId, name: tempName },
      { used_count: prevCount + 1 }
    );

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
