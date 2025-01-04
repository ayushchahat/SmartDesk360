import Inventory from '../models/Inventory.js';
import Billing from '../models/billingModel.js';

const createBill = async (req, res) => {
    const { productId, quantity, price } = req.body;

    try {
        const product = await Inventory.findById(productId);
        if (!product || product.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock or product not found' });
        }

        const total = quantity * price;
        const bill = new Billing({ product: product.name, quantity, price, total });

        product.quantity -= quantity;
        if (product.quantity <= 0) {
            await product.remove();
        } else {
            await product.save();
        }

        const createdBill = await bill.save();
        res.status(201).json(createdBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createBill };
