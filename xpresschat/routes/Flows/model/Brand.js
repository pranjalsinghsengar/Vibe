import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  uniqueid: { type: String, unique: true, required: true }, // Ensuring unique identifier for each node
  name: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true }, // WhatsApp Number
  api_key: { type: String, required: true, unique: true }, // Security Token for API calls
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("Brand", BrandSchema);
