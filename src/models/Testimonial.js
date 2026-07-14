const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userName: String,
  userDesignation: String,
  userImage: String,
  rating: Number,
  city: String,
  message: String,
  status: { type: String, default: 'PENDING' }
}, { timestamps: true });
module.exports = mongoose.model('Testimonial', schema);
