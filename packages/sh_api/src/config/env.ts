import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const sh_env = {
  MONGO_DB_URL:
    process.env.NODE_ENV === "development"
      ? process.env.MONGODB_LOCAL_URL
      : process.env.MONGODB_PROD_URL,
};

export default sh_env;
