const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const app = express();
const errorHandler = require("./middlewares/error.middleware");

// routes
const taskRoutes = require("./modules/tasks/task.routes");
const userRoutes = require("./modules/users/user.routes");

app.use(helmet()); //adds http secuirty headers
app.use(cors());
app.use(express.json());

// the app is listening on server.js file
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: " Taskflow API is running",
  });
});

app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/users", userRoutes);

app.use(errorHandler); //register the global error-handling middleware
module.exports = app;
