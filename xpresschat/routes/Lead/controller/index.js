import bcrypt from "bcrypt";
import mongoose from "mongoose";
import LeanManagement from "../model/index.js";
import User from "../../user/model/index.js";
import { generateTenantId } from "../helper/index.js";
import { generateUserId } from "../../user/helper/index.js";

export const getConfiguration = async (req, res) => {
  try {
    const tenantId = req.headers.origin;
    console.log(">>>>>req.headers", req.headers, req.headers.origin, req.header)
    if (req.headers.origin == "http://localhost:3013")
      req.headers.origin = "https://vodafone.myindiabazar.com"
    const tenant = await configuration.findOne({ frontend_domain: req.headers.origin }, { ui_theme_colour: 1, logo: 1 });
    // cono
    if (!tenant) {
      return res.status(404).json({
        success: false,
        message: "Invalid domain",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Details fetched successfully",
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
}
// Create Tenant with Superadmin User
export const createLead = async (req, res) => {
  try {
    const newLeanManagementEntry = new LeanManagement({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      tenantName: req.body.tenantName,
      phoneNumber: req.body.phoneNumber,
      companyName: req.body.companyName,
      addressLine: req.body.addressLine,
      city: req.body.city,
      zipCode: req.body.zipCode,
      county: req.body.county,
      comment: req.body.comment
    });

    // Save entry to the database
    const savedEntry = await newLeanManagementEntry.save();
    res.status(200).json({ message: 'Lean Management information saved successfully!', savedEntry });
  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
};

// Get Tenant Details
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
