const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
const validatePassword = (password) => {
  if (password.length < 8) return false;
};

module.exports = { validateEmail, validatePassword };
