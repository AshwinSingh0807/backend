const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Product = require ("../models/products");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
const authMiddleware = require("../middlewares/authMiddleware");

dotenv.config();

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });

  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid email, user not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }

};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.name = name;
    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
     const exist = await User.findByIdAndDelete(req.userId);
     if(exist){
       res.status(200).json({ message: "Profile deleted successfully." });
     }
  else{
    res.status(404).json({message:"User does not exist."})
  }
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.addToCart = async(req,res) =>{
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    // console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    user.addToCart(productId, quantity);

    return res.status(200).json({ message: 'Item added to cart successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' });
  }
}

