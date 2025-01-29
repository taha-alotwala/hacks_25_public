const path = require("path");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  const products = await Product.find({ vendor: req.user.userId });
  res.json({ products });
};

const createProduct = async (req, res) => {
  const productImage = req.files.image;
  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please Upload Image");
  }
  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  const product = await Product.create({
    ...req.body,
    vendor: req.user.userId,
    image: `uploads/${productImage.name}`,
  });
  res.json({ product });
};

module.exports = {
  getAllProducts,
  createProduct,
};
