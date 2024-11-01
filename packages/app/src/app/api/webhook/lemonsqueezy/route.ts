import sendResponse from "../../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import {
  FINE_TUNED_STACKS,
  PARENT_KITS,
  TEMPLATES_REPOSITORY,
} from "@/data/stack";
import CatchError from "../../lib/_error";
import HttpException from "../../lib/exception";
import prisma from "../../../../prisma/prisma";
import { addCollaboratorToRepo } from "../../lib/github";
import { NextRequest } from "next/server";
import { LS_WebhookPayload } from "../../types/lemonsqueezy_types";
import crypto from "node:crypto";
import env from "../../config/env";

export const GET = (req: NextRequest) => {
  return sendResponse.success(RESPONSE_CODE.SUCCESS, "Success", 200, {
    msg: "You've reached Webhook endpoint",
  });
};

export const POST = CatchError(async (req: NextRequest) => {
  const rawBody = await req.text();
  const secret = String(env.LEMONSQUEEZY_WEBHOOK_SECRET);

  // Verify webhook signature
  verifySignature(rawBody, req.headers.get("x-signature") as string, secret);

  const body = JSON.parse(rawBody) as LS_WebhookPayload;

  const { data, meta } = body;
  const { event_name, custom_data } = meta;

  console.log(data);

  if (event_name === "order_created" && data.type === "orders") {
    const orderId = data.id;
    const { subtotal, first_order_item, user_email, status } = data.attributes;
    const { product_id, product_name, variant_id } = first_order_item;

    // customer data
    const { user_id, template_id } = custom_data;

    // check if user and template exists
    const user = await prisma.users.findFirst({ where: { uId: user_id } });

    if (!user) {
      const msg = `User ${user_email} with id ${user_id} not found`;
      console.log(`❌ ${msg}`);
      throw new HttpException(RESPONSE_CODE.USER_NOT_FOUND, msg, 404);
    }

    //   check if order exists
    const order = await prisma.order.findFirst({
      where: {
        user_email,
        order_id: orderId,
      },
    });

    if (order) {
      const msg = `
      \n
      Duplicate webhook for: 

      [LS_user: ${user_email}]
      [gh_user: ${user.gh_username}]
      [order_id: ${orderId}]
      [template: ${product_name}]`;
      console.log(`❌ ${msg}`);
      throw new HttpException(RESPONSE_CODE.ORDER_EXISTS, msg, 404);
    }

    // check if template exists
    const template = PARENT_KITS.find((t) => t.id === template_id);

    if (!template) {
      const msg = `Template ${product_name} with id ${template_id} not found`;
      console.log(`❌ ${msg}`);
      throw new HttpException(RESPONSE_CODE.KIT_NOT_FOUND, msg, 404);
    }

    // create new order
    const order_created = await prisma.order.create({
      data: {
        temp_id: template_id,
        template_name: product_name,
        order_id: orderId,
        payment_status: status,
        payment_amount: subtotal / 100,
        user_name: user.name,
        user_email,
        product_id: String(product_id) as any,
        variant_id: String(variant_id) as any,
        user: {
          connect: {
            uId: user_id,
          },
        },
      },
    });

    if (!order_created) {
      const msg = `Error creating order for [LS_user: ${user_email}] [dbUser: ${user.email}] [order_id: ${orderId}]  [template: ${product_name}]`;
      console.log(`❌ ${msg}`);
      throw new HttpException(RESPONSE_CODE.ORDER_NOT_CREATED, msg, 404);
    }

    await prisma.purchasedItem.create({
      data: {
        uId: user_id,
        temp_id: template_id,
        template_name: product_name,
      },
    });

    // add user as collaborator to github repo
    const repositories = [];
    for (const stack of FINE_TUNED_STACKS) {
      const name = stack.name.toLowerCase();
      const repo = TEMPLATES_REPOSITORY.find((r) => r.kit_name === name);
      if (repo) {
        repositories.push(repo);
      }
    }

    // add user as collaborator to github repo
    const gh_username = user.gh_username;
    for (const repo of repositories) {
      const invitedToRepo = await addCollaboratorToRepo(
        gh_username as string,
        repo.kit_name
      );
      if (invitedToRepo) {
        console.log(`✅ ${gh_username} invited to veloz repo [${repo.repo}]`);
      }
    }

    console.log(
      `✅ Order created for [LS_user: ${user_email}] | [db_user: ${user.email}] | [template: ${product_name}]`
    );
    return sendResponse.success(RESPONSE_CODE.SUCCESS, "success", 200, {
      message: "Order created successfully",
    });
  }
});

function verifySignature(
  rawBody: string,
  headerSignature: string | undefined,
  secret: string
) {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
  const signature = Buffer.from(headerSignature || "", "utf8");

  if (!crypto.timingSafeEqual(digest, signature)) {
    const msg = "❌ Invalid lemonsqueezy signature";
    throw new HttpException(RESPONSE_CODE.UNAUTHORIZED, msg, 401);
  }
}
