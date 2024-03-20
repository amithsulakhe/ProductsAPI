const productModel = require("../db/models/product");

const getAllProducts = async (req, res) => {
  const myProducts = await productModel.find({});
  console.log(productModel.find());
  res.status(200).json({ myProducts });
};

const getAllTestingProducts = async (req, res) => {
  const { company, name, price, sort, select } = req.query;
  const queryObj = {};
  if (company) {
    queryObj.company = company;
  }
  if (name) {
    // { $regex: name, $options: "i" }; it give if name starts with dell give all results
    queryObj.name = { $regex: name, $options: "i" };
  }
  if (price) {
    queryObj.price = price;
  }
  let productData = productModel.find(queryObj);

  //sorting in ascending and descending order
  if (sort) {
    let sortPrefix = sort.replace(",", " ");
    productData = productData.sort(sortPrefix);
  }

  // it return only selected fields
  if (select) {
    let selectPrefix = select.split(",").join(" ");
    productData = productData.select(selectPrefix);
  }

  // pagination

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 3;
  let skip = (page - 1) * limit;
  productData = productData.skip(skip).limit(limit);

  // filter based on query
  const myProducts = await productData;
  res.status(200).json({ myProducts, nbHits: myProducts.length });
};

module.exports = { getAllProducts, getAllTestingProducts };
