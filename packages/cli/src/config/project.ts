import path from "path";
import { fileURLToPath } from "url";

export const SCRIPT_TITLE = "veloz-create";

export const TEMP_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "templates"
);
// export const TEMP_DIR = path?.join(__dirname, "..", "templates");
