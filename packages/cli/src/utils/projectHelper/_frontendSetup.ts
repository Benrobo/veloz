import { CodebaseArchitecture } from "@veloz/shared/types";
import BaseSetup from "./base.js";
import { spinner } from "@clack/prompts";
import { sleep } from "../index.js";
import logger from "../logger.js";
import GithubRepoActions from "../../utils/projectHelper/repoActions.js";
import { GithubRepo } from "../../data/repo.js";
import chalk from "chalk";
import { createFile } from "../filemanager.js";
import tailwindcss_config from "../../data/frontend/config/tailwind.config.js";
import prettify from "../prettier.js";

const githubActions = GithubRepoActions;

type FeProps = {
  fe_tech: string | null;
  design_system: string | null;
  mailing: string | null;
  auth: string | null;
  payment: string | null;
  cb_arch: "monorepo" | "monolith" | string | null;
  name: string;
  _frontendPath: string | null;
  userData: {
    id: string;
    username: string;
    proj_id: string;
  };
};

export default class _FrontendSetup extends BaseSetup {
  private props: FeProps;
  public _response: { success: boolean; msg: string | null } = {
    msg: "",
    success: false,
  };
  constructor(props: FeProps) {
    super();
    this.props = props;
  }

  async initializeSetup() {
    const { cb_arch, fe_tech } = this.props;
    const stackCase = `${cb_arch}-${fe_tech}`;
    switch (stackCase) {
      case "monorepo-react":
        await this._reactSetup();
        break;
      case "monorepo-vanillajs":
        await this._vanillajsSetup();
        break;
      case "monolith-react":
        await this._reactSetup();
        break;
      case "monolith-vanillajs":
        await this._vanillajsSetup();
        break;
      default:
        logger.error(`[Frontend Setup]: Invalid stack case: ${stackCase}`);
        break;
    }
  }

  async _reactSetup() {
    const s = spinner();
    const { fe_tech, name, cb_arch, design_system, auth, _frontendPath } =
      this.props;
    try {
      s.start("Cloning repo...");
      await sleep(1);

      const repoUrl = GithubRepo.find((r) => r.stack === fe_tech)?.url;
      const doneCloning = await githubActions.cloneRepo(_frontendPath, repoUrl);

      if (doneCloning?.success) {
        s.stop("✅ Done Cloning");
      } else {
        s.stop(`❌ ${chalk.redBright(doneCloning?.msg)}`);
        logger.error(doneCloning?.errMsg);
        return;
      }

      // manage package.json first
      await this.managePkgJson(name, _frontendPath, fe_tech);

      // check if design system is selected
      if (design_system) {
        // tailwindcss support
        if (design_system === "tailwindcss") {
          await this.initTailwindcss(_frontendPath, fe_tech);
        }
      }
    } catch (e: any) {}
  }

  async _vanillajsSetup() {}

  async initTailwindcss(base_path: string, fe_stack: string) {
    if (fe_stack === "react") {
      tailwindcss_config.content.length = 0;
      tailwindcss_config.content.push("./src/**/*.{js,jsx,ts,tsx}");

      const modifiedTwContent = `
      const config = ${JSON.stringify(tailwindcss_config, null, 2)}
      
      export default config;
      `;

      // create tailwind.config.ts file
      const prettifiedConfig = await prettify(modifiedTwContent, "babel");
      await createFile(base_path, "tailwind.config.ts", prettifiedConfig);
    }
    if (fe_stack === "nextjs") {
    }
    if (fe_stack === "vanillajs") {
    }
  }
}
