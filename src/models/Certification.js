const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  icon: String,
  certificateFile: String,
  pdfUrl: String
}, { timestamps: true });
module.exports = mongoose.model('Certification', schema);
