import { NextApiRequest, NextApiResponse } from "next";
import env from "../config/env";
import { connectDB } from "../lib/utils";
import LemonsqueezyWebhookHandler from "../lib/lemonsqueezy";
import { PurchasedItems, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { PARENT_TEMPLATES } from "@/data/stack";
import CatchError from "../lib/error";
import HttpException from "../lib/exception";
import Order from "../models/orders.model";

export const config = {
  api: {
    //! This is a must to work, otherwise you might encounter error:
    bodyParser: false,
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB(env.MONGO_DB_URL as string);

  const secret = String(process.env.LEMONSQUEEZY_WEBHOOK_SECRET);
  const { data, success } = await LemonsqueezyWebhookHandler(req, res, secret);

  console.log(data);

  if (success) {
    const { data: LSData, meta } = data;
    const { event_name, custom_data } = meta;

    if (event_name === "order_created" && LSData.type === "orders") {
      const orderId = LSData.id;
      const { subtotal, first_order_item, user_email, status } =
        LSData.attributes;
      const { product_id, product_name, variant_id } = first_order_item;

      // customer data
      const { user_id, template_id } = custom_data;

      // check if user and template exists
      const user = await User.findOne({ uId: user_id });

      if (!user) {
        const msg = `User ${user_email} with id ${user_id} not found`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.USER_NOT_FOUND, msg, 404);
      }

      //   check if order exists
      const order = await Order.findOne({
        user_email,
        order_id: orderId,
      });

      if (order) {
        const msg = `Duplicate webhook for [LS_user: ${user_email}] | [db: ${user.email}] | [order_id: ${orderId}] | [template: ${product_name}]`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.ORDER_EXISTS, msg, 404);
      }

      // check if template exists
      const template = PARENT_TEMPLATES.find((t) => t.id === template_id);

      if (!template) {
        const msg = `Template ${product_name} with id ${template_id} not found`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.TEMPLATE_NOT_FOUND, msg, 404);
      }

      // create new order
      const order_created = await Order.create({
        temp_id: template_id,
        template_name: product_name,
        order_id: orderId,
        payment_status: status,
        payment_amount: subtotal / 100,
        user_name: user.name,
        user_email,
        product_id,
        variant_id,
      });

      if (!order_created) {
        const msg = `Error creating order for [LS_user: ${user_email}] [dbUser: ${user.email}] [order_id: ${orderId}]  [template: ${product_name}]`;
        console.log(`❌ ${msg}`);
        throw new HttpException(RESPONSE_CODE.ORDER_NOT_CREATED, msg, 404);
      }

      await PurchasedItems.create({
        uId: user_id,
        temp_id: template_id,
        template_name: product_name,
      });

      console.log(
        `✅ Order created for [LS_user: ${user_email}] | [db_user: ${user.email}] | [template: ${product_name}]`
      );
      return sendResponse.success(res, RESPONSE_CODE.SUCCESS, "success", 200, {
        message: "Order created successfully",
      });
    }
  }
}

export default CatchError(handler);
