import {
  CodebaseArchitecture,
  CodebaseArchitectureMap,
  FINE_TUNED_STACKS,
  FineTunedStacksName,
  ProjectSideBarConfigKeysType,
  ProjectType,
  REFINED_STACKS,
  SupportedArchitecture,
  TechStackCategory,
  TechStackPricingPlan,
  VelozProjectOption,
  VelozProjectType,
} from "@veloz/shared/types";

export type ProjectSideBarConfigType = {
  title: string;
  key: string;
};

export type UserInfo = {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  role: string;
  createdAt: Date;
  proj_plan: TechStackPricingPlan;
  isTester: boolean;
  hasSubscribed: boolean;
};

export type createSecretSchemaType = {
  name: string;
  secrets: {
    name: string;
    value: string;
  }[];
};

export type updateSecretSchemaType = {
  id: string;
  name: string;
  deleteEnv: {
    id: string;
    name: string;
    value: string;
  }[];
  updateEnv: {
    id: string;
    name: string;
    value: string;
  }[];
  createEnv: {
    id: string;
    name: string;
    value: string;
  }[];
};

export type ResponseData = {
  errorStatus: boolean;
  message: string;
  code: string;
  statusCode: number;
  data?: any;
  error?: {
    message: string;
    error: any;
  };
};
