const db = require('../models');
const Menu = db.Menu;

// Create new menu item
async function createMenu(name, description, price, category_id, image_url, is_available = true) {
    try {
        if (!name || !price || !category_id) {
            throw new Error("Menu name, price, and category are required");
        }

        // Check if category exists
        const category = await db.Category.findByPk(category_id);
        if (!category) {
            throw new Error("Category not found");
        }

        const newMenu = await Menu.create({ 
            name, 
            description, 
            price, 
            category_id, 
            image_url, 
            is_available 
        });
        
        return newMenu;
    } catch (error) {
        throw new Error("Failed to create menu item: " + error.message);
    }
}

// Get all menu items
async function getAllMenus() {
    try {
        const menus = await Menu.findAll({
            include: [{
                model: db.Category,
                as: 'category'
            }]
        });
        return menus;
    } catch (error) {
        throw new Error("Failed to fetch menu items: " + error.message);
    }
}

// Get menu by ID
async function getMenuById(id) {
    try {
        const menu = await Menu.findByPk(id, {
            include: [{
                model: db.Category,
                as: 'category'
            }]
        });
        
        if (!menu) {
            throw new Error("Menu item not found");
        }
        
        return menu;
    } catch (error) {
        throw new Error("Failed to fetch menu item: " + error.message);
    }
}

// Update menu item
async function updateMenu(id, name, description, price, category_id, image_url, is_available) {
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            throw new Error("Menu item not found");
        }

        if (category_id && category_id !== menu.category_id) {
            const category = await db.Category.findByPk(category_id);
            if (!category) {
                throw new Error("Category not found");
            }
        }

        await menu.update({ 
            name, 
            description, 
            price, 
            category_id, 
            image_url, 
            is_available 
        });
        
        return menu;
    } catch (error) {
        throw new Error("Failed to update menu item: " + error.message);
    }
}

// Delete menu item
async function deleteMenu(id) {
    try {
        const menu = await Menu.findByPk(id);
        if (!menu) {
            throw new Error("Menu item not found");
        }

        await menu.destroy();
        return true;
    } catch (error) {
        throw new Error("Failed to delete menu item: " + error.message);
    }
}

module.exports = { 
    createMenu, 
    getAllMenus, 
    getMenuById, 
    updateMenu, 
    deleteMenu 
}; 