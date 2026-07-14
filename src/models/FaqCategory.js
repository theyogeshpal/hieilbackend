const mongoose = require('mongoose');
const schema = new mongoose.Schema({ category: { type: String, required: true } }, { timestamps: true });
module.exports = mongoose.model('FaqCategory', schema);
