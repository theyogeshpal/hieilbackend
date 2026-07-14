const mongoose = require('mongoose');
const schema = new mongoose.Schema({ staticNumber: String, title: String }, { timestamps: true });
module.exports = mongoose.model('IndexState', schema);
