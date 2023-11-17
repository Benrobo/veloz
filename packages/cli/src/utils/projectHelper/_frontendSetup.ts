import { CodebaseArchitecture } from "@veloz/shared/types";
import BaseSetup from "./base.js";
import { spinner } from "@clack/prompts";
import {
  ReturnPackageJson,
  getPackageJsonDataFromPath,
  sleep,
} from "../index.js";
import logger from "../logger.js";
import GithubRepoActions from "../../utils/projectHelper/repoActions.js";
import { GithubRepo } from "../../data/repo.js";
import chalk from "chalk";
import { createDir, createFile, updateFileContent } from "../filemanager.js";
import tailwindcss_config from "../../data/frontend/config/tailwind.config.js";
import prettify from "../prettier.js";
import getPkgVersion from "../getPkgVersion.js";
import {
  postcssConfig,
  tailwind_directives,
} from "../../data/frontend/config/css.js";
import { viteReactTsconfig } from "../../data/frontend/config/tsconfig.js";
import {
  react_app_tsx,
  react_tw_card,
} from "../../data/frontend/components.js";

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
    const s = spinner();
    const basePkgJson = `${base_path}/package.json`;
    if (fe_stack === "react") {
      s.start(`Configuring Tailwindcss...`);
      tailwindcss_config.content.length = 0;
      tailwindcss_config.content.push("./src/**/*.{js,jsx,ts,tsx}");
      tailwindcss_config.theme.extend.fontFamily = {
        poppins: ["Poppins", "sans-serif"],
      } as any;

      const modifiedTwContent = `
      const config = ${JSON.stringify(tailwindcss_config, null, 2)}
      
      export default config;
      `;

      // create tailwind.config.ts file
      const prettifiedConfig = await prettify(modifiedTwContent, "babel");
      await createFile(base_path, "tailwind.config.ts", prettifiedConfig);

      // update index.css
      const indexCssPath = `${base_path}/src/index.css`;
      const font = `@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");`;
      const _updatedCont = tailwind_directives.replace(
        "{{hosted_react_font}}",
        font
      );
      await updateFileContent(
        indexCssPath,
        await prettify(_updatedCont, "css")
      );

      // add postcss file
      const postcssFile = `postcss.config.js`;
      await createFile(
        base_path,
        postcssFile,
        await prettify(postcssConfig, "babel")
      );

      // add card component and update App.tsx
      const componentDir = `${base_path}/src`;
      const _compCreated = await createDir(componentDir, "components");
      if (!_compCreated.success) {
        s.stop(`❌ ${chalk.redBright("Failed creating components directory")}`);
        logger.error(_compCreated.msg);
        return;
      }

      await createFile(
        `${componentDir}/components`,
        "Card.tsx",
        await prettify(react_tw_card, "babel")
      );

      const appTsxFile = `${base_path}/src/App.tsx`;
      await updateFileContent(
        appTsxFile,
        await prettify(react_app_tsx, "babel")
      );

      // update tsconfig.json (include baseUrl: "./")
      const tsconfigPath = `${base_path}/tsconfig.json`;
      await updateFileContent(
        tsconfigPath,
        await prettify(JSON.stringify(viteReactTsconfig), "json")
      );

      // update package.json to include tailwindcss
      const _pkgJson = getPackageJsonDataFromPath(basePkgJson);
      const data = _pkgJson.data as ReturnPackageJson;
      const tailwindcss = await getPkgVersion("tailwindcss"),
        postcss = await getPkgVersion("postcss");
      data["devDependencies"] = {
        ...data["devDependencies"],
        tailwindcss,
        postcss,
      };
      const _pkgUpdated = await updateFileContent(
        basePkgJson,
        JSON.stringify(data, null, 2)
      );
      if (!_pkgUpdated.success) {
        s.stop(`❌ ${chalk.redBright("Failed updating package.json")}`);
        logger.error(_pkgUpdated?.msg);
        return;
      }

      s.stop(`✅ Tailwindcss configured`);
    }
    if (fe_stack === "nextjs") {
    }
    if (fe_stack === "vanillajs") {
    }
  }
}
