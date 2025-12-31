import mongoose from 'mongoose';
export const connectDB = async (): Promise<void> => {
  try {
    const db = process.env.DB_URI?.replace(
      "<db_password>",
      process.env.DB_PASS as string
    );
    if (!db) {
      throw new Error("Database URI is not defined");
    }
    await mongoose.connect(db);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
