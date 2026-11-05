import { Router } from "express";
import managementController from "../controllers/management.controller.js"
import { authentication } from "../middlewares/authentication.middleware.js";

const route = Router();

route.post("/create-plan", authentication ,managementController.createPlanController)

export default route