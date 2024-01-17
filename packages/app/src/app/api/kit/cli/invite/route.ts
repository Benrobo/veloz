import { NextRequest } from "next/server";
import CatchError from "../../../lib/_error";
import { isCliAuth } from "../../../middlewares/auth";
import kitService from "../../../services/kit.services";

export const POST = CatchError(
  isCliAuth(async (req: NextRequest) => await kitService.inviteToRepo(req))
);
