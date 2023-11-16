import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import secretServices from "../services/secret.services";
import env from "../config/env";
import { connectDB } from "../lib/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);
  if (req.method === "DELETE") {
    await secretServices.deleteSecret(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
