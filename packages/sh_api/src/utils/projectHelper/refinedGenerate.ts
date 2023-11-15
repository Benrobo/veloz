import {
  REFINED_STACK_VALUE,
  RESPONSE_CODE,
  TechStackCategory,
} from "@veloz/shared";
import _FrontendSetup from "./_frontendSetup";
import BaseSetup from "./base";
import HttpException from "../exception";
import { Project } from "@veloz/shared/models";
import mongoose from "mongoose";
import { CatchError } from "../error";
import GenerateProject from "@/services/generateProject";

type Props = {
  category: TechStackCategory;
  name: string;
  technology: string;
  key: string;
  _id: object;
}[];

type ProjUserData = {
  id: object | string;
  username: string;
  proj_id: string;
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
  ): Promise<RepoSetupResp | undefined> {
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
      return (await this.monoRepoSetup()) as RepoSetupResp;
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
    const _monorepoSetup = this.setupMonorepo(
      this.formatedName,
      this._frontend,
      this._backend
    );

    if (!_monorepoSetup.success) {
      const msg = `Monorepo Setup Failed: [user: ${this.userData.username}] [proj_id: ${this.userData.proj_id}] Something wen't wrong setting up monorepo`;
      refinedResponse["msg"] = msg;

      // UPDATE PROJECT STATUS
      await this.updateProjectStatus(
        this.userData.id as string,
        this.userData.proj_id,
        "failed"
      );
      return refinedResponse;
    }

    if (this._backend && this._frontend) {
      return refinedResponse;
    } else if (this._backend) {
      // Backend setup
      return refinedResponse;
    } else if (this._frontend) {
      // Frontend setup
      const _frontedSetup = new _FrontendSetup({
        auth: this._authentication,
        cb_arch: this.codebaseArchitecture,
        design_system: this._design_system,
        fe_tech: this._frontend,
        mailing: this._mailing,
        name: this.formatedName,
        payment: this._payment,
        _frontendPath: _monorepoSetup.frontendPath,
      });
      return refinedResponse;
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
