const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  invoiceNo: String,
  orderNo: String,
  mode: String,
  reference: String,
  amount: String,
  status: { type: String, default: 'Pending' },
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Payment', schema);
