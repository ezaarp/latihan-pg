const orderService = require('../services/order');

// Create new order
const createOrderController = async (req, res) => {
    try {
        const { user_id, table_id, total_amount, status, order_date } = req.body;
        const newOrder = await orderService.createOrder(user_id, table_id, total_amount, status, order_date);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get order by ID
const getOrderByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(id);
        res.status(200).json(order);
    } catch (error) {
        console.error('Error getting order by id:', error);
        res.status(500).json({ message: error.message });
    }
}

// Update order
const updateOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, table_id, total_amount, status, order_date } = req.body;
        const updatedOrder = await orderService.updateOrder(id, user_id, table_id, total_amount, status, order_date);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: error.message });
    }
}

// Delete order
const deleteOrderController = async (req, res) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createOrderController, 
    getAllOrdersController,
    getOrderByIdController, 
    updateOrderController, 
    deleteOrderController 
}; 