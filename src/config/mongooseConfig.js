import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URI;

export const connectMongoose = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully with mongoose");
  } catch (error) {
    console.log("Error while connecting to mongoDB");
    console.log(error);
  }
};
