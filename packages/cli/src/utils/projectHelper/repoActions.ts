import { $ } from "execa";
import logger from "../logger.js";

let response = {
  success: false,
  msg: null,
  errMsg: null,
};
class GithubRepoActions {
  async cloneRepo(path: string, url: string) {
    try {
      await $`git clone ${url} ${path}`;
      response["success"] = true;
      return response;
    } catch (e: any) {
      response["success"] = false;
      response["msg"] = `Failed cloning repo.`;
      response["errMsg"] = `Error cloning: ${e.message}`;
      return response;
    }
  }

  async createGhRepo(proj_name: string, path: string) {}

  async initGit(rootDir: string, path: string) {}
}

export default new GithubRepoActions();
