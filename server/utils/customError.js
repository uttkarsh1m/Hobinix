class customError extends Error {
    constructor(msg, statuscode) {
        super();
        this.message = msg;
        this.statuscode = statuscode;
        this.operational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = customError;
