import { z as zod } from "zod";

export const addTemplateCollaboratorSchema = zod.object({
  templates: zod.array(zod.string()).nonempty(),
  collaborators: zod.array(zod.string()).nonempty(),
});
