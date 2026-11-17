import formeModel from "../models/forme.model.js";

const createHabitController = {
  createHabit: async (req, res) => {
    try {
      const { title } = req.body;

      if (!title?.trim()) {
        return res.status(400).json({
          success: false,
          message: "Habit title is required",
        });
      }

      await formeModel.create({
        user: req.user.id,
        title: title.trim(),
      });

      const habits = await formeModel
        .find({ user: req.user.id })
        .sort({ startedAt: -1 });

      return res.status(201).json({
        success: true,
        message: "Habit created successfully",
        habits,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};

const getAllHabit = async (req, res) => {
  try {
    const allHabits = await formeModel.find({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      habits: allHabits,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  createHabit: createHabitController.createHabit,
  getAllHabit,
};