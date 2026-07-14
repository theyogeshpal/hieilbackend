const mongoose = require('mongoose');
const schema = new mongoose.Schema({ image: String, title: String }, { timestamps: true });
module.exports = mongoose.model('Brand', schema);
