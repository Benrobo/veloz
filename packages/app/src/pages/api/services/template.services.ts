import { NextApiRequest, NextApiResponse } from "next";
import { GhInvite, TemplateConsumption, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import { isUserEligibleForStack } from "@/lib/utils";
import { FINE_TUNED_STACKS } from "@/data/stack";
import HttpException from "../lib/exception";
import { addCollaboratorToRepo } from "../lib/github";

class TemplateService {
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
    const ghInvites = await GhInvite.findOne({
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

  async storeTemplateConsumption(req: NextApiRequest, res: NextApiResponse) {}
}

export default new TemplateService();
