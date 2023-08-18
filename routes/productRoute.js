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

router.route("/").get(getAllProducts).post(authMiddleware , adminMiddleware, createProduct);
// router.route("/product/new")
router
  .route("/:id")
  .get(getProductDetails)
  .put(authMiddleware , adminMiddleware,updateProduct)
  .delete(authMiddleware , adminMiddleware,deleteProduct)

module.exports = router;
