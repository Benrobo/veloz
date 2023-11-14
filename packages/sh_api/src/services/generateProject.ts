import { Request, Response } from "express";

class GenerateProject {
  async test(req: Request, res: Response) {
    res.status(200).json("welcome");
  }
}

export default new GenerateProject();
