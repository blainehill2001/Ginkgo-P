//see this example index.ts for good practice: https://github.com/jameseaster/roast-log-server/blob/main/src/index.ts
//see this for information on controllers and routers: https://lo-victoria.com/build-a-rest-api-with-nodejs-routes-and-controllers
//imports
if (process.env.NODE_ENV !== "prod") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const AlgorithmCall = require("./schemas/algorithm.model");
const { apiRouter } = require("./routes"); // see the following link for organizing routes with express.js: https://dev.to/jameseaster/organizing-with-express-router-3i82

const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
//Middleware
app
  .use(express.urlencoded({ extended: true }))
  .use(
    express.json({
      limit: "500mb",
      extended: "true",
      parameterLimit: 1000000
    })
  )
  .use(cors(corsOptions));
// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", function () {
  console.log("\n\nConnected to the Database.\n\n");
});
mongoose.connection.on("error", function (error) {
  console.log("\n\nMongoose Connection Error : " + error + "\n\n");
});

//routes
app.use("/api", apiRouter);

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}.`);
});
