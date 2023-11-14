import { NextApiRequest, NextApiResponse } from "next";
import { Secret, User } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";
import { createProjectPayload } from "@/types";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createProjectSchema } from "../lib/validationSchema";
import { ProjectLabels } from "@veloz/shared/data/project";
import _checkRefinedStackCombo from "../lib/checkStackCombo";
import {
  _checkRefinedStackAvailability,
  _isUserEligibleForStack,
} from "@veloz/shared/utils";
import mongoose from "mongoose";

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

    const randLabel =
      ProjectLabels[Math.floor(Math.random() * ProjectLabels.length)];
    const validLabel = ProjectLabels.find((l) => l === label)
      ? label
      : randLabel;

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
    }
    if (type === "FineTuned") {
    } else {
    }

    console.log({ env_id });
    res.json({ msg: "ok" });
  }
}

export default new ProjectService();
