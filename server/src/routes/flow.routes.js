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

route.get("/get-flow", authentication, flowController.getAllFlowController);

route.get(
  "/getflow/:id/details",
  authentication,
  flowController.getOneFlowController,
);

route.get("/get-dayWise" , authentication , flowController.getDayWiseData)

export default route;
