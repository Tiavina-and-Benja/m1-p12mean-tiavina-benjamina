const MyError = require("./MyError");

class ValidationError extends MyError {
    constructor({ message = "Validation failed", statusCode = 400, type = "validation_error", errors = {} }) {
        super({ message, statusCode, type });
        this.errors = errors;
    }
}

module.exports = ValidationError;