const generateOtp = () => {
  //generate random 4 digit number
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const getOtpExpireAtAndDeleteAt = () => {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
  const deleteAt = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour
  return { expiresAt, deleteAt };
};

module.exports = {
  generateOtp,
  getOtpExpireAtAndDeleteAt,
};
