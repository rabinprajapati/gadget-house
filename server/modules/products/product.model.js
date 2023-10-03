const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const commonSchema = require("../../utils/commonSchema");

const productSchema = new Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  description: { type: String, required: true, maxLength: 250 },
  image: [{ type: String }],
  category: { type: ObjectId, ref: "Category" },
  ...commonSchema,
});

module.exports = model("Product", productSchema);
