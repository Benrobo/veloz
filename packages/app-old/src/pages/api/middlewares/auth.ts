import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../auth/[...nextauth]";
import { RESPONSE_CODE } from "@veloz/shared/types";
import prisma from "../config/prisma";
import HttpException from "../lib/exception";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, nextAuthOptions);
    if (!session) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    // console.log({ session });

    const user = await prisma?.users.findFirst({
      where: { uId: session.user?.id },
    });

    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        403
      );
    }

    (req as any)["user"] = { id: user.uId };
    return await fn(req, res);
  };
}

export function isAdmin(fn: Function) {
  return async (req: NextApiRequest) => {
    const userId = (req as any)?.user?.id;

    console.log({ userId });
    if (!userId) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const admin = await prisma?.users.findFirst({
      where: { uId: userId, role: "admin" },
    });

    if (!admin) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }
    return await fn(req);
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
    const user = await prisma?.users.findFirst({
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
