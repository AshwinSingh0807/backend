const Order = require("../models/orders")
const User = require("../models/user")

exports.allOrders = async (req, res) => {
    try {
      const { userId } = req.body;
      const orders = await Order.find({ userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.',err });
    }
  };

  exports.order = async (req, res) => {
    try {
      const { orderId } = req.params; 
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }
      const productIds = order.products.map(item => item.productId);

      res.json({ order, productIds });
    } catch (err) {
      res.status(500).json({ message: 'Internal server error.' });
    }
  };

  exports.newOrder = async (req, res) => {

    try {
      const { userId, totalPrice } = req.body;
      const user = await User.findOne({_id: userId})
      const obj = user.toObject();

      let ans = []
      for(let i=0; i<obj.cart.length; i++){
        let id = obj.cart[i].product;
        let quantity = obj.cart[i].quantity
        ans.push({
          productId: id,
          quantity
        })
      }

      const od = new Order({
        userId: userId,
        products: ans,
        totalPrice: totalPrice
      })
    const checkoutOrder =   await od.save()
      user.cart=[]
      await user.save();
      
      res.status(201).json(checkoutOrder)
      
    } catch (err) {
      res.status(500).json({ message: 'Error while placing order.',err });
    }
  }