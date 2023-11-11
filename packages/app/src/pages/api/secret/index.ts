import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import secretServices from "../services/secret.services";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    await secretServices.create(req, res);
  }
  if (req.method === "PUT") {
    await secretServices.updateSecret(req, res);
  }
  if (req.method === "GET") {
    await secretServices.getAll(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
