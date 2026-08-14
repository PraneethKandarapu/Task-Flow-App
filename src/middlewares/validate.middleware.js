//to validate

const validateMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) return next(result.error);
    next();
  };
};

module.exports = validateMiddleware;
