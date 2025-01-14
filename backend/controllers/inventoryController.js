const Inventory = require('../models/Inventory');
const { validationResult } = require('express-validator'); // Optional for better validation handling

// Logic to create new inventory
const addInventory = async (req, res) => {
    const { name, specifics, dateOfPurchase, quantity, purchasePrice, discount, mrp, expiryDate } = req.body;

    if (!name || !dateOfPurchase || !quantity || !purchasePrice || !mrp || !expiryDate) {
        return res.status(400).json({ message: 'All required fields must be provided.' });
    }

    try {
        const inventory = new Inventory({
            name,
            specifics,
            dateOfPurchase: new Date(dateOfPurchase),
            quantity,
            purchasePrice,
            discount: discount || 0,
            mrp,
            expiryDate: new Date(expiryDate),
        });

        const createdInventory = await inventory.save();
        res.status(201).json(createdInventory);
    } catch (error) {
        res.status(400).json({ message: `Error creating inventory: ${error.message}` });
    }
};

// Logic to get expiring products
const getExpiringProducts = async (req, res) => {
    try {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setMonth(today.getMonth() + 1);

        const expiringProducts = await Inventory.find({ expiryDate: { $lte: nextMonth } });
        res.status(200).json(expiringProducts);
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

module.exports = { addInventory, getExpiringProducts };
