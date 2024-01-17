import SITE_CONFIG from "@/config/site";

const env = {
  BASE_URL:
    process.env.SERVER_ENV === "development"
      ? "http://localhost:5542"
      : SITE_CONFIG.domain,
  LEMONSQUEEZY_WEBHOOK_SECRET: process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
};

export default env;
