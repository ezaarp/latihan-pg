const Joi = require('joi');

const createCategorySchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        'string.min': 'Category name must be at least 2 characters long',
        'string.max': 'Category name must not exceed 100 characters',
        'any.required': 'Category name is required'
    }),
    description: Joi.string().max(500).optional().messages({
        'string.max': 'Description must not exceed 500 characters'
    })
});

const updateCategorySchema = Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
        'string.min': 'Category name must be at least 2 characters long',
        'string.max': 'Category name must not exceed 100 characters'
    }),
    description: Joi.string().max(500).optional().messages({
        'string.max': 'Description must not exceed 500 characters'
    })
});

const getCategoryByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required'
    })
});

module.exports = {
    createCategorySchema,
    updateCategorySchema,
    getCategoryByIdSchema
}; 