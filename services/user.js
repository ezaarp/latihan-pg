const db = require('../models');
const User = db.User;

async function createUser(name, email, password) {
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (!name || !email || !password) {
            throw new Error("Email dan Nama tidak boleh kosong.");
        }

        if (existingUser) {
            throw new Error("Email sudah terdaftar.");
        }

        const newUser = await User.create({ name, email, password });
        console.log(newUser);
        return newUser;
    } catch (error) {
        throw new Error("Gagal membuat pengguna: " + error.message);
    }
}

// Get all users
async function getAllUsers() {
    try {
        const users = await User.findAll({
            include: [{
                model: db.Order,
                as: 'orders',
                include: [{
                    model: db.Table,
                    as: 'table'
                }]
            }]
        });
        return users;
    } catch (error) {
        throw new Error("Gagal mengambil semua pengguna: " + error.message);
    }
}

async function getuserbyid(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }
        return user;
    } catch (error) {
        throw new Error("Gagal mengambil pengguna: " + error.message);
    }
}

// Update user
async function updateUser(id, name, email, password) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error("Email sudah terdaftar.");
            }
        }

        await user.update({ name, email, password });
        return user;
    } catch (error) {
        throw new Error("Gagal memperbarui pengguna: " + error.message);
    }
}

// Delete user
async function deleteUser(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }

        const orderCount = await db.Order.count({ 
            where: { 
                user_id: id,
                status: ['pending', 'preparing', 'ready'] 
            } 
        });
        
        if (orderCount > 0) {
            throw new Error("Tidak dapat menghapus pengguna dengan pesanan aktif.");
        }

        await user.destroy();
        return true;
    } catch (error) {
        throw new Error("Gagal menghapus pengguna: " + error.message);
    }
}

module.exports = { createUser, getAllUsers, getuserbyid, updateUser, deleteUser };