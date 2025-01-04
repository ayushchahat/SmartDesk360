const mongoose = require('mongoose');

const returnSchema = mongoose.Schema(
  {
    product: { type: String, required: true }, // Name of the product
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true }, // Link to inventory
    quantity: { type: Number, required: true }, // Quantity being returned
    returnPrice: { type: Number, required: true }, // Calculated return price
    discountApplied: { type: Number, default: 0 }, // Discount applied on the return
    moneyReceived: { type: Number, default: 0 }, // Actual money received from the supplier
    supplier: { type: String, required: true }, // Supplier's name or ID
    reason: { type: String, enum: ['Expired', 'Damaged', 'Other'], default: 'Other' }, // Reason for return
  },
  { timestamps: true }
);

const Return = mongoose.model('Return', returnSchema);
module.exports = Return;
