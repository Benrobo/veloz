import { FINE_TUNED_STACKS } from "@/data/stack";
import axios from "axios";

// check if github access token is valid
export async function _checkGhTokenValidity(token: String) {
  try {
    const resp = await axios.get(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const data = resp.data;

    console.log(`🚧 [GH TOKEN VALIDITY]`, data?.message);

    const validStatus = [200, 201, 204];
    if (!validStatus.includes(resp.status)) return false;
    return true;
  } catch (e: any) {
    console.log(
      `❌ [GH TOKEN VALIDITY]`,
      `Error ${e?.response?.data?.message ?? e?.message}`
    );
    return false;
  }
}

// refresh access token
export async function _refreshGhToken(
  refreshToken: string,
  client_id: string,
  client_secret: string
) {
  type Response = {
    success: boolean;
    message: string;
    data: {
      accToken: string;
      refToken: string;
    } | null;
  };

  let response: Response = {
    success: false,
    message: "",
    data: null,
  };
  try {
    const url = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&refresh_token=${refreshToken}&grant_type=refresh_token`;
    const resp = await axios.post(url);
    const data = resp.data;

    if (data.includes("error")) {
      const [_, desc] = data.split("&");
      const errorDesc = desc.split("=")[1].replaceAll("+", " ");
      response.message = errorDesc;
      console.log(`❌ Error refreshing access token: ${errorDesc}`);
      return response;
    }

    const [accToken, _accExp, refToken, _refExp, _, _null] = data.split("&");

    const _accToken = accToken.split("=")[1];
    const _refToken = refToken.split("=")[1];

    response.success = true;
    response.message = "Github token refreshed successfully";
    response.data = {
      accToken: _accToken,
      refToken: _refToken,
    };
    return response;
  } catch (e: any) {
    console.log(`❌ Error refreshing access token: ${e?.message}`);
    response.message = e.message;
    response.success = false;
    return response;
  }
}

export const _checkFineTunedStackAvailability = (name: string) => {
  const stack = FINE_TUNED_STACKS.find((stack) => stack.name === name);
  if (!stack) return false;
  return stack.available;
};

// format: Thu, 11 Jan 2024
export const hasDiscountExpired = (expiry: string) => {
  const expiryDate = new Date(expiry);
  const today = new Date();
  return {
    expired: expiryDate < today,
    timeleft: expiryDate.getTime(),
  };
};
