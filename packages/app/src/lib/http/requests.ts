import shortUUID from "short-uuid";
import $axios from "./axios";

export const getUser = async () => {
  const req = await $axios.get(`/api/user?tmp=${shortUUID.generate()}`);
  return req.data;
};

export const getUserSettings = async () => {
  const req = await $axios.get(`/api/user/settings`);
  return req.data;
};

// get kit last updated date
export const getLastUpdated = async (name: string) => {
  const req = await $axios.get(`/api/github/last_commit?template=${name}`);
  return req.data;
};

export const getKitConsumption = async (name: string) => {
  const req = await $axios.get(`/api/kit/consumption?template=${name}`);
  return req.data;
};

// rotate veloz token
export const rotateToken = async () => {
  const req = await $axios.patch(`/api/user/rotate_token`);
  return req.data;
};

// create checkout
export const createCheckout = async (template_id: string) => {
  const req = await $axios.get(`/api/kit/checkout?template_id=${template_id}`);
  return req.data;
};

// get all templates
export const getKits = async () => {
  const req = await $axios.get(`/api/kit`);
  return req.data;
};
