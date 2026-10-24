import { Router } from "express";
import flowController from "../controllers/flow.controller.js";
import { flowCreateValidator } from "../validators/auth.validator.js";
import { authentication } from "../middlewares/authentication.middleware.js";

const route = Router();

route.post(
  "/create-flow",
  authentication,
  flowCreateValidator,
  flowController.createFlowController,
);

route.get("/getflow", authentication, flowController.getAllFlowController);

export default route;
