require("dotenv").config();

const connectDB = require("./db/connect");
const productModel = require("./db/models/product");
const productJson = require("./products.json");
const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB);
    await productModel.create(productJson);
  } catch (err) {
    console.log(err);
  }
};

start();
