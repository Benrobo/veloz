import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { _checkGhTokenValidity, _refreshGhToken } from "../lib/utils";

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
    const info = await User.findOne({ uId: userId });

    if (!info) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.USER_NOT_FOUND,
        `User not found`,
        404
      );
    }

    let ghAccountConnected = false;
    // check if gh_ref_token exists and hasn't expired
    if (info?.gh_ref_token && info?.gh_acc_token) {
      const { gh_acc_token, gh_ref_token } = info;
      const isAccTokenValid = await _checkGhTokenValidity(gh_acc_token);

      if (!isAccTokenValid) {
        // refresh token
        const refreshed = await _refreshGhToken(
          gh_ref_token,
          process.env.GH_CLIENT_ID as string,
          process.env.GH_CLIENT_SECRET as string
        );

        if (refreshed.success) {
          ghAccountConnected = true;
          info.gh_acc_token = refreshed.data?.accToken;
          info.gh_ref_token = refreshed.data?.refToken;
          await info.save();
          console.log(`✅ Github access token refreshed`);
        } else {
          console.log(`❌ Github access token couldn't be refreshed`);
        }
      } else {
        ghAccountConnected = true;
        console.log(`✅ Github access token is valid`);
      }
    }

    // needed user details
    const _details = {
      default_nextjs_router: info?.default_nextjs_router.toLowerCase(),
      ghAccountConnected,
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
}

export default new UserService();
