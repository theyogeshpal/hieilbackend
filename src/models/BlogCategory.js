const mongoose = require('mongoose');
const schema = new mongoose.Schema({ name: { type: String, required: true }, postCount: { type: Number, default: 0 } }, { timestamps: true });
module.exports = mongoose.model('BlogCategory', schema);
