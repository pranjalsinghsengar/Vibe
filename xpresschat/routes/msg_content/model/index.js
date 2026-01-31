import mongoose from "mongoose";

const contentPriceSchema = new mongoose.Schema({
  userId: { type: String,default: null  }, // Linking User
  contentType: { type: String, required: true },
  subtypes: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
});

const ContentPrice = mongoose.model("ContentPrice", contentPriceSchema);
export default ContentPrice;