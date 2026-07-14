const mongoose = require('mongoose');
const schema = new mongoose.Schema({ image: String, title: String, pricingInfo: String, description: String }, { timestamps: true });
module.exports = mongoose.model('WholesaleCategory', schema);
