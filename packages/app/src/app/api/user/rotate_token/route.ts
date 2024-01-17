import CatchError from "../../lib/_error";
import { isAuthenticated } from "../../middlewares/auth";
import userServices from "../../services/user.services";
import { NextRequest } from "next/server";

export const PATCH = CatchError(
  isAuthenticated(
    async (req: NextRequest) => await userServices.rotateToken(req)
  )
);
