import $axios from "./axios";

export const getUser = async () => {
  const req = await $axios.get("/api/user");
  return req.data;
};

export const getProjects = async () => {
  const req = await $axios.get(`/api/project`);
  return req.data;
};

export const getUserSettings = async () => {
  const req = await $axios.get(`/api/user/settings`);
  return req.data;
};

// get template last updated date
export const getLastUpdated = async (name: string) => {
  const req = await $axios.get(`/api/github/last_commit?template=${name}`);
  return req.data;
};

export const getTemplateConsumption = async (name: string) => {
  const req = await $axios.get(`/api/template/consumption?template=${name}`);
  return req.data;
};

// rotate veloz token
export const rotateToken = async () => {
  const req = await $axios.patch(`/api/user/rotate_token`);
  return req.data;
};
