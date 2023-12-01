import { Schema, model, models } from "mongoose";

// keep track of the repo name that the user has been invited to.
interface IGHInvite {
  uId: string;
  repo_name: string;
  createdAt?: Date;
}

const ghInviteSchema = new Schema<IGHInvite>(
  {
    uId: { type: String, required: true },
    repo_name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const GHInvite =
  models.GHInvite || model<IGHInvite>("GHInvite", ghInviteSchema);

export default GHInvite;
