import httpStatus from 'http-status';
import HttpException from './HttpException';

// 404
class UnauthorizedException extends HttpException {
  constructor(description = 'UNAUTHORIZED', loggingErrorResponse) {
    super(
      'UNAUTHORIZED',
      httpStatus.UNAUTHORIZED,
      description,
      true,
      true,
      loggingErrorResponse
    );
  }
}

export default UnauthorizedException;
