// models/User.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: 'user' },
  address: { type: String },
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number },
      total: { type: Number },
      shippingTime: { type: String },
    },
  ],
});
const User = mongoose.model('User', userSchema);

module.exports = User;
