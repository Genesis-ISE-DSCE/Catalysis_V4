import mongoose from "mongoose";

let cachedConnection: mongoose.Connection | null = null;

export async function dbConnect(): Promise<mongoose.Connection> {
  if (cachedConnection) return cachedConnection;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Please define MONGODB_URI in .env.local");

  try {
    const db = await mongoose.connect(uri);
    cachedConnection = db.connection;
    return cachedConnection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}