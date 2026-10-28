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

export default {
  createFlowController,
  getAllFlowController,
  getOneFlowController,
};
