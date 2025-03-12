const { getEnv } = require("@config/env");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: err.message || "Une erreur interne est survenue.",
    stack: getEnv("NODE_ENV") === "development" ? err.stack : undefined,
  });
};

module.exports = errorMiddleware;
