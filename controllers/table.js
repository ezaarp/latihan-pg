const tableService = require('../services/table');

// Create new table
const createTableController = async (req, res) => {
    try {
        const { table_number, capacity, is_available, location } = req.body;
        const newTable = await tableService.createTable(table_number, capacity, is_available, location);
        res.status(201).json(newTable);
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get all tables
const getAllTablesController = async (req, res) => {
    try {
        const tables = await tableService.getAllTables();
        res.status(200).json(tables);
    } catch (error) {
        console.error('Error getting tables:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get table by ID
const getTableByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await tableService.getTableById(id);
        res.status(200).json(table);
    } catch (error) {
        console.error('Error getting table by id:', error);
        res.status(500).json({ message: error.message });
    }
}

// Update table
const updateTableController = async (req, res) => {
    try {
        const { id } = req.params;
        const { table_number, capacity, is_available, location } = req.body;
        const updatedTable = await tableService.updateTable(id, table_number, capacity, is_available, location);
        res.status(200).json(updatedTable);
    } catch (error) {
        console.error('Error updating table:', error);
        res.status(500).json({ message: error.message });
    }
}

// Delete table
const deleteTableController = async (req, res) => {
    try {
        const { id } = req.params;
        await tableService.deleteTable(id);
        res.status(200).json({ message: 'Table deleted successfully' });
    } catch (error) {
        console.error('Error deleting table:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createTableController, 
    getAllTablesController,
    getTableByIdController, 
    updateTableController, 
    deleteTableController 
}; 