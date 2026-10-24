import mongoose from "mongoose";

const flowSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true },
);

const flowModel = mongoose.model("Flows", flowSchema);

export default flowModel;
