import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import { isCliAuth } from "../../middlewares/auth";
import templateService from "../../services/template.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await templateService.templateDetails(req, res);
  }
}

export default CatchError(isCliAuth(handler));
