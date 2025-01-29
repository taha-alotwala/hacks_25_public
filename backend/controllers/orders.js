const { BadRequestError, NotFoundError } = require("../errors");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({ purchasedBy: req.user.userId });
  res.json({ nHits: orders?.length || 0, orders });
};

const getTotal = async (items) => {
  let ans = 0;
  for (let { productId, quantity } of items) {
    if (!productId || !quantity || quantity < 1) {
      throw new BadRequestError("invalid items list");
    }

    const product = await Product.findOne({ _id: productId });
    // console.log(product);
    if (!product) {
      throw new NotFoundError("invalid items list");
    }
    ans += product.price * quantity;
  }

  return ans;
};

const createOrder = async (req, res) => {
  const purchased_by = req.user.userId;
  const { items } = req.body;
  if (items.length <= 0) {
    throw new BadRequestError("Items list must not be empty");
  }

  const totalAmount = await getTotal(items);

  const order = await Order.create({
    purchasedBy: req.user.userId,
    items,
    totalAmount,
  });

  res.json({ order });
};

module.exports = {
  getAllOrders,
  createOrder,
};
