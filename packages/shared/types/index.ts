export type ProjectType = "Vortex" | "Apex" | "Serenity" | "Nebula" | "Odyssey";

export type TechStackCategory =
  | "frontend"
  | "backend"
  | "payment"
  | "database"
  | "mailing"
  | "authentication";

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
  plan?: TechStackPricingPlan;
  name: string;
  description: string;
  tech_stacks: {
    title: TechStackCategory;
    stacks: string[];
  }[];
  label: ProjectType;
  available: boolean;
}

export type GENERAL_STACK_VALUE = {
  name: string;
  key: string;
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
  TEMPLATE_NOT_FOUND,
  NOT_ELIGIBLE,
  FAILED_INVITING_COLLABORATOR,
  INVALID_PARAMS,
  METHOD_NOT_ALLOWED,

  // User Operations
  SIGNUP_SUCCESSFULL,
  LOGIN_SUCCESSFULL,
  UNAUTHORIZED,
  FORBIDDEN,
  USER_DETAILS,
  SETTINGS_DETAILS,

  // Project Responses
  SUCCESS,
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
