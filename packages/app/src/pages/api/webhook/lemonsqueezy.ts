import { NextApiRequest, NextApiResponse } from "next";
import env from "../config/env";
import { connectDB } from "../lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB(env.MONGO_DB_URL as string);
  if (req.method === "GET") {
    res.json({ msg: "welcome" });
  }
}
