import { TEMP_DIR } from "@/config/project";
import GithubRepoActions from "./repoActions";
import { createDir, createFile } from "@veloz/shared/utils/filemanager";
import { RootMonorepoPkgJson } from "@/data/package_json";
import mongoose from "mongoose";
import { Project } from "@veloz/shared/models";

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
  public setupMonorepo(
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
    const _dirCreated = createDir(TEMP_DIR, proj_name, true);
    if (!_dirCreated.success) {
      console.log(`[Monorepo Setup]: ${_dirCreated.msg}`);
      return monorepoResp;
    }

    // create base packages folder
    const _pkgsDir = createDir(_dirCreated.path, "packages");
    if (!_pkgsDir.success) {
      console.log(`[Monorepo Setup]: ${_dirCreated.msg}`);
      return monorepoResp;
    }
    // create packages readme file
    createFile(_dirCreated.path, "README.md");
    createFile(_pkgsDir.path, "README.md");

    // create root pkg.json
    const _rootPkgJsonContent = RootMonorepoPkgJson.replace(
      "{{proj_name}}",
      proj_name
    ).replace("{{pkg_description}}", "Project scaffolded with veloz.");

    createFile(_dirCreated.path, "package.json", _rootPkgJsonContent, true);

    // create packages (app, server | api)
    if (_frontend) {
      // create FE directory
      const _feCreated = createDir(_pkgsDir.path, "app");
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
        const _feCreated = createDir(_pkgsDir.path, "app");
        const _beCreated = createDir(_pkgsDir.path, "server");

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

  public async updateProjectStatus(
    userId: string,
    proj_id: string,
    status: "pending" | "failed" | "done"
  ) {
    // UPDATE PROJECT STATUS
    await Project.updateOne(
      {
        uId: userId,
        _id: new mongoose.Types.ObjectId(proj_id),
      },
      {
        $set: {
          status,
        },
      }
    );
  }
}
