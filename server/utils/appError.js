class createError extends Error {
    constructor(message, statusCode) {
        // Call the parent class (Error) constructor with the provided message
        super(message);

        // Set the statusCode property to the passed-in value
        this.statusCode = statusCode;

        // Check if the statusCode starts with '4' (indicating a client error)
        // If so, set the status to 'fail', otherwise set it to 'error' (for server errors)
        this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';

        // Capture the current stack trace, excluding the constructor from the stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = createError;
