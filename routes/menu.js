const express = require('express');
const menuController = require('../controllers/menu');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const router = express.Router();

// POST /api/menus - Create menu (Admin only)
router.post('/', 
  authenticateToken, 
  authorize(['admin']), 
  menuController.createMenuController
);

// GET /api/menus - Get all menus (accessible to all authenticated users)
router.get('/', 
  authenticateToken, 
  menuController.getAllMenusController
);

// GET /api/menus/:id - Get menu by ID (accessible to all authenticated users)
router.get('/:id', 
  authenticateToken, 
  menuController.getMenuByIdController
);

// PUT /api/menus/:id - Update menu (Admin only)
router.put('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  menuController.updateMenuController
);

// DELETE /api/menus/:id - Delete menu (Admin only)
router.delete('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  menuController.deleteMenuController
);

module.exports = router; 