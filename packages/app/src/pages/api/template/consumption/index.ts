import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
// import { isCliAuth } from "../../middlewares/auth";
import templateService from "../../services/template.services";
import { connectDB } from "../../lib/utils";
import env from "../../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);
  if (req.method === "GET") {
    await templateService.getTemplateConsumption(req, res);
  }
}

export default CatchError(handler);
