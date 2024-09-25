import mongoose from "mongoose"
import dotenv from "dotenv";

// Nạp biến môi trường
dotenv.config();

export const connect = async (): Promise<void> => {
    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("Successfully connected to MongoDB");
    } catch (error) {
        console.error("Connection error:", error);
    }
}