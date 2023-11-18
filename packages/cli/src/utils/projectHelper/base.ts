import GithubRepoActions from "./repoActions.js";
import { createDir, createFile, updateFileContent } from "../filemanager.js";
import { RootMonorepoPkgJson } from "../../data/package_json.js";
import logger from "../logger.js";
import { spinner } from "@clack/prompts";
import { updateProjectStatus } from "../../https/index.js";
import { HttpResponse } from "@veloz/shared/types/index.js";
import chalk from "chalk";
import { getPackageJsonDataFromPath, sleep } from "../index.js";

type _ArchResp = {
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
    let monorepoResp: _ArchResp = {
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

  public async setupMonolith(
    proj_name: string,
    _frontend: string | null,
    _backend: string | null
  ) {
    const s = spinner();
    s;
    let monolithResp: _ArchResp = {
      frontendPath: null,
      backendPath: null,
      success: false,
    };
    let _logMsg = "";
    const _projCwd = process.cwd();
    const _dirCreated = await createDir(_projCwd, proj_name, true);
    if (_dirCreated.success === false) {
      _logMsg = `[Monolith Setup]: ${_dirCreated.msg} [path: ${_dirCreated.path}]`;
      logger.error(_logMsg);
      return monolithResp;
    }

    // create client and server folders
    if (_frontend && _backend) {
      const _clientCreated = await createDir(_dirCreated.path, "client");
      const _serverCreated = await createDir(_dirCreated.path, "server");
      if (!_clientCreated.success) {
        _logMsg = `[Monolith Setup]: [Failed initializing client folder] ${_dirCreated.msg}`;
        logger.error(_logMsg);
        return monolithResp;
      }
      if (!_serverCreated.success) {
        _logMsg = `[Monolith Setup]: [Failed initializing server folder] ${_dirCreated.msg}`;
        logger.error(_logMsg);
        return monolithResp;
      }

      monolithResp["backendPath"] = _serverCreated.path;
      monolithResp["frontendPath"] = _clientCreated.path;
    }
    if (_frontend) {
      // point the frontend dir to base dir, rather than creating separate
      // client folder
      monolithResp["frontendPath"] = _dirCreated.path;
    }
    if (_backend) {
      // point the backend dir to base dir, rather than creating separate
      // server / api folder
      monolithResp["backendPath"] = _dirCreated.path;
    }

    monolithResp["success"] = true;
    return monolithResp;
  }

  public async managePkgJson(
    proj_name: string,
    base_path: string,
    stack: string
  ) {
    const s = spinner();
    if (stack === "react") {
      // manage react pkg.json
      s.start(`Updating package.json...`);
      await sleep(1);
      const filePath = `${base_path}/package.json`;
      const _pkgJson = getPackageJsonDataFromPath(filePath);
      if (!_pkgJson.success) {
        s.stop(`🚩 ${chalk.redBright(_pkgJson?.err)}`);
        return;
      }

      const _pkgData = _pkgJson.data;
      _pkgData["name"] = `@${proj_name}/app`;

      // update
      const _pkgJsonUpdated = await updateFileContent(
        filePath,
        JSON.stringify(_pkgData, null, 2)
      );
      if (!_pkgJsonUpdated.success) {
        s.stop(`🚩 ${chalk.redBright("Failed updating package.json")}`);
        logger.error(_pkgJsonUpdated?.msg);
        return;
      }
      s.stop(`✅ base package.json updated`);
    }
  }

  public showWelcomeMessage(stackMessage: string, dest_path: string) {
    console.log(""); // space
    console.log(
      chalk.cyanBright(
        `${stackMessage}\n@ ${dest_path}\n\n Run: \n npm install\n npm run dev`
      )
    );
    console.log(""); // space
  }
}
