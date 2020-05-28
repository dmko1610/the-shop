const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  let cartProductIndex, updatedCartItems;	
  try {	
    cartProductIndex = this.cart.items.findIndex(	
      (cp) => cp.productId.toString() === product._id.toString()	
    );	
    updatedCartItems = [...this.cart.items];	
  } catch {	
    cartProductIndex = -1;	
    updatedCartItems = [];	
  }	

  let newQuantity = 1;	
  if (cartProductIndex >= 0) {	
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;	
    updatedCartItems[cartProductIndex].quantity = newQuantity;	
  } else {	
    updatedCartItems.push({	
      productId: product._id,	
      quantity: newQuantity,	
    });	
  }	
  const updatedCart = {	
    items: updatedCartItems,	
  };

  this.cart = updatedCart;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
