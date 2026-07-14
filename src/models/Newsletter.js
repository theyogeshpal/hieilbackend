const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });
module.exports = mongoose.model('Newsletter', schema);
