import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/_error";
import { isCliAuth } from "../../middlewares/auth";
import kitService from "../../services/kit.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await kitService.kitDetails(req, res);
  }
}

export default CatchError(isCliAuth(handler));
