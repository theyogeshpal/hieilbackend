const mongoose = require('mongoose');
const schema = new mongoose.Schema({ icon: String, title: String, description: String, buttonText: String, pdfFile: String }, { timestamps: true });
module.exports = mongoose.model('BlogFdgw', schema);
