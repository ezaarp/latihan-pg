const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// Login user
const loginUser = async (email, password) => {
  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if (!user) {
      throw new Error('Authentication failed');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Authentication failed');
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role || 'user'
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user data tanpa password
    const { password: _, ...userWithoutPassword } = user.toJSON();

    return {
      user: {
        ...userWithoutPassword,
        role: userWithoutPassword.role || 'user' // Default role
      },
      token,
      tokenType: 'Bearer',
      expiresIn: JWT_EXPIRES_IN,
    };
  } catch (error) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

// Register user
const registerUser = async (userData) => {
  try {
    const { name, email, password, role = 'user' } = userData;

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ 
      where: { email: email.toLowerCase() } 
    });

    if (existingUser) {
      throw new Error('Email sudah terdaftar');
    }

    // Hash password
    const saltRounds = 8; // Lebih cepat, masih aman
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Buat user baru
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser.id, 
        email: newUser.email, 
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Return user data tanpa password
    const { password: _, ...userWithoutPassword } = newUser.toJSON();

    return {
      user: userWithoutPassword,
      token,
      tokenType: 'Bearer',
      expiresIn: JWT_EXPIRES_IN,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] } // Exclude password
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

// Verify token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUserById,
  verifyToken,
}; 