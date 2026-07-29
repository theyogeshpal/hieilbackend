const express = require('express');
const VendorPayout = require('../models/VendorPayout');
const crudRouter = require('./crudRouter');

const router = express.Router();

// Custom route to release a payout
router.put('/:id/release', async (req, res, next) => {
  try {
    const payout = await VendorPayout.findByIdAndUpdate(
      req.params.id,
      { status: 'Released' },
      { new: true }
    );
    if (!payout) return res.status(404).json({ message: 'Payout not found' });
    res.json(payout);
  } catch (err) {
    next(err);
  }
});

router.use('/', crudRouter(VendorPayout));

module.exports = router;
