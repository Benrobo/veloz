import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";

class ProjectService {
  async getProjects(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
  }

  async createProject(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
  }
}

export default new ProjectService();
