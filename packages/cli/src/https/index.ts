import axios from "axios";
import storage from "../config/storage.js";

// const BASE_URL = `http://localhost:5542/api`;
const BASE_URL = `https://tryveloz.com/api`;

const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-veloz-token": storage.get("@veloz_token") ?? "",
  },
});

export const authenticate = async (token: string) => {
  try {
    $http.defaults.headers["x-veloz-token"] = token;
    const resp = await $http.post(`/user/cliAuth`, {
      headers: {
        "x-veloz-token": token,
      },
    });
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const inviteToRepo = async (name: string) => {
  try {
    const resp = await $http.post(`/kit/cli/invite`, {
      kit_name: name,
    });
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data?.message ?? { message: e.message };
  }
};

export const getKitDetails = async (name: string) => {
  try {
    const resp = await $http.get(`/kit/cli/${name}`);
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

// store kit consumption
export const storeKitsConsumption = async (name: string) => {
  try {
    const resp = await $http.patch(`/kit/consumption/store?template=${name}`);
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};
