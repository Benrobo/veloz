import CatchError from "../../lib/_error";
import axios from "axios";
import sendResponse from "../../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import HttpException from "../../lib/exception";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { NextRequest } from "next/server";
dayjs.extend(relativeTime);

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

export async function getLastRepoCommit(template_name: string): Promise<{
  message: string;
  date: string;
  formatted: string;
} | null> {
  try {
    const url = `https://api.github.com/repos/veloz-org/veloz-${template_name.toLowerCase()}/branches/main`;
    const resp = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GH_PAT}`,
      },
    });
    const data = resp.data;
    const lastCommit = data.commit;
    const commit_date = lastCommit.commit.committer.date;
    return {
      message: lastCommit.commit.message,
      date: commit_date,
      formatted: dayjs(commit_date).fromNow(),
    };
  } catch (e: any) {
    const msg = e?.response?.data?.message ?? e?.message;
    throw new HttpException(RESPONSE_CODE.KIT_NOT_FOUND, msg, 400);
  }
}
