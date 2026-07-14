const mongoose = require('mongoose');
const schema = new mongoose.Schema({ icon: String, title: String, description: String, point1: String, point2: String, point3: String, pdfFile: String }, { timestamps: true });
module.exports = mongoose.model('ProductCQ', schema);
