import mongoose from "mongoose";
import flowModel from "../models/flow.model.js";
import AppError from "../utils/app.error.js";

const createFlowController = async (req, res) => {
  const { title, description } = req.body;

  const flow = await flowModel.create({
    title,
    description,
    user: req.user.id,
  });

  res.status(201).json({
    message: "flow created successfully",
    flow,
  });
};

const getAllFlowController = async (req, res) => {
  const { id } = req.user;

  const allFlow = await flowModel.find({ user: id });

  return res.status(200).json({
    message: "allflow fetched successfully",
    allFlow,
  });
};

const getOneFlowController = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError("flow ID is not found", 404);
  }

  const flow = await flowModel.findById(id);

  if (!flow) {
    throw new AppError("flow is not found", 404);
  }

  res.status(200).json({
    message: "flow fetched",
    flow,
  });
};

const getDayWiseData = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    // Fixed Starting Date
    const startingDate = new Date("2026-11-01T00:00:00.000+05:30");

    // Get Current Date (IST)
    const today = new Date();

    const todayIST = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(today);

    const [year, month, day] = todayIST.split("-").map(Number);

    // Next Day Midnight (IST converted to UTC)
    const endDate = new Date(
      Date.UTC(year, month - 1, day + 1) - 330 * 60 * 1000
    );

    // Aggregation Pipeline
    const data = await flowModel.aggregate([
      // Stage 1: Filter User Tasks by Date
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: startingDate,
            $lt: endDate,
          },
        },
      },

      // Stage 2: Group Tasks Date Wise
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata",
            },
          },

          totalTasks: {
            $sum: 1,
          },

          completedTasks: {
            $sum: {
              $cond: ["$isDone", 1, 0],
            },
          },

          incompleteTasks: {
            $sum: {
              $cond: ["$isDone", 0, 1],
            },
          },

          tasks: {
            $push: "$$ROOT",
          },
        },
      },

      // Stage 3: Sort Dates Ascending
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data,
    });

  } catch (error) {
    console.error("Day-wise data error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch day-wise data",
    });
  }
};

const getTodayTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const startDate = new Date(`${today}T00:00:00+05:30`);

    const endDate = new Date(startDate);
    endDate.setUTCDate(endDate.getUTCDate() + 1);

    // Fetch today's tasks
    const todayTasksData = await flowModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      date: today,
      total: todayTasksData.length,
      tasks: todayTasksData,
    });
  } catch (error) {
    console.error("Today's tasks error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const markAsCompleteController = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    throw new AppError("ID is not found", 404);
  }

  const task = await flowModel.findByIdAndUpdate(id, {
    isDone: true,
    isPending: false,
  });

  if (!task) {
    throw new AppError("flow not found", 404);
  }

  res.status(200).json({
    message: "task completed successfully",
    task,
  });
};

const updateFlowController = async (req, res) => {
  const { id } = req.params;

  console.log(req.body);

  if (!id) {
    throw new AppError("flow ID is not found", 404);
  }

  const flow = await flowModel.findByIdAndUpdate(id, req.body, { new: true });

  if (!flow) {
    throw new AppError("flow is not found", 404);
  }

  res.status(200).json({
    message: "flow updated successfully",
    flow,
  });
};

export default {
  createFlowController,
  getAllFlowController,
  getOneFlowController,
  getDayWiseData,
  getTodayTasks,
  markAsCompleteController,
  updateFlowController,
};
