import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/_error";
import { isAuthenticated } from "../middlewares/auth";
import userServices from "../services/user.services";
import env from "../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return userServices.getSettings(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
