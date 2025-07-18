const Joi = require('joi');

const createTableSchema = Joi.object({
    table_number: Joi.number().integer().positive().required().messages({
        'number.base': 'Table number must be a number',
        'number.integer': 'Table number must be an integer',
        'number.positive': 'Table number must be a positive number',
        'any.required': 'Table number is required'
    }),
    capacity: Joi.number().integer().positive().required().messages({
        'number.base': 'Capacity must be a number',
        'number.integer': 'Capacity must be an integer',
        'number.positive': 'Capacity must be a positive number',
        'any.required': 'Capacity is required'
    }),
    availability: Joi.boolean().optional().default(true).messages({
        'boolean.base': 'Availability must be a boolean value'
    })
});

const updateTableSchema = Joi.object({
    table_number: Joi.number().integer().positive().optional().messages({
        'number.base': 'Table number must be a number',
        'number.integer': 'Table number must be an integer',
        'number.positive': 'Table number must be a positive number'
    }),
    capacity: Joi.number().integer().positive().optional().messages({
        'number.base': 'Capacity must be a number',
        'number.integer': 'Capacity must be an integer',
        'number.positive': 'Capacity must be a positive number'
    }),
    availability: Joi.boolean().optional().messages({
        'boolean.base': 'Availability must be a boolean value'
    })
});

const getTableByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required'
    })
});

module.exports = {
    createTableSchema,
    updateTableSchema,
    getTableByIdSchema
}; 