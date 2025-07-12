// 1. Mengimpor modul express
const express = require('express');
const db = require('./models');
// 2. Membuat instance dari aplikasi express
const app = express();

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

// 4. Mendefinisikan route sederhana untuk root URL '/')
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// 5. Menjalankan server dan mendengarkan koneksi pada port yang ditentukan
app.listen(port, () => {
console.log(`Server berjalan di http://localhost:${port}`);
});