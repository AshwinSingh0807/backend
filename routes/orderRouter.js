// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Cart = require('../models/cart');

// POST /api/orders/create: Create a new order for the user's cart items.
router.post('/create', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    // Calculate the total price of the order
    const totalPrice = cart.products.reduce(
      (acc, product) => acc + product.quantity * product.productId.price,
      0
    );

    // Create the order
    const order = new Order({
      userId,
      products: cart.products,
      totalPrice,
    });

    await order.save();

    // Clear the user's cart after the order is created
    cart.products = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /api/orders/:orderId: Get details of a particular order by order ID.
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// GET /api/orders: Get a list of all orders for the currently logged-in user.
router.get('/', async (req, res) => {
  try {
    const { userId } = req.body;

    const orders = await Order.find({ userId });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
