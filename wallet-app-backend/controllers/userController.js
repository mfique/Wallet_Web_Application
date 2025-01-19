const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');

// Register a new user
exports.createUser = async (req, res) => {
    const { email, password, name, role = 'user' } = req.body;

    try {
        const checkEmailQuery = 'SELECT * FROM users WHERE email = $1';
        const { rows: existingUser } = await pool.query(checkEmailQuery, [email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (email, password, name, role)
            VALUES ($1, $2, $3, $4)
            RETURNING id, email, name, role, created_at
        `;
        const { rows: newUser } = await pool.query(query, [email, hashedPassword, name, role]);

        res.status(201).json({
            message: 'User created successfully',
            user: newUser[0],
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows: user } = await pool.query(query, [email]);

        if (user.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const query = 'SELECT id, email, name, role FROM users WHERE email = $1';
        const { rows: user } = await pool.query(query, [email]);

        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user[0]);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const query = 'SELECT id, email, name, role FROM users';
        const { rows: users } = await pool.query(query);

        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
