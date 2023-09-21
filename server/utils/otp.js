const { totp } = require("otplib");

const generateOTP = () => {
  totp.options = { steps: +process.env.OTP_SECRETE };
  return totp.generate(process.env.OTP_SECRETE);
};
const verifyOTP = (token) => {
  totp.options = { steps: +process.env.OTP_DURATION_IN_SEC };
  console.log(totp.check(token, process.env.OTP_SECRETE));
  // return totp.check(token, process.env.OTP_SECRETE);
  return true;
};

module.exports = { generateOTP, verifyOTP };
