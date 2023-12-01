import { STACK_AVAILABILITY_REPO_NAME } from "@/data/stack";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated } from "../middlewares/auth";
import CatchError from "../lib/error";
import { GhInvite, User } from "../models";
import axios from "axios";

// [ref](https://stackoverflow.com/questions/64371517/how-to-invite-a-user-to-a-private-github-repo-within-an-organisation-using-the-c)
// gh api -X PUT repos/:org/:repo/collaborators/:username -f permission=:perm
// https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const userId = (req as any)?.user?.id;
    const user = await User.findOne({ uId: userId });
    const plan = user?.proj_plan as TechStackPricingPlan;
    await addCollaboratorToRepo(plan, user?.gh_username as string);
    res.json({ msg: "Invitation invoked" });
  }
}

export default isAuthenticated(handler);

export async function addCollaboratorToRepo(
  plan: TechStackPricingPlan,
  username: string
) {
  let _repoName = "";
  try {
    const repo = STACK_AVAILABILITY_REPO_NAME.filter((repo) => {
      const planLevels = {
        FREE_PKG: 1,
        BASIC_PKG: 2,
        STANDARD_PKG: 3,
        ENTERPRISE_PKG: 4,
      };
      if (planLevels[plan] >= planLevels[repo.plan]) return repo;
    });
    if (repo.length > 0) {
      for (const ghR of repo) {
        _repoName = ghR.repo;
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

          // add to gh_invite table
          const user = await User.findOne({ gh_username: username });
          if (user) {
            await GhInvite.create({
              uId: user?.uId,
              repo_name: ghR.repo,
              template_name: ghR.template_name,
            });
          }

          return true;
        }
      }
    }
  } catch (e: any) {
    const msg = e.response.data ?? e?.message;
    console.log(msg);
    console.log(
      `❌ [Collaborator Invite]: Invitation failed for ${username} for [repo: ${_repoName}]`
    );
    return false;
  }
}
