import { Schema, model, models } from "mongoose";

// keep track of user purchased items
interface PurchasedItemType {
  uId: string;
  temp_id: string;
  template_name: string | null;
  transaction_id: string | null;
  payment_status: string | null;
  payment_amount: number | null;
  user_name: string | null;
  user_email: string | null;
  product_id: string | null;
  createdAt?: Date;
}

const PurchasedItemSchema = new Schema<PurchasedItemType>(
  {
    uId: { type: String, required: true },
    temp_id: { type: String, required: true },
    template_name: { type: String, required: false, default: null },
    transaction_id: { type: String, required: false, default: null },
    payment_status: { type: String, required: false, default: null },
    payment_amount: { type: Number, required: false, default: null },
    user_name: { type: String, required: false, default: null },
    user_email: { type: String, required: false, default: null },
    product_id: { type: String, required: false, default: null },
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
