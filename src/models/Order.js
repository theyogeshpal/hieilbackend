const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  orderNo: String,
  quotation: String,
  status: { type: String, default: '' },
  customer: String,
  country: String,
  address: { type: String, default: '' },
  products: { type: Array, default: [] },
  incoterm: { type: String, default: '' },
  paymentTerms: { type: String, default: '' },
  deliveryPort: { type: String, default: '' },
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Order', schema);
