const express = require('express');
const { processReturn } = require('../controllers/returnController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Process a product return
router.post('/process', protect, asyncHandler(processReturn));

module.exports = router;
