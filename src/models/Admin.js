const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'subadmin'], default: 'subadmin' },
  permissions: [String],
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });
module.exports = mongoose.model('Admin', schema);
