const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("./task.controller");
const validateMiddleware = require("../../middlewares/validate.middleware");
const authMiddleware = require("../../middlewares/auth.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
} = require("./task.validation");

router.post(
  "/",
  authMiddleware,
  validateMiddleware(createTaskSchema),
  createTask,
);
router.get(
  "/",
  authMiddleware,
  validateMiddleware(getTasksQuerySchema, "query"),
  getTasks,
);
router.get("/:id", authMiddleware, getTaskById);
router.patch(
  "/:id",
  authMiddleware,
  validateMiddleware(updateTaskSchema),
  updateTask,
);
router.delete("/:id", authMiddleware, deleteTask);
module.exports = router;
