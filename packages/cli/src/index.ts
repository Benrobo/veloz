#!/usr/bin/env node
import { Command } from "commander";
import storage from "./config/storage.js";
import VelozGenerate from "./commands/generate.js";
import chalk from "chalk";
import cliAuth from "./commands/cliAuth.js";
import renderTitle from "./utils/renderTitle.js";

const program = new Command();
const _velozGenerate = new VelozGenerate();

program.outputHelp = (cb) => {
  renderTitle();
  Command.prototype.outputHelp.call(program, cb);
};

program
  .command("auth")
  .alias("l")
  .description("Authenticate cli with veloz token.")
  .action(async () => await cliAuth._authenticate());

program
  .command("use <project_name>")
  .alias("u")
  .description("Use generate veloz project")
  .action(async (command) => {
    _velozGenerate.start(command);
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
