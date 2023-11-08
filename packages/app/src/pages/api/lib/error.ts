import { RESPONSE_CODE } from "@veloz/shared";
import { NextApiRequest, NextApiResponse } from "next";

export default function CatchError(fn: Function) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await fn(req, res);
    } catch (err: any) {
      const code = RESPONSE_CODE[RESPONSE_CODE.INTERNAL_SERVER_ERROR];
      console.log(`😥 Error [${code}]: ${err?.message}`);
      res.status(500).json({
        errorStatus: true,
        statusCode: 500,
        code,
        message: "Something went wrong",
        details: {
          stacks: process.env.NODE_ENV !== "production" && err?.stack,
        },
      });
    }
  };
}
