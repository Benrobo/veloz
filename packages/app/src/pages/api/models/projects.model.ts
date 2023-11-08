import { Schema, model } from "mongoose";
import { connectDB } from "../lib/utils";
import {
  ProjectType,
  TechStackCategory,
  TechStackPricingPlan,
  VelozProjectType,
} from "@veloz/shared/types";
import { TechPricingPlans } from "@veloz/shared/data/project";

// 1. Create an interface representing a document in MongoDB.
interface IProject {
  name: string;
  label: ProjectType;
  download_link: string;
  description: string;
  status: "done" | "failed" | "pending";
  stacks: {
    title: TechStackCategory;
    stacks: string[];
  }[];
  env: string | null;
  createdAt?: Date;
}

const stackSchema = new Schema({
  title: { type: String, required: true },
  stacks: { type: Array, required: true },
});

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    label: { type: String, required: true },
    download_link: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true, default: "pending" },
    stacks: [stackSchema],
    env: { type: String, required: true, default: null },
  },
  {
    versionKey: false,
  }
);

const Project = model<IProject>("Project", projectSchema);

export default Project;

// connect to db
connectDB();
