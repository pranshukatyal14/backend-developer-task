class BaseError extends Error {
    statusCode;
    constructor(statusCode, description) {
        super(description);

        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}

module.exports = BaseError;
