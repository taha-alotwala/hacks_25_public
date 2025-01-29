const Vendor = require("../models/Vendor");

const getVendors = async (req, res) => {
  const vendors = await Vendor.find({});
  res.json({ nHits: vendors?.length || 0, vendors });
};

const createReview = async (req, res) => {
  res.json({ msg: "Hello", data: req.body });
};

module.exports = { getVendors, createReview };
