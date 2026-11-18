import mongoose from "mongoose";
import planModel from "../models/plan.model.js";
import planTaskModel from "../models/planTasks.model.js";
import AppError from "../utils/app.error.js";

const createPlanController = async (req, res) => {
  const allPlans = await planModel.find();

  const result = await allPlans.some((plan) => {
    return plan.status === "Active";
  });

  if (result) {
    return res.status(409).json({
      message: "You already have an active plan.",
    });
  }

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
  const plan = await planModel.findOne({
    user: req.user.id,
    _id: req.params.planId,
  });

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

const getAllPlanController = async (req, res) => {
  try {
    const plans = await planModel
      .find({ user: req.user.id })
      .sort({ _id: -1 })
      .lean();

    const taskStats = await planTaskModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
        },
      },
      {
        $group: {
          _id: "$plan",

          totalTasks: {
            $sum: 1,
          },

          completedTasks: {
            $sum: {
              $cond: ["$isDone", 1, 0],
            },
          },
        },
      },
    ]);

    const updatedPlans = plans.map((plan) => {
      const stats = taskStats.find(
        (task) => task._id.toString() === plan._id.toString(),
      );

      const totalTasks = stats?.totalTasks || 0;
      const completedTasks = stats?.completedTasks || 0;

      const allTasksCompleted = totalTasks > 0 && totalTasks === completedTasks;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endDate = new Date(plan.endDate);
      endDate.setHours(0, 0, 0, 0);

      let status;

      if (allTasksCompleted) {
        status = "completed";
      } else if (endDate < today) {
        status = "Expired";
      } else {
        status = "Active";
      }

      return {
        ...plan,
        status,
        totalTasks,
        completedTasks,
        pendingTasks: totalTasks - completedTasks,
      };
    });

    res.status(200).json({
      success: true,
      message: "Plans retrieved successfully",
      plans: updatedPlans,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to retrieve plans",
    });
  }
};

const getPlanTasksController = async (req, res) => {
  const planId = req.params.planId;

  if (!planId) {
    throw new AppError(404, "PlanId is not found");
  }

  const Plan = await planModel.findById(planId);

  if (!Plan) {
    throw new AppError("Plan not found Invalid Credentials");
  }

  const data = await planModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(planId),
      },
    },
    {
      $lookup: {
        from: "plantasks",
        localField: "_id",
        foreignField: "plan",
        as: "Tasks",
      },
    },
  ]);

  res.status(200).json({
    message: "Plan all Tasks fetched",
    tasks: data,
  });
};

const PlanTaskCompletedController = async (req, res) => {
  const { planId, taskId } = req.body;

  console.log(req.body);

  const plan = await planModel.findById(planId);

  if (!plan) {
    throw new AppError(404, "Plan not found");
  }

  const task = await planTaskModel.findOneAndUpdate(
    {
      _id: taskId,
      plan: planId,
    },
    { $set: { isDone: true } },
    { new: true },
  );

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  res.status(200).json({
    message: "Task marked as completed",
    task,
  });
};

export default {
  createPlanController,
  getPlanController,
  getAllPlanController,
  savePlanTasksController,
  getPlanTasksController,
  PlanTaskCompletedController,
};
