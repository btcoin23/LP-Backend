const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECURITY_KEY;

router.post('/', async (req, res) => {
 try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // If the password matches, generate a JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    // Send the token in the response
    res.json({ success: true, token });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
 }
});

module.exports = router;
