import path from "path";
import { TEMP_DIR } from "./project.js";
import { fileURLToPath } from "url";
import { createFile } from "../utils/filemanager.js";
import logger from "../utils/logger.js";
import fs from "fs-extra";

type StorageDataProps = {
  name: string;
  createdAt: string;
  config: { [key: string]: string }[];
};

class Storage {
  private projectName: string;
  private _cwd: string;
  private storageFile: string;
  private data: StorageDataProps;

  constructor(projectName: string) {
    this.projectName = projectName;
    this._cwd = path.join(fileURLToPath(import.meta.url), "..", "..");

    this.storageFile = "data.json";
    this.data = {
      name: this.projectName,
      createdAt: new Date().toISOString(),
      config: [],
    } satisfies StorageDataProps;

    this.init();
  }

  private storageExists() {
    return fs.existsSync(this._cwd);
  }

  private async init() {
    const created = await createFile(
      this._cwd,
      this.storageFile,
      JSON.stringify(this.data, null, 2)
    );

    if (!created.success) {
      logger.error(`[Storage]: ${created.msg}`);
    }
  }

  public async reset() {
    const created = await createFile(
      this._cwd,
      this.storageFile,
      JSON.stringify(this.data, null, 2),
      true
    );

    if (!created.success) {
      logger.error(`❌ [Storage Reset]: ${created.msg}`);
    } else {
      logger.success(`✅ Storage Reset`);
    }
  }

  public set(key: string, value: any) {
    // check first if data.json exists
    if (this.storageExists()) {
      const _data = fs.readFileSync(path.join(this._cwd, "data.json"), "utf-8");
      const _parsedData = JSON.parse(_data) as StorageDataProps;
      const _config = _parsedData.config;
      const _keyExists = _config.find((item) => item[key]);

      if (_keyExists) {
        // update
        _config.forEach((item) => {
          if (item[key]) {
            item[key] = value;
          }
        });
        fs.writeFileSync(
          path.join(this._cwd, "data.json"),
          JSON.stringify(_parsedData, null, 2)
        );
      } else {
        _config.push({ [key]: value });
        fs.writeFileSync(
          path.join(this._cwd, "data.json"),
          JSON.stringify(_parsedData, null, 2)
        );
      }
    } else {
      logger.error(`❌ [Storage]: Storage file not found.`);
    }
  }
  public get(key: string): Record<string, any> | null {
    if (this.storageExists()) {
      const _data = fs.readFileSync(
        path.join(this._cwd, this.storageFile),
        "utf-8"
      );
      const _parsedData = JSON.parse(_data) as StorageDataProps;
      const _config = _parsedData.config;
      const _keyExists = _config.find((item) => item[key]) ?? null;
      return _keyExists;
    } else {
      return null;
    }
  }

  public delete(key: string) {
    if (this.storageExists()) {
      const _data = fs.readFileSync(
        path.join(this._cwd, this.storageFile),
        "utf-8"
      );
      const _parsedData = JSON.parse(_data) as StorageDataProps;
      const _config = _parsedData.config;
      const _keyExists = _config.find((item) => item[key]) ?? null;

      if (_keyExists) {
        const _newConfig = _config.filter((item) => !item[key]);
        _parsedData.config = _newConfig;
        fs.writeFileSync(
          path.join(this._cwd, "data.json"),
          JSON.stringify(_parsedData, null, 2)
        );
      } else {
        logger.error(`❌ [Storage]: Key not found.`);
      }
    } else {
      logger.error(`❌ [Storage]: Storage file not found.`);
    }
  }
}

const storage = new Storage("@veloz-conf");

export default storage;
