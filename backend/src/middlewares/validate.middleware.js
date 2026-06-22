const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const zodErrors = result.error.issues || result.error.errors || [];

      const errors = zodErrors.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};

module.exports = validate;
