import "module-alias/register";
import express, { Request, Response } from "express";
import generateProject from "@services/generateProject";
// import generateProjectService from "@services/";
const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  await generateProject.test(req, res);
});

export default router;
