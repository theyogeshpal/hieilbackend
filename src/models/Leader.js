const mongoose = require('mongoose');
const schema = new mongoose.Schema({ photo: String, name: String, role: String, description: String }, { timestamps: true });
module.exports = mongoose.model('Leader', schema);
