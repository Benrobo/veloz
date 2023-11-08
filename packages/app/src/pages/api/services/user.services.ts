import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";

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

    sendResponse.success(
      res,
      RESPONSE_CODE.USER_DETAILS,
      `User details`,
      200,
      info
    );
  }
}

export default new UserService();
