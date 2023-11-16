import { CodebaseArchitecture } from "@veloz/shared/types";
import BaseSetup from "./base.js";
import { spinner } from "@clack/prompts";
import { sleep } from "../index.js";
import logger from "../logger.js";

type FeProps = {
  fe_tech: string | null;
  design_system: string | null;
  mailing: string | null;
  auth: string | null;
  payment: string | null;
  cb_arch: "monorepo" | "monolith" | string | null;
  name: string;
  _frontendPath: string | null;
  userData: {
    id: string;
    username: string;
    proj_id: string;
  };
};

export default class _FrontendSetup extends BaseSetup {
  private props: FeProps;
  public _response: { success: boolean; msg: string | null } = {
    msg: "",
    success: false,
  };
  constructor(props: FeProps) {
    super();
    this.props = props;
  }

  async initializeSetup() {
    const { cb_arch, fe_tech } = this.props;
    const stackCase = `${cb_arch}-${fe_tech}`;
    switch (stackCase) {
      case "monorepo-react":
        await this._reactSetup();
        break;
      case "monorepo-vanillajs":
        await this._vanillajsSetup();
        break;
      case "monolith-react":
        await this._reactSetup();
        break;
      case "monolith-vanillajs":
        await this._vanillajsSetup();
        break;
      default:
        logger.error(`[Frontend Setup]: Invalid stack case: ${stackCase}`);
        break;
    }
  }

  async _reactSetup() {
    const s = spinner();
    const { cb_arch, design_system, auth } = this.props;
    try {
      s.start("Scaffolding frontend..");
      await sleep(2);

      s.stop("heyyy");
    } catch (e: any) {}
  }

  async _vanillajsSetup() {}
}
