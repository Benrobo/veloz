import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import { isCliAuth } from "../../middlewares/auth";
import projectServices from "../../services/project.services";
import { connectDB } from "../../lib/utils";
import env from "../../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);
  if (req.method === "PATCH") {
    return projectServices.updateStatus(req, res);
  }
}

export default CatchError(isCliAuth(handler));
