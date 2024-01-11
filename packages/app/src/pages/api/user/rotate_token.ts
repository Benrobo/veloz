import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import userServices from "../services/user.services";
import env from "../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    return userServices.rotateToken(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
