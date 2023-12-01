import { NextApiRequest, NextApiResponse } from "next";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import env from "../config/env";
import { GhInvite, TemplateConsumption, User } from "../models";
import { connectDB } from "../lib/utils";
import CatchError from "../lib/error";
import shortUUID from "short-uuid";

// handle clerk webhook
async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);

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
    const {
      email_addresses,
      image_url,
      first_name,
      last_name,
      id,
      external_accounts,
    } = data as any;

    const gh_username = external_accounts[0]?.username;

    // check if user exists, if it doesn't then create a new user
    // if it does do nothing
    const email = email_addresses[0]?.email_address;
    const user = await User.findOne({ email });
    const fullname =
      first_name === null
        ? last_name
        : last_name === null
          ? first_name
          : `${first_name} ${last_name}`;

    if (!user) {
      await User.create({
        uId: id,
        name: `${fullname}`,
        email,
        avatar: image_url,
        hasSubscribed: false,
        veloz_token: shortUUID.generate(),
        gh_username,
      });

      console.log(`✅ User ${email} created!`);
      res.json({ msg: `✅ User ${email} created!` });
      return;
    }
    res.json({ msg: `❌ User ${email} already exists. ` });
    console.log(`❌ User ${email} already exists. `);
  }
  if (eventType === "user.deleted") {
    const { id } = data as any;

    try {
      // delere related user data from database
      await User.deleteOne({ uId: id });
      await GhInvite.deleteMany({ uId: id });
      await TemplateConsumption.deleteMany({ uId: id });

      console.log(`✅ User ${id} data deleted`);
    } catch (e: any) {
      console.log(`❌ Error deleting user ${id} data`);
    }
  }
}

export default CatchError(handler);
