import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../../lib/error";
import templateService from "../../services/template.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await templateService.getTemplateConsumption(req, res);
  }
}

export default CatchError(handler);
