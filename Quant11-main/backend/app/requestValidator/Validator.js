const { STATUS_CODES } = require('../config/constants');

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        data: null,
        meta: {
          code: 0,
          status: STATUS_CODES.BAD_REQUEST,
          message: error.details[0].message,
        },
      });
    }

    // Attach the validated data to the request object for later use in the route handler
    req.validatedData = value;
    next();
  };
};

module.exports = {
  validate
}
