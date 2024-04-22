const express = require("express");
const router = express.Router();
const {
  adminLoginSchema,
  userUpdateSchema,
} = require("../../requestValidator/AdminValidations");
const { validate } = require("../../requestValidator/Validator");
const {
  checkAdminLogin,
} = require("../../controllers/admin-api/v1/AdminLoginController");
const {
  authenticateAdminToken,
} = require("../../middlewares/authenticateToken");
const {
  getSingleMarketData,
  addUpdateMarket,
  allMarketsDataWithPagination,
  allMarketsData,
  deleteSingleMarket,
  getAssetsBasedOnMarket,
} = require("../../controllers/admin-api/v1/MarketController");
const {
  marketAddUpdateValidation,
} = require("../../requestValidator/MarketValidations");
const {
  addUpdateAsset,
  allAssetsData,
  allAssetsDataWithPagination,
  deleteSingleAsset,
  getSingleAssetData,
} = require("../../controllers/admin-api/v1/AssetsController");
const {
  deleteSingleStrategy,
  addUpdateStrategy,
  getSingleStrategyData,
  allStrategiesData,
  allStrategiesDataWithPagination,
  regenerateStrategyData,
  // addStrategyWithTradeData,
} = require("../../controllers/admin-api/v1/StrategyController");
const {
  getAllUser,
  deleteSingleUser,
  updateSingleUser,
} = require("../../controllers/admin-api/v1/UserController");
const {
  AddStrategyWithTradeData,
} = require("../../utils/AddStrategyWithTradeData");

router.post("/login", validate(adminLoginSchema), checkAdminLogin);

//market api
router.post(
  "/markets",
  [authenticateAdminToken, validate(marketAddUpdateValidation)],
  addUpdateMarket
);
router.get("/markets/all", authenticateAdminToken, allMarketsData);
router.post(
  "/markets/list",
  authenticateAdminToken,
  allMarketsDataWithPagination
);
router.get("/markets/delete/:id", authenticateAdminToken, deleteSingleMarket);
router.get(
  "/markets/assets/:id",
  authenticateAdminToken,
  getAssetsBasedOnMarket
); // access assets based on market id
router.get("/markets/:id", authenticateAdminToken, getSingleMarketData);

//Assets api
router.post("/asset", authenticateAdminToken, addUpdateAsset);
router.get("/assets/all", authenticateAdminToken, allAssetsData);
router.post(
  "/assets/list",
  authenticateAdminToken,
  allAssetsDataWithPagination
);
router.get("/assets/delete/:id", authenticateAdminToken, deleteSingleAsset);
router.get("/assets/:id", authenticateAdminToken, getSingleAssetData);

//stretegy apis
// router.post("/strategy", authenticateAdminToken, addUpdateStrategy);
router.post("/strategy", authenticateAdminToken, AddStrategyWithTradeData);  // create and update strategy - optionally accept trade data csv file
// router.post("/strategy/file", authenticateAdminToken, AddStrategyWithTradeData);
router.get(
  "/strategy/regenerate/:id",
  authenticateAdminToken,
  regenerateStrategyData
);
router.get("/strategies/all", authenticateAdminToken, allStrategiesData);
router.post(
  "/strategies/list",
  authenticateAdminToken,
  allStrategiesDataWithPagination
);
router.get(
  "/strategies/delete/:id",
  authenticateAdminToken,
  deleteSingleStrategy
);
router.get("/strategies/:id", authenticateAdminToken, getSingleStrategyData);

//user data api
router.get("/users", authenticateAdminToken, getAllUser);
router.get("/users/delete/:id", authenticateAdminToken, deleteSingleUser);
router.post(
  "/users/create",
  [authenticateAdminToken, validate(userUpdateSchema)],
  updateSingleUser
);

module.exports = router;
