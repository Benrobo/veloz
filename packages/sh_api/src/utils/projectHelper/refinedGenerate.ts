import { REFINED_STACK_VALUE, TechStackCategory } from "@veloz/shared";
import _FrontendSetup from "./_frontendSetup";
import BaseSetup from "./base";

type Props = {
  category: TechStackCategory;
  name: string;
  technology: string;
  key: string;
  _id: object;
}[];

// Refined Project Generate
export default class RefinedProjectGenerate extends BaseSetup {
  private formatedName;
  private codebaseArchitecture;
  private _frontend;
  private _backend;
  private _design_system;
  private _database;
  private _mailing;
  private _authentication;
  private _payment;

  constructor(tech_stacks: Props, name: string) {
    super();
    this.formatedName = name.toLowerCase().replace(/\s/gi, "-");
    this.codebaseArchitecture = findStack(tech_stacks, "codebase_acrhitecture");
    this._frontend = findStack(tech_stacks, "frontend");
    this._backend = findStack(tech_stacks, "backend");
    this._design_system = findStack(tech_stacks, "design_system");
    this._database = findStack(tech_stacks, "database");
    this._mailing = findStack(tech_stacks, "mailing");
    this._authentication = findStack(tech_stacks, "authentication");
    this._payment = findStack(tech_stacks, "payment");

    if (this.codebaseArchitecture === "monorepo") {
      this.monoRepoSetup();
    } else {
      this.monolithSetup();
    }
  }

  monoRepoSetup() {
    // setup repo
    this.setupMonorepo(this.formatedName);

    if (this._backend && this._frontend) {
    } else if (this._backend) {
      // Backend setup
    } else if (this._frontend) {
      // Frontend setup
      return new _FrontendSetup({
        auth: this._authentication,
        cb_arch: this.codebaseArchitecture,
        design_system: this._design_system,
        fe_tech: this._frontend,
        mailing: this._mailing,
        name: this.formatedName,
        payment: this._payment,
      });
    } else {
    }
  }

  monolithSetup() {}
}

function findStack(stacks: Props, category: TechStackCategory, match?: string) {
  const foundStack = stacks.find((s) => s.category === category);
  if (match) {
    return foundStack?.key === match ? foundStack?.key : null;
  }
  return foundStack?.key ?? null;
}
