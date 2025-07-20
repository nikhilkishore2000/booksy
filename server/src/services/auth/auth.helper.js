const { getOtpExpireAtAndDeleteAt, generateOtp } = require("../../utils/utils");
const transporter = require("../../config/nodemailer.config");

function getOtpPayload(identifier) {
  const otp = generateOtp();
  const { expiresAt, deleteAt } = getOtpExpireAtAndDeleteAt();
  return {
    otp,
    identifier,
    expiresAt,
    deleteAt,
  };
}

async function sendOtpMail(toEmail, otp) {
  const mailOptions = {
    from: "\"Booksy Auth\" <no-reply@booksy.com>", // sender name + email
    to: toEmail, // recipient
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 5 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = {
  getOtpPayload,
  sendOtpMail,
};
