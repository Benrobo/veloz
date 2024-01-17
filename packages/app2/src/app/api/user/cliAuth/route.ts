import CatchError from "../../lib/_error";
import { isCliAuth } from "../../middlewares/auth";
import userService from "../../services/user.services";
import { NextRequest } from "next/server";

export const POST = CatchError(
  isCliAuth(async (req: NextRequest) => {
    if (req.method === "POST") {
      return userService.cliAuth(req);
    }
  })
);
