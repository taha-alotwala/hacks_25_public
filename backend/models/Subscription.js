const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: [true, "Please provide vendor"],
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Please provide product ID"],
      },
      quantity: {
        type: Number,
        required: [true, "Please provide quantity"],
        min: 1,
      },
    },
  ],
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
