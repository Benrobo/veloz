import { TEMPLATES_REPOSITORY } from "@/data/stack";
import axios from "axios";
import prisma from "../../../prisma/prisma";
import HttpException from "../lib/exception";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { RESPONSE_CODE } from "@veloz/shared/types";

// [ref](https://stackoverflow.com/questions/64371517/how-to-invite-a-user-to-a-private-github-repo-within-an-organisation-using-the-c)
// gh api -X PUT repos/:org/:repo/collaborators/:username -f permission=:perm
// https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator

export async function addCollaboratorToRepo(
  username: string,
  _tempName: string
) {
  try {
    const ghR =
      TEMPLATES_REPOSITORY.find(
        (repo) => repo.kit_name.toLowerCase() === _tempName.toLowerCase()
      ) ?? null;

    if (!ghR) {
      console.log(
        `❌ [Collaborator Invite]: No repo found for template name ${_tempName}`
      );
      return false;
    }

    // check if user exists
    const user = await prisma.users.findFirst({
      where: { gh_username: username },
    });
    if (user) {
      // check if already invited
      const invites = await prisma.invites?.findFirst({
        where: {
          AND: {
            uId: user?.uId,
            kit_name: ghR.kit_name,
            type: "github",
          },
        },
      });

      if (invites) {
        console.log(
          `❌ [Collaborator Invite]: Already invited [user: ${username}] for [repo: ${ghR.repo}]`
        );
        return true;
      } else {
        await prisma.invites.create({
          data: {
            uId: user?.uId,
            repo_name: ghR.repo,
            kit_name: ghR.kit_name,
            type: "github",
          },
        });
      }
    }

    const org = "veloz-org";
    const permission = "triage";
    const apiUrl = `https://api.github.com/repos/${org}/${ghR.repo}/collaborators/${username}`;

    const resp = await axios.put(
      apiUrl,
      { permission },
      {
        headers: {
          accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GH_PAT}`,
        },
      }
    );
    // const data = resp.data;
    if ([201, 204, 200].includes(resp.status)) {
      console.log(
        `✅ [Collaborator Invite]: Invitation sent to [user: ${username}] for [repo: ${ghR.repo}]`
      );
      return true;
    }
  } catch (e: any) {
    const msg = e.response?.data ?? e?.message;
    console.log(msg);
    console.log(e);
    console.log(
      `❌ [Collaborator Invite]: Invitation failed for ${username} for [template: ${_tempName}]`
    );
    return false;
  }
}

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
