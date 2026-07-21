const express = require('express');
const router = express.Router();
const crudRouter = require('./crudRouter');
const FAQ = require('../models/FAQ');
const FaqCategory = require('../models/FaqCategory');

const faqsData = [
  { question: 'Company Overview', answer: 'We are a company that sends a lot of Indian handicrafts to other countries. We want to keep the ways of making things alive while making sure our products are good enough for people all around the world to buy. Indian handicrafts are very important to us. We want people to know that we are serious, about Indian handicrafts. ', category: 'Information' },
  { question: 'WHAT CATEGORIES DO WE EXPORT?', answer: `We export handmade items.These items include:\n\n* Wooden products\n* pottery\n* Textiles\n* Metal art\n* Home decor pieces\n\nWe make wooden categories and other items by hand.Our products are blue pottery, textiles, metal art and home decor.We export a lot of handcrafted items.these are all made by craftsmen.Our handcrafted items are popular worldwide.We focus on making categories, blue pottery and textiles.Our metal art and home decor pieces are also well-known.`, category: 'Information' },
  { question: 'Where Are We Located?', answer: 'Our main office is in India.We have groups of skilled artisans in different states.These groups help us get the crafts.We work with artisans across states to source the finest crafts.Our headquarters, in India oversees this network.', category: 'Information' },
  { question: 'How To Place An Order?', answer: 'You can place an order with the sales team at our company. They are available, by email. You can call them on the phone. The sales team can also be reached by filling out the contact form on our website. This is a way to get in touch with the sales team and place an order with them. ', category: 'Orders' },
  { question: 'Shipping And Delivery', answer: `We offer shipping all around the world.The time it takes to deliver depends on where you're how big your order is.We make sure to get your order to you fast, as possible.Shipping times can vary depending on the destination and order size.We do our best to ship orders out quickly.`, category: 'Shipping' },
  { question: 'Payment Terms', answer: 'We take a lot of payment methods that are safe. These include T/T, SWIFT, PayPal and Letter of Credit when you are placing an order. We like to make it easy for you to pay for orders so we take multiple payment methods, like T/T and SWIFT and PayPal and Letter of Credit. ', category: 'Payment' },
  { question: 'Quality Assurance', answer: 'Our team checks every product carefully to make sure it is good before we pack it up and send it out. We have a lot of experience doing this. Every product has to meet our standards. We do not send it. Our team is very good at finding problems, with the products. They check every product. ', category: 'Quality' },
  { question: 'Contact Information', answer: 'You can get in touch with India Export at any time the day and night by calling the phone number +91 9050001972. If you prefer to send a message you can email India Export, at indiaexport@hieil.com. ', category: 'Contact' }
];

router.get('/seed', async (req, res) => {
  try {
    const count = await FAQ.countDocuments();
    if (count > 0) return res.json({ message: 'FAQs already seeded' });
    
    // Create categories
    const categoryNames = [...new Set(faqsData.map(f => f.category))];
    for (const name of categoryNames) {
      const existingCat = await FaqCategory.findOne({ category: name });
      if (!existingCat) {
        await FaqCategory.create({ category: name });
      }
    }
    
    // Create FAQs
    await FAQ.insertMany(faqsData);
    
    res.json({ message: 'FAQs seeded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.use('/', crudRouter(FAQ));

module.exports = router;
