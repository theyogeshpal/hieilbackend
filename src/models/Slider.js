const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: String,
  subtitle: String,
  images1: String,
  images2: String,
  images3: String
}, { timestamps: true });
module.exports = mongoose.model('Slider', schema);
