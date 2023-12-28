import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import kitService from "../services/kit.services";
import env from "../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await kitService.getKits(req, res);
  }
}

export default CatchError(handler);
