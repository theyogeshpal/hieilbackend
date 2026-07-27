const sendEmail = require('../utils/sendEmail');
const Quotation = require('../models/Quotation');

const sendQuotation = async (req, res) => {
  try {
    const { 
      customerName, 
      customerEmail, // We need this field in the frontend!
      product, 
      quantity, 
      country, 
      rate, 
      gstPercent, 
      subtotal, 
      gstAmount, 
      totalAmount, 
      validTill 
    } = req.body;

    if (!customerEmail) {
      return res.status(400).json({ success: false, message: 'Customer Email is required to send the quotation.' });
    }

    // Generate Quote No
    const quoteNo = 'QT-' + Date.now().toString().slice(-6);

    // Save to Database
    const quotation = new Quotation({
      quoteNo,
      customer: customerName,
      customerEmail,
      country,
      product,
      qty: quantity,
      rate,
      gstPercent,
      subtotal,
      gstAmount,
      total: totalAmount,
      validTill,
      status: 'Sent',
      type: 'inquiry'
    });
    
    await quotation.save();

    // Create a beautiful HTML email template
    const htmlTemplate = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="background-color: #1e293b; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">OFFICIAL QUOTATION</h1>
        </div>
        
        <div style="padding: 30px; background-color: #ffffff;">
          <p style="font-size: 16px; color: #334155; margin-bottom: 20px;">Dear <strong>${customerName}</strong>,</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">Thank you for your inquiry. Please find the details of your requested quotation below:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 25px 0;">
            <tbody>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold; width: 40%;">Product</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">${product}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Quantity</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">${quantity}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Country</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">${country}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Rate (per unit)</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">$${rate}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">Subtotal</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">$${subtotal}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b; font-weight: bold;">GST (${gstPercent}%)</td>
                <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 500;">$${gstAmount}</td>
              </tr>
              <tr style="background-color: #f8fafc;">
                <td style="padding: 15px 12px; border-bottom: 2px solid #cbd5e1; color: #0f172a; font-weight: bold; font-size: 16px;">Total Amount</td>
                <td style="padding: 15px 12px; border-bottom: 2px solid #cbd5e1; color: #22c55e; font-weight: bold; font-size: 18px;">$${totalAmount}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="background-color: #fffbeb; border: 1px solid #fde68a; padding: 15px; border-radius: 6px; margin-top: 20px;">
            <p style="margin: 0; color: #92400e; font-size: 14px;"><strong>Note:</strong> This quotation is valid until <strong>${validTill}</strong>.</p>
          </div>
          
          <p style="font-size: 14px; color: #64748b; margin-top: 30px; text-align: center;">If you have any questions, please feel free to reply to this email.</p>
        </div>
      </div>
    `;

    // Send email
    await sendEmail({
      to: customerEmail,
      subject: `Your Quotation for ${product}`,
      html: htmlTemplate,
    });

    res.status(200).json({ success: true, message: 'Quotation sent successfully via email.' });
  } catch (error) {
    console.error('Send Quotation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to send quotation email. ' + error.message });
  }
};

module.exports = {
  sendQuotation
};
