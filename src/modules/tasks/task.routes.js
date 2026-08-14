const express = require("express");
const router = express.Router();

const { createTask } = require("./task.controller");
const validateMiddleware = require("../../middlewares/validate.middleware");
const { createTaskSchema } = require("./task.validation");

router.post("/", validateMiddleware(createTaskSchema), createTask);
module.exports = router;
