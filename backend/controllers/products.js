const path = require("path");
const Product = require("../models/Product");
const { io } = require("../socket/socket");
const { BadRequestError } = require("../errors");

const getAllProducts = async (req, res) => {
  const products = await Product.find({ vendor: req.user.userId });
  res.json({ nHits: products?.length || 0, products });
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

const updateProduct = async (req, res) => {
  const {
    params: { id: productId },
    user: { userId },
    body: { price },
  } = req;
  if (!price) {
    throw new BadRequestError("Price must be provided");
  }
  console.log({ productId, userId });
  const product = await Product.findOneAndUpdate(
    { _id: productId, vendor: userId },
    req.body,
    { new: true, runValidators: true }
  );
  res.json({ product });
  io.emit("price-update", { product });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
};
