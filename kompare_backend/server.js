//see this example index.ts for good practice: https://github.com/jameseaster/roast-log-server/blob/main/src/index.ts
//see this for information on controllers and routers: https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers
//imports
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const User = require("./schemas/user.model");
const AlgorithmCall = require("./schemas/algorithm.model");
const { apiRouter } = require("./routes"); // see the following link for organizing routes with express.js: https://dev.to/jameseaster/organizing-with-express-router-3i82

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
//Middleware
app.use(express.urlencoded({ extended: true })).use(
  express.json({
    limit: "150mb",
    extended: "true",
    parameterLimit: 1000000,
  })
);

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", function () {
  console.log("Connected to the Database.");
});
mongoose.connection.on("error", function (error) {
  console.log("Mongoose Connection Error : " + error);
});

//routes
app.use("/api", apiRouter);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
