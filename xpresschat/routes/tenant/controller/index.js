import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Tenant from "../model/index.js";
import User from "../../user/model/index.js";
import Configuration from "../../configuration/model/index.js"
import { generateTenantId } from "../helper/index.js";
import { generateUserId } from "../../user/helper/index.js";
import {generateAccessToken,generateRefreshToken} from "../../../middleware/jwt.js"
import  crypto  from 'crypto';

// Create Tenant with Superadmin User
export const createTenantWithSuperadmin = async (req, res) => {
  try {
    const {
      username, //avinash
      email, //avinash@gmail.com
      tenantname,//0clik
      phone,//9856743567
      password,//admin@12345
      address,//{"name":"John Doe","line1":"123 Main Street","line2":"Apt 4B","city":"New York","province":"New York","zip":"10001","country":"United States","province_code":"NY","country_code":"US"}
      features,
      preferences,//{"language":"en","timeZone":"UTC","referralCode":"ABC123XYZ"}
      billing,//{"paymentMethod":"paypal","billingCycle":"annually"}
      status,//{"status":"active"}
    } = req.body;
    const {config_id}=req.query
    console.log(">>>>>>",req.query);
    const configuration_data=await Configuration.findOne({id:config_id })
    console.log(">>>>>>27",configuration_data); 
    const {server_domain}=configuration_data
    console.log(">>>>>>",server_domain);
    

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
    const tenant = await Tenant.findOne({email:email});
    if (tenant) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {Tenant}",
      });
    }
    const user = await User.findOne({email:email});
    if (user) {
      return res.status(400).json({
        success: false,
        message: "an account with this email already exists {User}",
      });
    }

    // Create the tenant
    const tenantId = await generateTenantId();
    console.log(tenantId);
    

    const newTenant = new Tenant({
      id: tenantId,
      name:tenantname,
      email,
      phone,
      address: address,
      configuration_id:config_id,
      subscription: {
        plan: "free",
        startDate: Date.now(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        status: "active",
      },
      logo: {
        url: "",
        upload: false,
      },
      theme: {
        primaryColor: "#0000FF",
        secondaryColor: "#FF0000",
      },
      features: features || [],
      preferences: preferences || {},
      billing,
      status: status || "active",
    });

    console.log("newTenant",newTenant);

    await newTenant.save();

    // Hash password for the superadmin
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let userId = await generateUserId();

    // Create Superadmin user for the tenant
    const superadminUser = new User({
      id : userId,
      name:username,
      email,
      phone,
      password: hashedPassword,
      userType: "admin",
      tenant: {
        tenantObjId:newTenant?._id,
        tenantId: newTenant?.id,
        tenantName: newTenant?.name,
      },
      address,
      permissions: [],
      priceChart:{
        "image":5,
        "text":1
      }
    });

    await superadminUser.save();
    const accessToken = generateAccessToken(superadminUser._id,superadminUser.id,email);
    const refreshToken = generateRefreshToken(superadminUser._id,superadminUser.id,email);
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
      accessToken,
      refreshToken
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
