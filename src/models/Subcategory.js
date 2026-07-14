const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  category: { type: String, required: true },
  subcategoryName: { type: String, required: true },
  description: String
}, { timestamps: true });
module.exports = mongoose.model('Subcategory', schema);
