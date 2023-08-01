import httpStatus from 'http-status';
import HttpException from './HttpException';

class DuplicateException extends HttpException {
  constructor(description = 'Duplicate request', loggingErrorResponse) {
    super(
      'Duplicate',
      httpStatus.CONFLICT,
      description,
      true,
      true,
      loggingErrorResponse
    );
  }
}

export default DuplicateException;
