const { Router } = require("express");
const algoRouter = Router();
const algoController = require("../controllers/algorithms");

algoRouter.get("/", algoController.getAlgoResult);
algoRouter.post("/", algoController.postAlgoResult);
algoRouter.put("/", algoController.putAlgoResult);
algoRouter.delete("/", algoController.deleteAlgoResult);

module.exports = {
  algoRouter,
};
