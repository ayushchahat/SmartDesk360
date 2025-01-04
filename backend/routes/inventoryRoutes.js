const express = require('express');
const { addInventory, getExpiringProducts } = require('../controllers/inventoryController');
const router = express.Router();

router.post('/add', addInventory);
router.get('/expiring', getExpiringProducts);

module.exports = router;
