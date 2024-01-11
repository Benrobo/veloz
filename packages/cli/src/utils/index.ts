import path from "path";
import fs from "fs-extra";
import logger from "./logger.js";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms * 1000));

export interface ReturnPackageJson {
  name: string;
  version: string;
  main: string;
  scripts: {
    [key: string]: string;
  };
  keywords: string[];
  author: string;
  license: string;
  description: string;
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
  prisma?: object;
}

export function getPackageJsonDataFromPath(path: string) {
  try {
    const data = fs.readJsonSync(path) as ReturnPackageJson;
    return { data, success: true, err: null };
  } catch (err: any) {
    return {
      data: null,
      success: false,
      err: err?.message || "Invalid path or malformed JSON",
    };
  }
}
