const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  orderNo: String,
  quotation: String,
  status: { type: String, default: '' },
  customer: String,
  country: String,
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Order', schema);
