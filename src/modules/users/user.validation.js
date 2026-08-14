const { z } = require("zod");

const registerUserSchema = z.object({
  name: z.string().min(1).max(15),
  email: z.string().email(),
  password: z.string().min(8),
});

const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
module.exports = {
  registerUserSchema,
  loginUserSchema,
};
