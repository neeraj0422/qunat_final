const Joi = require("joi");

const loginSchema = Joi.object({
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

const emailSchema = Joi.object({
  email: Joi.string().email().trim().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().trim().required().messages({
    "string.empty": "Something went wrong while resetting password.",
    "any.required": "Something went wrong while resetting password.",
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

  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Password and Confirm Password must match.",
      "string.empty": "Confirm Password cannot be empty.",
      "any.required": "Confirm Password is required.",
    }),
});

const changePasswordSchema = Joi.object({
  old_password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$"))
    .trim()
    .required()
    .messages({
      "string.pattern.base":
        "Old Password must contain at least one uppercase letter, one special character, one numeric digit, and be at least 6 characters long.",
      "string.empty": "Old Password cannot be empty.",
      "any.required": "Old Password is required.",
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

  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Password and Confirm New Password must match.",
      "string.empty": "Confirm New Password cannot be empty.",
      "any.required": "Confirm New Password is required.",
    }),
});

const editProfileSchema = Joi.object({
  first_name: Joi.string().trim().required().messages({
    "string.empty": "First name cannot be empty.",
    "any.required": "First name is required.",
  }),
  last_name: Joi.string().trim().required().messages({
    "string.empty": "Last name cannot be empty.",
    "any.required": "Last name is required.",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country name cannot be empty.",
    "any.required": "Country name is required.",
  }),
  mobile_number: Joi.string().allow(null, "").optional().trim(),
  country_code: Joi.string().allow(null, "").optional().trim(),
  date_of_birth: Joi.string().required().messages({
    "date.base": "Invalid date format for Date of Birth.",
    "any.required": "Date of Birth is required.",
  }),
  receive_newsletter: Joi.boolean().required().messages({
    "any.required": "Receive newsletter is required.",
    "boolean.base": "Receive newsletter must be a boolean value.",
  }),
  receive_call_notification: Joi.boolean().required().messages({
    "any.required": "Receive call notification is required.",
    "boolean.base": "Receive call notification must be a boolean value.",
  }),
});

const settingsSchema = Joi.object({
  risk_appetite: Joi.number().integer().min(1).max(3).messages({
    "number.empty": "Risk Appetite cannot be empty.",
    "any.required": "Risk Appetite is required.",
    "number.base": "Risk Appetite must be a number.",
    "number.integer": "Risk Appetite must be an integer.",
    "number.min": "Risk Appetite must be at least 1.",
    "number.max": "Risk Appetite must be at most 3.",
  }),
  trade_experience: Joi.number().integer().min(1).max(6).messages({
    "number.empty": "Trade Experience cannot be empty.",
    "any.required": "Trade Experience is required.",
    "number.base": "Trade Experience must be a number.",
    "number.integer": "Trade Experience must be an integer.",
    "number.min": "Trade Experience must be at least 1.",
    "number.max": "Trade Experience must be at most 6.",
  }),
  app_notification: Joi.boolean().messages({
    "any.required": "At least one notification type is required.",
    "boolean.base": "App Notification must be a boolean value.",
    "any.empty": "App Notification cannot be empty.",
  }),
  push_notification: Joi.boolean().messages({
    "boolean.base": "Push Notification must be a boolean value.",
    "any.empty": "Push Notification cannot be empty.",
  }),
  sms_notification: Joi.boolean().allow(null, "").messages({
    "boolean.base": "SMS Notification must be a boolean value.",
  }),
  email_notification: Joi.boolean().allow(null, "").messages({
    "boolean.base": "Email Notification must be a boolean value.",
  }),
})
  .or(
    "risk_appetite",
    "trade_experience",
    "app_notification",
    "push_notification",
    "sms_notification",
    "email_notification"
  )
  .required()
  .messages({
    "object.missing": "At least one property is required.",
  });

const signupSchema = Joi.object({
  first_name: Joi.string().trim().required().messages({
    "string.empty": "First name cannot be empty.",
    "any.required": "First name is required.",
  }),
  last_name: Joi.string().trim().required().messages({
    "string.empty": "Last name cannot be empty.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "string.empty": "Email cannot be empty.",
    "any.required": "Email is required.",
  }),
  country: Joi.string().trim().required().messages({
    "string.empty": "Country cannot be empty.",
    "any.required": "Country is required.",
  }),
  date_of_birth: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid date format. Please provide a valid date in dd/mm/yyyy format.",
      "string.empty": "Date of birth cannot be empty.",
      "any.required": "Date of birth is required.",
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
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Password and Confirm Password must match.",
      "string.empty": "Confirm Password cannot be empty.",
      "any.required": "Confirm Password is required.",
    }),
  mobile_number: Joi.string().allow(null, "").optional().trim(),
  country_code: Joi.string().allow(null, "").optional().trim(),
});

const mobileVerificationSchema = Joi.object({
  country_code: Joi.string()
    .trim()
    .required()
    .pattern(/^\+\d+$/)
    .messages({
      "string.pattern.base":
        'Invalid country code. It should be in the format "+123".',
      "string.empty": "Country code cannot be empty.",
      "any.required": "Country code is required.",
    }),
  mobile_number: Joi.string().trim().required().messages({
    "string.empty": "Mobile number cannot be empty.",
    "any.required": "Mobile number is required.",
  }),
});

const otpVerificationSchema = Joi.object({
  otp: Joi.string()
    .trim()
    .required()
    .pattern(/^\d{4}$/)
    .messages({
      "string.pattern.base":
        "Invalid OTP. It should contain exactly 4 numeric digits.",
      "string.empty": "OTP cannot be empty.",
      "any.required": "OTP is required.",
    }),
});

const userExperianceSchema = Joi.object({
  risk_appetite: Joi.number().integer().min(1).max(3).required().messages({
    "number.empty": "Risk Appetite cannot be empty.",
    "any.required": "Risk Appetite is required.",
    "number.base": "Risk Appetite must be a number.",
    "number.integer": "Risk Appetite must be an integer.",
    "number.min": "Risk Appetite must be at least 1.",
    "number.max": "Risk Appetite must be at most 3.",
  }),
  trade_experience: Joi.number().integer().min(1).max(6).required().messages({
    "number.empty": "Trade Experience cannot be empty.",
    "any.required": "Trade Experience is required.",
    "number.base": "Trade Experience must be a number.",
    "number.integer": "Trade Experience must be an integer.",
    "number.min": "Trade Experience must be at least 1.",
    "number.max": "Trade Experience must be at most 6.",
  }),
});

const strategyDetailsSchema = Joi.object({
  id: Joi.string().trim().required().empty().messages({
    "string.empty": "Strategy ID cannot be empty.",
    "any.required": "Strategy ID is required.",
  }),
});

const tradeValidation = Joi.object({
  strategy_id: Joi.string().trim().required().empty().messages({
    "string.empty": "Strategy ID cannot be empty.",
    "any.required": "Strategy ID is required.",
  }),
  limit: Joi.number().required().empty().messages({
    "number.base": "Limit must be a non empty Integer value.",
    "number.empty": "Limit cannot be empty.",
    "any.required": "Limit is required.",
  }),
  page: Joi.number().required().empty().messages({
    "number.base": "Page must be a non empty Integer value.",
    "number.empty": "Page cannot be empty.",
    "any.required": "Page is required.",
  }),
});

const notificationListValidation = Joi.object({
  limit: Joi.number().required().empty().messages({
    "number.base": "Limit must be a non empty Integer value.",
    "number.empty": "Limit cannot be empty.",
    "any.required": "Limit is required.",
  }),
  page: Joi.number().required().empty().messages({
    "number.base": "Page must be a non empty Integer value.",
    "number.empty": "Page cannot be empty.",
    "any.required": "Page is required.",
  }),
  type: Joi.string().optional(),
});

const riskAppetiteSchema = Joi.object({
  risk_appetite: Joi.number().integer().min(1).max(3).required().messages({
    "number.empty": "Risk Appetite cannot be empty.",
    "any.required": "Risk Appetite is required.",
    "number.base": "Risk Appetite must be a number.",
    "number.integer": "Risk Appetite must be an integer.",
    "number.min": "Risk Appetite must be at least 1.",
    "number.max": "Risk Appetite must be at most 3.",
  }),
});

const tradeExperienceSchema = Joi.object({
  trade_experience: Joi.number().integer().min(1).max(6).required().messages({
    "number.empty": "Trade Experience cannot be empty.",
    "any.required": "Trade Experience is required.",
    "number.base": "Trade Experience must be a number.",
    "number.integer": "Trade Experience must be an integer.",
    "number.min": "Trade Experience must be at least 1.",
    "number.max": "Trade Experience must be at most 6.",
  }),
});

const notificationSchema = Joi.object({
  app_notification: Joi.boolean().messages({
    "any.required": "At least one notification type is required.",
    "boolean.base": "App Notification must be a boolean value.",
    "any.empty": "App Notification cannot be empty.",
  }),
  push_notification: Joi.boolean().messages({
    "boolean.base": "Push Notification must be a boolean value.",
    "any.empty": "Push Notification cannot be empty.",
  }),
  sms_notification: Joi.boolean().allow(null, "").messages({
    "boolean.base": "SMS Notification must be a boolean value.",
  }),
  email_notification: Joi.boolean().allow(null, "").messages({
    "boolean.base": "Email Notification must be a boolean value.",
  }),
});

module.exports = {
  loginSchema,
  emailSchema,
  resetPasswordSchema,
  changePasswordSchema,
  editProfileSchema,
  signupSchema,
  mobileVerificationSchema,
  otpVerificationSchema,
  userExperianceSchema,
  settingsSchema,
  strategyDetailsSchema,
  tradeValidation,
  notificationListValidation,
  riskAppetiteSchema,
  tradeExperienceSchema,
  notificationSchema,
};
