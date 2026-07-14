const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  tag: String,
  image: String,
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });
module.exports = mongoose.model('Category', schema);
