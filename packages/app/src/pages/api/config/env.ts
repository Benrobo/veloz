import SITE_CONFIG from "@/config/site";

const env = {
  BASE_URL:
    process.env.SERVER_ENV === "development"
      ? "http://localhost:3000"
      : SITE_CONFIG.domain,
};

export default env;
