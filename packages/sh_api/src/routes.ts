import express, { Request, Response } from "express";
import generateProjectService from "services/generateProject";
const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  await generateProjectService.test(req, res);
});

export default router;
