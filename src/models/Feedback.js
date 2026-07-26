const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedbackMessage: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Feedback', schema);
