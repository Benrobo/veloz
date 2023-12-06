import { NextApiRequest, NextApiResponse } from "next";
import env from "../config/env";
import { connectDB } from "../lib/utils";
import LemonsqueezyWebhookHandler from "../lib/lemonsqueezy";
import { PurchasedItems } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { PARENT_TEMPLATES } from "@/data/stack";

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
  const { data, success } = await LemonsqueezyWebhookHandler(req, res, secret);

  console.log(data);

  if (success) {
    const { data: LSData, meta } = data;
    const { event_name } = meta;

    if (event_name === "order_created" && LSData.type === "orders") {
      const orderId = LSData.id;
      const { subtotal, first_order_item, user_email, status } =
        LSData.attributes;
      const { product_id, product_name, variant_id } = first_order_item;

      //   check if order exists
      const purchasedItems = await PurchasedItems.findOne({
        user_email,
        order_id: orderId,
      });

      if (purchasedItems) {
        const msg = `Duplicate webhook for user ${user_email}, id ${orderId} and template ${product_name}`;
        console.log(`❌ ${msg}`);
        return sendResponse.error(res, RESPONSE_CODE.ORDER_EXISTS, msg, 404);
      }

      //   create new order
      const templateId = PARENT_TEMPLATES.find(
        (t) => t.name === product_name.toLowerCase()
      )?.id;
      await PurchasedItems.create({
        user_email,
        order_id: orderId,
        product_id,
        product_name,
        variant_id,
        payment_amount: subtotal / 100,
        payment_status: status,
        template_name: product_name,
        temp_id: templateId,
      });

      console.log(
        `✅ Order created for user ${user_email}, id ${orderId} and template ${product_name}`
      );
      return sendResponse.success(res, RESPONSE_CODE.SUCCESS, "success", 200, {
        message: "Order created successfully",
      });
    }
  }
}
