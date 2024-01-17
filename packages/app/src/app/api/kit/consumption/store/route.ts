import { NextApiRequest } from "next";
import CatchError from "../../../lib/_error";
import { isCliAuth } from "../../../middlewares/auth";
import kitService from "../../../services/kit.services";

export const PATCH = CatchError(
  isCliAuth(
    async (req: NextApiRequest) => await kitService.storeKitsConsumption(req)
  )
);
