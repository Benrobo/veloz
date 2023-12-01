import { NextApiRequest, NextApiResponse } from "next";
import { TemplateConsumption } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared/types";
import { createProjectPayload } from "@/types";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createProjectSchema } from "../lib/validationSchema";
import { ProjectLabels } from "@data/project";
import { _checkFineTunedStackAvailability } from "../lib/utils";
import { isUserEligibleForStack } from "@/lib/utils";
import mongoose from "mongoose";

class TemplateService {}

export default new TemplateService();
