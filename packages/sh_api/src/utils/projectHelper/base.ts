import { TEMP_DIR } from "@/config/project";
import GithubRepoActions from "./repoActions";
import { createDir } from "@veloz/shared/utils/filemanager";

export default class BaseSetup {
  readonly githubActions;
  constructor() {
    this.githubActions = GithubRepoActions;
  }
  public async setupMonorepo(proj_name: string) {
    // create the directory based on the name
    const _dirCreated = createDir(TEMP_DIR, proj_name);
    if (!_dirCreated.success) {
      console.log(`[Monorepo Setup]: ${_dirCreated.msg}`);
      return false;
    }

    console.log(_dirCreated.path);
    // init yarn workspaces
    // setup root package.json
    // setup different app structure i.e [Just the folder]
    // shared,app(react, nextjs, [nextjs + next-api]),api (if BE isn't nextjs-api)
    //
    // this.githubActions.downloadRepo()
  }

  public async setupMonolith() {}
}
