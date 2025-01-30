const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
