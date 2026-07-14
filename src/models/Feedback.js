const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  customerName: String,
  email: String,
  phone: String,
  rating: Number,
  feedbackMessage: String
}, { timestamps: true });
module.exports = mongoose.model('Feedback', schema);
