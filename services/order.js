const db = require('../models');
const Order = db.Order;
const OrderItem = db.OrderItem;
const Menu = db.Menu;

// Create new order with items
async function createOrder(user_id, table_id, status = 'pending', order_date = null, items = []) {
    const t = await db.sequelize.transaction();
    
    try {
        // Otomatisasi order_date jika tidak diberikan
        const finalOrderDate = order_date || new Date();
        
        // Hitung total amount dari items
        let total_amount = 0;
        
        // Validasi items dan hitung total
        if (items && items.length > 0) {
            for (let item of items) {
                const menu = await Menu.findByPk(item.menu_id);
                if (!menu) {
                    throw new Error(`Menu dengan ID ${item.menu_id} tidak ditemukan`);
                }
                
                const subtotal = parseFloat(item.price) * parseInt(item.quantity);
                total_amount += subtotal;
            }
        }
        
        // Buat order
        const newOrder = await Order.create({
            user_id,
            table_id,
            total_amount,
            status,
            order_date: finalOrderDate
        }, { transaction: t });
        
        // Buat order items
        if (items && items.length > 0) {
            for (let item of items) {
                const subtotal = parseFloat(item.price) * parseInt(item.quantity);
                
                await OrderItem.create({
                    order_id: newOrder.id,
                    menu_id: item.menu_id,
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: subtotal
                }, { transaction: t });
            }
        }
        
        await t.commit();
        
        // Return order with items
        return await getOrderById(newOrder.id);
    } catch (error) {
        await t.rollback();
        throw new Error("Gagal membuat order: " + error.message);
    }
}

// Get all orders
async function getAllOrders() {
    try {
        const orders = await Order.findAll({
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{
                        model: Menu,
                        as: 'menu'
                    }]
                }
            ]
        });
        return orders;
    } catch (error) {
        throw new Error("Gagal mengambil semua order: " + error.message);
    }
}

// Get order by ID
async function getOrderById(id) {
    try {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{
                        model: Menu,
                        as: 'menu'
                    }]
                }
            ]
        });
        if (!order) {
            throw new Error("Order tidak ditemukan.");
        }
        return order;
    } catch (error) {
        throw new Error("Gagal mengambil order: " + error.message);
    }
}

// Update order
async function updateOrder(id, user_id, table_id, total_amount, status, order_date) {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error("Order tidak ditemukan.");
        }

        await order.update({
            user_id,
            table_id,
            total_amount,
            status,
            order_date
        });
        return order;
    } catch (error) {
        throw new Error("Gagal memperbarui order: " + error.message);
    }
}

// Delete order
async function deleteOrder(id) {
    try {
        const order = await Order.findByPk(id);
        if (!order) {
            throw new Error("Order tidak ditemukan.");
        }

        await order.destroy();
        return { message: "Order berhasil dihapus" };
    } catch (error) {
        throw new Error("Gagal menghapus order: " + error.message);
    }
}

// Get orders by user ID
async function getOrdersByUserId(userId) {
    try {
        const orders = await Order.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: OrderItem,
                    as: 'orderItems',
                    include: [{
                        model: Menu,
                        as: 'menu'
                    }]
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        return orders;
    } catch (error) {
        throw new Error("Gagal mengambil order user: " + error.message);
    }
}

module.exports = { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
    updateOrder, 
    deleteOrder,
    getOrdersByUserId,
};
