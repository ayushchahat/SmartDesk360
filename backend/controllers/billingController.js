import Inventory from '../models/Inventory.js';
import Billing from '../models/billingModel.js';

const createBill = async (req, res) => {
    const { productId, quantity, price } = req.body;

    if (!productId || !quantity || !price) {
        return res.status(400).json({ message: 'Product ID, quantity, and price are required.' });
    }

    const session = await Inventory.startSession();
    session.startTransaction();

    try {
        const product = await Inventory.findById(productId).session(session);
        if (!product || product.quantity < quantity) {
            throw new Error('Insufficient stock or product not found');
        }

        const total = quantity * price;
        const bill = new Billing({ product: product.name, quantity, price, total });

        product.quantity -= quantity;
        if (product.quantity <= 0) {
            await product.remove({ session });
        } else {
            await product.save({ session });
        }

        const createdBill = await bill.save({ session });
        await session.commitTransaction();
        res.status(201).json(createdBill);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

export { createBill };
