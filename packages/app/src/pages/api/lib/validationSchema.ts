import { ProjectLabels } from "@data/project";
import { STACK_CATEGORIES } from "@data/stack";
import { z as zod } from "zod";

// validate creating secrets

export const createSecretSchema = zod.object({
  name: zod.string(),
  secrets: zod.array(
    zod.object({
      // id: zod.any(),
      name: zod.string(),
      value: zod.string(),
    })
  ),
});

export const updateSecretSchema = zod.object({
  id: zod.string(),
  deleteEnv: zod
    .array(
      zod.object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
    )
    .optional(),
  updateEnv: zod
    .array(
      zod.object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
    )
    .optional(),
  createEnv: zod
    .array(
      zod.object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
    )
    .optional(),
});

// create project validator
const categorySchema = zod.enum(STACK_CATEGORIES as any);

const stackInfoSchema = zod
  .object({
    stack: zod.string(),
    name: zod.string(),
    category: categorySchema,
  })
  .optional();

export const createProjectSchema = zod.object({
  name: zod.string(),
  description: zod.string(),
  type: zod.enum(["Refined", "Fine-Tuned"]),
  label: zod.enum(ProjectLabels as any).optional(),
  env_id: zod.string().optional(),
  fineTunedStackName: zod.string().optional(),
  tech_stacks: zod.object({
    frontend: stackInfoSchema,
    codebase_acrhitecture: stackInfoSchema,
    design_system: stackInfoSchema,
    backend: stackInfoSchema,
    database: stackInfoSchema,
    payment: stackInfoSchema,
    mailing: stackInfoSchema,
    authentication: stackInfoSchema,
  }),
});
