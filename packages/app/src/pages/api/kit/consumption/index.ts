import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import kitService from "../../services/kit.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await kitService.getKitConsumption(req, res);
  }
}

export default CatchError(handler);
