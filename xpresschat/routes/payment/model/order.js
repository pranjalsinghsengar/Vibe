import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true, // gateway order id
    },

    billingAccount: {
      key: {
        type: String,
        required: true,
        index: true, // 🔥 important
        // example: 20002_10001_30007
      },

      tenantId: {
        type: String,
        required: true,
      },

      configurationId: {
        type: String,
        required: true,
      },

      accountId: {
        type: String,
        required: true,
      },
       account_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "whatsapp_account",
      required: true,
    },
    },

    amount: {
      type: Number, // smallest unit
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    gateway: {
      type: String,
      enum: ["razorpay", "stripe", "payu"],
      required: true,
    },

    purpose: {
      type: String,
      enum: ["WALLET_TOPUP", "SUBSCRIPTION", "USAGE_BILLING"],
      required: true,
    },

    status: {
      type: String,
    //   enum: ["PENDING","CREATED", "PAID", "FAILED"],
      default: "PENDING",
    },

    metadata: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('order', orderSchema);
export default Order