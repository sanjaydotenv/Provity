import { _config } from "../config/config.js";
import AppError from "../utils/app.error.js";
import jwt from "jsonwebtoken"

export const authentication = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log(token)

  if (!token) {
    throw new AppError("token is not found", 404);
  }

  let decode = null;
  try {
    decode = jwt.verify(token, _config.JWT_ACCESS_SECRET);
    if (!decode) {
      throw new AppError("Invalid token", 401);
    }

    req.user = decode;
    next();
  } catch (error) {
    console.log(`Error while decoding token ${error.message}`);
    throw new AppError(`Error while decoding token ${error.message}`)
  }
};
