const Joi = require('joi');

const createMenuSchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Menu name must be at least 2 characters long',
        'string.max': 'Menu name must not exceed 100 characters',
        'any.required': 'Menu name is required'
    }),
    description: Joi.string().max(500).optional().messages({
        'string.max': 'Description must not exceed 500 characters'
    }),
    price: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    }),
    category_id: Joi.number().integer().positive().required().messages({
        'number.base': 'Category ID must be a number',
        'number.integer': 'Category ID must be an integer',
        'number.positive': 'Category ID must be a positive number',
        'any.required': 'Category ID is required'
    }),
    availability: Joi.boolean().optional().default(true).messages({
        'boolean.base': 'Availability must be a boolean value'
    })
});

const updateMenuSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
        'string.min': 'Menu name must be at least 2 characters long',
        'string.max': 'Menu name must not exceed 100 characters'
    }),
    description: Joi.string().max(500).optional().messages({
        'string.max': 'Description must not exceed 500 characters'
    }),
    price: Joi.number().positive().precision(2).optional().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number'
    }),
    category_id: Joi.number().integer().positive().optional().messages({
        'number.base': 'Category ID must be a number',
        'number.integer': 'Category ID must be an integer',
        'number.positive': 'Category ID must be a positive number'
    }),
    availability: Joi.boolean().optional().messages({
        'boolean.base': 'Availability must be a boolean value'
    })
});

const getMenuByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required'
    })
});

module.exports = {
    createMenuSchema,
    updateMenuSchema,
    getMenuByIdSchema
}; 