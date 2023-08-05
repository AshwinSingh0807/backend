// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// POST /api/cart/add: Add a product to the user's cart.
router.post('/add', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex !== -1) {
      // If the product already exists, update the quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT /api/cart/update/:productId: Update the quantity of a product in the user's cart.
router.put('/update/:productId', async (req, res) => {
  try {
    const { userId } = req.body;
    const productId = req.params.productId;
    const newQuantity = req.body.quantity;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const productIndex = cart.products.findIndex(
      (product) => product.productId.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    cart.products[productIndex].quantity = newQuantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
