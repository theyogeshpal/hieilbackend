require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./src/models/Product');

const productsToSeed = [
  { 
    category: 'Handcrafted Blue Pottery', 
    subCategory: 'Luxury Dining & Tableware', 
    productName: 'Serving Tray', 
    tag: 'TOP PICK', 
    highlight: 'Bestseller',
    sizes: '21 x 11.5 x 5 cm', 
    materials: 'Quartz stone powder, glass dust, multani mitti', 
    colors: 'Blue, White, Yellow', 
    hsnCode: '69120010', 
    productCode: 'HP-BLU-050', 
    price: '₹2,500', 
    offerPrice: '₹1,999', 
    discount: '20%', 
    stock: '45', 
    mainImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=150', 
    description: 'This exquisitely handcrafted serving tray features traditional blue pottery motifs. Perfect for hosting or as a decorative centerpiece.', 
    craftsmanship: 'Blue Pottery is uniquely made without clay, utilizing a dough of quartz stone powder, glass, and multani mitti, painted intricately by hand.', 
    shipping: 'Ships within 3-5 business days. Free returns within 7 days.' 
  },
  { 
    category: 'Handcrafted Wooden Products', 
    subCategory: 'Preparation Tools', 
    productName: 'Acacia Wood Cutting Board', 
    tag: 'NEW ARRIVAL', 
    highlight: 'Eco-Friendly',
    sizes: '35 x 25 x 3 cm', 
    materials: '100% Solid Acacia Wood', 
    colors: 'Natural Wood Grain', 
    hsnCode: '44199090', 
    productCode: 'HW-CB-101', 
    price: '₹1,800', 
    offerPrice: '₹1,500', 
    discount: '16%', 
    stock: '120', 
    mainImage: 'https://images.unsplash.com/photo-1593922379374-1311029e2f97?w=150', 
    description: 'A heavy-duty, beautiful cutting board crafted from sustainable acacia wood. Resistant to knife scratches and easy to clean.', 
    craftsmanship: 'Hand-sanded and finished with food-grade mineral oil by expert carpenters from Saharanpur.', 
    shipping: 'Ships within 2 business days. Available for express delivery.' 
  }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hieil').then(async () => {
  console.log('Connected to DB');
  await Product.deleteMany({}); // Clear existing products
  await Product.insertMany(productsToSeed);
  console.log('Products seeded successfully!');
  mongoose.connection.close();
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});
