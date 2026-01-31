import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
dotenv.config();

const DbUrl = process.env.MONGO_URL;
export const PORT = process.env.PORT || 5050;

const connectDatabase = async () => {
  try {
    await mongoose.connect(DbUrl);
    console.log("connected to database");
  } catch (error) {
    console.log("connection failed..", error.message);
  }
};

export default connectDatabase;

export const secretKey = process.env.JWT_SECRETKEY;

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_API_PASSWORD = "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";
const SHOPIFY_STORE = "yassi1store.myshopify.com";

export const shopifyAxios = axios.create({
  baseURL: `https://${SHOPIFY_STORE}/admin/api/2023-10`,
  headers: {
    "X-Shopify-Access-Token": SHOPIFY_API_PASSWORD,
    "Content-Type": "application/json"
  }
});