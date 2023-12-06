import { NextApiRequest, NextApiResponse } from "next";
import env from "../config/env";
import { connectDB } from "../lib/utils";
import crypto from "crypto";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { Readable } from "stream";
import LemonsqueezyWebhookHandler from "../lib/lemonsqueezy";

export const config = {
  api: {
    //! This is a must to work, otherwise you might encounter error:
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB(env.MONGO_DB_URL as string);

  const secret = String(process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
  const { data, errorMsg, success } = await LemonsqueezyWebhookHandler(
    req,
    res,
    secret
  );

  console.log("data", data);
}
