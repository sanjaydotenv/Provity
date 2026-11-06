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

const savePlanTasksController = async (req, res) => {
  try {
    const { planId } = req.params;
    const { tasks } = req.body;

    const plan = await planModel.findOne({
      _id: planId,
      user: req.user.id,
    });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    if (!Array.isArray(tasks) || tasks.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tasks must be a non-empty array",
      });
    }

    const operations = tasks.map((task) => ({
      updateOne: {
        filter: {
          plan: planId,
          user: req.user.id,
          dayNumber: task.dayNumber,
        },

        update: {
          $set: {
            title: task.title,
            description: task.description || "",
            priority: task.priority || "Medium",
          },
        },

        upsert: true,
      },
    }));

    const result = await planTaskModel.bulkWrite(operations);

    return res.status(200).json({
      success: true,
      message: "Plan tasks saved successfully",
      result,
    });
  } catch (error) {
    console.log("Save Plan Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default {
  createPlanController,
  getPlanController,
  savePlanTasksController,
};
