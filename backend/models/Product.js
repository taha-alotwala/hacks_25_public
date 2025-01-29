const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: [true, "Please provide price"],
  },
  harvest_date: {
    type: Date,
    required: [true, "Please provide harvest date"],
  },
  organic: {
    type: Boolean,
    default: false,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: [true, "Please provide vendor"],
  },
});

module.exports = mongoose.model("Product", productSchema);
