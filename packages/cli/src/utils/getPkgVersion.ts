import logger from "../utils/logger.js";
import { execa } from "execa";

async function getPkgVersion(pkg_name: string) {
  try {
    const version = await execa("npm", ["view", pkg_name, "version"]);
    return version.stdout.trim() as string;
  } catch (e: any) {
    logger.error(e);
    return "";
  }
}

export default getPkgVersion;
