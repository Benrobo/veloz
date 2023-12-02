import { cancel, isCancel, spinner, text } from "@clack/prompts";
import BaseSetup from "./base.js";
import { sleep } from "../index.js";
import { inviteToRepo } from "../../https/index.js";
import chalk from "chalk";

export default class CodebaseSetup extends BaseSetup {
  private _templateName: string | null = null;
  private projName: string | null = null;

  constructor(tempName: string) {
    super();
    this._templateName = tempName;
    this.projName = "";

    this.initialize();
  }

  public async initialize() {
    const s = spinner();
    try {
      // ask for dirname
      const projName = await this.askForDirName();
      this.projName = projName;

      // invite user as collaborator first
      s.start("Repo integration...");
      await sleep(1);

      const resp = await inviteToRepo(this._templateName);
      console.log(resp);
      if (
        ["INVALID_TOKEN", "UNAUTHORIZED", "FORBIDDEN"].includes(resp?.code) ||
        resp?.errorStatus
      ) {
        s.stop(`🚩 ${chalk.redBright(resp?.message)}`);
        cancel("Operation cancelled.");
      }
    } catch (e: any) {}
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
