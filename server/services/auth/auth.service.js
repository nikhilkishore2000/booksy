const { findOtpByIdentifier, createOtp } = require("../../repo/otp/otp.repo");
const { sendOtpMail } = require("./auth.helper");
const { generateOtp, getOtpExpireAtAndDeleteAt } = require("../../utils/utils");

const sendOtp = async (identifier) => {
  let otpRecord = await findOtpByIdentifier(identifier);
  const now = new Date();
  const { expiresAt, deleteAt } = getOtpExpireAtAndDeleteAt();
  const generatedOtp = generateOtp(); // e.g., 4-digit number

  if (otpRecord) {
    const isExpired = otpRecord.expiresAt <= now;

    if (otpRecord.isUsed || isExpired) {
      // Update existing OTP record
      otpRecord.otp = generatedOtp;
      otpRecord.isUsed = false;
      otpRecord.expiresAt = expiresAt;
      otpRecord.deleteAt = deleteAt;
      await otpRecord.save();
    }
  } else {
    // No existing OTP: create a new one
    otpRecord = {
      identifier,
      otp: generatedOtp,
      isUsed: false,
      expiresAt,
      deleteAt: deleteAt,
    };
    await createOtp(otpRecord);
  }

  // Send OTP via email
  await sendOtpMail(identifier, otpRecord.otp);
};

module.exports = {
  sendOtp,
};
