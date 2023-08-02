import { createLogger, transports } from 'winston';
import HttpException from '../common/HttpException/HttpException';

const LogErrors = createLogger({
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'app_error.log' })
  ]
});

class ErrorLogger {
  async logError(err) {
    LogErrors.log({
      private: true,
      level: 'error',
      message: `${new Date()}-${JSON.stringify(err)}`
    });

    return false;
  }

  isTrustError(error) {
    if (error.constructor === HttpException && error.isOperational) {
      return true;
    }
    return false;
  }
}

const ErrorHandler = async (err, req, res, next) => {
  const errorLogger = new ErrorLogger();

  process.on('uncaughtException', (reason) => reason);

  process.on('uncaughtException', (error) => {
    errorLogger.logError(error);
    if (errorLogger.isTrustError(err)) {
      // process exit // need restart
    }
  });

  if (err) {
    await errorLogger.logError(err);
    if (errorLogger.isTrustError(err)) {
      if (err.errorStack) {
        const errorDescription = err.errorStack;
        return res.status(err.statusCode).json({ message: errorDescription });
      }
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(err.statusCode).json({ message: err.message });
  }
  next();
};

export default ErrorHandler;
