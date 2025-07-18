const Joi = require('joi');

const createUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name must not exceed 100 characters',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
    }),
    role: Joi.string().valid('admin', 'user').optional().default('user').messages({
        'any.only': 'Role must be either admin or user'
    })
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name must not exceed 100 characters'
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email must be a valid email address'
    }),
    password: Joi.string().min(6).optional().messages({
        'string.min': 'Password must be at least 6 characters long'
    }),
    role: Joi.string().valid('admin', 'user').optional().messages({
        'any.only': 'Role must be either admin or user'
    })
});

const getUserByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required'
    })
});

module.exports = {
    createUserSchema,
    updateUserSchema,
    getUserByIdSchema
}; 