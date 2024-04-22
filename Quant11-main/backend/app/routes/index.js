const express = require("express"),
  router = express.Router();
const apiRoute = require("./api");
const adminApiRoute = require("./admin-api");

// routers
router.use("/api", apiRoute);

//admin router
router.use("/admin-api", adminApiRoute);

module.exports = router;
