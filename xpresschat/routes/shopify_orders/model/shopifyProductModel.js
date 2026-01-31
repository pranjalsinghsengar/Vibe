// models/ShopifyProduct.js
import mongoose from "mongoose";

const shopifyProductSchema = new mongoose.Schema({
  shopifyProductId: { type: String, required: true, unique: true },
  data: { type: Object }, // raw Shopify product data
}, { timestamps: true });

const ShopifyProduct = mongoose.model("ShopifyProduct", shopifyProductSchema);
export default ShopifyProduct;
