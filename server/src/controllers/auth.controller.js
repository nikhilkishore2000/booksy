const { sendOtp } = require("../services/auth/auth.service");
/**
 * @route POST /api/auth/send-otp
 */
async function sendOtpController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    await sendOtp(email);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch {
    return res.status(500).json({ message: "Failed to send OTP" });
  }
}

module.exports = {
  sendOtpController,
};
