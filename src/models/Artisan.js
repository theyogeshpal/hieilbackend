const mongoose = require('mongoose');
const schema = new mongoose.Schema({ preview: String, title: String, description: String, text: String }, { timestamps: true });
module.exports = mongoose.model('Artisan', schema);
