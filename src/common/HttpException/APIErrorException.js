import status from 'http-status';
import HttpException from './HttpException';

// api Specific Errors
class APIErrorException extends HttpException {
  constructor(
    name,
    statusCode = status.INTERNAL_SERVER_ERROR,
    description = 'Internal Server Error',
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}

export default APIErrorException;
