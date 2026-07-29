const express = require('express');
const Shipping = require('../models/Shipping');
const Order = require('../models/Order');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const docs = await Shipping.find().sort({ createdAt: -1 }).lean();
    res.json(docs);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const doc = await Shipping.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', async (req, res) => {
  try {
    const doc = await Shipping.create(req.body);
    res.status(201).json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const existing = await Shipping.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    const doc = await Shipping.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    
    // If shipping is marked as Delivered, auto-update the linked order
    if (req.body.status === 'Delivered' && existing.status !== 'Delivered') {
      if (doc.orderNo) {
        await Order.findOneAndUpdate({ orderNo: doc.orderNo }, { status: 'Delivered' });
      }
    }

    res.json(doc);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const doc = await Shipping.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/bulk-delete', async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) return res.status(400).json({message: 'No IDs provided'});
    await Shipping.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
