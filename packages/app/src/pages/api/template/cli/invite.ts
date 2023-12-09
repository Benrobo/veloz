import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import { isCliAuth } from "../../middlewares/auth";
import templateService from "../../services/template.services";
import env from "../../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await templateService.inviteToRepo(req, res);
  }
}

export default CatchError(isCliAuth(handler));
