const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sku:{
    type:String,
    required:true,
    unique:true
  },
  name: {
    type: String,
    require: [true, "Please Enter product Name"],
    trim: true,
  },
  size: {
    type: String,
  },
  refundable: {
    type: Boolean,
    required: true,
  },
  rating: {
    type: String,
  },
  shippingInfo: {
    type: String,
  },

  description: {
    type: String,
    require: [true, " Please Enter product Description"],
  },
  price: {
    type: Number,
    require: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
    {
      url: {
        type: String,
        required: true,
      },
    },
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  gender: {
    type: String,
    require: [true, "Please Enter Product Category"],
  },
  stock: {
    type: Number,
    default:1,
    maxLength: [4, "Stocks cannot exceed 4 characters"],
  },
  discount:{
    type:Boolean,
    default:false,
    discountPercentage:{
      type: Number,
      default:0
    }
  }
});

module.exports = mongoose.model("Product", productSchema);
