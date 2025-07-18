// 1. Mengimpor modul express
const express = require('express');
const db = require('./models');
// 2. Membuat instance dari aplikasi express
const app = express();

// Import all routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const menuRoutes = require('./routes/menu');
const tableRoutes = require('./routes/table');
const orderRoutes = require('./routes/order');

require('dotenv').config();
const port = process.env.PORT || 3000;

// 🔧 Fix: Improved DB connection with timeout
async function testDbConnection() {
    try {
        console.log('Testing database connection...');
        await Promise.race([
            db.sequelize.authenticate(),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Database connection timeout')), 5000)
            )
        ]);
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Database connection failed:', error.message);
        console.log('⚠️  Server will continue without database');
    }
}

// 4. Middleware untuk parsing JSON
app.use(express.json());

// 5. API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);

// 6. Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Restaurant API',
        endpoints: {
            auth: '/api/auth',
            users: '/api/users',
            categories: '/api/categories',
            menus: '/api/menus',
            tables: '/api/tables',
            orders: '/api/orders'
        }
    });
});

// 7. Start server FIRST, then test DB
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
    testDbConnection(); // Test DB after server starts
});