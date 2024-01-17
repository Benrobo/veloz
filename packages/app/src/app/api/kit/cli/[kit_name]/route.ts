import CatchError from "../../../lib/_error";
import { isCliAuth } from "../../../middlewares/auth";
import kitService from "../../../services/kit.services";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = CatchError(
  isCliAuth(async (req: NextRequest) => await kitService.kitDetails(req))
);
