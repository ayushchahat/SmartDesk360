const express = require('express');
const { createBill } = require('../controllers/billingController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a bill
router.post('/create', protect, asyncHandler(createBill));

module.exports = router;
