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

const getPlanController = async (req, res) => {
  const plan = await planModel.findOne({ user: req.user.id });

  if (!plan) {
    return res.status(404).json({
      message: "Plan not found",
    });
  }

  res.status(200).json({
    message: "Plan found",
    plan,
  });
};

export default { createPlanController, getPlanController };
