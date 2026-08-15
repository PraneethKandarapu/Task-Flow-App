const express = require("express");
const router = express.Router();

const { createTask, getTasks, getTaskById } = require("./task.controller");
const validateMiddleware = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const { createTaskSchema } = require("./task.validation");

router.post(
  "/",
  authMiddleware,
  validateMiddleware(createTaskSchema),
  createTask,
);
router.get("/", authMiddleware, getTasks);
router.get("/:id", authMiddleware, getTaskById);
module.exports = router;
