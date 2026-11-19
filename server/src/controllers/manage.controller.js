import handleModel from "../models/manage.model.js";

export const createHandleController = async (req, res) => {
  try {
    const { name, category, description, username, url, password } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Name and category are required.",
      });
    }

    const newHandle = await handleModel.create({
      name,
      category,
      description,
      username,
      url,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Handle created successfully.",
      data: newHandle,
    });
  } catch (error) {
    console.error("Create Handle Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAllHandleController = async (req, res) => {
  try {
    const handles = await handleModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Handles fetched successfully.",
      total: handles.length,
      data: handles,
    });
  } catch (error) {
    console.error("Get All Handles Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export default { createHandleController, getAllHandleController };
