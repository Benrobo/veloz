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
  name: zod.string(),
  deleteEnv: zod.array(
    zod
      .object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
      .optional()
  ),
  updateEnv: zod.array(
    zod
      .object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
      .optional()
  ),
  createEnv: zod.array(
    zod
      .object({
        id: zod.any(),
        name: zod.string(),
        value: zod.string(),
      })
      .optional()
  ),
});
