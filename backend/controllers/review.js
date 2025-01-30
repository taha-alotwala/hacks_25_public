const Vendor = require("../models/Vendor");
const Review = require("../models/Review");

const getVendors = async (req, res) => {
  const vendors = await Vendor.find({});
  res.json({ nHits: vendors?.length || 0, vendors });
};

const createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.json({ review });
};

const getReviewsForVendor = async (req, res) => {
  const vendor = req.params.id;
  const reviews = await Review.find({ vendor });
  res.json({ reviews });
};

module.exports = { getVendors, createReview, getReviewsForVendor };
