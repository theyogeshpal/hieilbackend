const mongoose = require('mongoose');
const schema = new mongoose.Schema({ icon: String, titleCol: String, deliveryTime: String, tagline: String, point1: String, point2: String, point3: String, point4: String }, { timestamps: true });
module.exports = mongoose.model('ShippingList', schema);
