import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkGhTokenValidity, _refreshGhToken } from "../lib/utils";
import shortUUID from "short-uuid";

class UserService {
  async getInfo(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const info = await User.findOne({ uId: userId });

    if (!info) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.USER_NOT_FOUND,
        `User not found`,
        404
      );
    }

    // needed user details
    const _details = {
      _id: info?._id,
      uId: info?.uId,
      email: info?.email,
      name: info?.name,
      avatar: info?.avatar,
      proj_plan: info?.proj_plan,
      role: info?.role,
      hasSubscribed: info?.hasSubscribed,
      isTester: info?.isTester,
      default_nextjs_router: info?.default_nextjs_router,
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
    const user = await User.findOne({ uId: userId });

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
    await User.updateOne({ uId: userId }, { veloz_token: newToken });

    sendResponse.success(
      res,
      RESPONSE_CODE.SUCCESS,
      `Successfully rotated token`,
      200
    );
  }
}

export default new UserService();
