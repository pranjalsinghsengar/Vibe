import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  id: { type: String },
  tanent_id: { type: String },
  type: { type: String },
  conf_id: { type: String },
  price: Number,
  enable: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

// module.exports = mongoose.model("Transaction", transactionSchema);
const transactionModel = mongoose.model("charges", planSchema);

export default transactionModel;