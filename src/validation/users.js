import Joi from 'joi';

export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(20).messages({
        'string.empty': 'Name cannot be empty.',
        'string.min': 'Name must be at least 3 characters long.',
        'string.max': 'Name must not exceed 20 characters.',
        'string.base': 'Name must be a valid string.',
    }),
    email: Joi.string().email().messages({
        'string.empty': 'Email cannot be empty.',
        'string.email': 'Email must be a valid email address.',
        'string.base': 'Email must be a valid string.',
    }),
});
