const router = require("express").Router();
const Controller = require("./user.controller");
const secureAPI = require("../../utils/secure");

router.get("/", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const users = await Controller.list();
    res.json({ data: users, msg: "user list success" });
  } catch (error) {
    next(e);
  }
});
router.get("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const users = await Controller.findById(req.params.id);
    res.json({ data: users, msg: "user list success" });
  } catch (error) {
    next(e);
  }
});
router.post("/forget-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("Email or token missing");
    const result = await Controller.forgetPassword(email);
    res.json({ data: result, msg: "user forget password success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
