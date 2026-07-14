const mongoose = require('mongoose');
const schema = new mongoose.Schema({ package: String, moq: String, description: String, feature1: String, feature2: String, feature3: String, feature4: String }, { timestamps: true });
module.exports = mongoose.model('BulkFmoq', schema);
