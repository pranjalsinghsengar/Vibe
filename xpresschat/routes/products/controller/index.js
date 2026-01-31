// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
import Product from "../model/index.js";
// import User from "../../user/model/index.js";
// import Configuration from "../../configuration/model/index.js"
// import { generateTenantId } from "../helper/index.js";
// import { generateUserId } from "../../user/helper/index.js";
// import { generateAccessToken, generateRefreshToken } from "../../../middleware/jwt.js"
// import crypto from 'crypto';

// Create Tenant with Superadmin User
export const Bulkcreate = async (req, res) => {
  try {
    const productArray = req.body.products;

    if (!Array.isArray(productArray) || productArray.length === 0) {
      return res.status(400).json({ error: "Products array is required and cannot be empty." });
    }

    const insertedProducts = await Product.insertMany(productArray);
    res.status(201).json({
      message: `${insertedProducts.length} products inserted successfully.`,
      data: insertedProducts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Tenant Details
// Bulkcreate
export const getTenantDetails = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Tenant not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tenant details fetched successfully",
      tenant,
    });
  } catch (error) {
    console.error("Error fetching tenant details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
