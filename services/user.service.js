// services/user.service.js
const bcrypt = require('bcrypt');
const db = require('../models');
const User = db.User;

const saltRounds = 10; // Nilai awal yang baik

exports.createUser = async (userData) => {
    try {
        const { name, email, password } = userData;
        
        // Validasi input
        if (!name || !email || !password) {
            throw new Error("Nama, email, dan password tidak boleh kosong.");
        }

        // Cek apakah email sudah terdaftar
        const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
        if (existingUser) {
            throw new Error("Email sudah terdaftar.");
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        // Buat user baru
        const newUser = await User.create({ 
            name, 
            email: email.toLowerCase(), 
            password: hashedPassword 
        });

        // Penting: Jangan kembalikan hash kata sandi dalam respons API
        // Cukup kembalikan data pengguna yang tidak sensitif
        return { 
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
    } catch (error) {
        throw new Error("Gagal membuat pengguna: " + error.message);
    }
};

exports.getAllUsers = async () => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] } // Exclude password dari response
        });
        return users;
    } catch (error) {
        throw new Error("Gagal mengambil semua pengguna: " + error.message);
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] } // Exclude password dari response
        });
        
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }
        
        return user;
    } catch (error) {
        throw new Error("Gagal mengambil pengguna: " + error.message);
    }
};

exports.updateUser = async (id, userData) => {
    try {
        const { name, email, password } = userData;
        
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }

        // Cek email uniqueness jika email berubah
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
            if (existingUser) {
                throw new Error("Email sudah terdaftar.");
            }
        }

        // Prepare update data
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email.toLowerCase();
        
        // Hash password jika ada
        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        // Update user
        await user.update(updateData);
        
        // Return user tanpa password
        return { 
            id: user.id, 
            name: user.name, 
            email: user.email,
            updatedAt: user.updatedAt
        };
    } catch (error) {
        throw new Error("Gagal memperbarui pengguna: " + error.message);
    }
};

exports.deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("Pengguna tidak ditemukan.");
        }

        await user.destroy();
        return { message: "Pengguna berhasil dihapus" };
    } catch (error) {
        throw new Error("Gagal menghapus pengguna: " + error.message);
    }
};