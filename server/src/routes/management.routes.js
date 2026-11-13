import { Router } from "express";
import managementController from "../controllers/management.controller.js"
import { authentication } from "../middlewares/authentication.middleware.js";

const route = Router();

route.post("/create-plan", authentication ,managementController.createPlanController)

route.get("/get-plan", authentication ,managementController.getPlanController)

route.get("/get-all-plans", authentication ,managementController.getAllPlanController)

route.post("/save-plan-tasks/:planId", authentication ,managementController.savePlanTasksController)

route.get("/getPlan-tasks/:planId" , authentication , managementController.getPlanTasksController)

route.patch("/plan-task-completed", authentication, managementController.PlanTaskCompletedController);
export default route