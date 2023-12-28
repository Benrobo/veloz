import fs from "fs-extra";
import { confirm } from "@clack/prompts";
import chalk from "chalk";

export async function isDirEmpty(path: string) {
  try {
    const dirContents = fs.readdirSync(path);
    if (dirContents.length > 0) {
      return false;
    }
    return true;
  } catch (e: any) {
    return false;
  }
}

export async function createDir(
  path: string,
  name: string,
  forceDelete?: boolean
) {
  const dir = `${path}/${name}`;
  let resp: { success: boolean; msg: string | null; path: string } = {
    success: false,
    msg: null,
    path: dir,
  };
  let msg = "";
  try {
    // check if path exists
    if (!fs.existsSync(path)) {
      msg = `Failed to create ${name} folder, path don't exist.`;
      resp["msg"] = msg;
      return resp;
    }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      resp["success"] = true;
      resp["msg"] = null;
    } else {
      // check if the content inside the dir is empty
      if (!(await isDirEmpty(path))) {
        const shouldDelete = await confirm({
          message: `${chalk.cyanBright(
            name
          )} isn't empty, do you want to empty it?`,
          initialValue: true,
        });

        if (!shouldDelete) {
          resp["success"] = false;
          return resp;
        }

        await new Promise((res) => {
          emptyDirectory(dir, (err, success) => {
            if (err !== null) {
              resp["msg"] = err as string;
              resp["success"] = false;
              res(false);
            }
            if (success) {
              fs.mkdirSync(dir);
              resp["msg"] = null;
              resp["success"] = true;
              res(true);
            }
          });
        });
        return resp;
      }

      // check if user added force delete option
      if (forceDelete && fs.existsSync(dir)) {
        await new Promise((res) => {
          emptyDirectory(dir, (err, success) => {
            if (err !== null) {
              resp["msg"] = err as string;
              resp["success"] = false;
              res(false);
            }
            if (success) {
              fs.mkdirSync(dir);
              resp["msg"] = null;
              resp["success"] = true;
              res(true);
            }
          });
        });
        return resp;
      }

      resp["success"] = true;
      return resp;
    }
    return resp;
  } catch (e: any) {
    msg = `Something went wrong creating ${name} directory: ${e?.message}.`;
    resp["msg"] = msg;
    resp["success"] = false;
    return resp;
  }
}

export async function createFile(
  path: string,
  name: string,
  content?: string,
  forceDelete?: boolean
) {
  const dir = `${path}/${name}`;
  let resp: { success: boolean; msg: string | null; path: string } = {
    success: false,
    msg: null,
    path: dir,
  };
  let msg = "";
  try {
    // check if path exists
    if (!fs.existsSync(path)) {
      msg = `Failed to create '${name}' file, path don't exist.`;
      resp["msg"] = msg;
      return resp;
    }

    if (!fs.existsSync(dir)) {
      fs.writeFileSync(dir, content ?? "");
    } else {
      if (forceDelete && fs.existsSync(dir)) {
        fs.removeSync(dir);
        fs.writeFileSync(dir, content ?? "");
        resp["success"] = true;
        resp["msg"] = null;
        return resp;
      }
    }

    resp["success"] = true;
    resp["msg"] = null;
    return resp;
  } catch (e: any) {
    msg = `Something went wrong creating '${name}' file: ${e?.message}.`;
    resp["msg"] = msg;
    return resp;
  }
}

export function emptyDirectory(
  dir: string,
  cb: (error?: string | null, success?: boolean) => void
) {
  try {
    if (!fs.existsSync(dir)) {
      console.log(
        `[Failed to delete directory recursively]: directory not found`
      );
      return;
    }

    fs.remove(dir, (err) => {
      if (err) {
        cb(`[Empting Directory]: ${err?.message}`, false);
        return;
      }
      cb(null, true);
    });
  } catch (e: any) {
    cb(`[Failed to delete directory recursively]: ${e?.message}`, false);
  }
}

export async function updateFileContent(
  path_to_file: string,
  content?: string
) {
  let resp = {
    msg: null,
    success: false,
  };
  try {
    if (!fs.existsSync(path_to_file)) {
      resp["msg"] = `Failed to update file content, path don't exist.`;
      return resp;
    }
    const file = `${path_to_file}`;
    fs.writeFileSync(file, content as any);
    resp["success"] = true;
    return resp;
  } catch (e: any) {
    resp["success"] = false;
    resp["msg"] = `Something went wrong updating file content: ${e?.message}.`;
    return resp;
  }
}
