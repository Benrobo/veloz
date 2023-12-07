import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import templateService from "../services/template.services";
import env from "../config/env";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await templateService.getTemplates(req, res);
  }
}

export default CatchError(handler);
