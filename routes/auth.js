const express = require('express');
const authController = require('../controllers/auth');
const { validate } = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth.middleware');
const { loginSchema, registerSchema } = require('../schemas/auth.schema');
const router = express.Router();

router.post('/login', validate(loginSchema), authController.login);
router.post('/register', validate(registerSchema), authController.register);
router.get('/me', authenticateToken, authController.me);

module.exports = router; 