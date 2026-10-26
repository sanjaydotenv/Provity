import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { resgisterValidator } from "../validators/auth.validator.js";
import passport from "../config/passport.js";
import { _config } from "../config/config.js";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { authentication } from "../middlewares/authentication.middleware.js";

const route = Router();

route.post(
  "/register",
  resgisterValidator,
  authController.userRegisterController,
);
route.post("/verify-email", authController.emailVerifictionController);
route.post("/login", authController.userLoginController);
route.get("/get-me" , authentication ,authController.getMeController)
route.post("/refresh-token" , authController.refreshAccessTokenViaRefresToken)

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
    failureRedirect: "http://localhost:5173/auth/login",
  }),

  async (req, res) => {
    try {
      const user = req.user;
      const Email = user.emails[0].value;

      let isUserExist = await userModel.findOne({ Email });

      // Handle Signup
      if (!isUserExist) {
        isUserExist = await userModel.create({
          UserName: user.displayName,
          Email,
          googleId: user.id,
        });
      }

      // Generate JWT
      const refreshToken = jwt.sign(
        { id: isUserExist._id },
        _config.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );

      // Store JWT in an HttpOnly cookie
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 10000,
        path: "/",
      });

      // Redirect to frontend
      return res.redirect("http://localhost:5173/dashboard");
    } catch (error) {
      console.error("Google OAuth error:", error);

      return res.redirect(
        "http://localhost:5173/login?error=google_auth_failed",
      );
    }
  },
);

export default route;
