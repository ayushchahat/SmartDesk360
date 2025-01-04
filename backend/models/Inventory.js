// Inventory.js
import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: String,
  specifics: String,
  dateOfPurchase: Date,
  quantity: Number,
  purchasePrice: Number,
  discount: Number,
  mrp: Number,
  expiryDate: Date,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;  // Default export
