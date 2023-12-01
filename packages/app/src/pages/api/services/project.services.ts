import { NextApiRequest, NextApiResponse } from "next";
import { Project, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { createProjectPayload } from "@/types";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createProjectSchema } from "../lib/validationSchema";
import { ProjectLabels } from "@data/project";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import { isUserEligibleForStack } from "@/lib/utils";
import mongoose from "mongoose";

class ProjectService {
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const projects = await Project.find({
      uId: userId,
    });

    sendResponse.success(
      res,
      RESPONSE_CODE.PROJECTS,
      projects.length > 0 ? `Projects` : `No projects found`,
      200,
      projects
    );
  }

  // retrieve needed info for cli
  async getCliProjByName(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const proj_name = req.query["proj_name"];
    const project = await Project.findOne({
      uId: userId,
      name: proj_name,
    });

    if (!project) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.PROJECT_NOT_FOUND,
        `No projects found with this name.`,
        404
      );
    }

    const user = await User.findOne({
      uId: userId,
    });

    sendResponse.success(res, RESPONSE_CODE.PROJECTS, `project`, 200, {
      ...project._doc,
      userData: {
        id: user.uId,
        username: user.name,
      },
    });
  }

  async cliAuth(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    sendResponse.success(
      res,
      RESPONSE_CODE.SUCCESS,
      `Successfully authenticated`,
      200,
      {
        user_id: userId,
      }
    );
  }

  async updateStatus(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const { status, proj_id } = req.query;

    const project = await Project.findOne({
      uId: userId,
      _id: new mongoose.Types.ObjectId(proj_id as string),
    });

    if (!project) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.PROJECT_NOT_FOUND,
        `Project not found`,
        404
      );
    }

    const validStatus = ["pending", "failed", "done"];
    const _projStatus = validStatus.includes(status as string)
      ? status
      : "pending";

    // update the project status
    await Project.updateOne(
      {
        uId: userId,
        _id: proj_id,
      },
      {
        status: _projStatus,
      }
    );

    return sendResponse.error(
      res,
      RESPONSE_CODE.SUCCESS,
      `Project status updated`,
      200
    );
  }

  async createProject(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const payload: createProjectPayload = req.body;

    const _successfull_validated = nextRouteZodValidation(
      createProjectSchema,
      req,
      res
    );

    if (!_successfull_validated) return;

    const user = await User.findOne({
      uId: userId,
    });

    const { description, fineTunedStackName, label, name, type } = payload;

    // check if project name exists
    const formatedProjName = name.toLowerCase().replace(/\s/g, "-");
    const projectExists = await Project.findOne({
      uId: userId,
      name: formatedProjName,
    });

    if (projectExists) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.SECRET_EXISTS,
        `Project with this name already exists`,
        400
      );
    }

    const randLabel =
      ProjectLabels[Math.floor(Math.random() * ProjectLabels.length)];
    const validLabel = ProjectLabels.includes(label) ? label : randLabel;

    if (type === "FineTuned") {
      const _stackAvailable =
        _checkFineTunedStackAvailability(fineTunedStackName);

      if (!_stackAvailable) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.STACK_NOT_AVAILABLE,
          `Stack not available`,
          400
        );
      }

      // check user eligibility status (if user is not a tester)
      if (!user.isTester) {
        if (!isUserEligibleForStack(fineTunedStackName, user.proj_plan)) {
          return sendResponse.error(
            res,
            RESPONSE_CODE.FORBIDDEN,
            `You are not eligible for this stack`,
            403
          );
        }
      }

      // create project
      await Project.create({
        uId: userId,
        name: formatedProjName,
        description,
        label: validLabel,
        type,
        fineTunedStackName,
      });

      sendResponse.success(res, RESPONSE_CODE.SUCCESS, `Project created`, 200);

      // invite github to fine-tuned github repo
    }
  }
}

export default new ProjectService();
