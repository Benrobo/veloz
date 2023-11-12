import {
  validFrontendStacks,
  validBackendStacks,
  validDesignSystem,
  validDatabases,
  validCodebaseArchitecture,
  validPaymentProviders,
  validAuthProviders,
  mailingProviders,
} from "../data/stack";

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
  | "FREE_PKG"
  | "BASIC_PKG"
  | "STANDARD_PKG"
  | "ENTERPRISE_PKG";

export type SupportedArchitecture = "monolith" | "monorepo";

export interface FINE_TUNED_STACKS {
  id: any;
  plan: TechStackPricingPlan;
  name: string;
  description: string;
  tech_stacks: {
    title: TechStackCategory;
    stacks: string[];
  }[];
  available: boolean;
}

type ValidStacks =
  | (typeof validFrontendStacks)[number]
  | (typeof validBackendStacks)[number]
  | (typeof validDesignSystem)[number]
  | (typeof validDatabases)[number]
  | (typeof validCodebaseArchitecture)[number]
  | (typeof validPaymentProviders)[number]
  | (typeof validAuthProviders)[number]
  | (typeof mailingProviders)[number];

export type REFINED_STACK_VALUE = {
  name: string;
  key: ValidStacks;
  pricing_plan: TechStackPricingPlan;
};

export interface REFINED_STACKS {
  category: TechStackCategory;
  stacks: REFINED_STACK_VALUE[];
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

export type SecretDataTypes = {
  name: string;
  id: string | any;
  category?: TechStackCategory;
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

export enum RESPONSE_CODE {
  // Common Responses
  INVALID_FIELDS,
  USER_NOT_FOUND,
  USER_ALREADY_EXIST,
  INVALID_EMAIL,
  INVALID_LOGIN_CREDENTIALS,
  INTERNAL_SERVER_ERROR,
  VALIDATION_ERROR,

  // User Operations
  SIGNUP_SUCCESSFULL,
  LOGIN_SUCCESSFULL,
  UNAUTHORIZED,
  FORBIDDEN,
  INVALID_TRANSACTION_PIN,
  USER_DETAILS,

  // Secrets Responses
  SECRET_CREATED,
  SECRET_EXISTS,
  SECRET_DETAILS,

  // Project Responses
  SUCCESS,
}

export type createProjectPayload = {
  name: string;
  description: string;
  label: ProjectType;
  type: VelozProjectOption;
  fineTunedStackName: string;
  env_id: string;
  tech_stacks: {
    category: TechStackCategory;
    name: string;
    stack: string;
  }[];
};

export type StackAvailabilityType = {
  category: TechStackCategory;
  available: string[];
  not_available: string[];
};
