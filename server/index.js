require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const indexRouter = require("./routes");

const app = express();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(() => {
  console.log("database connected successfully");
});

app.use(cors());
app.use(express.json());

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  const errMsg = err ? err.toString() : "something went wrong";
  res.status(500).json({ data: "", msg: errMsg });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
