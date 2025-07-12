const express = require('express');
const orderController = require('../controllers/order');
const router = express.Router();

router.post('/', orderController.createOrderController);

router.get('/', orderController.getAllOrdersController);

router.get('/:id', orderController.getOrderByIdController);

router.put('/:id', orderController.updateOrderController);

router.delete('/:id', orderController.deleteOrderController);

module.exports = router; 