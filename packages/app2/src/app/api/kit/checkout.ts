import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/_error";
import { isAuthenticated } from "../middlewares/auth";
import { createCheckout } from "../lib/checkout";
import { RESPONSE_CODE } from "@veloz/shared/types";
import sendResponse from "../lib/sendResponse";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = (req as any).user?.id;
    const template_id = req.query.template_id as string;

    const data = await createCheckout(userId, template_id);

    if (data.error) {
      sendResponse.error(
        res,
        RESPONSE_CODE.CHECKOUT_ERROR,
        data.error,
        400,
        null
      );
    } else {
      sendResponse.success(
        res,
        RESPONSE_CODE.SUCCESS,
        "success",
        200,
        data.data
      );
    }
  }
}

export default CatchError(isAuthenticated(handler));
