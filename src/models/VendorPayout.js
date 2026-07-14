const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  invoiceId: String,
  invoiceAmount: String,
  commission: String,
  payoutAmount: String,
  status: { type: String, default: 'Hold' },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' }
}, { timestamps: true });
module.exports = mongoose.model('VendorPayout', schema);
