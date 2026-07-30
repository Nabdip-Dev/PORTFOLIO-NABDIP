import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI from environment variables.
 * Exits the process on failure since the app cannot function without a DB.
 */
export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("[db] MONGO_URI is not set in the environment.");
    process.exit(1);
  }

  mongoose.set("strictQuery", true);

  mongoose.connection.on("connected", () => {
    console.log("[db] MongoDB connected");
  });

  mongoose.connection.on("error", (err) => {
    console.error("[db] MongoDB connection error:", err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });

  try {
    await mongoose.connect(uri, {
      // Mongoose 8 no longer needs useNewUrlParser/useUnifiedTopology,
      // kept here as documentation of intent, not required options.
      autoIndex: process.env.NODE_ENV !== "production",
    });
  } catch (err) {
    console.error("[db] Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
}

export default connectDB;
