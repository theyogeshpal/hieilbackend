const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  country: String,
  subject: String,
  category: String,
  message: String
}, { timestamps: true });
module.exports = mongoose.model('Contact', schema);
