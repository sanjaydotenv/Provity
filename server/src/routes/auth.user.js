import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { resgisterValidator } from "../validators/auth.validator.js";
import passport from "../config/passport.js";
import { _config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken"

const route = Router();

route.post(
  "/register",
  resgisterValidator,
  authController.userRegisterController,
);
route.post("/verify-email", authController.emailVerifictionController);
route.post("/login", authController.userLoginController);

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),

  async (req,res) => {
    const user = req.user;
    const Email = user.emails[0].value;

    const isUserExist = await userModel.findOne({ Email });

    // ––––––––––– Handle the Login –––––––––––
    if (isUserExist) {
      const token = jwt.sign({ id: isUserExist._id }, _config.JWT_ACCESS_SECRET, {
        expiresIn: "15m",
      });
      return res.status(200).json({ token });
    }

    // ––––––––––– Handle the Signup –––––––––––
    const newUser = await userModel.create({
      UserName: user.displayName,
      Email,
      googleId: user.id,
    });

    const token = jwt.sign({ id: newUser._id }, _config.JWT_ACCESS_SECRET, {
      expiresIn: "15m",
    });

    return res.status(201).json({ token });
  },
);

export default route;
