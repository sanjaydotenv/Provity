import mongoose from "mongoose";

const planTaskSchema = new mongoose.Schema(
  {
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plans",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    dayNumber: {
      type: Number,
      required: true,
      min: 1,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

planTaskSchema.index({ plan: 1, dayNumber: 1 }, { unique: true });

const PlanTaskModel = mongoose.model("PlanTasks", planTaskSchema);

export default PlanTaskModel;
