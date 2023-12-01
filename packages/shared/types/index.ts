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
  // Refined = "Refined",
  FineTuned = "Fine-Tuned",
}

export type VelozProjectOption = keyof typeof ProjectOption;

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

export type GENERAL_STACK_VALUE = {
  name: string;
  key: string;
  pricing_plan: TechStackPricingPlan;
};

export interface GENERAL_STACKS {
  category: TechStackCategory;
  stacks: GENERAL_STACK_VALUE[];
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
  INVALID_STACK_COMBO,
  VALIDATION_ERROR,
  STACK_NOT_AVAILABLE,
  PROJECTS,

  // User Operations
  SIGNUP_SUCCESSFULL,
  LOGIN_SUCCESSFULL,
  UNAUTHORIZED,
  FORBIDDEN,
  INVALID_TRANSACTION_PIN,
  USER_DETAILS,
  SETTINGS_DETAILS,

  // Secrets Responses
  SECRET_CREATED,
  SECRET_EXISTS,
  SECRET_DETAILS,
  SECRET_NOT_FOUND,

  // Project Responses
  SUCCESS,
  PROJECT_NOT_FOUND,
  MONOREPO_SETUP_SUCCESS,
  MONOREPO_SETUP_FAILED,
  REFINED_PROJECT_GENERATION_FAILED,
  REFINED_PROJECT_GENERATION_SUCCEEDED,
  INVALID_TOKEN,
}

export type createProjectPayload = {
  name: string;
  description: string;
  label: ProjectType;
  type: VelozProjectOption;
  fineTunedStackName: string | null;
  env_id: string;
  tech_stacks: {
    category: TechStackCategory;
    name: string;
    stack: string;
  }[];
};

export interface IGenerateProjectDetails {
  _id: string;
  uId: string;
  name: string;
  description: string;
  label: ProjectType;
  type: VelozProjectOption;
  fineTunedStackName: string | null;
  env_id: string;
  download_link: string;
  status: "pending" | "failed" | "done";
  secrets: string;
  tech_stacks: {
    category: TechStackCategory;
    name: string;
    technology: string;
    _id: object;
    key: string;
  }[];
}

export type StackAvailabilityType = {
  category: TechStackCategory;
  available: string[];
  not_available: string[];
};

export type HttpResponse = {
  errorStatus: boolean;
  code: number;
  message: string;
  statusCode: number;
  data: any;
};
