// routes/users.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require('../models/user');

// POST /api/users/signup: Register a new user.
router.post('/signup', async (req, res ) => {
  try {
    const { name, email, password } = req.body;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// POST /api/users/login: Authenticate and log in a user.
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Middleware to verify the JWT token
const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized.' });
  }
};

// GET /api/users/profile: Get the profile of the currently logged-in user.
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// PUT /api/users/profile: Update the profile of the currently logged-in user.
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.name = name;
    await user.save();

    res.json({ message: 'Profile updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// DELETE /api/users/profile: Delete the profile of the currently logged-in user.
router.delete('/profile', authMiddleware, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.userId);
    res.json({ message: 'Profile deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
