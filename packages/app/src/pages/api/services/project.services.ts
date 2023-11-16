import { NextApiRequest, NextApiResponse } from "next";
import { Project, Secret, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { createProjectPayload } from "@/types";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createProjectSchema } from "../lib/validationSchema";
import { ProjectLabels } from "@data/project";
import _checkRefinedStackCombo from "../lib/checkStackCombo";
import {
  _checkRefinedStackAvailability,
  _isUserEligibleForStack,
} from "@/lib/utils";
import mongoose from "mongoose";

class ProjectService {
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const projects = await Project.find({
      uId: userId,
    });

    const _projects = [];
    let secrets = "";

    for (const proj of projects) {
      const _envId = proj.env_id;
      if (_envId) {
        const env = await Secret.findOne({
          uId: userId,
          _id: new mongoose.Types.ObjectId(proj.env_id),
        });
        for (const secret of env.secrets) {
          secrets += `${secret.name}='${secret.value}'\n`;
        }
      }

      _projects.push({
        ...proj._doc,
        secrets,
      });
    }

    sendResponse.success(
      res,
      RESPONSE_CODE.PROJECTS,
      projects.length > 0 ? `Projects` : `No projects found`,
      200,
      _projects
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

    const _envId = project.env_id;
    let secrets = "";
    if (_envId) {
      const env = await Secret.findOne({
        uId: userId,
        _id: new mongoose.Types.ObjectId(_envId),
      });
      for (const secret of env.secrets) {
        secrets += `${secret.name}='${secret.value}'\n`;
      }
    }

    sendResponse.success(res, RESPONSE_CODE.PROJECTS, `project`, 200, {
      ...project._doc,
      secrets,
    });
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

    const {
      env_id,
      description,
      fineTunedStackName,
      label,
      name,
      tech_stacks,
      type,
    } = payload;

    // check if env_id exists
    if (env_id) {
      const envExists = await Secret.findOne({
        uId: userId,
        _id: env_id,
      });
      if (!envExists) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.SECRET_NOT_FOUND,
          `Environment variable not found`,
          404
        );
      }
    }

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

    // Refined
    if (type === "Refined") {
      const _isValidCombo = _checkRefinedStackCombo(type, tech_stacks);
      const _stackAvailable = _checkRefinedStackAvailability(tech_stacks);
      const _userEligibleForStack = _isUserEligibleForStack(
        tech_stacks,
        user.proj_plan
      );

      // is stack available
      if (!_stackAvailable) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.STACK_NOT_AVAILABLE,
          `One of the Stack isn't available`,
          404
        );
      }

      // check user eligibility status (if user is not a tester)
      if (!user.isTester) {
        if (!_userEligibleForStack.eligible) {
          return sendResponse.error(
            res,
            RESPONSE_CODE.FORBIDDEN,
            _userEligibleForStack.message,
            403
          );
        }
      }

      // check stack combo
      if (!_isValidCombo) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.INVALID_STACK_COMBO,
          `Invalid stack combo`,
          400
        );
      }

      const validStacks = [];
      for (const [category, stack] of Object.entries(tech_stacks)) {
        validStacks.push({
          category,
          key: stack.stack,
          name: stack.name,
          technology: stack.stack,
        });
      }

      // create the project with pending state
      const project = await Project.create({
        name: formatedProjName,
        description: description || "No description provided",
        label: validLabel,
        type,
        fineTunedStackName: fineTunedStackName || null,
        download_link: "",
        tech_stacks: validStacks,
        uId: userId,
        env_id: env_id || null,
      });

      // get the project id, invoke the api for creating the project
      const projId = project._id;

      return sendResponse.success(
        res,
        RESPONSE_CODE.SUCCESS,
        `Project queued for creation`,
        200
      );
    }
    if (type === "FineTuned") {
      //! this would be a little different from refined
      //! once placed, we simply use user gh-access-token, create a repo, then clone the main repo into the user created repo where the proj resides.
    }
  }
}

export default new ProjectService();
