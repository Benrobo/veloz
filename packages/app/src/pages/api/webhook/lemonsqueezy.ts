import { NextApiRequest, NextApiResponse } from "next";
import env from "../config/env";
import { connectDB } from "../lib/utils";
import crypto from "crypto";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB(env.MONGO_DB_URL as string);

  const rawBody = req.body.toString();
  const secret = String(process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
  const headerSignature = String(req.headers["x-signature"]) ?? "";

  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(headerSignature, "utf8");

  let sigOk = false;

  try {
    sigOk = crypto.timingSafeEqual(digest, signature);
  } catch (e: any) {
    console.log(`❌ ERROR: timingSafeEqual failed: ${e.message}`);
  }

  if (!sigOk) {
    console.log(`❌ ERROR: Invalid signature`);
    sendResponse.error(
      res,
      RESPONSE_CODE.FORBIDDEN,
      "❌ ERROR: Invalid signature",
      403
    );
    return;
  }

  // Parse the webhook's data as JSON
  const event = JSON.parse(rawBody);

  console.log(event);
}
