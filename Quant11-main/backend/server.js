const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const routes = require("./app/routes");
const { connectToDatabase } = require("./app/config/db.config");
require("dotenv").config();
// const path = require("path");
const {
  saveDailyStockPrices,
} = require("./app/controllers/api/v1/DailyStockPricesController");
const cron = require("node-cron");
const admin = require('./firebase-admin'); // Import the initialized Firebase Admin SDK instance

let corsOptions = {
  origin: process.env.CORS_ORIGIN,
};
const app = express();


//middleware
app.use(cors());
app.use(express.json());
// const buildpath = path.join(__dirname, "https://cra.link/deployment", "build");
// console.log(`Build Path is ${"/"+buildpath}`);
// app.use(express.static(buildpath));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies
// app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

//connect to database
connectToDatabase();

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to quant application." });
// });

// routes
app.use("/", routes);

// Firebase Authentication route
app.post('/create-user', async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    const { uid } = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    res.status(200).json({ uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// node-cron to save daily trade data
const cronExpression = "0 17 * * *";
cron.schedule(
  cronExpression,
  () => {
    saveDailyStockPrices();
  },
  {
    scheduled: true,
    timezone: "America/New_York", // Set the desired time zone
  }
);
if(process.env.NODE_ENV !== 'production'){
  app.use("/", express.static("build"))
}
// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});