class MyError extends Error {
    constructor({message, statusCode}) {
        super(message);
        this.name = "MyError";
        this.statusCode = statusCode;
        this.stack = (new Error()).stack;
    }
}