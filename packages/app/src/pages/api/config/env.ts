const env = {
  MONGO_DB_URL:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL_URL
      : process.env.MONGODB_PROD_URL,
  CLERK_WH_SECRET: process.env.CLERK_WH_SECRET,
  BASE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://veloz.dev",
};

export default env;
