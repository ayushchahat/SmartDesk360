import Inventory from '../models/inventoryModel.js';

// Logic to create new inventory
const addInventory = async (req, res) => {
    const { name, specifics, dateOfPurchase, quantity, purchasePrice, discount, mrp, expiryDate } = req.body;
    try {
        const inventory = new Inventory({ name, specifics, dateOfPurchase, quantity, purchasePrice, discount, mrp, expiryDate });
        const createdInventory = await inventory.save();
        res.status(201).json(createdInventory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Logic to get expiring products
const getExpiringProducts = async (req, res) => {
    try {
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(today.getDate() + 30);
        const expiringProducts = await Inventory.find({ expiryDate: { $lte: nextMonth } });
        res.status(200).json(expiringProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addInventory, getExpiringProducts };
