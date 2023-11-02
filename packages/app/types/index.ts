import { ProjectType } from "@/components/Projects/Card";

export type TechStackCategory =
  | "frontend"
  | "design_system"
  | "backend"
  | "payment"
  | "database"
  | "mailing"
  | "authentication"
  | "codebase_acrhitecture";

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

export type TechStackPricingPlan = "BASIC_PKG" | "STANDARD_PKG" | "PRO_PKG";

export type SupportedArchitecture = "monolith" | "monorepo";
export interface TechStacks {
  name: string;
  key: string;
  img: string;
  pricing_plan: TechStackPricingPlan;
  available: boolean;
  category: TechStackCategory;
  supported_architecture: SupportedArchitecture[];
}

export type ProjectSideBarConfigKeysType =
  | "details"
  | "tech_stacks"
  | "secrets";

export type ProjectSideBarConfigType = {
  title: string;
  key: string;
};

export interface CodebaseArchitecture {
  stack: string;
  name: string;
  category: TechStackCategory;
}

export type CodebaseArchitectureMap = {
  [key in TechStackCategory]: CodebaseArchitecture;
};

export type SecretDataTypes = {
  name: string;
  id: string | any;
  secrets: {
    id: string | any;
    name: string;
    value: string;
  }[];
};

export type Secrets = {
  id: string | any;
  name: string;
  value: string;
};
