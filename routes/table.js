const express = require('express');
const tableController = require('../controllers/table');
const router = express.Router();

router.post('/', tableController.createTableController);

router.get('/', tableController.getAllTablesController);

router.get('/:id', tableController.getTableByIdController);

router.put('/:id', tableController.updateTableController);

router.delete('/:id', tableController.deleteTableController);

module.exports = router; 