import { isAuthenticated } from "../../middlewares/auth";
import CatchError from "../../lib/_error";
import { createCheckout } from "../../lib/checkout";
import { RESPONSE_CODE } from "@veloz/shared/types";
import sendResponse from "../../lib/sendResponse";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = CatchError(
  isAuthenticated(async (req: NextRequest) => {
    const userId = (req as any).user?.id;
    const { searchParams } = new URL(req.url);
    const template_id = searchParams.get("template_id") as string;

    const data = await createCheckout(userId, template_id);

    if (data.error) {
      return sendResponse.error(
        RESPONSE_CODE.CHECKOUT_ERROR,
        data.error,
        400,
        null
      );
    } else {
      return sendResponse.success(
        RESPONSE_CODE.SUCCESS,
        "success",
        200,
        data.data
      );
    }
  })
);
