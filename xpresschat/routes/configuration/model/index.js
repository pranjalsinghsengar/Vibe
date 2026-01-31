import mongoose from "mongoose";

const configurationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      name: { type: String },
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      province: { type: String },
      zip: { type: String },
      country: { type: String },
      province_code: { type: String },
      country_code: { type: String },
    },
    server_domain: { type: String },
    logo: { type: String },
    frontend_domain: { type: String },
    ui_theme_colour: { type: Object },
    // subscription: {
    //   plan: {
    //     type: String,
    //     enum: ["free", "basic", "premium", "enterprise"],
    //     default: "free",
    //     required: true,
    //   },
    //   startDate: {
    //     type: Date,
    //     default: Date.now,
    //   },
    //   endDate: {
    //     type: Date,
    //     required: true,
    //   },
    //   status: {
    //     type: String,
    //     enum: ["active", "inactive", "expired"],
    //     default: "active",
    //   },

    // },
    // logo: {
    //   url: { type: String },
    //   upload: { type: Boolean, default: false },
    // },
    // theme: {
    //   primaryColor: { type: String, default: "#0000FF" },
    //   secondaryColor: { type: String, default: "#FF0000" },
    // },
    // activeUsers: { type: Number, default: 0 },
    // userLimit: { type: Number, default: 100 },
    admin: {
      adminName: { type: String },
      adminId: { type: String },
      adminObjId: { type: String },
      adminEmail: { type: String },
      adminPhone: { type: String },
    },
    // features: { type: [String], default: [] },
    // preferences: {
    //   language: { type: String, default: "en" },
    //   timeZone: { type: String, default: "UTC" },
    //   referralCode: { type: String },
    // },
    // billing: {
    //   paymentMethod: { type: String, enum: ["credit_card", "paypal", "bank_transfer"], default: "credit_card"},
    //   billingCycle: { type: String, enum: ["monthly", "annually"], default: "monthly" },
    // },
    banking_detials: { type: Object },
    status: { type: String, enum: ["active", "suspended", "deleted"], default: "active" },
  },
  { timestamps: true }
);

const Configuration = mongoose.model("configuration", configurationSchema);
export default Configuration;