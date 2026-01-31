import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  resource: { type: String, required: true },
  actions: { type: [String], required: true },
});

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String },
    password: { type: String, required: true },
    id: { type: String, unique: true },
    wallet: { type: Number, default: 100 },
    tenant: {
      tenantObjId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tenant",
      },
      tenantId: { type: String },
      tenantName: { type: String },
    },
    permissions: [PermissionSchema],
    userType: {
      type: String,
      enum: ["admin", "agent", "superadmin", "user", "masteradmin"],
      default: "user",
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
    verificationDetails: {
      isPhoneVerified: { type: Boolean, default: false },
      isEmailVerified: { type: Boolean, default: false },
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    lastLogin: { type: Date },
    media: {
      profile: { type: String, default: null },
    },
    preferences: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
      },
      language: { type: String, default: "en" },
      theme: { type: String, enum: ["light", "dark"], default: "light" },
    },
    walletBalance: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
