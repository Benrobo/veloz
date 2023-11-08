export type ProjectType = "Vortex" | "Apex" | "Serenity" | "Nebula" | "Odyssey";

export type TechStackCategory =
  | "frontend"
  | "design_system"
  | "backend"
  | "payment"
  | "database"
  | "mailing"
  | "authentication"
  | "codebase_acrhitecture";

export enum ProjectOption {
  Refined = "Refined",
  FineTuned = "Fine-Tuned",
}

export type VelozProjectOption = keyof typeof ProjectOption;

export interface VelozProjectType {
  name: string;
  id: any;
  description?: string;
  label: ProjectType;
  stacks?: {
    title: TechStackCategory;
    stacks: string[];
  }[];
  download_link?: string;
  status: "pending" | "done" | "failed";
  env?: string | null;
}

export type TechStackPricingPlan =
  | "BASIC_PKG"
  | "STANDARD_PKG"
  | "ENTERPRISE_PKG";

export type SupportedArchitecture = "monolith" | "monorepo";
export interface REFINED_STACKS {
  name: string;
  key: string;
  img: string;
  pricing_plan: TechStackPricingPlan;
  available: boolean;
  category: TechStackCategory;
  supported_architecture: SupportedArchitecture[];
}

export interface FINE_TUNED_STACKS {
  id: any;
  plan: TechStackPricingPlan;
  name: string;
  tech_stacks: {
    title: TechStackCategory;
    stacks: string[];
  }[];
  available: boolean;
}

export type FineTunedStacksName =
  | "Athena"
  | "Hera"
  | "Zeus"
  | "Poseidon"
  | "Ares"
  | "Dynamo";

export type ProjectSideBarConfigKeysType =
  | "details"
  | "tech_stacks"
  | "secrets";

export interface CodebaseArchitecture {
  stack: string;
  name: string;
  category: TechStackCategory;
}

export type CodebaseArchitectureMap = {
  [key in TechStackCategory]: CodebaseArchitecture;
};
