const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("./user.controller");
const validateMiddleware = require("../../middlewares/validate.middleware");
const { registerUserSchema, loginUserSchema } = require("./user.validation");

router.post("/", validateMiddleware(registerUserSchema), registerUser);
router.post("/login", validateMiddleware(loginUserSchema), loginUser);

module.exports = router;
