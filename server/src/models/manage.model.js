import mongoose from "mongoose";

const handleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Projects", "Emails", "Social Media", "Websites", "Others"],
      default: "Projects",
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      trim: true,
      default: "",
    },

    url: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true },
);

const handleModel = mongoose.model("Handles", handleSchema);

export default handleModel;
