const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  category: String,
  subCategory: String,
  productName: { type: String, required: true },
  tag: String,
  highlight: String,
  sizes: String,
  materials: String,
  colors: String,
  hsnCode: String,
  productCode: String,
  price: String,
  offerPrice: String,
  discount: String,
  stock: String,
  craftHighlight: String,
  mainImage: String,
  addImg1: String,
  addImg2: String,
  addImg3: String,
  addImg4: String,
  addImg5: String,
  description: String,
  craftsmanship: String,
  shipping: String
}, { timestamps: true });
module.exports = mongoose.model('Product', schema);
