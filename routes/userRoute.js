const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleWare = require("../middlewares/adminMiddleware")

const {
  registerUser,
  loginUser,
  getUserProfile,
  deleteUser,
  updateCart,
  // removeFromCart
  // updateUser,
} = require("../controllers/userControllers");

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/cart").put(authMiddleware, updateCart);
router.route("/profile").get(authMiddleware, getUserProfile).delete(authMiddleware,adminMiddleWare, deleteUser);
  
  
  // .put(authMiddleware, updateUser)

module.exports = router;

