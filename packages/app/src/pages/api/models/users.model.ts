import { Schema, model, models } from "mongoose";
import { TechStackPricingPlan } from "@veloz/shared/types";

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
  veloz_token: string;
  gh_username: string;
  gh_ref_token: string;
  gh_acc_token: string;
  createdAt?: Date;
}

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
    veloz_token: { type: String, required: true },
    gh_username: { type: String, default: null },
    gh_ref_token: { type: String, default: null },
    gh_acc_token: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;
