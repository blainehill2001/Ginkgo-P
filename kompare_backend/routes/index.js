const { Router } = require("express");
const { teaRouter } = require("./tea_example");
const { usersRouter } = require("./users");
const { algoRouter } = require("./algorithms");

const apiRouter = Router();

apiRouter.use("/tea", teaRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/algorithms", algoRouter);

module.exports = {
  apiRouter,
};
