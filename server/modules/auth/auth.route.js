const router = require("express").Router();
const Controller = require("./auth.controller");

router.post("/register", async (req, res, next) => {
  try {
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "user created" });
  } catch (error) {
    next(error);
  }
});
router.get("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Email or password missing");
    const result = await Controller.login(email, password);
    res.json({ data: result, msg: "user login success" });
  } catch (error) {
    next(error);
  }
});
router.post("/verify", async (req, res, next) => {
  try {
    const { email, token } = req.body;
    if (!email || !token) throw new Error("Email or token missing");
    const result = await Controller.verifyEmail(email, token);
    res.json({ data: result, msg: "user verified success" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
