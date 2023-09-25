const { Schema, model } = require("mongoose");
const commonSchema = require("../../utils/commonSchema");

const { validateEmail, validatePassword } = require("./user.validation");

const userSchema = new Schema({
  name: { type: String, required: "name is required" },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
    validate: [
      validatePassword,
      "Password must be at least 8 character with a number and special char",
    ],
  },
  isActive: { type: Boolean, default: true },
  isEmailVerified: { type: Boolean, default: false },
  ...commonSchema,
});

module.exports = model("User", userSchema);
