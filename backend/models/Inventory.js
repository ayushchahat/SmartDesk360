const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the product
    specifics: { type: String, required: true }, // SKU details (e.g., flavor, weight, volume)
    dateOfPurchase: { type: Date, required: true }, // Date of purchase
    quantity: { type: Number, required: true }, // Quantity purchased
    purchasePrice: { type: Number, required: true }, // Purchase price per unit
    discount: { type: Number, required: false, default: 0 }, // Discount received on purchase
    mrp: { type: Number, required: true }, // Maximum retail price
    expiryDate: { type: Date, required: true }, // Expiry date of the product
    isReturned: { type: Boolean, default: false }, // Flag to indicate if the product is returned
  },
  { timestamps: true } // Automatically add createdAt and updatedAt
);

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
