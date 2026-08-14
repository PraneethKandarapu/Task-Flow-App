const express = require("express");
const router = express.Router();

const { registerUser } = require("./user.controller");
const validateMiddleware = require("../../middlewares/validate.middleware");
const { registerUserSchema } = require("./user.validation");

router.post("/", validateMiddleware(registerUserSchema), registerUser);

module.exports = router;
