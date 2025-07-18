const Joi = require('joi');

const orderItemSchema = Joi.object({
    menu_id: Joi.number().integer().positive().required().messages({
        'number.base': 'Menu ID must be a number',
        'number.integer': 'Menu ID must be an integer',
        'number.positive': 'Menu ID must be a positive number',
        'any.required': 'Menu ID is required'
    }),
    quantity: Joi.number().integer().positive().required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.positive': 'Quantity must be a positive number',
        'any.required': 'Quantity is required'
    }),
    price: Joi.number().positive().precision(2).required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be a positive number',
        'any.required': 'Price is required'
    })
});

const createOrderSchema = Joi.object({
    user_id: Joi.number().integer().positive().required().messages({
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'number.positive': 'User ID must be a positive number',
        'any.required': 'User ID is required'
    }),
    table_id: Joi.number().integer().positive().required().messages({
        'number.base': 'Table ID must be a number',
        'number.integer': 'Table ID must be an integer',
        'number.positive': 'Table ID must be a positive number',
        'any.required': 'Table ID is required'
    }),
    order_date: Joi.date().iso().optional().messages({
        'date.base': 'Order date must be a valid date',
        'date.format': 'Order date must be in ISO format'
    }),
    status: Joi.string().valid('pending', 'preparing', 'ready', 'delivered', 'cancelled').optional().default('pending').messages({
        'any.only': 'Status must be one of: pending, preparing, ready, delivered, cancelled'
    }),
    items: Joi.array().items(orderItemSchema).min(1).required().messages({
        'array.base': 'Items must be an array',
        'array.min': 'At least one item is required',
        'any.required': 'Items are required'
    })
});

const updateOrderSchema = Joi.object({
    user_id: Joi.number().integer().positive().optional().messages({
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'number.positive': 'User ID must be a positive number'
    }),
    table_id: Joi.number().integer().positive().optional().messages({
        'number.base': 'Table ID must be a number',
        'number.integer': 'Table ID must be an integer',
        'number.positive': 'Table ID must be a positive number'
    }),
    order_date: Joi.date().iso().optional().messages({
        'date.base': 'Order date must be a valid date',
        'date.format': 'Order date must be in ISO format'
    }),
    status: Joi.string().valid('pending', 'preparing', 'ready', 'delivered', 'cancelled').optional().messages({
        'any.only': 'Status must be one of: pending, preparing, ready, delivered, cancelled'
    }),
    total_amount: Joi.number().positive().precision(2).optional().messages({
        'number.base': 'Total amount must be a number',
        'number.positive': 'Total amount must be a positive number'
    })
});

const getOrderByIdSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
        'number.positive': 'ID must be a positive number',
        'any.required': 'ID is required'
    })
});

module.exports = {
    createOrderSchema,
    updateOrderSchema,
    getOrderByIdSchema,
    orderItemSchema
}; 