import SITE_CONFIG from "@/config/site";

const env = {
  BASE_URL:
    process.env.SERVER_ENV === "development"
      ? "http://localhost:5542"
      : SITE_CONFIG.domain,
};

export default env;
