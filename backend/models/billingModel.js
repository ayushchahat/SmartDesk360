const mongoose = require('mongoose');

const billingSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    specifics: { type: String, required: false }, // Optional SKU details like flavor, weight, etc.
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
    paymentMethod: { type: String, required: true }, // Cash, card, etc.
    customerName: { type: String, required: false }, // Optional customer name for billing
  },
  { timestamps: true }
);

const Billing = mongoose.model('Billing', billingSchema);

module.exports = Billing;
