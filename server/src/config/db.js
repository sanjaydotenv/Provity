import mongoose from "mongoose";
import { _config } from "./config.js";

const connectDB = async () => {
  try {
    const response = await mongoose.connect(_config.MONGO_URI);
    console.log(`Data Base Connected Successfully ${response.connection.host}`);
  } catch (error) {
    console.log(`Error while connecting data base ${error.mesaage}`);
    throw error;
  }
};

export default connectDB;
