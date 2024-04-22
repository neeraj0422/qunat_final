const jwt = require("jsonwebtoken");
const { STATUS_CODES, STATUS_MESSAGES } = require("../config/constants"); // Import your status codes module

function authenticateToken(req, res, next) {
  // Get the token from the request headers
  const authHeader = req.header("Authorization");
  // Check if the token is provided
  if (!authHeader) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      data: null,
      meta: {
        code: 0,
        status: STATUS_CODES.UNAUTHORIZED,
        message: STATUS_MESSAGES.NO_TOKEN,
      },
    });
  }

  const token =
    authHeader.indexOf("Bearer") >= 0
      ? authHeader.split(" ")[1].trim()
      : authHeader;
  // Verify the token
  jwt.verify(token,  process.env.JWT_ADMIN_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        data: null,
        meta: {
          code: 0,
          status: STATUS_CODES.UNAUTHORIZED,
          message: STATUS_MESSAGES.INVALID_TOKEN,
        },
      });
    }

    // Attach the user data to the request object for later use in the route handler
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
}

function authenticateAdminToken(req, res, next) {
  // Get the token from the request headers
  const authHeader = req.header("Authorization");

  // Check if the token is provided
  if (!authHeader) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      data: null,
      meta: {
        code: 0,
        status: STATUS_CODES.UNAUTHORIZED,
        message: STATUS_MESSAGES.NO_TOKEN,
      },
    });
  }

  const token =
    authHeader.indexOf("Bearer") >= 0
      ? authHeader.split(" ")[1].trim()
      : authHeader;

  // Verify the token
  jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY, (err, admin) => {
    if (err) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        data: null,
        meta: {
          code: 0,
          status: STATUS_CODES.UNAUTHORIZED,
          message: STATUS_MESSAGES.INVALID_TOKEN,
        },
      });
    }

    // Attach the admin data to the request object for later use in the route handler
    req.admin = admin;

    // Proceed to the next middleware or route handler
    next();
  });
}

module.exports = {
  authenticateToken,
  authenticateAdminToken,
};
