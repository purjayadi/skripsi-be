import createHttpError from 'http-errors';
import Validators from '../validators';

const validatorMiddleware = (validator) => async function (req, res, next) {
  try {
    const validated = await Validators[validator].validateAsync(req.body);
    req.body = validated;
    next();
  } catch (err) {
    if (err.isJoi) { return next(createHttpError(422, { message: err.message })); }
    next(createHttpError(500));
  }
};

export default validatorMiddleware;
