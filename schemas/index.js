// Central exports for all validation schemas
const authSchemas = require('./auth.schema');
const userSchemas = require('./user.schema');
const menuSchemas = require('./menu.schema');
const orderSchemas = require('./order.schema');
const tableSchemas = require('./table.schema');
const categorySchemas = require('./category.schema');

module.exports = {
    // Auth schemas
    ...authSchemas,
    
    // User schemas
    ...userSchemas,
    
    // Menu schemas
    ...menuSchemas,
    
    // Order schemas
    ...orderSchemas,
    
    // Table schemas
    ...tableSchemas,
    
    // Category schemas
    ...categorySchemas
}; 