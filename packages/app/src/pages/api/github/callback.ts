import { NextApiRequest, NextApiResponse } from "next";
import CatchError from "../lib/error";
import axios from "axios";
import { isAuthenticated } from "../middlewares/auth";
import { User } from "../models";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // get access / refresh token
    try {
      const response = await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GH_CLIENT_ID,
          client_secret: process.env.GH_CLIENT_SECRET,
          code: req.query.code,
        }
      );

      const data = response.data;

      if (data.includes("error")) {
        const [_, desc] = data.split("&");
        const errorDesc = desc.split("=")[1].replaceAll("+", " ");
        return res.status(500).json({
          message: "Error connecting github",
          error: errorDesc,
        });
      }
      const [accToken, _accExp, refToken, _refExp, _, _null] = data.split("&");
      const _accToken = accToken.split("=")[1];
      const _refToken = refToken.split("=")[1];
      const uId = (req as any).user?.id;

      // save access token to db
      await User.updateOne(
        {
          uId,
        },
        {
          $set: {
            gh_acc_token: _accToken,
            gh_ref_token: _refToken,
          },
        }
      );
      console.log(`✅ Github connected!`);
      res.redirect("/settings");
    } catch (e: any) {
      console.log(`❌ Error connecting github: ${e.message}`);
      res.status(500).json({
        message: `Error connecting github: ${e.message}`,
        error: e,
      });
    }
  }
}

export default CatchError(isAuthenticated(handler));
