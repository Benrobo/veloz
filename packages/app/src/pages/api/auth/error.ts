import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import HttpException from "../lib/exception";
import { RESPONSE_CODE } from "@veloz/shared/types";

const GET = (req: NextApiRequest, res: NextApiResponse) => {
  const { error } = req?.query;
  const encodedError = encodeURIComponent(error as string);

  // redirect to auth page
  res.redirect(`/auth?error=${encodedError}`);

  throw new HttpException(
    RESPONSE_CODE.INTERNAL_SERVER_ERROR,
    decodeURIComponent(encodedError),
    500
  );
};

export default GET;
