const db = require('../models');
const Table = db.Table;

// Create new table
async function createTable(table_number, capacity, is_available = true, location) {
    try {
        if (!table_number || !capacity) {
            throw new Error("Table number and capacity are required");
        }

        const existingTable = await Table.findOne({ where: { table_number } });
        if (existingTable) {
            throw new Error("Table with this number already exists");
        }

        const newTable = await Table.create({ 
            table_number, 
            capacity, 
            is_available, 
            location 
        });
        
        return newTable;
    } catch (error) {
        throw new Error("Failed to create table: " + error.message);
    }
}

// Get all tables
async function getAllTables() {
    try {
        const tables = await Table.findAll({
            include: [{
                model: db.Order,
                as: 'orders',
                include: [{
                    model: db.User,
                    as: 'user'
                }]
            }]
        });
        return tables;
    } catch (error) {
        throw new Error("Failed to fetch tables: " + error.message);
    }
}

// Get table by ID
async function getTableById(id) {
    try {
        const table = await Table.findByPk(id, {
            include: [{
                model: db.Order,
                as: 'orders',
                include: [{
                    model: db.User,
                    as: 'user'
                }]
            }]
        });
        
        if (!table) {
            throw new Error("Table not found");
        }
        
        return table;
    } catch (error) {
        throw new Error("Failed to fetch table: " + error.message);
    }
}

// Update table
async function updateTable(id, table_number, capacity, is_available, location) {
    try {
        const table = await Table.findByPk(id);
        if (!table) {
            throw new Error("Table not found");
        }

        if (table_number && table_number !== table.table_number) {
            const existingTable = await Table.findOne({ where: { table_number } });
            if (existingTable) {
                throw new Error("Table with this number already exists");
            }
        }

        await table.update({ 
            table_number, 
            capacity, 
            is_available, 
            location 
        });
        
        return table;
    } catch (error) {
        throw new Error("Failed to update table: " + error.message);
    }
}

// Delete table
async function deleteTable(id) {
    try {
        const table = await Table.findByPk(id);
        if (!table) {
            throw new Error("Table not found");
        }

        const orderCount = await db.Order.count({ 
            where: { 
                table_id: id,
                status: ['pending', 'preparing', 'ready'] 
            } 
        });
        
        if (orderCount > 0) {
            throw new Error("Cannot delete table with active orders");
        }

        await table.destroy();
        return true;
    } catch (error) {
        throw new Error("Failed to delete table: " + error.message);
    }
}

module.exports = { 
    createTable, 
    getAllTables, 
    getTableById, 
    updateTable, 
    deleteTable 
}; 