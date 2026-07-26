const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  fileSource: String,
  certificateTitle: String
}, { timestamps: true });
module.exports = mongoose.model('DownloadLead', schema);
