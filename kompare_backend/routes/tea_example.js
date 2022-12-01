const { Router } = require("express");

// Handles requests made to /api/tea
const teaRouter = Router();

//Actually provides REST functionality
const teaController = require("../controllers/tea_example");

// Respond to a GET request to the /api/tea route:
teaRouter.get("/", teaController.getTea);

// Respond to a POST request to the /api/tea route:
teaRouter.post("/", teaController.postTea);

// Respond to a PUT request to the /api/tea route:
teaRouter.put("/", teaController.putTea);

// Respond to a DELETE request to the /api/tea route:
teaRouter.delete("/", teaController.deleteTea);

module.exports = {
  teaRouter,
};
