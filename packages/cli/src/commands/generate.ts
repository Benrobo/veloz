import RefinedProjectGenerate from "../utils/projectHelper/refinedGenerate.js";
import BaseSetup from "../utils/projectHelper/base.js";
import { isCancel, spinner, text, intro, outro, cancel } from "@clack/prompts";
import { sleep } from "../utils/index.js";
import chalk from "chalk";
import storage from "../config/storage.js";
import { getProjects } from "../https/index.js";
import { HttpResponse, IGenerateProjectDetails } from "@veloz/shared/types";

interface IProjectRespData extends IGenerateProjectDetails {
  userData: {
    id: string;
    username: string;
    proj_id: string;
    default_nextjs_route: "PAGE" | "APP";
  };
}

class VelozGenerate extends BaseSetup {
  constructor() {
    super();
  }

  async start(projName: string) {
    console.log("");
    intro("🛠️  Project scaffolding");
    const s = spinner();
    try {
      s.start("Fetching..");

      await sleep(1);
      const resp: HttpResponse = await getProjects(projName);

      if (resp?.errorStatus) {
        s.stop(`🚩 ${chalk.redBright(resp?.message)}`);
        return;
      }

      s.stop(`✅ Done fetching..`);

      const projData = resp?.data as IProjectRespData;
      const { name, tech_stacks, userData, secrets } = projData;
      const _userData = {
        proj_id: projData?._id,
        secrets,
        ...userData,
      };

      await new RefinedProjectGenerate()._initializeRefine(
        tech_stacks,
        name,
        _userData
      );
    } catch (e: any) {
      s.stop(`🚩 ${chalk.redBright(e?.message)}`);
    }
  }
}

export default VelozGenerate;
