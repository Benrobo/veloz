import GithubRepoActions from "./repoActions.js";

export default class BaseSetup {
  public githubActions = GithubRepoActions;
  constructor() {
    this.githubActions = GithubRepoActions;
  }
}
