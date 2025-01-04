const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
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
module.exports = Inventory;
