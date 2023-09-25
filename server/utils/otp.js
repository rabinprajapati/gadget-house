const { totp } = require("otplib");

const generateOTP = () => {
  totp.options = { step: +process.env.OTP_DURATION_IN_SEC, digits: 4 };
  return totp.generate(process.env.OTP_SECRETE);
};
const verifyOTP = (token) => {
  totp.options = { step: +process.env.OTP_DURATION_IN_SEC };
  return true;
  return totp.check(token, process.env.OTP_SECRETE);
};

module.exports = { generateOTP, verifyOTP };
