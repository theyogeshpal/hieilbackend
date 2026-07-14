const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  service: String,
  customerName: String,
  email: String,
  phone: String,
  location: String,
  message: String
}, { timestamps: true });
module.exports = mongoose.model('ServiceInquiry', schema);
