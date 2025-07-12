const db = require('../models');
const Category = db.Category;

// Create new category
async function createCategory(name, description) {
    try {
        if (!name) {
            throw new Error("Category name is required");
        }

        const existingCategory = await Category.findOne({ where: { name } });
        if (existingCategory) {
            throw new Error("Category with this name already exists");
        }

        const newCategory = await Category.create({ name, description });
        return newCategory;
    } catch (error) {
        throw new Error("Failed to create category: " + error.message);
    }
}

// Get all categories
async function getAllCategories() {
    try {
        const categories = await Category.findAll({
            include: [{
                model: db.Menu,
                as: 'menus'
            }]
        });
        return categories;
    } catch (error) {
        throw new Error("Failed to fetch categories: " + error.message);
    }
}

// Get category by ID
async function getCategoryById(id) {
    try {
        const category = await Category.findByPk(id, {
            include: [{
                model: db.Menu,
                as: 'menus'
            }]
        });
        
        if (!category) {
            throw new Error("Category not found");
        }
        
        return category;
    } catch (error) {
        throw new Error("Failed to fetch category: " + error.message);
    }
}

// Update category
async function updateCategory(id, name, description) {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("Category not found");
        }

        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ where: { name } });
            if (existingCategory) {
                throw new Error("Category with this name already exists");
            }
        }

        await category.update({ name, description });
        return category;
    } catch (error) {
        throw new Error("Failed to update category: " + error.message);
    }
}

// Delete category
async function deleteCategory(id) {
    try {
        const category = await Category.findByPk(id);
        if (!category) {
            throw new Error("Category not found");
        }

        // Check if category has associated menus
        const menuCount = await db.Menu.count({ where: { category_id: id } });
        if (menuCount > 0) {
            throw new Error("Cannot delete category with existing menu items");
        }

        await category.destroy();
        return true;
    } catch (error) {
        throw new Error("Failed to delete category: " + error.message);
    }
}

module.exports = { 
    createCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory, 
    deleteCategory 
}; 