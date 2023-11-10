import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import { createSecretSchema } from "../lib/validationSchema";
import { createSecretSchemaType } from "@/types";

class SecretService {
  async create(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const payload = req.body as createSecretSchemaType;
    await nextRouteZodValidation(createSecretSchema, req, res);

    // check if secret name exists
    const secret = await Secret.findOne({
      uId: userId,
      name: payload?.name,
      category: payload?.category,
    });

    if (secret) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.SECRET_EXISTS,
        `Secret already exists`,
        400
      );
    }

    // sanitize secrets data & create secrets
    const secrets = payload?.secrets?.map((secret) => {
      const key = secret?.name?.replace(/\s+/g, "_").toUpperCase();
      const value = secret?.value?.replace(/\s+/g, "_").toLowerCase();
      return {
        name: key,
        value,
      };
    });

    await Secret.create({
      uId: userId,
      name: payload?.name,
      category: payload?.category,
      secrets: secrets,
    });

    sendResponse.success(
      res,
      RESPONSE_CODE.SECRET_CREATED,
      `Secret created`,
      200
    );
  }

  async getAll(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const secrets = await Secret.find({ uId: userId });
    const formattedSecrets = secrets.map((secret) => {
      return {
        id: secret._id,
        name: secret.name,
        category: secret.category,
        secrets: secret.secrets.map((secret: any) => {
          return {
            id: secret._id,
            name: secret.name,
            value: secret.value,
          };
        }),
      };
    });

    sendResponse.success(
      res,
      RESPONSE_CODE.SECRET_DETAILS,
      `Secret details`,
      200,
      formattedSecrets
    );
  }
}

export default new SecretService();
