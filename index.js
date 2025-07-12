// 1. Mengimpor modul express
const express = require('express');
const db = require('./models');
// 2. Membuat instance dari aplikasi express
const app = express();

// Import all routes
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const menuRoutes = require('./routes/menu');
const tableRoutes = require('./routes/table');
const orderRoutes = require('./routes/order');

require('dotenv').config();
// 3. Mendefinisikan port untuk server
// Menggunakan port dari environment variable jika ada, jika tidak, gunakan port 3000
const port = process.env.PORT || 3000;

async function testDbConnection() {
    try {
    await db.sequelize.authenticate();
    console.log('Koneksi ke database berhasil terkoneksi.');
    } catch (error) {
    console.error('Tidak dapat terhubung ke database:', error);
    }
}

testDbConnection();

// 4. Middleware untuk parsing JSON
app.use(express.json());

// 5. Mendefinisikan semua API routes
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
            users: '/api/users',
            categories: '/api/categories',
            menus: '/api/menus',
            tables: '/api/tables',
            orders: '/api/orders'
        }
    });
});

// 7. Menjalankan server dan mendengarkan koneksi pada port yang ditentukan
app.listen(port, () => {
console.log(`Server berjalan di http://localhost:${port}`);
});