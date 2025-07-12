const userService = require('../services/user');

const createUserController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await userService.createUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: error.message });
    }
}

// Get all users
const getAllUsersController = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting users:', error);
        res.status(500).json({ message: error.message });
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getuserbyid(id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Error getting user by id:', error);
        res.status(500).json({ message: error.message });
    }
}

// Update user
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updatedUser = await userService.updateUser(id, name, email, password);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: error.message });
    }
}

// Delete user
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { 
    createUserController, 
    getAllUsersController, 
    getUserByIdController, 
    updateUserController, 
    deleteUserController 
};