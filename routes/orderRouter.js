// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  allOrders, order, newOrder
} = require("../controllers/orderControllers")

const authMiddleware = require('../middlewares/authMiddleware');

router.route('/allOrders').get(authMiddleware, allOrders);
router.route('/newOrder').post(authMiddleware, newOrder);
router.route('/:orderId').get(authMiddleware, order);

module.exports = router;
