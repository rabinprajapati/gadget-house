const router = require("express").Router();
const userRouter = require("../modules/users/user.api");
const authRouter = require("../modules/auth/auth.route");
const categoryRouter = require("../modules/category/category.route");
const productRouter = require("../modules/products/product.route");

router.get("/", (req, res, next) => {
  res.json({ data: "", apiroute: "//" });
});

router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/categories", categoryRouter);
router.use("/products", productRouter);

router.get("*", (req, res, next) => {
  try {
    res.status(404).json({ data: "", msg: "No such routes found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
