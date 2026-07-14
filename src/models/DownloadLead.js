const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  email: String,
  fileSource: String
}, { timestamps: true });
module.exports = mongoose.model('DownloadLead', schema);
