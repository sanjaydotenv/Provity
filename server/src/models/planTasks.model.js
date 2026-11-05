import mongoose from "mongoose";

const planTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Plans",
  },
});

const planTaskModel = new mongoose.model("PlanTasks", planTaskSchema);

export default planTaskModel;
