const express = require('express');
const router = express.Router();
const { sendQuotation } = require('../controllers/quotationController');

// Route to handle sending quotation emails
router.post('/send', sendQuotation);

module.exports = router;
