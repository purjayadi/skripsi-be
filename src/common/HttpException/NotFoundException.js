import httpStatus from 'http-status';
import HttpException from './HttpException';

// 404
class NotFoundException extends HttpException {
  constructor(description = 'Not Found', loggingErrorResponse) {
    super(
      'NOT FOUND',
      httpStatus.NOT_FOUND,
      description,
      true,
      true,
      loggingErrorResponse
    );
  }
}

export default NotFoundException;
