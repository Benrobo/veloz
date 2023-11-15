import { RESPONSE_CODE } from "@veloz/shared";

class HttpException extends Error {
  readonly code;
  readonly statusCode;
  constructor(
    message: string,
    code: RESPONSE_CODE,
    statusCode: number,
    stack?: any
  ) {
    super();
    this.message = message;
    this.name = "HttpException";
    this.code = RESPONSE_CODE[code];
    this.statusCode = statusCode;
    this.stack = stack ?? this.stack;
  }
}

export default HttpException;
