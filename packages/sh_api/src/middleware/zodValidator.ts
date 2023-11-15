import HttpException from "@/utils/exception";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { Response, Request, NextFunction } from "express";
import { AnyZodObject } from "zod";

export default async function apiPayloadZodValidation(
  schema: AnyZodObject,
  req: Request
) {
  try {
    await schema.parseAsync(req.body ?? req.query);
  } catch (error: any) {
    // console.log(`[ZOD VALIDATION ERROR]: ${error?.issues[0]?.message}`);
    throw new HttpException(
      error?.issues[0]?.message,
      RESPONSE_CODE.VALIDATION_ERROR,
      400,
      error
    );
  }
}
