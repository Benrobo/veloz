import {
  FineTunedStacksName,
  ProjectType,
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
  createdAt?: Date;
};

export type UserInfo = {
  name: string;
  email: string;
  avatar: string;
  uid: string;
  role: string;
  createdAt: Date;
  purchased_items: {
    name: string;
    id: string;
    ref: string;
  }[];
  isTester: boolean;
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

export type ReturnedTemplatesType = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  pricing_plan: TechStackPricingPlan;
  available: boolean;
  installs: number;
  users: {
    images: string[];
    count: number;
  };
  discount: {
    amount: number;
  } | null;
};
