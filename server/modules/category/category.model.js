const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");

const categorySchema = new Schema({
  name: { type: String, required: "name is required" },
  slug: { type: String },
  alias: [{ type: String }],
  ...commonSchema,
});

module.exports = model("Category", categorySchema);
