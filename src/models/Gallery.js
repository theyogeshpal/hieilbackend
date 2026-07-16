const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  category: String,
  title: String,
  tagline: String,
  image: String
}, { timestamps: true });
module.exports = mongoose.model('Gallery', schema);
