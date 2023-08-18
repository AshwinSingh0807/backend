const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Product = require("../models/products");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/user");
dotenv.config();

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  const name = username;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
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
      return res
        .status(404)
        .json({ message: "Invalid email, user not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: "User not found", err });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const exist = await User.findByIdAndDelete(req.userId);
    if (exist) {
      exist.isDeleted = true;
      await exist.save();

      res.status(200).json({ message: "Profile deleted successfully." });
    } else {
      res.status(404).json({ message: "User does not exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error." });
  }
};

// create updateCart(productId, quantity)
exports.updateCart = async (req, res) => {
  // check if user exist!
  const { userId, productId, quantity } = req.body;

  // check if product exist
  const user = User.findById(userId);
  if (!user) {
    res.status(404).json({ message: "User not found, kindly Signup first." });
  }
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product is not available right now." });
    }
    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    // yes, update quantity
    if (cartItem) {
      if (quantity < 1) {
        // if(quantity<1)=> remove product.
        user.cart = user.cart.filter(
          (item) => item.productId.toString() !== productId.toString()
        );
      } else {
        cartItem.quantity = quantity;
      }
    }
      // no, add product and quantity
    else{
         user.cart.push({ productId: productId, quantity });
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Cart updated successfully" });
    // await user.save();
  } catch (err) {
    res.status(500).json({ message: "Cart cannot be updated" });
  }
};


// exports.addToCart = async(req,res) =>{
//   const { userId } = req.params;
//   const { productId, quantity } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }

//     const product = await Product.findById(productId);

//     if (!product) {
//       return res.status(404).json({ message: 'Product not found.' });
//     }

//     // user.addToCart(productId, quantity);
//     const cartItem = user.cart.find(item=> item.productId.equals(productId));
//     console.log(cartItem);
//       if (cartItem) {
//         cartItem.quantity += quantity;
//       } else {
//         user.cart.push({ productId: productId, quantity });
//       }

//       await user.save();

//     return res.status(201).json({ message: 'Item added to cart successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// }

// exports.removeFromCart = async (req, res) => {
//   const { userId } = req.params;
//   const { productId } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//     // console.log(user.cart)
//     user.cart = user.cart.filter(
//       (item) => item.productId.toString() !== productId.toString()
//     );
//     await user.save();

//     res.status(200).json({ message: 'Item removed from cart successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal server error.' });
//   }
// };

// exports.updateUser = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     user.name = name;
//     await user.save();

//     res.json({ message: "Profile updated successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };
