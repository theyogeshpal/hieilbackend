const mongoose = require('mongoose');
const Quotation = require('./src/models/Quotation');
const Order = require('./src/models/Order');
require('dotenv').config();

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/hieil');
    const acceptedQuotes = await Quotation.find({ status: 'Accepted' });
    console.log(`Found ${acceptedQuotes.length} accepted quotations.`);
    
    let createdCount = 0;
    for (const quote of acceptedQuotes) {
      const existingOrder = await Order.findOne({ quotation: quote.quoteNo });
      if (!existingOrder) {
        await Order.create({
          orderNo: 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000),
          quotation: quote.quoteNo,
          status: 'Processing',
          customer: quote.customer,
          country: quote.country,
          type: quote.type
        });
        createdCount++;
      }
    }
    console.log(`Created ${createdCount} new orders.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
migrate();
