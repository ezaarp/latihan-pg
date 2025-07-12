const categoryService = require('../services/category');

// Create new category
const createCategoryController = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await categoryService.createCategory(name, description);
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get all categories
const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error getting categories:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get category by ID
const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(id);
        res.status(200).json(category);
    } catch (error) {
        console.error('Error getting category by id:', error);
        res.status(500).json({ message: error.message });
    }
}

// Update category
const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedCategory = await categoryService.updateCategory(id, name, description);
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ message: error.message });
    }
}

// Delete category
const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryService.deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createCategoryController, 
    getAllCategoriesController,
    getCategoryByIdController, 
    updateCategoryController, 
    deleteCategoryController 
}; 