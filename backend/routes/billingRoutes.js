import express from 'express';
import { createBill } from '../controllers/billingController.js';

const router = express.Router();

router.post('/create', createBill);

export default router;
