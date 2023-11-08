import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import env from "../config/env";
import { User } from "../models";
import CatchError from "../lib/error";

// handle clerk webhook
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const wh_body = req?.body;
  const payload = JSON.stringify(wh_body);
  const headers = req.headers;

  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(env.CLERK_WH_SECRET as string);

  let evt: WebhookEvent;
  try {
    // Verify the webhook payload and headers
    evt = wh.verify(payload, headers as any) as WebhookEvent;
  } catch (_) {
    // If the verification fails, return a 400 error
    console.log(`❌ Invalid webhook signature`);
    return res.status(400).json({ msg: "Invalid webhook signature" });
  }
  const data = evt.data;

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { email_addresses, image_url, first_name, last_name, id } =
      data as any;

    // check if user exists, if it doesn't then create a new user
    // if it does do nothing
    const email = email_addresses[0]?.email_address;
    const user = await User.findOne({ email });

    if (!user) {
      await User.create({
        name: `${first_name} ${last_name}`,
        email,
        avatar: image_url,
        proj_plan: "",
        hasSubscribed: false,
      });

      console.log(`✅ User ${email} created!`);
      res.json({ msg: `✅ User ${email} created!` });
      return;
    }
    res.json({ msg: `❌ User ${email} already exists. ` });
    console.log(`❌ User ${email} already exists. `);
  }
}

export default CatchError(handler);
