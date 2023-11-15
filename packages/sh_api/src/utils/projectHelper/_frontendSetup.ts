import { validFrontendStacks } from "@veloz/shared/data/stack";
import BaseSetup from "./base";

type FeProps = {
  fe_tech: string | null;
  design_system: string | null;
  mailing: string | null;
  auth: string | null;
  payment: string | null;
  cb_arch: "monorepo" | "monolith" | string | null;
  name: string;
};

export default class _FrontendSetup extends BaseSetup {
  private props: FeProps;
  constructor(props: FeProps) {
    super();
    this.props = props;
    (async () => {
      await this.initializeSetup();
    })();
  }

  async initializeSetup() {
    const { cb_arch, fe_tech } = this.props;
    const stackCase = `${cb_arch}-${fe_tech}`;
    switch (stackCase) {
      case "monorepo-react":
        await this._reactSetup();
      case "monorepo-vanillajs":
        await this._vanillajsSetup();
      case "monolith-react":
        await this._reactSetup();
      case "monolith-vanillajs":
        await this._vanillajsSetup();
      default:
        this._vanillajsSetup();
    }
  }

  async _reactSetup() {
    const { cb_arch, design_system, auth } = this.props;

    let _doneSettingUpCbArch;
    if (cb_arch === "monorepo") {
      _doneSettingUpCbArch = this.setupMonorepo();
    } else {
      _doneSettingUpCbArch = this.setupMonolith();
    }
  }

  async _vanillajsSetup() {}
}
