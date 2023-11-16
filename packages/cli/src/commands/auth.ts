import { isCancel, spinner, text, intro, outro, cancel } from "@clack/prompts";
import { sleep } from "../utils/index.js";
import chalk from "chalk";
import { authenticate } from "../https/index.js";
import storage from "../config/storage.js";

class CliAuth {
  async _authenticate() {
    const s = spinner();
    try {
      const userToken = await text({
        message: "🔐 Enter your veloz token: \n",
        placeholder: "xxxxxxxxx",
        validate(value): string | void {
          if (value.length === 0) return `Value is required!`;
        },
      });

      if (isCancel(userToken)) {
        cancel("Operation cancelled.");
        process.exit(0);
      }

      s.start("Authenticating..");

      await sleep(1);
      const resp = await authenticate(userToken);

      if (["INVALID_TOKEN", "UNAUTHORIZED", "FORBIDDEN"].includes(resp?.code)) {
        s.stop(`🚩 ${chalk.redBright(resp?.message)}`);
      }

      if (["SUCCESS"].includes(resp?.code)) {
        s.stop(`✅ ${chalk.greenBright(resp?.message)}`);
        // storage.set("@veloz_token", resp?.data?.token);
        // storage.set("@userInfo", {
        //   username: resp?.data?.username,
        //   email: resp?.data?.email,
        //   uId: resp?.data?.userId,
        // });
      }
    } catch (e: any) {
      // spinner.fail(`Failed to authenticate, Try again later.`);
      s.stop(`${chalk.redBright("Failed to authenticate, Try again later.")}`);
    }
    outro("Done");
  }
}

const cliAuth = new CliAuth();
export default cliAuth;
