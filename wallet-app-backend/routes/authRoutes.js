const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Register a new user
router.post('/register', userController.createUser);

// Login a user
router.post('/login', userController.loginUser);

// Get user by email (public route)
router.get('/user/:email', userController.getUserByEmail);

// Get all users (protected route, only admin can access)
router.get('/users', authMiddleware, userController.getAllUsers);

module.exports = router;
