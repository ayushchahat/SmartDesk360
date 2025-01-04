const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// Helper function to generate a JWT token
const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// Register a new user
router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
}));

// Login user
router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({ id: user.id, name: user.name, email: user.email, token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}));

module.exports = router;
