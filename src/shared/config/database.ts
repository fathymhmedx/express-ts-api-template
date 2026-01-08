import mongoose from "mongoose";
import { env } from "../config/env.js";

export const connectDB = async (): Promise<void> => {
  try {
    const dbUri = env.DB_URI.replace("<db_password>", env.DB_PASS);
    await mongoose.connect(dbUri);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
