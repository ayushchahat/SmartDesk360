const Inventory = require('../models/Inventory');
const Return = require('../models/returnModel');

const processReturn = async (req, res) => {
    const { productId, quantity, discount = 0, actualMoneyReceived } = req.body;

    if (!productId || !quantity || discount < 0 || discount > 100) {
        return res.status(400).json({ message: 'Invalid input data.' });
    }

    const session = await Inventory.startSession();
    session.startTransaction();

    try {
        const product = await Inventory.findById(productId).session(session);
        if (!product) {
            throw new Error('Product not found');
        }

        if (product.quantity < quantity) {
            throw new Error('Insufficient quantity in stock for return');
        }

        const returnPrice = product.purchasePrice * quantity * ((100 - discount) / 100);
        const returnData = new Return({
            product: product.name,
            inventoryId: product._id,
            quantity,
            returnPrice,
            discountApplied: discount,
            moneyReceived: actualMoneyReceived || returnPrice,
        });

        product.quantity -= quantity;
        if (product.quantity <= 0) {
            await product.remove({ session });
        } else {
            await product.save({ session });
        }

        const createdReturn = await returnData.save({ session });
        await session.commitTransaction();
        res.status(201).json(createdReturn);
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

module.exports = { processReturn };
