import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/Tourism-app";
export async function connectDB() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info("db connected");
  } catch (e) {
    logger.error("couldn't  connect DB ", e);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await mongoose.connection.close();
  logger.info("DB connection closed");
  process.exit(0);
}
