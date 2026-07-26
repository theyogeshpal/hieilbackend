const express = require('express');
const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const [
      categories, products, orders, blogs, payments
    ] = await Promise.all([
      require('../models/Category').countDocuments(),
      require('../models/Product').countDocuments(),
      require('../models/Order').countDocuments(),
      require('../models/Blog').countDocuments(),
      require('../models/Payment').find({}, { amount: 1 }).lean()
    ]);

    const revenue = payments.reduce((sum, p) => {
      const amt = parseFloat(String(p.amount || '0').replace(/[^0-9.]/g, '')) || 0;
      return sum + amt;
    }, 0);

    const avgRate = orders > 0 ? Math.round(revenue / orders) : 0;

    res.json({ categories, products, orders, blogs, revenue, avgRate });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/latest-orders', async (req, res) => {
  try {
    const orders = await require('../models/Order').find().sort({ createdAt: -1 }).limit(5);
    res.json(orders);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/reports', async (req, res) => {
  try {
    const [
      inquiries, quotations, orders, pendingInvoices, vendorPayoutsDue, payments,
      totalShipments, inTransitShipments, deliveredShipments
    ] = await Promise.all([
      require('../models/Inquiry').countDocuments(),
      require('../models/Quotation').countDocuments(),
      require('../models/Order').countDocuments(),
      require('../models/Invoice').countDocuments({ status: { $in: ['Pending', 'Unpaid', 'pending'] } }),
      require('../models/VendorPayout').countDocuments({ status: { $in: ['Hold', 'Pending', 'pending', 'hold'] } }),
      require('../models/Payment').find({}, { amount: 1 }).lean(),
      require('../models/Shipping').countDocuments(),
      require('../models/Shipping').countDocuments({ status: { $regex: /in transit/i } }),
      require('../models/Shipping').countDocuments({ status: { $regex: /delivered/i } })
    ]);

    const gstCollected = payments.reduce((sum, p) => {
      const amt = parseFloat(String(p.amount || '0').replace(/[^0-9.]/g, '')) || 0;
      // Rough estimation: assuming GST is included in the amount, we will just return a simple calc or 0
      return sum + (amt * 0.18); 
    }, 0);

    res.json({
      inquiries,
      quotations,
      orders,
      pendingPayments: pendingInvoices,
      vendorPayoutsDue,
      gstCollected,
      totalShipments,
      inTransitShipments,
      deliveredShipments
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
