import fs from "fs";

export function createDir(path: string, name: string, forceDelete?: boolean) {
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
      if (forceDelete && fs.existsSync(dir)) {
        removeDirRf(dir, (err, success) => {
          if (err) {
            resp["msg"] = err;
            resp["success"] = false;
          }
          if (success) {
            fs.mkdirSync(dir);
            resp["msg"] = null;
            resp["success"] = true;
          }
        });
      }
    }

    return resp;
  } catch (e: any) {
    msg = `Something went wrong creating ${name} directory: ${e?.message}.`;
    resp["msg"] = msg;
    resp["success"] = false;
    return resp;
  }
}

export function createFile(
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

    if (!fs.existsSync(dir) && !forceDelete) {
      fs.writeFileSync(dir, content ?? "");
    } else {
      if (forceDelete && fs.existsSync(dir)) {
        removeDirRf(dir, () => {
          fs.writeFileSync(dir, content ?? "");
        });
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

export function removeDirRf(
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

    console.log(fs.readdirSync(dir));
    cb("something went wrong", false);
  } catch (e: any) {}
}
