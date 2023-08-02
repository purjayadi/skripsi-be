import status from 'http-status';
import HttpException from './HttpException';

// 400
class BadRequestException extends HttpException {
  constructor(description = 'Validation Error', loggingErrorResponse) {
    super(
      'BAD_REQUEST',
      status.BAD_REQUEST,
      description,
      true,
      false,
      loggingErrorResponse
    );
  }
}

export default BadRequestException;
