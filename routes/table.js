const express = require('express');
const tableController = require('../controllers/table');
const { authenticateToken } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/rbac.middleware');
const router = express.Router();

// POST /api/tables - Create table (Admin only)
router.post('/', 
  authenticateToken, 
  authorize(['admin']), 
  tableController.createTableController
);

// GET /api/tables - Get all tables (Admin only)
router.get('/', 
  authenticateToken, 
  authorize(['admin']), 
  tableController.getAllTablesController
);

// GET /api/tables/:id - Get table by ID (Admin only)
router.get('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  tableController.getTableByIdController
);

// PUT /api/tables/:id - Update table (Admin only)
router.put('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  tableController.updateTableController
);

// DELETE /api/tables/:id - Delete table (Admin only)
router.delete('/:id', 
  authenticateToken, 
  authorize(['admin']), 
  tableController.deleteTableController
);

module.exports = router; 