import { NextApiRequest, NextApiResponse } from "next";
import { Secret, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";
import { createProjectPayload } from "@/types";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createProjectSchema } from "../lib/validationSchema";
import { ProjectLabels } from "@veloz/shared/data/project";
import _checkRefinedStackCombo from "../lib/checkStackCombo";
import { _checkRefinedStackAvailability } from "@veloz/shared/utils";

class ProjectService {
  async getProjects(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
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

    const randLabel =
      ProjectLabels[Math.floor(Math.random() * ProjectLabels.length)];
    const validLabel = ProjectLabels.find((l) => l === label)
      ? label
      : randLabel;

    // Refined
    if (type === "Refined") {
      const isValid = _checkRefinedStackCombo(type, tech_stacks);
      const _stackAvailable = _checkRefinedStackAvailability(tech_stacks);

      if (!_stackAvailable) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.STACK_NOT_AVAILABLE,
          `One of the Stack isn't available`,
          404
        );
      }

      if (!isValid) {
        return sendResponse.error(
          res,
          RESPONSE_CODE.INVALID_STACK_COMBO,
          `Invalid stack combo`,
          400
        );
      }
    }
    if (type === "FineTuned") {
    } else {
    }

    console.log({ env_id });
    res.json({ msg: "ok" });
  }
}

export default new ProjectService();
