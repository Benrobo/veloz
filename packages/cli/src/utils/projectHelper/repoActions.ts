import { $, execa } from "execa";

let response = {
  success: false,
  msg: null,
  errMsg: null,
};
class GithubRepoActions {
  async isGitInstalled() {
    try {
      // Try running the git command with the --version option
      await execa("git", ["--version"]);
      return true; // Git is installed
    } catch (error) {
      return false; // Git is not installed
    }
  }

  async cloneRepo(path: string, url: string) {
    // check if git is installed
    const isGitInstalled = await this.isGitInstalled();
    if (!isGitInstalled) {
      response["success"] = false;
      response["msg"] = `Git is not installed.`;
      response["errMsg"] = `Git is not installed.`;
      return response;
    }

    try {
      await execa("git", ["clone", url, path], { cwd: path });
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
      await execa("git", ["remote", "remove", "origin"], { cwd: path });
      response["success"] = true;
      return response;
    } catch (e: any) {
      response["success"] = false;
      response["msg"] = `Failed removing remote.`;
      response["errMsg"] = `Error removing remote @ ${path}: ${e.message}`;
      return response;
    }
  }

  async initGit(path: string) {
    try {
      await execa("git", ["init"], { cwd: path });
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
