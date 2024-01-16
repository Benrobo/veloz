import { NextApiRequest, NextApiResponse } from "next";
import HttpException from "../lib/exception";
import { RESPONSE_CODE } from "@veloz/shared/types";

const GET = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("AUTH ERROR");
    const { error } = req?.query;
    const encodedError = encodeURIComponent(error as string);

    // redirect to auth page
    res.redirect(`/auth?error=${encodedError}`);

    // throw error for capturing by sentry
    throw new HttpException(
      RESPONSE_CODE.INTERNAL_SERVER_ERROR,
      decodeURIComponent(encodedError),
      500
    );
  }
};

export default GET;
