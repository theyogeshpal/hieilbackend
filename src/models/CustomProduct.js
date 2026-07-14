const mongoose = require('mongoose');
const schema = new mongoose.Schema({ image: String, title: String, priceText: String, description: String }, { timestamps: true });
module.exports = mongoose.model('CustomProduct', schema);
