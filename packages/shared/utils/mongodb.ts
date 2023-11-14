import { connect } from "mongoose";

export async function connectDB(MONGO_DB_URL: string) {
  try {
    await connect(MONGO_DB_URL, {});
  } catch (e: any) {
    console.log(`Error connecting to mongodb: ${e?.message}`);
  }
}
