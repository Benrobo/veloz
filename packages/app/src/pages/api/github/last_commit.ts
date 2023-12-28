import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import axios from "axios";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import HttpException from "../lib/exception";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { template } = req?.query;

  //   check if kit_name exists
  if (!template) {
    sendResponse.error(
      res,
      RESPONSE_CODE.INVALID_PARAMS,
      "template name is required",
      400
    );
    return;
  }

  const commit = await getLastRepoCommit(template as string);
  sendResponse.success(res, RESPONSE_CODE.SUCCESS, "success", 200, commit);
}

export default CatchError(handler);

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
