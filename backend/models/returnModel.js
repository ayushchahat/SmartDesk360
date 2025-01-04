import mongoose from 'mongoose';

const returnSchema = mongoose.Schema({
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    returnPrice: { type: Number, required: true },
    moneyReceived: { type: Number },
}, { timestamps: true });

const Return = mongoose.model('Return', returnSchema);
export default Return;
