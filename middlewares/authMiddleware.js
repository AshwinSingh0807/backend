// // const bcrypt = require("bcryptjs ");
// const jwt = require("jsonwebtoken");
// // const User = require("../models/user");

// exports.authMiddleware = (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, "your_secret_key_here");
//     req.userId = decoded.userId;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized." });
//   }
// };
