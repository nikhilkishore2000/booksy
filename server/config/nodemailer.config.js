const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.NM_HOST, // ✅ for Mailtrap
  port: process.env.NM_PORT,
  auth: {
    user: process.env.NM_USER, // get from Mailtrap > Email Sandbox > SMTP Settings
    pass: process.env.NM_PASS,
  },
});

module.exports = transporter;
