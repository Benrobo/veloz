import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkGhTokenValidity, _refreshGhToken } from "../lib/utils";
import shortUUID from "short-uuid";
import prisma from "@/prisma/prisma";
import HttpException from "../lib/exception";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { addTemplateCollaboratorSchema } from "../lib/validationSchema";
import { PARENT_KITS } from "@/data/stack";
import { NextRequest } from "next/server";

class UserService {
  async getInfo(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const info = await prisma.users.findFirst({ where: { uId: userId ?? "" } });

    if (!info) {
      throw new HttpException(
        RESPONSE_CODE.USER_NOT_FOUND,
        `User not found`,
        404
      );
    }

    // get purchased items
    const purchased_items = await prisma.purchasedItem.findMany({
      where: { uId: userId },
    });

    // needed user details
    const _details = {
      _id: info?.id,
      uId: info?.uId,
      email: info?.email,
      name: info?.name,
      avatar: info?.avatar,
      role: info?.role,
      isTester: info?.isTester,
      purchased_items: purchased_items.map((item: any) => {
        return { name: item?.template_name, id: item?.temp_id };
      }),
    };

    return sendResponse.success(
      RESPONSE_CODE.USER_DETAILS,
      `User details`,
      200,
      _details
    );
  }

  async getSettings(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const user = await prisma.users.findFirst({ where: { uId: userId } });

    // needed user details
    const _details = {
      veloz_token: user?.veloz_token,
    };

    return sendResponse.success(
      RESPONSE_CODE.SETTINGS_DETAILS,
      `User settings`,
      200,
      _details
    );
  }

  async cliAuth(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      `Successfully authenticated`,
      200,
      {
        user_id: userId,
      }
    );
  }

  async rotateToken(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const newToken = shortUUID.generate();

    // update uset veloz token
    await prisma.users.update({
      where: { uId: userId },
      data: { veloz_token: newToken },
    });

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      `Successfully rotated token`,
      200
    );
  }

  // add user as collaborator to a template/templates
  async addTemplateCollaborator(req: NextRequest) {
    const userId = (req as any)?.user?.id;
    const payload = await req.json();
    const { templates, collaborators } = payload;

    // validate schema
    await nextRouteZodValidation(
      addTemplateCollaboratorSchema,
      payload,
      req.url
    );

    // check if user has purchased template
    const purchasedTemplate = await prisma.purchasedItem.findMany({
      where: { uId: userId },
    });

    // if the user has none purchased, then they can't add collaborators to a template
    if (purchasedTemplate.length === 0) {
      throw new HttpException(
        RESPONSE_CODE.NOT_ELIGIBLE,
        `Not eligible to add collaborators to a template`,
        400
      );
    }

    // check if collaborators exists
    if (collaborators.length === 0) {
      throw new HttpException(
        RESPONSE_CODE.NOT_ELIGIBLE,
        `No collaborators provided`,
        400
      );
    }

    for (const collaborator of collaborators) {
      const user = await prisma.users.findFirst({
        where: { uId: collaborator },
      });
      if (!user) {
        throw new HttpException(
          RESPONSE_CODE.USER_NOT_FOUND,
          `One of the Collaborator was not found`,
          404
        );
      }
    }

    // check if templates exists
    if (templates.length === 0) {
      throw new HttpException(
        RESPONSE_CODE.NOT_ELIGIBLE,
        `No templates provided`,
        400
      );
    }

    for (const template of templates) {
      const temp = PARENT_KITS.find((t) => t.id === template);
      if (!temp) {
        throw new HttpException(
          RESPONSE_CODE.KIT_NOT_FOUND,
          `One of the template was not found`,
          404
        );
      }
    }

    // add collaborators to templates
    for (const template of templates) {
      for (const collaborator of collaborators) {
        await prisma.collaboratedTemplates.create({
          data: {
            template_id: template,
            sender_id: userId,
            receiver_id: collaborator,
          },
        });
      }
    }

    return sendResponse.success(
      RESPONSE_CODE.SUCCESS,
      `Successfully added collaborators`,
      200
    );
  }
}

const userService = new UserService();
export default userService;
