import { NextFunction, Request, Response } from "express";
import { RESPONSE_CODE } from "@veloz/shared/types";
import HttpException from "./exception";

export function HandleGlobalErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpException) {
    console.log(`[HttpException]: [${err.code}] [${err.message}]`);
    res.status(500).json({
      errorStatus: true,
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      details: {
        stacks: process.env.NODE_ENV !== "production" && err.stack,
      },
    });
    return;
  }

  res.status(500).json({
    errorStatus: true,
    statusCode: 500,
    code: RESPONSE_CODE[RESPONSE_CODE.INTERNAL_SERVER_ERROR],
    message: "Something went wrong",
    details: {
      stacks: process.env.NODE_ENV !== "production" && err?.stack,
    },
  });
}

export function CatchError(fn: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err: any) {
      next(err);
    }
  };
}
