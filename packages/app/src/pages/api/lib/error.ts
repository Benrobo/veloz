import { RESPONSE_CODE } from "@veloz/shared/types";
import { NextApiRequest, NextApiResponse } from "next";
import HttpException from "./exception";

export default function CatchError(fn: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await fn(req, res);
    } catch (err: any) {
      const code = RESPONSE_CODE[RESPONSE_CODE.INTERNAL_SERVER_ERROR];
      console.log(`😥 Error [${code}]: ${err?.message}`);
      console.log(err);
      if (err instanceof HttpException) {
        res.status(err.statusCode).json({
          errorStatus: true,
          statusCode: err.statusCode,
          code: RESPONSE_CODE[err?.code as any],
          message: err?.message,
          details: {
            stacks: process.env.DEV_ENV !== "production" && err,
          },
        });
        return;
      }

      res.status(500).json({
        errorStatus: true,
        statusCode: 500,
        code,
        message: "Something went wrong",
        details: {
          stacks: process.env.DEV_ENV !== "production" && err?.stack,
        },
      });
    }
  };
}
