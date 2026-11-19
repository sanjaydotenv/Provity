import { Router } from "express";
import manageController from "../controllers/manage.controller.js";
import { authentication } from "../middlewares/authentication.middleware.js";

const route = Router();

route.post(
  "/add-handle",
  authentication,
  manageController.createHandleController,
);

route.get(
  "/get-all-handles",
  authentication,
  manageController.getAllHandleController,
);

export default route;
