// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// // Register a new user "./signup"
// exports.registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Check if user with the given email already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists." });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the new user
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// // Authenticate and login user "./login"
// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if user with the given email exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid email ." });
//     }

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid password." });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ userId: user._id }, "your_secret_key_here");

//     res.json({ token });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// // Get profile of the current user "./profile" -getandput
// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password");
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
//   // try {
//   //   const allUsers = await User.find().select('-password');
//   //   res.json(allUsers);
//   // } catch (err) {
//   //   res.status(500).json({ message: 'Internal server error.' });
//   // }
// };

// // putprofile for the user "./profile"
// exports.updateUser = async (req, res) => {
//   try {
//     const { username } = req.body;
//     const user = await User.findById(req.userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     user.username = username;
//     await user.save();

//     res.json({ message: "Profile updated successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };

// // Delete user "./profile" delete
// exports.deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.userId);
//     res.json({ message: "Profile deleted successfully." });
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error." });
//   }
// };
