const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  scretkey: String,
},{ timestamps: true});

module.exports = mongoose.model('Wallet', userSchema);
