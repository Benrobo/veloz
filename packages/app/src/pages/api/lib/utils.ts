import { connect } from "mongoose";
import env from "../config/env";

export async function connectDB() {
  try {
    await connect(env.MONGO_DB_URL as string, {});
  } catch (e: any) {
    console.log(`Error connecting to mongodb: ${e?.message}`);
  }
}
