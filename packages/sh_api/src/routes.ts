// import "module-alias/register";
import express, { Request, RequestHandler, Response } from "express";
import generateProject from "@/services/generateProject";
import apiPayloadZodValidation from "@/middleware/zodValidator";
import { generateProjectSchema } from "@utils/zodValidation";
import { ParamsDictionary } from "express-serve-static-core";
import { CatchError } from "./utils/error";
import { connectDB } from "@veloz/shared/utils/mongodb";
import sh_env from "./config/env";
import GenerateProject from "@/services/generateProject";

const router = express.Router();

connectDB(sh_env.MONGO_DB_URL as string);

router.post(
  "/project/generate",
  CatchError(generateProject.generate.bind(generateProject))
);
// router.post("/project/generate", CatchError(new GenerateProject().generate));

export default router;
