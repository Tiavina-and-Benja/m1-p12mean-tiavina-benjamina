const { getEnv } = require("@config/env");
const { ValidationError } = require("@errors/ValidationError");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  const responseError = {
    message: err.message || "Une erreur interne est survenue.",
    stack: getEnv("NODE_ENV") === "development" ? err.stack : undefined,
    type: err.type || "server_error",
    errors: err.errors || undefined
  }

  res.status(statusCode).json(responseError);
};

module.exports = errorMiddleware;
