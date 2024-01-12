import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { getProducts } from "../lib/checkout";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const result = await getProducts();
    res.status(200).json(result);
  }
}

export default CatchError(handler);
