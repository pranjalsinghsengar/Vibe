import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const FlowSchema = new mongoose.Schema({
  uniqueid: { type: String, unique: true, required: true,default: uuidv4 }, // Ensuring unique identifier for each node
  name: { type: String, required: true },
  account_id: { type: String, required: true }, // WhatsApp Number
//   api_key: { type: String, required: true, unique: true }, // Security Token for API calls
  status: { type: String, enum: ["active", "in-active"], required: true },
   created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  body_payload:{ type: Object, required: true },
});

export default mongoose.model("Flow", FlowSchema);
