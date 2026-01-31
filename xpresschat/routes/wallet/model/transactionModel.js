import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  conf_id: { type: String },
  tenant_id: { type: String },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "plan"
  },
   account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "whatsapp_accounts"
  },
  amount: Number,
  prev_points: Number,
  points: Number,
  next_points: Number,
  approvedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  paymentReference: String, // UTR or note from user
  createdAt: {
    type: Date,
    default: Date.now
  },
  reciept_url: String
});

// module.exports = mongoose.model("Transaction", transactionSchema);
const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;