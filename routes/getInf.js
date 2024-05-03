const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

router.get('/', async (req, res) => {
 try {
    const key = await Wallet.findOne({ username: req.query.username });
    const wallet = new Wallet({
      scretkey: key
    });

    await wallet.save();
    res.status(200).json({ success: true, data: "Raydium-Data is checked!" });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
 }
});

module.exports = router;
