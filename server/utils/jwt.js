const jwt = require("jsonwebtoken");

const generateJWT = ({ email }) => {
  return jwt.sign(
    {
      data: email,
    },
    "secret",
    { expiresIn: 24 * 60 * 60 }
  );
};
const verifyJWT = (token) => {
  jwt.verify(token, "secret", function () {
    console.log("sdjfh"); // bar
  });
};

module.exports = { generateJWT, verifyJWT };
