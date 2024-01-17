import * as Sentry from "@sentry/node";
import { RESPONSE_CODE } from "@veloz/shared/types";
import HttpException from "./exception";
import sendResponse from "./sendResponse";

Sentry.init({ dsn: process.env.SENTRY_DSN });

//! Do not change the _error.ts file to error.ts as that a client component.

export default function CatchError(fn: Function) {
  return async function (req: Request) {
    try {
      return await fn(req);
    } catch (err: any) {
      const code = RESPONSE_CODE[err.code as any];
      console.log(`😥 Error [${code}]: ${err?.message}`);
      console.log(err);

      Sentry.captureException(err);
      await Sentry.flush(2000);

      if (err instanceof HttpException) {
        return sendResponse.error(err.code, err.message, err.statusCode, err);
      }

      return sendResponse.error(
        RESPONSE_CODE.INTERNAL_SERVER_ERROR,
        "INTERNAL SERVER ERROR",
        500,
        err
      );
    }
  };
}
