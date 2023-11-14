import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const redUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`;
  res.redirect(redUrl);
}

export default CatchError(handler);
