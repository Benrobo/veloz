import { z as zod } from "zod";

export const generateProjectSchema = zod.object({
  proj_id: zod.string({
    required_error: "project id is required",
  }),
  user_id: zod.string({
    required_error: "user id is required",
  }),
});
