import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import userServices from "../services/user.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return userServices.getInfo(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
