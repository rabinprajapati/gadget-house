const productModel = require("../products/product.model");
const Model = require("./category.model");

const slugGenerator = (payload) => {
  return payload.toLowerCase(payload);
};

const create = (payload) => {
  payload.slug = slugGenerator(payload.name);
  return Model.create(payload);
};
const getById = (id) => {
  return Model.findOne({ _id: id });
};
const list = () => {
  return Model.find();
};
const updateById = (id, payload) => {
  if (payload.name) {
    payload.slug = slugGenerator(payload.name);
  }
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};
const remove = (id) => {
  const product = productModel.findOne({ category: id });
  if (product) {
    throw new Error(
      `Remove category form product name ${product.name} to continue`
    );
  }
  return Model.deleteOne({ _id: id });
};

module.exports = { create, list, getById, updateById, remove };
