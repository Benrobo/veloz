import { program } from "commander";
import useGradinent from "../utils/useGradient.js";

function showCliCommands() {
  const name = "veeloz";
  const description =
    "Ship fast with Veloz 🚢";

  const cliCmds = `
    
    Usage: ${name} [options] [command]

    ${description}

    Options:
    -V, --version             output the version number
    -h, --help                display help for command

    Commands:
    --init  Begin project scaffolding.
    `;
  useGradinent({
    title: cliCmds,
    colors: ["#d0679d", "cyan", "#d0679d"],
  });
}

export default showCliCommands;
