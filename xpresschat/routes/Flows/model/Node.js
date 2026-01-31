import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
const NodeSchema = new mongoose.Schema({
  uniqueid: { type: String, unique: true, required: true, default: uuidv4 }, // Ensuring unique identifier for each node
  flow_id: { type: String, required: true },
  account_id: { type: String, required: true }, // Each node belongs to a brand
  type: { type: String, enum: ["text", "button", "query", "image"], required: true },
  content: { type: Object, required: true },
  metadata: { type: Object },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Node", NodeSchema);
