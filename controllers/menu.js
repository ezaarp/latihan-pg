const menuService = require('../services/menu');

// Create new menu item
const createMenuController = async (req, res) => {
    try {
        const { name, description, price, category_id, image_url, is_available } = req.body;
        const newMenu = await menuService.createMenu(name, description, price, category_id, image_url, is_available);
        res.status(201).json(newMenu);
    } catch (error) {
        console.error('Error creating menu:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get all menu items
const getAllMenusController = async (req, res) => {
    try {
        const menus = await menuService.getAllMenus();
        res.status(200).json(menus);
    } catch (error) {
        console.error('Error getting menus:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get menu by ID
const getMenuByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await menuService.getMenuById(id);
        res.status(200).json(menu);
    } catch (error) {
        console.error('Error getting menu by id:', error);
        res.status(500).json({ message: error.message });
    }
}

// Update menu item
const updateMenuController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category_id, image_url, is_available } = req.body;
        const updatedMenu = await menuService.updateMenu(id, name, description, price, category_id, image_url, is_available);
        res.status(200).json(updatedMenu);
    } catch (error) {
        console.error('Error updating menu:', error);
        res.status(500).json({ message: error.message });
    }
}

// Delete menu item
const deleteMenuController = async (req, res) => {
    try {
        const { id } = req.params;
        await menuService.deleteMenu(id);
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createMenuController, 
    getAllMenusController,
    getMenuByIdController, 
    updateMenuController, 
    deleteMenuController 
}; 