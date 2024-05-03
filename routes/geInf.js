const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
 try {
    const user = await User.findOne({ username: req.query.username });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
 }
});

module.exports = router;
