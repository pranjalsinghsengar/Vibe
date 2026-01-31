import bcrypt from "bcrypt";
import mongoose from "mongoose";
import configuration from "../model/index.js";
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
export const createConfiguration = async (req, res) => {
  console.log(">>>>req.user", req.user)
  try {
    const {
      username, //avinash
      email, //avinash@gmail.com
      tenantname,//0clik
      phone,//9856743567
      password,//admin@12345
      address,//{"name":"John Doe","line1":"123 Main Street","line2":"Apt 4B","city":"New York","province":"New York","zip":"10001","country":"United States","province_code":"NY","country_code":"US"}
      server_domain, //http://localhost:
      frontend_domain,
      features,
      logo,
      ui_theme_colour,
      preferences,//{"language":"en","timeZone":"UTC","referralCode":"ABC123XYZ"}
      billing,//{"paymentMethod":"paypal","billingCycle":"annually"}
      status,//{"status":"active"}
    } = req.body;

    console.log(JSON.stringify(req.body));
    // Validate required fields
    if (!username || !email || !password || !tenantname) {
      return res.status(400).json({
        success: false,
        message:
          "username, email, password, and tenantname details are required.",
      });
    }

    // Find the tenant
    const tenant = await configuration.findOne({ email: email });
    if (tenant) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {Tenant}",
      });
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {User}",
      });
    }

    // Create the tenant
    const tenantId = await generateTenantId();
    console.log(tenantId);
    const newTenant = new configuration({
      id: tenantId,
      name: tenantname,
      email,
      phone,
      logo,
      ui_theme_colour,
      address: address,
      frontend_domain,
      server_domain: server_domain,
      status: status || "active",
    });

    console.log("newTenant", newTenant);

    await newTenant.save();

    // Hash password for the superadmin
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let userId = await generateUserId();

    // Create Superadmin user for the tenant
    const superadminUser = new User({
      id: userId,
      name: username,
      email,
      phone,
      password: hashedPassword,
      userType: "superadmin",
      tenant: {
        tenantObjId: newTenant?._id,
        tenantId: newTenant?.id,
        tenantName: newTenant?.name,
      },
      address,
      permissions: [],
      priceChart: {}

    });

    await superadminUser.save();

    // Assign admin details to the tenant
    newTenant.admin = {
      adminName: superadminUser?.name,
      adminId: superadminUser?.id,
      adminObjId: superadminUser?._id,
      adminEmail: superadminUser?.email,
      adminPhone: superadminUser?.phone,
    };
    await newTenant.save();

    return res.status(201).json({
      success: true,
      message: "Tenant and Superadmin user created successfully",
      tenant: newTenant,
      user: superadminUser,
    });
  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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
