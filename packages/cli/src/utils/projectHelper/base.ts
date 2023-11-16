import { TEMP_DIR } from "../../config/project.js";
import GithubRepoActions from "./repoActions.js";
import { createDir, createFile } from "../filemanager.js";
import { RootMonorepoPkgJson } from "../../data/package_json.js";

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
    // create the directory based on the name
    const _dirCreated = await createDir(TEMP_DIR, proj_name, true);
    if (_dirCreated.success === false) {
      console.log(`[Monorepo Setup]: ${_dirCreated.msg}`);
      return monorepoResp;
    }

    // create base packages folder
    const _pkgsDir = await createDir(_dirCreated.path, "packages");
    if (!_pkgsDir.success) {
      console.log(`[Root PkgJson Setup]: ${_dirCreated.msg}`);
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
        console.log(
          `[Monorepo Setup]: [Failed initializing frontend folder] ${_dirCreated.msg}`
        );
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
          console.log(
            `[Monorepo Setup]: [Failed initializing frontend folder] ${_dirCreated.msg}`
          );
          return monorepoResp;
        }
        if (!_beCreated.success) {
          console.log(
            `[Monorepo Setup]: [Failed initializing backend folder] ${_dirCreated.msg}`
          );
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

  // @ts-ignore
  public async updateProjectStatus(
    userId: string,
    proj_id: string,
    status: "pending" | "failed" | "done"
  ) {
    console.log(userId, proj_id, status);
    // UPDATE PROJECT STATUS
    // Make http call to update project status
  }
}
