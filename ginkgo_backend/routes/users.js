const { Router } = require("express");

// Handles requests made to /api/users
const usersRouter = Router();

// Respond to a GET request to the /api/users route:
usersRouter.get("/", (req, res) => res.send("Got a GET request at /api/users"));

// Respond to a PUT request to the /api/users route:
usersRouter.put("/", (req, res) => res.send("Got a PUT request at /api/users"));

// Respond to a DELETE request to the /api/users route:
usersRouter.delete("/", (req, res) =>
  res.send("Got a DELETE request at /api/users")
);

module.exports = {
  usersRouter,
};
