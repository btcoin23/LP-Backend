const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

const saltRounds = 10; // Recommended salt rounds for production


router.post('/', async (req, res) => {
 const { username, email, password } = req.body;

 try {
    // Check if the user already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    const existingUseremail = await User.findOne({ email });
    if (existingUseremail) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(200).json({ success: true, message: 'User created successfully' });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
 }
});

module.exports = router;
