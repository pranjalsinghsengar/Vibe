import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const EdgeSchema = new mongoose.Schema({
  uniqueid: { type: String, unique: true, required: true, default: uuidv4 }, // Ensuring unique identifier for each node
  account_id: { type: String, required: true },
  from_node: { type: String, required: true },
  to_node: { type: String, required: true },
  flow_id:{ type: String, required: true },
  // condition_type: { type: String, enum: ["text", "button", "data_check"], required: true },
  // condition_value: { type: Object, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Edge", EdgeSchema);
