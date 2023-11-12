import { Schema, model, models } from "mongoose";
import { connectDB } from "../lib/utils";
import {
  ProjectType,
  TechStackCategory,
  TechStackPricingPlan,
  VelozProjectOption,
  VelozProjectType,
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
  tech_stacks: {
    category: TechStackCategory;
    // name: string;
    stack: string;
  }[];
  env_id: string | null;
  createdAt?: Date;
}

const stackSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  stacks: { type: Array, required: true },
});

const projectSchema = new Schema<IProject>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    label: { type: String, required: true },
    type: { type: String, required: true, default: "Refined" },
    download_link: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    tech_stacks: [stackSchema],
    env_id: { type: String, required: true, default: null },
  },
  {
    versionKey: false,
  }
);

const Project = models.Project || model<IProject>("Project", projectSchema);

export default Project;

// connect to db
connectDB();
