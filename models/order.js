const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productData: {
        product: { type: Object, required: true },
        quantity: { type: Number, required: true },
      },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
