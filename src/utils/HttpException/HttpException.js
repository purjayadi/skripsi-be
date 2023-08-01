class HttpException extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational,
    errorStack,
    loggingErrorResponse
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = loggingErrorResponse;
    Error.captureStackTrace(this);
  }
}

export default HttpException;
