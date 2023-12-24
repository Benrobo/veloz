import { NextApiRequest } from "next";
import { getServerSession } from "next-auth";
import nextAuthOptions from "../auth/options";
import { RESPONSE_CODE } from "@veloz/shared/types";
import prisma from "../config/prisma";
import HttpException from "../lib/exception";

export function isAuthenticated(fn: Function) {
  return async (req: NextApiRequest) => {
    const session = await getServerSession(nextAuthOptions);
    if (!session) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user?.email as string },
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
  return async (req: NextApiRequest) => {
    const userId = (req as any)?.user?.id;

    if (!userId) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }

    const admin = await prisma.user.findFirst({
      where: { uId: userId, role: "admin" },
    });

    if (!admin) {
      throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, "Unauthorized", 401);
    }
    return await fn(req);
  };
}
