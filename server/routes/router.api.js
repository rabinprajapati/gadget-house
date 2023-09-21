const router = require("express").Router();
const userRouter = require("../modules/users/user.api");

router.get("/", (req, res, next) => {
  res.json({ data: "", apiroute: "//" });
});

router.use("/users", userRouter);

router.get("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "No such routes found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
