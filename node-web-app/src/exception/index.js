import config from 'config';
import { ValidationError } from 'utils/validation';

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof ValidationError) {
    res.status(422).json({
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Something went wrong!',
    ...(config.appEnv !== 'production' ? { stack: err.stack } : null)
  });
};
