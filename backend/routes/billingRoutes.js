const express = require('express');
const { createBill } = require('../controllers/billingController');
const router = express.Router();

router.post('/create', createBill);

module.exports = router;
