const AppError = require("../utils/AppError");
const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new AppError("validation failed", 400));
    }
    next();
  };
};

module.exports = validate;
