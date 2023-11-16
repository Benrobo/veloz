import { Schema, model, models } from "mongoose";

import {
  FineTunedStacksName,
  ProjectType,
  TechStackCategory,
  TechStackPricingPlan,
  VelozProjectOption,
} from "@veloz/shared/types";
import { TechPricingPlans } from "@veloz/shared/data/project";

// 1. Create an interface representing a document in MongoDB.
interface IProject {
  uId: string;
  name: string;
  label: ProjectType;
  type: VelozProjectOption;
  download_link: string;
  description: string;
  status: "done" | "failed" | "pending";
  fineTunedStackName: FineTunedStacksName | string;
  tech_stacks: {
    category: TechStackCategory;
    name: string;
    key: string;
    technology: string;
  }[];
  env_id: string | null;
  createdAt?: Date;
}

const stackSchema = new Schema({
  name: { type: String, required: true },
  key: { type: String, required: true },
  category: { type: String, required: true },
  technology: { type: String, required: true },
});

const projectSchema = new Schema<IProject>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    label: { type: String, required: true },
    type: { type: String, required: true, default: "Refined" },
    download_link: { type: String, required: false, default: null },
    description: { type: String, required: false, default: "" },
    status: { type: String, required: true, default: "pending" },
    tech_stacks: [stackSchema],
    fineTunedStackName: { type: String, required: false, default: null },
    env_id: { type: String, required: false, default: null },
  },
  {
    versionKey: false,
  }
);

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;
