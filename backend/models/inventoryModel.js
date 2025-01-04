import mongoose from 'mongoose';

const inventorySchema = mongoose.Schema({
    name: { type: String, required: true },
    specifics: { type: String },
    dateOfPurchase: { type: Date, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    discount: { type: Number },
    mrp: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);
export default Inventory;
