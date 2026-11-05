import { Router } from "express";
import managementController from "../controllers/management.controller.js"

const route = Router();

route.post("/create-plan", managementController.createPlanController)

export default route