import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;
  mongoose
    .connect(mongoURI, {
      dbName: "SWIFT_EVENT_SCHEDULER",
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
};

export default connectDB;
