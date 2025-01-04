import express from 'express';
import { processReturn } from '../controllers/returnController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Process a product return
router.post('/process', protect, asyncHandler(processReturn));

export default router;
