import mongoose from 'mongoose';

const billingSchema = mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
}, { timestamps: true });

const Billing = mongoose.model('Billing', billingSchema);
export default Billing;
