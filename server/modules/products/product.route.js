const router = require("express").Router();
const Controller = require("./product.controller");

router.get("/", async (req, res, next) => {
  try {
    const result = await Controller.list();
    res.json({ data: result, msg: "success" });
  } catch (error) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    req.body.created_by = req.currentUser;
    const result = await Controller.create(req.body);
    res.json({ data: result, msg: "success" });
  } catch (error) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await Controller.getById(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (error) {
    next(e);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    req.body.updated_by = req.currentUser;
    const result = await Controller.updateById(req.params.id, req.body);
    res.json({ data: result, msg: "success" });
  } catch (error) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await Controller.remove(req.params.id);
    res.json({ data: result, msg: "success" });
  } catch (error) {
    next(e);
  }
});

module.exports = router;
