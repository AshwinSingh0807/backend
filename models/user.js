// models/User.js
const mongoose = require("mongoose");
// const User = require("./user")
// const Product = require("../models/products")

const userSchema = mongoose.Schema({
  name: { type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: { type: String },
  isDeleted:{type:Boolean, default:false},
  role:{type:String, enum:["admin","user"], default:"user"},
  cart: [ 
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default:1 },
    },
  ],
});

// userSchema.methods.addToCart = async function (productId, quantity) {
//   const cartItem = this.cart.find(item=> item.productId.equals(productId));
// console.log(cartItem);
//   if (cartItem) {
//     cartItem.quantity += quantity;
//   } else {
//     this.cart.push({ product: productId, quantity });
//   }

//   await this.save();
//   return this;
// };

// userSchema.methods.removeFromCart = async function (productId) {
//   const cartItemIndex = this.cart.findIndex(item => item._id.equals(productId));

//   if (cartItemIndex !== -1) {
//     this.cart.splice(cartItemIndex, 1);
//     await this.save();
//   }
// }

const User = mongoose.model("User", userSchema);

module.exports = User;
