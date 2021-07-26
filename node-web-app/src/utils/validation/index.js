import { validateAll } from 'indicative/validator';

export function ValidationError(message) {
  this.message = message;
  this.stack = Error().stack;
}

ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.name = 'ValidationError';

export const validate = async (data, rules) => {
  try {
    await validateAll(data, rules);
  } catch (errors) {
    const message = errors.map((e) => e.message).join('|');
    throw new ValidationError(message);
  }
};
