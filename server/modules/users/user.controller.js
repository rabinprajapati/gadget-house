const Model = require("./user.model");
const bcrypt = require("bcryptjs");

const list = () => {
  return Model.find();
};

const findById = (id) => {
  return Model.findOne({ _id: id });
};

const updateProfile = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, payload) => {
  const { newPassword, oldPassword } = payload;
  const user = Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) throw new Error("Incorrect password");
  const hashPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS);
  Model.findOneAndUpdate(
    { _id: id },
    { password: hashPassword },
    { new: true }
  );
  return true;
};

const resetPassword = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  await userModel.findOneAndUpdate({ email }, hashPassword, { new: true });
  return true;
};

const block = async (id, payload) => {
  const { isActive } = payload;
  await userModel.findOneAndUpdate({ _id: id }, isActive, { new: true });
  return true;
};
const archive = async (id, payload) => {
  const { isArchived } = payload;
  await userModel.findOneAndUpdate({ _id: id }, isArchived, { new: true });
  return true;
};

module.exports = {
  archive,
  block,
  changePassword,
  findById,
  list,
  resetPassword,
  updateProfile,
};
