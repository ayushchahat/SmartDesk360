import express from 'express';
import { createBill } from '../controllers/billingController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a bill
router.post('/create', protect, asyncHandler(createBill));

export default router;
