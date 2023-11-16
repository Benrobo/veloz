import axios from "axios";
import storage from "../config/storage.js";

const BASE_URL = `http://localhost:3000/api`;

const $http = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-veloz-token": storage.get("@veloz_token"),
  },
});

export const authenticate = async (token: string) => {
  try {
    const resp = await $http.post(`/project/cli/auth`, {
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
  const resp = await $http.get(`/project/cli/${name}`);
  return resp.data;
};
