//only the schema of the request object
const { z } = require("zod");
const createTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000).optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.coerce.date().optional(),
});
module.exports = { createTaskSchema };
