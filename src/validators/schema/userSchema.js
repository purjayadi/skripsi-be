import Joi from 'joi';

// Define a validation schema using Joi
export const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.min': 'Password harus terdiri dari minimal 6 karakter',
      'string.pattern.base':
        'Password harus mengandung setidaknya satu huruf kapital, satu huruf kecil, dan satu karakter khusus',
      'any.required': 'Password wajib diisi'
    })
});

export const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});
