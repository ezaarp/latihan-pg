const express = require('express');
const orderController = require('../controllers/order');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const router = express.Router();

// POST /api/orders - Create order (Any authenticated user)
router.post('/', 
  authenticateToken, 
  orderController.createOrderController
);

// GET /api/orders - Get all orders (Admin only)
router.get('/', 
  authenticateToken, 
  authorize(['admin']), 
  orderController.getAllOrdersController
);

// GET /api/orders/my - Get current user's orders (Any authenticated user)
router.get('/my', 
  authenticateToken, 
  orderController.getMyOrdersController
);

// GET /api/orders/:id - Get order by ID (Admin only)
router.get('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  orderController.getOrderByIdController
);

// PUT /api/orders/:id - Update order (Admin only)
router.put('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  orderController.updateOrderController
);

// DELETE /api/orders/:id - Delete order (Admin only)
router.delete('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  orderController.deleteOrderController
);

module.exports = router; 