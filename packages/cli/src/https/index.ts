import axios from "axios";
import storage from "../config/storage.js";

const BASE_URL = `http://localhost:3001/api`;

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

export const getProjects = async (name: string) => {
  try {
    const resp = await $http.get(`/template/cli/${name}`);
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};

export const updateProjectStatus = async (status: string, proj_id: string) => {
  try {
    const resp = await $http.patch(
      `/project/cli/status?proj_id=${proj_id}&status=${status}`
    );
    return resp?.data ?? (resp as any)?.response?.data;
  } catch (e: any) {
    return e.response.data ?? { message: e.message };
  }
};
