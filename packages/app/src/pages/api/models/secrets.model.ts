import { Schema, model, models } from "mongoose";
import { connectDB } from "../lib/utils";
import { VelozProjectType } from "@veloz/shared/types";
import { TechPricingPlans } from "@veloz/shared/data/project";

// 1. Create an interface representing a document in MongoDB.
interface ISecrets {
  name: string;
  category: VelozProjectType;
  secrets: {
    id: any;
    name: string;
    value: string;
  }[];
  createdAt?: Date;
}

const secretsSchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const secretSchema = new Schema<ISecrets>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    secrets: [secretsSchema],
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const Secret = models.Secret || model<ISecrets>("Secret", secretSchema);

export default Secret;

// connect to db
connectDB();
