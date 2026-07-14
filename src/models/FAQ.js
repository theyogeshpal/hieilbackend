const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  category: String,
  question: { type: String, required: true },
  answer: String
}, { timestamps: true });
module.exports = mongoose.model('FAQ', schema);
