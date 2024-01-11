import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import { isCliAuth } from "../../middlewares/auth";
import kitService from "../../services/kit.services";
import env from "../../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PATCH") {
    await kitService.storeKitsConsumption(req, res);
  }
}

export default CatchError(isCliAuth(handler));
