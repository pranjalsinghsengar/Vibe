import mongoose from "mongoose";

const leanManagementSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  config_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "configurations"
  },
  configId: {
    type: String,
    // required: true
  },
  config:{
    type: mongoose.Schema.Types.Mixed, // 👈 any object
    default: {},                        // optional
  },
 enable: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const LeadManagement = mongoose.model('paymentgateway', leanManagementSchema);
export default LeadManagement
  ;