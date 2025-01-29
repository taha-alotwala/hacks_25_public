const Product = require("../models/Product");

const getProductListings = async (req, res) => {
  const products = await Product.find({}).populate("vendor");
  res.json({ nHits: products?.length || 0, products });
};

const getProductsForVendor = async (req, res) => {
  const products = await Product.find({ vendor: req.params.id });
  res.json({ nHits: products?.length || 0, products });
};

module.exports = {
  getProductListings,
  getProductsForVendor,
};
