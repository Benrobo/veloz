import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import { isAuthenticated } from "../middlewares/auth";
import projectServices from "../services/project.services";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return projectServices.createProject(req, res);
  }
}

export default CatchError(isAuthenticated(handler));
