import { Schema, model, models } from "mongoose";
import { connectDB } from "../lib/utils";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { TechPricingPlans } from "@veloz/shared/data/project";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  uId: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  proj_plan: TechStackPricingPlan;
  hasSubscribed: boolean;
  isTester: boolean;
  github_token: string;
  project_config: {
    default_nextjs_router: "APP" | "PAGE";
  };
  createdAt?: Date;
}

enum NextjsRouter {
  APP = "APP",
  PAGE = "PAGE",
}

const projectConfigSchema = new Schema({
  default_nextjs_router: { type: NextjsRouter, required: true, default: "APP" },
});

const userSchema = new Schema<IUser>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    proj_plan: { type: String, default: "FREE_PKG" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    hasSubscribed: { type: Boolean, default: false },
    isTester: { type: Boolean, default: false },
    github_token: { type: String, default: null },
    project_config: projectConfigSchema,
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;

// connect to db
connectDB();
