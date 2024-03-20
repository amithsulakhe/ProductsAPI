const express = require("express");
require("dotenv").config();
const app = express();
const Port = process.env.Port || 8000;
const product_router = require("../routes/product");
const connectDB = require("../db/connect");
// http://localhost:8000 it will go without path
app.get("/", (req, res) => {
  res.send("Hello this is Home Page");
});

// middle ware  http://localhost:8000/api/products now it will go
app.use("/api/products", product_router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    app.listen(Port, () => {
      console.log("connected successfully");
    });
  } catch (err) {
    console.log(err);
  }
};
start();
