#!/usr/bin/env node
import { Command } from "commander";
import storage from "./config/storage.js";
import VelozGenerate from "./commands/generate.js";
import chalk from "chalk";
// import chalk from "chalk";

const program = new Command();
const _velozGenerate = new VelozGenerate();

program
  .command("auth")
  .alias("l")
  .description("Authenticate cli with veloz token.");
//   .action(authCliApp);

program.command("whoami").alias("wmi").description("Check user information.");
//   .action(whoami);

program
  .command("use <project_name>")
  .alias("u")
  .description("Use generate veloz project")
  .action(async (command) => {
    _velozGenerate.start(command);
  });

program
  .command("share <command>")
  .option("-u <user>", "4Snap username")
  .alias("sh")
  .description("Share a command to different user.")
  .action(async (command, options) => {
    console.log(command);
    const username = options.u ? options.u : null;
    // await shareCmd(username, command);
  });

// logout
program
  .command("logout")
  .alias("lg")
  .description("Logout and clear all cached data.")
  .action(() => {
    storage.delete("@veloz_token");
    storage.delete("@veloz_userInfo");
    console.log(chalk.yellowBright(`\n ✨ Successfully logged out. \n`));
  });

program.parse();
