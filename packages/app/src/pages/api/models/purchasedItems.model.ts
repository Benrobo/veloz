import { Schema, model, models } from "mongoose";

// keep track of user purchased items
interface PurchasedItemType {
  uId: string;
  temp_id: string;
  template_name: string | null;
  order_id: string | null;
  payment_status: string | null;
  payment_amount: number | null;
  user_name: string | null;
  user_email: string | null;
  product_id: string | null;
  variant_id: string | null;
  createdAt?: Date;
}

const PurchasedItemSchema = new Schema<PurchasedItemType>(
  {
    temp_id: { type: String, required: true },
    template_name: { type: String, required: true, default: null },
    user_email: { type: String, required: true, default: null },
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
