import flowModel from "../models/flow.model.js";

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

export default { createFlowController , getAllFlowController };
