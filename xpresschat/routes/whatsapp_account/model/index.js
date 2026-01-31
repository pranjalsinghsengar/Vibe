import mongoose from "mongoose";

const whatsappAccountSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    tenant_id: {
      type: String,
      required: true,
    },
    configuration_id: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    WHATSAPP_BUSINESS_ACCOUNT_ID: {
      type: String,
      default: "null",
    },
    PHONE_NUMBER: {
      type: String,
      default: "null",
    },
    PHONE_NUMBER_ID: {
      type: String,
      default: "null",
    },
    Callback_URL: {
      type: String,
      default: "null",
    },
    callbackUrl_Verify_token: {
      type: String,
      default: "null",
    },
    meta_api_access_token: {
      type: String,
      default: "null",
    },
    inficonnect_api_key: {
      type: String,
      default: "null",
    },
    client_webhook_url: {
      type: String,
      default: "null",
    },
    api_enable: {
      type: Boolean,
      // required: true,
      default: false,
    },
    meta_webhook_modification: {
      type: Boolean,
      // required: true,
      default: true,
    },
    flow_enable: {
      type: Boolean,
      default: false,
    },
    bot_enable_type: {
      type: Object,
      default: {
                "Whatsapp Bot": "whatsapp_business_account",
            },
    },
    walletBalance: {
      type: Number,
      default: 0
    },
    status: { type: String, enum: ["created","active", "suspended", "deleted"], default: "created" },
  },
  { timestamps: true }
);

const WhatsappAccount = mongoose.model("whatsapp_account", whatsappAccountSchema);
export default WhatsappAccount;