import express from 'express';
import { addInventory, getExpiringProducts } from '../controllers/inventoryController.js';

const router = express.Router();

router.post('/add', addInventory);
router.get('/expiring', getExpiringProducts);

export default router;
