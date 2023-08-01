const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Please Enter product Name"],
    trim: true,
  },
  description: {
    type: String,
    require: [true, " Please Enter product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
   { url: {
      type: String,
      required: true,
    }},
   { url: {
      type: String,
      required: true,
    }},
   { url: {
      type: String,
      required: true,
    }},
],
  category: {
    type:String,
    required:[true,"Please Enter Product Category"]
  },
  stock:{
    type:Number,
    required:[true,"Please Enter Product Stock"],
    maxLength:[4,"Stocks cannot exceed 4 characters"]
  },reviews:{
    type:Number,
    required:false
  }
});

module.exports = mongoose.model("Product", productSchema)
