import planModel from "../models/plan.model.js";
import planTaskModel from "../models/planTasks.model.js";

const createPlanController = async (req, res) => {
  const { title, description, duration, startDate, endDate } = req.body;

  const plan = await planModel.create({
    title,
    description,
    duration,
    startDate,
    endDate,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Plan Created Successfully",
    plan,
  });
};



export default { createPlanController };
