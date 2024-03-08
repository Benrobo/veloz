import { getToken } from "next-auth/jwt";
import { RESPONSE_CODE } from "@veloz/shared/types";
import prisma from "@/prisma/prisma";
import HttpException from "../lib/exception";
import { NextRequest, NextResponse } from "next/server";

export function isAuthenticated(fn: Function) {
  return async (req: NextRequest) => {
    const jwtToken = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!jwtToken) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const user = await prisma?.users.findFirst({
      where: { uId: jwtToken?.uId as string },
    });

    if (!user) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Unauthorized, Invalid Token`,
        403
      );
    }

    (req as any)["user"] = { id: user.uId };
    return await fn(req);
  };
}

export function isAdmin(fn: Function) {
  return async (req: NextRequest) => {
    const userId = (req as any)?.user?.id;

    // console.log({ userId });
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
  return async (req: NextRequest, res: NextResponse) => {
    const token = req.headers.get("x-veloz-token");
    if (!token) {
      throw new HttpException(
        RESPONSE_CODE.UNAUTHORIZED,
        `Token notfound`,
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
