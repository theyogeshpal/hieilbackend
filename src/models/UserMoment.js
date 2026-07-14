const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  submittedPhotos: [String],
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
}, { timestamps: true });
module.exports = mongoose.model('UserMoment', schema);
