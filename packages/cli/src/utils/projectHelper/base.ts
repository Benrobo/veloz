import GithubRepoActions from "./repoActions.js";
import { createDir, createFile } from "../filemanager.js";
import { RootMonorepoPkgJson } from "../../data/package_json.js";
import logger from "../logger.js";
import { spinner } from "@clack/prompts";
import { updateProjectStatus } from "../../https/index.js";
import { HttpResponse } from "@veloz/shared/types/index.js";
import chalk from "chalk";
import { sleep } from "../index.js";

type MonorepoResp = {
  frontendPath: string | null;
  backendPath: string | null;
  success: boolean;
};

export default class BaseSetup {
  readonly githubActions;
  constructor() {
    this.githubActions = GithubRepoActions;
  }
  public async setupMonorepo(
    proj_name: string,
    _frontend: string | null,
    _backend: string | null
  ) {
    let monorepoResp: MonorepoResp = {
      frontendPath: null,
      backendPath: null,
      success: false,
    };
    let _logMsg = "";
    const _projCwd = process.cwd();

    const _dirCreated = await createDir(_projCwd, proj_name, true);
    if (_dirCreated.success === false) {
      _logMsg = `[Monorepo Setup]: ${_dirCreated.msg} [path: ${_dirCreated.path}]`;
      logger.error(_logMsg);
      return monorepoResp;
    }

    // create base packages folder
    const _pkgsDir = await createDir(_dirCreated.path, "packages");
    if (!_pkgsDir.success) {
      _logMsg = `[Root PkgJson Setup]: ${_dirCreated.msg}`;
      logger.error(_logMsg);
      return monorepoResp;
    }
    // create packages readme file
    await createFile(_dirCreated.path, "README.md");
    await createFile(_pkgsDir.path, "README.md");

    // create root pkg.json
    const _rootPkgJsonContent = RootMonorepoPkgJson.replace(
      "{{proj_name}}",
      proj_name
    ).replace("{{pkg_description}}", "Project scaffolded with veloz.");

    await createFile(
      _dirCreated.path,
      "package.json",
      _rootPkgJsonContent,
      true
    );

    // create packages (app, server | api)
    if (_frontend) {
      // create FE directory
      const _feCreated = await createDir(_pkgsDir.path, "app");
      if (!_feCreated.success) {
        _logMsg = `[Monorepo Setup]: [Failed initializing frontend folder] ${_dirCreated.msg}`;
        logger.error(_logMsg);
        return monorepoResp;
      }

      monorepoResp["frontendPath"] = _feCreated.path;
    }
    if (_frontend && _backend) {
      // check if backend / frontend isn't nextjs
      // if it nextjs, then we don't need double folders
      if (_backend !== "nextjs-api" && _frontend !== "nextjs") {
        const _feCreated = await createDir(_pkgsDir.path, "app");
        const _beCreated = await createDir(_pkgsDir.path, "server");

        if (!_feCreated.success) {
          _logMsg = `[Monorepo Setup]: [Failed initializing frontend folder] ${_dirCreated.msg}`;
          logger.error(_logMsg);
          return monorepoResp;
        }
        if (!_beCreated.success) {
          _logMsg = `[Monorepo Setup]: [Failed initializing backend folder] ${_dirCreated.msg}`;
          logger.error(_logMsg);
          return monorepoResp;
        }

        monorepoResp["backendPath"] = _beCreated.path;
        monorepoResp["frontendPath"] = _feCreated.path;
      } else {
        console.log(`[Nextjs Client & Server] [Detected]`);
      }
    }

    monorepoResp["success"] = true;
    return monorepoResp;
  }

  public async setupMonolith() {}

  public async updateProjectStatus(
    proj_id: string,
    status: "pending" | "failed" | "done"
  ) {
    const s = spinner();
    try {
      s.start(`Updating project status...`);
      await sleep(1);
      const _resp: HttpResponse = await updateProjectStatus(status, proj_id);

      if (!_resp?.errorStatus) {
        s.stop(`🚩 ${chalk.redBright(_resp?.message)}`);
        return;
      }

      s.stop(`✅ Project status updated`);
    } catch (e: any) {
      s.stop(`🚩 ${chalk.redBright(e?.message)}`);
    }
  }
}
