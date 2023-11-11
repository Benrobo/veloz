import { NextApiRequest, NextApiResponse } from "next";
import { Secret } from "../models";
import sendResponse from "../lib/sendResponse";
import { RESPONSE_CODE } from "@veloz/shared";
import nextRouteZodValidation from "../lib/nextRouteZodValidation";
import {
  createSecretSchema,
  updateSecretSchema,
} from "../lib/validationSchema";
import { createSecretSchemaType, updateSecretSchemaType } from "@/types";
import mongoose from "mongoose";

class SecretService {
  async create(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const payload = req.body as createSecretSchemaType;
    await nextRouteZodValidation(createSecretSchema, req, res);

    // check if secret name exists
    const secret = await Secret.findOne({
      uId: userId,
      name: payload?.name,
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

  async deleteSecret(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const { id } = req.query;
    const secret = await Secret.findOne({ uId: userId, _id: id });

    if (!secret) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.SECRET_EXISTS,
        `Secret doesn't exists`,
        400
      );
    }

    await Secret.deleteOne({ uId: userId, _id: id });

    sendResponse.success(res, RESPONSE_CODE.SUCCESS, `Secret deleted`, 200);
  }

  async updateSecret(req: NextApiRequest, res: NextApiResponse) {
    const userId = (req as any)?.user?.id;
    const payload = req.body as updateSecretSchemaType;

    await nextRouteZodValidation(updateSecretSchema, req, res);

    const { deleteEnv, createEnv, updateEnv, id } = payload;

    // check if secret exists
    const secret = await Secret.findOne({ uId: userId, _id: id });
    if (!secret) {
      return sendResponse.error(
        res,
        RESPONSE_CODE.SECRET_EXISTS,
        `Secret notfound`,
        404
      );
    }

    // handle creating
    if (createEnv.length > 0) {
      for (const env of createEnv) {
        await Secret.updateOne(
          { uId: userId, _id: id },
          {
            $push: {
              secrets: {
                name: env.name,
                value: env.value,
              },
            },
          }
        );
      }
    }
    // handle updating
    if (updateEnv.length > 0) {
      for (const env of updateEnv) {
        await Secret.updateOne(
          { uId: userId, _id: id, "secrets._id": env.id },
          {
            $set: {
              "secrets.$.name": env.name,
              "secrets.$.value": env.value,
            },
          }
        );
      }
    }

    // handle deleting
    if (deleteEnv.length > 0) {
      for (const env of deleteEnv) {
        await Secret.updateOne(
          { uId: userId, _id: id },
          {
            $pull: {
              secrets: {
                _id: new mongoose.Types.ObjectId(env.id),
              },
            },
          }
        );
      }
    }

    sendResponse.success(res, RESPONSE_CODE.SUCCESS, `Secret updated`, 200);
  }
}

export default new SecretService();
