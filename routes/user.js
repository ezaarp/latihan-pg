const express = require('express');
const userController = require('../controllers/user');
const { validate, validateParams } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const { createUserSchema, updateUserSchema, getUserByIdSchema } = require('../schemas');
const router = express.Router();

// POST /api/users - Create new user (Admin only)
router.post('/', 
  authenticateToken, 
  authorize(['admin']), 
  validate(createUserSchema), 
  userController.create
);

// GET /api/users - Get all users (Admin only)
router.get('/', 
  authenticateToken, 
  authorize(['admin']), 
  userController.getAllUsersController
);

// GET /api/users/:id - Get user by ID (Admin only)
router.get('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  validateParams(getUserByIdSchema), 
  userController.getUserByIdController
);

// PUT /api/users/:id - Update user (Admin only)
router.put('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  validateParams(getUserByIdSchema), 
  validate(updateUserSchema), 
  userController.updateUserController
);

// DELETE /api/users/:id - Delete user (Admin only)
router.delete('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  validateParams(getUserByIdSchema), 
  userController.deleteUserController
);

module.exports = router;