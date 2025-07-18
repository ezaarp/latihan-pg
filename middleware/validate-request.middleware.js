const validateRequest = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.details.map(detail => ({
                    field: detail.path.join('.'),
                    message: detail.message
                }))
            });
        }
        
        req[property] = value;
        next();
    };
};

const validateBody = (schema) => validateRequest(schema, 'body');
const validateParams = (schema) => validateRequest(schema, 'params');
const validateQuery = (schema) => validateRequest(schema, 'query');

module.exports = {
    validateRequest,
    validateBody,
    validateParams,
    validateQuery
}; 