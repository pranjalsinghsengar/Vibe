import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    conf_id: { type: String },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    transaction_id: {
        type: String
    },
    minAmount: {
        type: Number,
        required: true,
    },
    maxAmount: {
        type: Number,
        required: true,
    },
    multiplier: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true, // plan is inactive by default
    },
    startDate: {
        type: Date,

    },
    expireDate: {
        type: Date,

    },
    isExpirable: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

// module.exports = mongoose.model("Transaction", transactionSchema);
const transactionModel = mongoose.model("plan", planSchema);

export default transactionModel;