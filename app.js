const express = require("express")
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())

const product = require("./routes/productRoute")
app.use("/api/products", product);

const user = require("./routes/userRoute")
app.use('/api/users', user);


const cartRoute = require('./routes/cartRoute');
app.use('/api/cart', cartRoute);

const orderRoutes = require('./routes/orderRouter');
app.use('/api/orders', orderRoutes);


module.exports = app;