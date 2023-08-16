const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware")
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productControllers");

router.route("/products").get(getAllProducts);
router.route("/product/new").post(authMiddleware , adminMiddleware, createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(authMiddleware , adminMiddleware,updateProduct)
  .delete(authMiddleware , adminMiddleware,deleteProduct)

module.exports = router;
