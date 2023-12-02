import RefinedProjectGenerate from "../utils/projectHelper/refinedGenerate.js";
import BaseSetup from "../utils/projectHelper/base.js";
import { isCancel, spinner, text, intro, outro, cancel } from "@clack/prompts";
import { sleep } from "../utils/index.js";
import chalk from "chalk";
import storage from "../config/storage.js";
import { getTemplateDetails } from "../https/index.js";
import { HttpResponse } from "@veloz/shared/types";
import CodebaseSetup from "../utils/projectHelper/setup_codebase.js";

interface IProjectRespData {
  userData: {
    id: string;
    username: string;
  };
  name: string;
  available: boolean;
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
      const resp: HttpResponse = await getTemplateDetails(projName);
      if (resp?.errorStatus) {
        s.stop(`🚩 ${chalk.redBright(resp?.message)}`);
        return;
      }

      s.stop(`✅ Done fetching..`);

      const projData = resp?.data as IProjectRespData;
      const { name, available } = projData;

      // setup codebase
      new CodebaseSetup(name);
    } catch (e: any) {
      console.log(e);
      s.stop(`🚩 ${chalk.redBright(e?.message)}`);
    }
  }
}

export default VelozGenerate;
