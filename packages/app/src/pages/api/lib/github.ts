import { TEMPLATES_REPOSITORY } from "@/data/stack";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { GhInvite, User } from "../models";
import axios from "axios";

// [ref](https://stackoverflow.com/questions/64371517/how-to-invite-a-user-to-a-private-github-repo-within-an-organisation-using-the-c)
// gh api -X PUT repos/:org/:repo/collaborators/:username -f permission=:perm
// https://docs.github.com/en/rest/collaborators/collaborators?apiVersion=2022-11-28#add-a-repository-collaborator

export async function addCollaboratorToRepo(
  plan: TechStackPricingPlan,
  username: string,
  _tempName: string
) {
  try {
    const ghR =
      TEMPLATES_REPOSITORY.find((repo) => repo.template_name === _tempName) ??
      null;

    if (!ghR) {
      console.log(
        `❌ [Collaborator Invite]: No repo found for template name ${_tempName}`
      );
      return false;
    }

    // check template plan
    const planLevels = {
      FREE_PKG: 1,
      BASIC_PKG: 2,
      STANDARD_PKG: 3,
      ENTERPRISE_PKG: 4,
    };

    if (planLevels[plan] < planLevels[ghR.plan]) {
      console.log(
        `❌ [Collaborator Invite]: User [user: @${username}] [plan: ${plan}] is not eligible for template plan ${ghR.plan}`
      );
      return false;
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

      // add to gh_invite table
      const user = await User.findOne({ gh_username: username });
      if (user) {
        // check if already invited
        const ghInvite = await GhInvite.findOne({
          uId: user?.uId,
          repo_name: ghR.repo,
          template_name: ghR.template_name,
        });
        if (ghInvite) {
          console.log(
            `❌ [Collaborator Invite]: Already invited [user: ${username}] for [repo: ${ghR.repo}]`
          );
        } else {
          await GhInvite.create({
            uId: user?.uId,
            repo_name: ghR.repo,
            template_name: ghR.template_name,
          });
        }
      }

      return true;
    }
  } catch (e: any) {
    const msg = e.response.data ?? e?.message;
    console.log(msg);
    console.log(
      `❌ [Collaborator Invite]: Invitation failed for ${username} for [template: ${_tempName}]`
    );
    return false;
  }
}
