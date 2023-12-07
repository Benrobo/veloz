import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";
import { RESPONSE_CODE } from "@veloz/shared/types";
import HttpException from "../lib/exception";
import prisma from "../config/prisma";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const currUser = getAuth(req);
    if (!currUser.userId) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    // check if user exists
    const user = await prisma.user.findFirst({
      where: { uId: currUser.userId },
    });
    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        404
      );
    }

    (req as any)["user"] = { id: currUser.userId };
    await fn(req, res);
  };
}

export function isCliAuth(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers["x-veloz-token"];
    if (!token) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Token is notfound`,
        401
      );
    }

    // check if token exists
    const user = await prisma.user.findFirst({
      where: { veloz_token: token as string },
    });

    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        404
      );
    }

    (req as any)["user"] = { id: user.uId };
    await fn(req, res);
  };
}
