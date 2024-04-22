const Joi = require("joi");

const adminLoginSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$"))
    .trim()
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one special character, one numeric digit, and be at least 6 characters long.",
      "string.empty": "Password cannot be empty.",
      "any.required": "Password is required.",
    }),
});

const userUpdateSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.empty": "User id cannot be empty.",
    "any.required": "User id required.",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
  mobile_number: Joi.string().allow(null, "").optional().trim(),
  country_code: Joi.string().allow(null, "").optional().trim(),
  is_sms_notification_allowed: Joi.boolean().messages({
    "boolean.empty": "SMS Notification value cannot be empty.",
    "boolean.base": "SMS Notification must be a boolean value.",
  }),
  is_email_notification_allowed: Joi.boolean().messages({
    "boolean.empty": "Email Notification value cannot be empty.",
    "boolean.base": "Email Notification must be a boolean value.",
  }),
});

module.exports = {
  adminLoginSchema,
  userUpdateSchema,
};
