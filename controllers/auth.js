const { loginUser, registerUser } = require('../services/auth.service');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await loginUser(email, password);
        
        res.status(200).json({
            success: true,
            message: 'Login successful',
            token: result.token,
            user: result.user
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

const registerController = async (req, res) => {
    try {
        const userData = req.body;
        const result = await registerUser(userData);
        
        res.status(201).json({
            success: true,
            message: 'Registration successful',
            user: result
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const me = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    login: loginController,
    register: registerController,
    me,
    logout
}; 