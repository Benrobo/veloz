import CatchError from "../lib/_error";
import { isAuthenticated } from "../middlewares/auth";
import userServices from "../services/user.services";
import { NextRequest } from "next/server";

export const GET = CatchError(
  isAuthenticated(async (req: NextRequest) => await userServices.getInfo(req))
);
