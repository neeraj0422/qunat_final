const Joi = require("joi");

const marketAddUpdateValidation = Joi.object({
  id: Joi.string().trim().allow("").optional().messages({
    "string.empty": "Id cannot be empty.",
  }),
  market_name: Joi.string().trim().required().messages({
    "string.empty": "Market name cannot be empty.",
    "any.required": "Market name is required.",
  }),
});

module.exports = { marketAddUpdateValidation };
