import {
  cancel,
  confirm,
  isCancel,
  outro,
  spinner,
  text,
} from "@clack/prompts";
import BaseSetup from "./base.js";
import { sleep } from "../index.js";
import { inviteToRepo, storeTemplateConsumption } from "../../https/index.js";
import chalk from "chalk";
import { createDir } from "../filemanager.js";

export default class CodebaseSetup extends BaseSetup {
  private _templateName: string | null = null;
  private projName: string | null = null;
  private _cwd: string;

  constructor(tempName: string) {
    super();
    this._templateName = tempName;
    this.projName = "demo-1";
    this._cwd = process.cwd();

    this.initialize();
  }

  public async initialize() {
    const s = spinner();
    try {
      // invite user as collaborator first
      s.start("Repo integration...");
      await sleep(1);

      const resp = await inviteToRepo(this._templateName);
      // console.log(resp);
      if (
        ["INVALID_TOKEN", "UNAUTHORIZED", "FORBIDDEN"].includes(resp?.code) ||
        resp?.errorStatus
      ) {
        s.stop(`🚩 ${chalk.redBright(resp?.message)}`);
        cancel(`Operation cancelled.`);
        return;
      }

      s.stop(`✅ Repo integrated`);

      // ask for dirname
      const projName = await this.askForDirName();
      this.projName = projName;

      // create folder
      const _dirCreated = await createDir(this._cwd, this.projName);
      const _project_path = _dirCreated.path;

      if (!_dirCreated.success) {
        cancel(`🚩 ${chalk.redBright("Aborted, directory isn't empty.")}`);
      }

      s.start(`🚀 Creating project...`);

      // clone the repo
      const gh_url = `https://github.com/veloz-org/veloz-${this._templateName.toLowerCase()}`;
      const hasCloned = await this.githubActions.cloneRepo(
        _project_path,
        gh_url
      );

      if (!hasCloned.success) {
        s.stop(`🚩 ${chalk.redBright(hasCloned.errMsg)}`);
        cancel(`Operation cancelled: ${chalk.redBright(hasCloned.msg)}`);
        return;
      }

      s.stop("✅ Done");

      // remove remote origin from the cloned repo
      await this.githubActions.removeRemote(_project_path);

      // ask for git initialization
      const shouldInitGit = await confirm({
        message: "Initialize git?",
        initialValue: true,
      });

      if (isCancel(shouldInitGit)) {
        cancel("Operation cancelled.");
        return;
      }

      if (shouldInitGit) {
        s.start("🚀 Initializing git...");
        const initialized = await this.githubActions.initGit(_project_path);
        if (!initialized.success) {
          s.stop(`🚩 ${chalk.redBright(initialized.errMsg)}`);
          cancel(`Operation cancelled: ${chalk.redBright(initialized.msg)}`);
          return;
        }
        s.stop("✅ Done");
      }

      console.log("");
      console.log(
        `
        ✨ ${chalk.yellowBright(
          "Happy hacking, ship fast with Veloz 🚢."
        )}\n✨ ${chalk.yellowBright(
          "Ship it like it's hot – because it is! 🔥🚢."
        )}
        `
          .trim()
          .replace(/\s+\n/g, " ")
      );
      console.log("");

      // store template consumption
      await storeTemplateConsumption(this._templateName);
    } catch (e: any) {
      s.stop(`🚩 ${chalk.redBright(e?.message)}`);
      cancel(`Operation cancelled: ${chalk.redBright(e?.message)}`);
    }
    outro(`🛠️  Done`);
  }

  async askForDirName() {
    const folderName = await text({
      message: "Enter a folder name for your project",
      placeholder: "demo-1",
      validate: (val) => {
        if (val.length <= 2) {
          return `Value must be greater than 3 characters`;
        }
      },
    });

    if (isCancel(folderName)) {
      cancel("Operation cancelled.");
      process.exit(0);
    }

    return folderName;
  }
}
