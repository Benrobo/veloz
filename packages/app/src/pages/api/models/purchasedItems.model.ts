import { Schema, model, models } from "mongoose";

// keep track of user purchased items
interface PurchasedItemType {
  uId: string;
  temp_id: string;
  template_name: string | null;
  ref: string;
  createdAt?: Date;
}

const PurchasedItemSchema = new Schema<PurchasedItemType>(
  {
    uId: { type: String, required: true },
    temp_id: { type: String, required: true },
    ref: { type: String, required: false, default: null },
    template_name: { type: String, required: false, default: null },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const PurchasedItems =
  models.PurchasedItems ||
  model<PurchasedItemType>("PurchasedItems", PurchasedItemSchema);

export default PurchasedItems;
