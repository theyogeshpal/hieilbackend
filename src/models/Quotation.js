const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  quoteNo: String,
  customer: String,
  mobile: String,
  country: String,
  product: String,
  qty: String,
  budget: String,
  total: String,
  status: { type: String, default: 'Sent' },
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Quotation', schema);
