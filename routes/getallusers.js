const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
 try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users' });
 }
});

module.exports = router;
