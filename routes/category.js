const express = require('express');
const categoryController = require('../controllers/category');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const router = express.Router();

// POST /api/categories - Create category (Admin only)
router.post('/', 
  authenticateToken, 
  authorize(['admin']), 
  categoryController.createCategoryController
);

// GET /api/categories - Get all categories (accessible to all authenticated users)
router.get('/', 
  authenticateToken, 
  categoryController.getAllCategoriesController
);

// GET /api/categories/:id - Get category by ID (accessible to all authenticated users)
router.get('/:id', 
  authenticateToken, 
  categoryController.getCategoryByIdController
);

// PUT /api/categories/:id - Update category (Admin only)
router.put('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  categoryController.updateCategoryController
);

// DELETE /api/categories/:id - Delete category (Admin only)
router.delete('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  categoryController.deleteCategoryController
);

module.exports = router;
