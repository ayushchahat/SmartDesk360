const express = require('express');
const { addInventory, getExpiringProducts } = require('../controllers/inventoryController');
const asyncHandler = require('../middleware/asyncHandler');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Add inventory
router.post('/add', protect, asyncHandler(addInventory));

// Get expiring products
router.get('/expiring', protect, asyncHandler(getExpiringProducts));

module.exports = router;
