import CatchError from "../../lib/_error";
import sendResponse from "../../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { NextRequest } from "next/server";
import { getLastRepoCommit } from "../../lib/github";

export const GET = CatchError(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const template = searchParams.get("template");

  //   check if kit_name exists
  if (!template) {
    return sendResponse.error(
      RESPONSE_CODE.INVALID_PARAMS,
      "template name is required",
      400
    );
  }

  const commit = await getLastRepoCommit(template as string);

  return sendResponse.success(RESPONSE_CODE.SUCCESS, "success", 200, commit);
});
