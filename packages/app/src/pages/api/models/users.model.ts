import { Schema, model, models } from "mongoose";
import { connectDB } from "../lib/utils";
import { TechStackPricingPlan } from "@veloz/shared/types";
import { TechPricingPlans } from "@veloz/shared/data/project";

// 1. Create an interface representing a document in MongoDB.
interface IUser {
  name: string;
  email: string;
  avatar: string;
  role: string;
  proj_plan: TechStackPricingPlan;
  hasSubscribed: boolean;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    proj_plan: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    hasSubscribed: { type: Boolean, default: false },
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
