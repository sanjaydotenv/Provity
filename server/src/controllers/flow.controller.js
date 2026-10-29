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

    const today = new Date();

    const todayIST = new Date(
      today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
    );

    const endDate = new Date(todayIST);
    endDate.setHours(24, 0, 0, 0);

    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 6);

    const data = await flowModel.aggregate([
      {
        $match: {
          user: userId,
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "Asia/Kolkata",
            },
          },

          total: { $sum: 1 },

          completed: {
            $sum: {
              $cond: [{ $eq: ["$isDone", true] }, 1, 0],
            },
          },

          pending: {
            $sum: {
              $cond: [{ $eq: ["$isPending", true] }, 1, 0],
            },
          },

          tasks: {
            $push: {
              _id: "$_id",
              date: "$createdAt",
              title: "$title",
              description: "$description",
              isDone: "$isDone",
              isPending: "$isPending",
            },
          },
        },
      },

      {
        $sort: {
          _id: -1,
        },
      },

      {
        $project: {
          _id: 0,
          date: "$_id",
          total: 1,
          completed: 1,
          pending: 1,
          tasks: 1,
          progress: {
            $round: [
              {
                $multiply: [{ $divide: ["$completed", "$total"] }, 100],
              },
              0,
            ],
          },
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

export default {
  createFlowController,
  getAllFlowController,
  getOneFlowController,
  getDayWiseData,
};
