import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import secretServices from "../services/secret.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    await secretServices.deleteSecret(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
