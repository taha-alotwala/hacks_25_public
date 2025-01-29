const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  purchasedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please fill the purchased by field"],
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide products"],
    },
  ],
  totalAmount: {
    type: Number,
    required: [true, "Please provide total amount"],
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Order", orderSchema);
