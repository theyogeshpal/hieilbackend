const nodemailer = require('nodemailer');

/**
 * Send an email using Nodemailer
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 */
const sendEmail = async (options) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or use host/port for other services
      auth: {
        user: process.env.SMTP_USER, // Your gmail address
        pass: process.env.SMTP_PASS, // Your gmail app password
      },
    });

    // Define email options
    const mailOptions = {
      from: `"${process.env.APP_NAME || 'Quotation System'}" <${process.env.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
