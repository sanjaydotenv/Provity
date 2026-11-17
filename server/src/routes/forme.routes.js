import express from "express";
import formeController from "../controllers/forme.controller.js";
import { authentication } from "../middlewares/authentication.middleware.js";

const router = express.Router();

router.post(
  "/create",
  authentication,
  formeController.createHabit
);

router.get(
  "/get-all-habits",
  authentication,
  formeController.getAllHabit
);

export default router;