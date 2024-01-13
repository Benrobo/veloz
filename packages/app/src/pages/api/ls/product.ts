import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { getProducts } from "../lib/checkout";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (process.env.SERVER_ENV !== "development") {
      return res.status(200).json({
        msg: "product retrieval is disabled in production",
      });
    }
    const result = await getProducts();
    return res.status(200).json(result);
  }
}

export default CatchError(handler);
