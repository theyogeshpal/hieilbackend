const Quotation = require('../models/Quotation');

const sendQuotation = async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail,
      mobile,
      product, 
      quantity, 
      country, 
      rate, 
      gstPercent, 
      subtotal, 
      gstAmount, 
      totalAmount, 
      budget,
      validTill 
    } = req.body;

    // Generate Quote No
    const quoteNo = 'QT-' + Date.now().toString().slice(-6);

    // Save to Database
    const quotation = new Quotation({
      quoteNo,
      customer: customerName,
      customerEmail,
      mobile,
      country,
      product,
      qty: quantity,
      rate,
      gstPercent,
      subtotal,
      gstAmount,
      total: totalAmount,
      budget,
      validTill,
      status: 'Sent',
      type: 'inquiry'
    });
    
    await quotation.save();

    res.status(200).json({ success: true, message: 'Quotation generated and saved successfully.', quoteNo });
  } catch (error) {
    console.error('Create Quotation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to create quotation. ' + error.message });
  }
};

module.exports = {
  sendQuotation
};
