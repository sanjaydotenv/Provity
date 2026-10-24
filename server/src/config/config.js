import "dotenv/config";
import AppError from "../utils/app.error.js";

if (!process.env.PORT) {
  throw new AppError("PORT is missing in environment variables");
}

if (!process.env.MONGO_URI) {
  throw new AppError("PORT is missing in environment variables");
}

export const _config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  USER_EMAIL: process.env.USER_EMAIL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID_OAUTH: process.env.GOOGLE_CLIENT_ID_OAUTH,
  GOOGLE_CLIENT_SECRET_OAUTH: process.env.GOOGLE_CLIENT_SECRET_OAUTH,
  GOOGLE_CLIENT_CALLBACK_OAUTH: process.env.GOOGLE_CLIENT_CALLBACK_OAUTH,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};
