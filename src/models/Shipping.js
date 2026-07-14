const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  invoice: String,
  orderNo: String,
  company: String,
  mode: String,
  tracking: String,
  trackingNo: String,
  status: { type: String, default: 'In Transit' },
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Shipping', schema);
