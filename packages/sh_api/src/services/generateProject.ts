import { NextFunction, Request, Response } from "express";
import { User, Project } from "@veloz/shared/models";
import apiPayloadZodValidation from "@/middleware/zodValidator";
import { generateProjectSchema } from "@/utils/zodValidation";
import HttpException from "@/utils/exception";
import { IGenerateProjectDetails, RESPONSE_CODE } from "@veloz/shared";
import mongoose from "mongoose";
import RefinedProjectGenerate from "@/utils/projectHelper/refinedGenerate";

type GeneratePayloadType = {
  proj_id: string;
  user_id: string;
};

class GenerateProject {
  async generate(req: Request, res: Response, next: NextFunction) {
    await apiPayloadZodValidation(generateProjectSchema, req);

    const { proj_id, user_id } = req.body as GeneratePayloadType;

    // check if user and project exists
    const project = await Project.findOne({
      uId: user_id,
      _id: new mongoose.Types.ObjectId(proj_id),
    });

    if (!project) {
      throw new HttpException(
        "project not found",
        RESPONSE_CODE.PROJECT_NOT_FOUND,
        404
      );
    }

    const { type, tech_stacks, name, fineTunedStackName } =
      project as IGenerateProjectDetails;

    if (type === "Refined") {
      new RefinedProjectGenerate(tech_stacks, name);
    }
    if (type === "FineTuned") {
    }
  }
}

export default new GenerateProject();
