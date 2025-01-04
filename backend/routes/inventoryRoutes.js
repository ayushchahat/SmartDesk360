import express from 'express';
import { addInventory, getExpiringProducts } from '../controllers/inventoryController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Add inventory
router.post('/add', protect, asyncHandler(addInventory));

// Get expiring products
router.get('/expiring', protect, asyncHandler(getExpiringProducts));

export default router;
