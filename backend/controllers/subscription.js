const Subscription = require("../models/Subscription");

const createSubscription = async (req, res) => {
  const { items, vendor } = req.body;
  const sub = await Subscription.create({ items, vendor });
  res.json(sub);
};

const getSubscriptions = async (req, res) => {
  const { id: vendor } = req.params;
  console.log(vendor);
  const subscriptions = await Subscription.find({ vendor }).populate(
    "items.productId"
  );
  res.json({ nHits: subscriptions?.length || 0, subscriptions });
};

module.exports = {
  createSubscription,
  getSubscriptions,
};
