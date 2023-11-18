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

  async removeRemote(path: string) {
    try {
      await $`git -C ${path} remote remove origin`;
      response["success"] = true;
      return response;
    } catch (e: any) {
      response["success"] = false;
      response["msg"] = `Failed removing remote.`;
      response["errMsg"] = `Error removing remote @ ${path}: ${e.message}`;
      return response;
    }
  }

  async createGhRepo(proj_name: string, path: string) {}

  async initGit(path: string) {
    try {
      await $`git -C ${path} init`;
      response["success"] = true;
      return response;
    } catch (e: any) {
      response["success"] = false;
      response["msg"] = `Failed initializing git.`;
      response["errMsg"] = `Error initializing git: ${e.message}`;
      return response;
    }
  }
}

export default new GithubRepoActions();
