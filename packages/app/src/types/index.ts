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
} from "@veloz/shared/types";

export type ProjectSideBarConfigType = {
  title: string;
  key: string;
};

export type ProjectListType = {
  _id: string;
  name: string;
  label: ProjectType;
  type: VelozProjectOption;
  download_link: string;
  description: string;
  status: "pending" | "done" | "failed";
  fineTunedStackName: FineTunedStacksName | string;
  tech_stacks: {
    category: TechStackCategory;
    name: string;
    technology: string;
  }[];
  env_id: string | null;
  secrets: string;
  createdAt?: Date;
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

export type createProjectPayload = {
  name: string;
  description: string;
  label: ProjectType;
  type: VelozProjectOption;
  fineTunedStackName: string;
  env_id: string;
  tech_stacks: Record<
    TechStackCategory,
    {
      category: TechStackCategory;
      name: string;
      stack: string;
    }
  >;
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
