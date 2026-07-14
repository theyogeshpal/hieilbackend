const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hieil')
  .then(async () => {
    console.log("Connected to MongoDB");
    const BlogCategory = require('./models/BlogCategory');
    const categories = await BlogCategory.find({});
    console.log("Blog Categories:", categories);
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
