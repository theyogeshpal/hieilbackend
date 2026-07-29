const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  product: String,
  productId: String,
  customer: String,
  email: String,
  phone: String,
  whatsapp: String,
  location: String,
  orderType: String,
  qty: String,
  budget: String,
  gstStatus: String,
  gstDetails: String,
  shipping: String,
  message: String,
  deliveryDate: String,
  quotationId: String,
  quoteNo: String,
  type: { type: String, enum: ['inquiry', 'retailer'], default: 'inquiry' }
}, { timestamps: true });
module.exports = mongoose.model('Inquiry', schema);
