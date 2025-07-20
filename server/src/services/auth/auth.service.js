const otpModel = require("../../models/otp.model");
const { getOtpPayload, sendOtpMail } = require("./auth.helper");
async function sendOtp(identifier) {
  //insert otp into otp collection using otp model
  const otp = getOtpPayload(identifier);
  await otpModel.create(otp);

  //send email to the provided email
  await sendOtpMail(identifier, otp.otp);
}
module.exports = {
  sendOtp,
};
