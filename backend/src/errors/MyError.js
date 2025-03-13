class MyError extends Error {
    constructor({ message, statusCode = 500, type = "server_error" }) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.type = type;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MyError;