const { Router } = require("express");
const algoRouter = Router();
const algoController = require("../controllers/algorithms");
const multer = require("multer");

const upload = multer({
  dest: "../datasets",
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 }
}).fields([
  { name: "language", maxCount: 1 },
  { name: "script", maxCount: 1 },
  { name: "script_file", maxCount: 1 },
  { name: "user_email", maxCount: 1 },
  { name: "data_files", maxCount: 10 }
]);
algoRouter.get("/", algoController.getAlgoResult);
algoRouter.post("/", algoController.postAlgoResult);
algoRouter.post("/custom", upload, algoController.postCustomAlgoResult);
algoRouter.put("/", algoController.putAlgoResult);
algoRouter.delete("/", algoController.deleteAlgoResult);

module.exports = {
  algoRouter
};
