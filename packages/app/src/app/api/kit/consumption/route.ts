import CatchError from "../../lib/_error";
import kitService from "../../services/kit.services";
import { NextRequest } from "next/server";

export const GET = CatchError(
  async (req: NextRequest) => await kitService.getKitConsumption(req)
);
