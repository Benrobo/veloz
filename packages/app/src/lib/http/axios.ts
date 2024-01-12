import SITE_CONFIG from "@/config/site";
import axios from "axios";

// api url
const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : SITE_CONFIG.domain;

// custom axios instance with necessary details
const $axios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default $axios;
