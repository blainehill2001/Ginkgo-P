const { Router } = require("express");
const { teaRouter } = require("./tea_example");
const { algoRouter } = require("./algorithms");

const apiRouter = Router();

apiRouter.use("/tea", teaRouter);
apiRouter.use("/algorithms", algoRouter);

module.exports = {
  apiRouter
};
