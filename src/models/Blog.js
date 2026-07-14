const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  category: String,
  title: { type: String, required: true },
  tag: String,
  description: String,
  image: String,
  content: String
}, { timestamps: true });
module.exports = mongoose.model('Blog', schema);
