const bcrypt = require("bcryptjs");
const userModel = require("../users/user.model");
const authModel = require("./auth.model");
const { generateOTP, verifyOTP } = require("../../utils/otp");
const { mailer } = require("../../services/mail");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const token = generateOTP();
  await authModel.create({ email: payload.email, token: token });
  await mailer(payload.email, token);
  return userModel.create(rest);
};
const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("User not activated, contact admin");
  if (!user.isEmailVerified) throw new Error("User not verified");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Incorrect email or password");
  return true;
};

const verifyEmail = async (email, token) => {
  //check email exists
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("No user found");
  //token verify
  const isValidToken = verifyOTP(token);
  if (!isValidToken) throw new Error("Invalid token");

  const isValid = user?.token === token;
  if (!isValid) throw new Error(" token expired");
  await userModel.findOneAndUpdate(
    { email },
    { isEmailVerified: true },
    { new: true }
  );
};

module.exports = { create, login, verifyEmail };
