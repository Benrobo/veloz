import { RESPONSE_CODE } from "@veloz/shared/types";
import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject } from "zod";

export default async function nextRouteZodValidation(
  schema: AnyZodObject,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await schema.parseAsync(req.body ?? req.query);
  } catch (error: any) {
    return res.status(400).json({
      code: RESPONSE_CODE[RESPONSE_CODE.VALIDATION_ERROR],
      error: {
        message: error?.issues[0]?.message,
        error,
      },
    });
  }
}
