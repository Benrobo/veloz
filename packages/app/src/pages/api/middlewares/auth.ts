import { getAuth } from "@clerk/nextjs/server";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const currUser = getAuth(req);
    if (!currUser.userId) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.UNAUTHORIZED,
        "You are not authorized to access this route",
        401
      );
    }
    (req as any)["user"] = { id: currUser.userId };
    await fn(req, res);
  };
}
