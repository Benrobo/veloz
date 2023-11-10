import { z as zod } from "zod";

// validate creating secrets
enum CategoryEnum {
  frontend = "frontend",
  backend = "backend",
}
export const createSecretSchema = zod.object({
  name: zod.string(),
  category: zod.nativeEnum(CategoryEnum, {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case "invalid_type":
          return { message: "Invalid category" };
        case "invalid_enum_value":
          return { message: "Invalid category" };
        default:
          return { message: "Invalid category" };
      }
    },
  }),
  secrets: zod.array(
    zod.object({
      // id: zod.any(),
      name: zod.string(),
      value: zod.string(),
    })
  ),
});
