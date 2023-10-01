const Model = require("./product.model");

const create = (payload) => {
  return Model.create(payload);
};
const getById = (id) => {
  return Model.findOne({ _id: id });
};
const list = () => {
  return Model.find();
};
const updateById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const remove = (id) => {
  return Model.deleteOne({ _id: id });
};

module.exports = { create, list, getById, updateById, remove };
