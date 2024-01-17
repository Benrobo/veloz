import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/_error";
import { isAuthenticated, isCliAuth } from "../middlewares/auth";
import userService from "../services/user.services";
import env from "../config/env";

// authenticate cli
async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method === "POST") {
    await userService.cliAuth(req, res);
  }
}

export default CatchError(isCliAuth(handler));
