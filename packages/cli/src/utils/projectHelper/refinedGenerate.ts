import {
  REFINED_STACK_VALUE,
  RESPONSE_CODE,
  TechStackCategory,
} from "@veloz/shared/types";
import _FrontendSetup from "./_frontendSetup.js";
import BaseSetup from "./base.js";

type Props = {
  category: TechStackCategory;
  name: string;
  technology: string;
  key: string;
  _id: object;
}[];

type ProjUserData = {
  id: string;
  username: string;
  proj_id: string;
  secrets: string;
};

type RepoSetupResp = { msg: string | null; success: boolean };

// Refined Project Generate
export default class RefinedProjectGenerate extends BaseSetup {
  public formatedName: string | any;
  public codebaseArchitecture: string | null = "monorepo";
  public _frontend: any;
  public _backend: any;
  public _design_system: any;
  public _database: any;
  public _mailing: any;
  public _authentication: any;
  public _payment: any;
  public userData: ProjUserData;
  public tech_stacks: Props | any;
  public name: string = "";

  // tech_stacks: Props, name: string, userData: ProjUserData
  constructor() {
    super();
    this.userData = {} as any;
  }

  public async _initializeRefine(
    tech_stacks: Props,
    name: string,
    userData: ProjUserData
  ) {
    this.formatedName = name?.toLowerCase().replace(/\s/gi, "-");
    this.codebaseArchitecture = findStack(tech_stacks, "codebase_acrhitecture");
    this._frontend = findStack(tech_stacks, "frontend");
    this._backend = findStack(tech_stacks, "backend");
    this._design_system = findStack(tech_stacks, "design_system");
    this._database = findStack(tech_stacks, "database");
    this._mailing = findStack(tech_stacks, "mailing");
    this._authentication = findStack(tech_stacks, "authentication");
    this._payment = findStack(tech_stacks, "payment");
    this.userData = userData;

    if (this.codebaseArchitecture === "monorepo") {
      await this.monoRepoSetup();
    } else {
      // return this.monolithSetup() as RepoSetupResp;
    }
  }

  async monoRepoSetup(): Promise<RepoSetupResp | undefined> {
    // setup repo
    let refinedResponse: RepoSetupResp = {
      msg: "",
      success: false,
    };
    let _logMsg = "";
    const _monorepoSetup = await this.setupMonorepo(
      this.formatedName,
      this._frontend,
      this._backend
    );

    if (!_monorepoSetup.success) {
      // sent to sentry log system
      _logMsg = `Monorepo Setup Failed.`;
      refinedResponse["msg"] = _logMsg;

      // UPDATE PROJECT STATUS
      await this.updateProjectStatus(this.userData.proj_id, "failed");
      return refinedResponse;
    }

    if (this._backend && this._frontend) {
      return refinedResponse;
    } else if (this._backend) {
      // Backend setup
      return refinedResponse;
    } else if (this._frontend) {
      // Frontend setup
      new _FrontendSetup({
        auth: this._authentication,
        cb_arch: this.codebaseArchitecture,
        design_system: this._design_system,
        fe_tech: this._frontend,
        mailing: this._mailing,
        name: this.formatedName,
        payment: this._payment,
        _frontendPath: _monorepoSetup.frontendPath,
        userData: this.userData,
      }).initializeSetup();
    }
  }

  async monolithSetup(): Promise<RepoSetupResp | undefined> {
    let finetunedResponse: RepoSetupResp = {
      msg: "",
      success: false,
    };
    return finetunedResponse;
  }
}

function findStack(stacks: Props, category: TechStackCategory, match?: string) {
  const foundStack = stacks.find((s) => s.category === category);
  if (match) {
    return foundStack?.key === match ? foundStack?.key : null;
  }
  return foundStack?.key ?? null;
}
