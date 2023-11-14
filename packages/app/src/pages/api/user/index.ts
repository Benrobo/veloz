import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import userServices from "../services/user.services";
import env from "../config/env";
import { connectDB } from "@veloz/shared/utils/mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);

  if (req.method === "GET") {
    return userServices.getInfo(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
