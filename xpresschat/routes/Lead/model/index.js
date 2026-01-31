import mongoose from "mongoose";

const leanManagementSchema = new mongoose.Schema({
  fullName: {
    type: String,
    // required: true
  },
  emailAddress: {
    type: String,
    // required: true,
    // unique: true
  },
  tenantName: {
    type: String,
    // required: true
  },
  phoneNumber: {
    type: String,
    // required: true
  },
  companyName: String,
  addressLine: String,
  city: String,
  zipCode: String,
  county: String,
  comment: String
}, {
  timestamps: true
});

const LeadManagement = mongoose.model('LeadManagement', leanManagementSchema);
export default LeadManagement
  ;