import { NextApiRequest, NextApiResponse } from "next";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkGhTokenValidity, _refreshGhToken } from "../lib/utils";
import shortUUID from "short-uuid";
import prisma from "../config/prisma";
import HttpException from "../lib/exception";

class UserService {
  async getInfo(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const info = await prisma.user.findFirst({ where: { uId: userId } });

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
      purchased_items: purchased_items.map((item) => {
        return { name: item?.template_name, id: item?.temp_id };
      }),
    };

    sendResponse.success(
      res,
      RESPONSE_CODE.USER_DETAILS,
      `User details`,
      200,
      _details
    );
  }

  async getSettings(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const user = await prisma.user.findFirst({ where: { uId: userId } });

    // needed user details
    const _details = {
      veloz_token: user?.veloz_token,
    };

    sendResponse.success(
      res,
      RESPONSE_CODE.SETTINGS_DETAILS,
      `User settings`,
      200,
      _details
    );
  }

  async cliAuth(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    sendResponse.success(
      res,
      RESPONSE_CODE.SUCCESS,
      `Successfully authenticated`,
      200,
      {
        user_id: userId,
      }
    );
  }

  async rotateToken(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const newToken = shortUUID.generate();

    // update uset veloz token
    await prisma.user.update({
      where: { uId: userId },
      data: { veloz_token: newToken },
    });

    sendResponse.success(
      res,
      RESPONSE_CODE.SUCCESS,
      `Successfully rotated token`,
      200
    );
  }
}

export default new UserService();
