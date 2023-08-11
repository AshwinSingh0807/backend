const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
  deleteUser,
  addToCart,
} = require("../controllers/userControllers");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

router
  .route("/profile")
  .get(authMiddleware, getUserProfile)
  .put(authMiddleware, updateUser)
  .delete(authMiddleware, deleteUser);
  router.route("/:userId/cart").put(authMiddleware,addToCart);
  

module.exports = router;

