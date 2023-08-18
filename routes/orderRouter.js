// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const {
  allOrders, order, newOrder
} = require("../controllers/orderControllers")

const authMiddleware = require('../middlewares/authMiddleware');

router.route('/').get(authMiddleware, allOrders).post(authMiddleware, newOrder);;
router.route('/:orderId').get(authMiddleware, order);

module.exports = router;
