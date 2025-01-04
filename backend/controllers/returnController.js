import Inventory from '../models/Inventory.js';
import Return from '../models/returnModel.js';

const processReturn = async (req, res) => {
    const { productId, quantity, discount, actualMoneyReceived } = req.body;

    try {
        const product = await Inventory.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const returnPrice = product.purchasePrice * quantity * ((100 - discount) / 100);
        const returnData = new Return({
            product: product.name,
            quantity,
            returnPrice,
            moneyReceived: actualMoneyReceived || returnPrice,
        });

        product.quantity -= quantity;
        if (product.quantity <= 0) {
            await product.remove();
        } else {
            await product.save();
        }

        const createdReturn = await returnData.save();
        res.status(201).json(createdReturn);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { processReturn };
