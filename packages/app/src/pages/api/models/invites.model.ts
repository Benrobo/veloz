import { Schema, model, models } from "mongoose";

// keep track of user invitation either to
interface InvitesType {
  uId: string;
  repo_name: string | null;
  template_name: string | null;
  type: string;
  createdAt?: Date;
}

const InvitesSchema = new Schema<InvitesType>(
  {
    uId: { type: String, required: true },
    repo_name: { type: String, required: false, default: null },
    template_name: { type: String, required: false, default: null },
    type: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const Invites = models.Invites || model<InvitesType>("Invites", InvitesSchema);

export default Invites;
