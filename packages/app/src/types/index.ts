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
  category: "frontend" | "backend";
  secrets: {
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
