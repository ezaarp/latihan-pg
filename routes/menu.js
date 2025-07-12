const express = require('express');
const menuController = require('../controllers/menu');
const router = express.Router();

router.post('/', menuController.createMenuController);

router.get('/', menuController.getAllMenusController);

router.get('/:id', menuController.getMenuByIdController);

router.put('/:id', menuController.updateMenuController);

router.delete('/:id', menuController.deleteMenuController);

module.exports = router; 