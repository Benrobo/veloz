import { getAuth } from "@clerk/nextjs/server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { User } from "../models";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const currUser = getAuth(req);
    if (!currUser.userId) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.UNAUTHORIZED,
        "Unauthorized",
        401
      );
    }
    (req as any)["user"] = { id: currUser.userId };
    await fn(req, res);
  };
}

export function isCliAuth(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers["x-veloz-token"];
      if (!token) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.UNAUTHORIZED,
          `Token is notfound`,
          401
        );
      }

      // check if token exists
      const user = await User.findOne({
        veloz_token: token,
      });

      if (!user) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.INVALID_TOKEN,
          `invalid token, user not found`,
          404
        );
      }

      (req as any)["user"] = { id: user.uId };
      await fn(req, res);
    } catch (err: any) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.FORBIDDEN,
        `Invalid token`,
        403
      );
    }
  };
}
