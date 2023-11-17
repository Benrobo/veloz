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
import {
  react_dashboard_tsx,
  react_index_tsx,
  react_sign_in_tsx,
  react_sign_up_tsx,
  react_Auth_app_tsx,
} from "../../data/frontend/page.js";

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
    secrets: string;
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
      case "monorepo-vuejs":
        await this._vuejsSetup();
        break;
      case "monolith-react":
        await this._reactSetup();
        break;
      case "monolith-vuejs":
        await this._vuejsSetup();
        break;
      default:
        logger.error(`[Frontend Setup]: Invalid stack case: ${stackCase}`);
        break;
    }
  }

  async _reactSetup() {
    const s = spinner();
    const {
      fe_tech,
      name,
      userData,
      cb_arch,
      design_system,
      auth,
      _frontendPath,
    } = this.props;
    const { secrets } = userData;
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
      if (auth) {
        if (auth === "clerk") {
          await this.initAuthentication(_frontendPath, fe_tech, auth, secrets);
        }
      }
    } catch (e: any) {}
  }

  async _vuejsSetup() {}

  async initAuthentication(
    base_path: string,
    fe_stack: string,
    auth: string,
    secrets: string
  ) {
    const s = spinner();
    const basePkgJson = `${base_path}/package.json`;
    if (auth === "clerk") {
      if (fe_stack === "react") {
        // setup react authentication
        s.start(`🔐 Configuring clerk authentication...`);

        const _srcDir = `${base_path}/src`;

        const _authFolder = await createDir(_srcDir, "auth");
        if (!_authFolder.success) {
          s.stop(`❌ ${chalk.redBright("Failed creating auth folder")}`);
          logger.error(_authFolder.msg);
          return;
        }

        // update App.tsx
        await updateFileContent(
          `${_srcDir}/App.tsx`,
          await prettify(react_Auth_app_tsx, "babel-ts")
        );
        // create auth pages
        await createFile(
          _authFolder.path,
          "sign-in.tsx",
          await prettify(react_sign_in_tsx, "babel")
        );
        await createFile(
          _authFolder.path,
          "sign-up.tsx",
          await prettify(react_sign_up_tsx, "babel")
        );

        // create home and dashboard pages
        await createFile(
          _srcDir,
          "index.tsx",
          await prettify(react_index_tsx, "babel")
        );
        await createFile(
          _srcDir,
          "dashboard.tsx",
          await prettify(react_dashboard_tsx, "babel")
        );

        // create .env.local
        secrets += `\nVITE_CLERK_PUBLISHABLE_KEY=pk_test_ZXhjaXRpbmctaGVkZ2Vob2ctNjQuY2xlcmsuYWNjb3VudHMuZGV2JA`;
        await this.createEnv(base_path, ".env.local", secrets);

        // update package.json
        const _pkgJson = getPackageJsonDataFromPath(basePkgJson);
        const data = _pkgJson.data as ReturnPackageJson;
        const clerk = await getPkgVersion("@clerk/clerk-react"),
          RRD = await getPkgVersion("react-router-dom"),
          typeNode = await getPkgVersion("@types/node");

        data["dependencies"] = {
          ...data["dependencies"],
          "@clerk/clerk-react": clerk,
          "react-router-dom": RRD,
        };
        data["devDependencies"] = {
          ...data["devDependencies"],
          "@types/node": typeNode,
        };

        const _pkgUpdated = await updateFileContent(
          basePkgJson,
          JSON.stringify(data, null, 2)
        );
        if (!_pkgUpdated.success) {
          s.stop(
            `❌ ${chalk.redBright("Failed configuring clerk authentication")}`
          );
          logger.error(_pkgUpdated?.msg);
          return;
        }

        s.stop(`✅ Clerk authentication configured`);
      }
    }
  }

  async createEnv(base_path: string, filename: string, secrets: string) {
    // create .env.local
    await createFile(base_path, ".env.local", "");
    const _splited = secrets
      .trim()
      .split("/n")
      .filter((s) => s.trim().length > 0);

    for (const _secret of _splited) {
      await updateFileContent(`${base_path}/${filename}`, _secret);
    }
  }

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
    if (fe_stack === "vuejs") {
    }
  }
}
