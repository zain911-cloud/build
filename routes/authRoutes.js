const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure you have the correct path to your User model

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token (JWT)
    const token = jwt.sign({ id: user._id }, '18df4fae3ae58f89ae6b6ad0e03054bd317b2c4f41441cb5100ff85b73c8b6bcd0bad9fae7c9f7e2f694b6d79684856c00aa41f177b38b7fd866dce477393075', { expiresIn: '1h' });
    res.status(200).json({ token });
});

module.exports = router;
