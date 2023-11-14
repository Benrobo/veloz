// import "module-alias/register";
import express, { Request, Response } from "express";
import generateProject from "@/services/generateProject";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  await generateProject.test(req, res);
});

export default router;
