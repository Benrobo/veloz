import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // handle reloading db schema
  res.json({ message: "Hello from API" });
}
