import { body, validationResult } from "express-validator";

export const resgisterValidator = [
  body("UserName").exists().withMessage("UserName is required"),
  body("Email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("Password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password at least 3 Characters long"),
  body("PhoneNo")
    .isMobilePhone("en-IN")
    .withMessage("Please enter a valid mobile number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];

export const flowCreateValidator = [
  body("title")
    .exists()
    .withMessage("Title is required")
    .isLength({ min: 6 })
    .withMessage("Write atleast more than 6 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Invalid Request",
        errors: errors.array(),
      });
    }
    next();
  },
];
