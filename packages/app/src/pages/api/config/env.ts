const env = {
  MONGO_DB_URL:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL_URL
      : process.env.MONGODB_PROD_URL,
};

export default env;
