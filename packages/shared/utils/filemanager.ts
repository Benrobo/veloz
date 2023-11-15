import fs from "fs";

export function createDir(path: string, name: string) {
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
    }

    resp["success"] = true;
    resp["msg"] = null;
    return resp;
  } catch (e: any) {
    msg = `Something went wrong creating ${name} directory: ${e?.message}.`;
    resp["msg"] = msg;
    return resp;
  }
}
