const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io", // ✅ for Mailtrap
  port: 2525,
  auth: {
    user: "bd48b6fb8f71a1", // get from Mailtrap > Email Sandbox > SMTP Settings
    pass: "1d75a5c2a97d9f",
  },
});

module.exports = transporter;
