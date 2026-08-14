// a common centralized function to handle errors
const { z } = require("zod");
const errorHandler = (err, req, res, next) => {
  console.error(err);

  //handling zod errors
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => ({
      field: issue.path[0],
      message: issue.message,
    }));
    return res.status(400).json({
      success: false,
      message: "validation failed",
      errors,
    });
  }
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = errorHandler;
