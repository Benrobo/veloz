import $axios from "./axios";

export const getUser = async () => {
  const req = await $axios.get("/api/user");
  return req.data;
};

export const createSecret = async (payload: any) => {
  const req = await $axios.post("/api/secret", payload);
  return req.data;
};

export const getSecrets = async () => {
  const req = await $axios.get("/api/secret");
  return req.data;
};
