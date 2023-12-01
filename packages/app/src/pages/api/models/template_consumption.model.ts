import { Schema, model, models } from "mongoose";

interface ITemplateConsumption {
  uId: string;
  name: string;
  used_count: number;
  createdAt?: Date;
}

// keep track of template consumption by users
const templateConsumptionSchema = new Schema<ITemplateConsumption>(
  {
    uId: { type: String, required: true },
    name: { type: String, required: true },
    used_count: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const TemplateConsumption =
  models.TemplateConsumption ||
  model<ITemplateConsumption>("TemplateConsumption", templateConsumptionSchema);

export default TemplateConsumption;
