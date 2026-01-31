import bcrypt from "bcrypt";
import mongoose from "mongoose";
import payment from "../model/index.js";
import User from "../../user/model/index.js";
import { generateTenantId } from "../helper/index.js";
import { generateUserId } from "../../user/helper/index.js";
import Tenant from "../../tenant/model/index.js";
import Configuration from "../../configuration/model/index.js"
import whatsapp_account from "../../whatsapp_account/model/index.js";
import Razorpay from "razorpay";
import Order from "../model/order.js"
import ApiRequestLog from "../../helper/model/apiRequestLog.js"
import { v4 as uuidv4 } from "uuid";



 

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
export const createpayment = async (req, res) => {
  try {
    console.log(">>>>40",req.user)
    const {name,config,status}=req.body
     const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
     console.log(">>>43",configuration_data)
    const newLeanManagementEntry = new payment({
    name: name,
    configId:configuration_data.id,
    config_id:configuration_data._id,
    config:config,
    enable:status
    });

    // Save entry to the database
    const savedEntry = await newLeanManagementEntry.save();
    res.status(200).json({ message: 'payment saved successfully!', savedEntry });

  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
};

export const getpayment = async (req, res) => {
  try {
    console.log(">>>>40",req.user)
     const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
     console.log(">>>43",configuration_data)
    const payment_data=await payment.find({
    configId:configuration_data.id,
    });

    // Save entry to the database
     
    res.status(200).json({ message: 'payment saved successfully!', payment_data});

  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
};

export const updatePaymentbyId = async (req, res) => {
  try {
    console.log(">>>>40",req.user)
    const {status,id,config}=req.body
    const updatedDoc = await payment.findByIdAndUpdate(
  id,                       // _id
  { config: config,enable:status } 
         // update fields
             // updated document return karega
);
    res.status(200).json({ message: 'payment updated successfully!', updatedDoc });

  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
};

export const deletePaymentbyId = async (req, res) => {
  try {
    const { id } = req.body;

const deletedDoc = await payment.findByIdAndDelete(id);

if (!deletedDoc) {
  return res.status(404).json({ message: "Record not found" });
}

res.json({
  message: "Payment config deleted successfully",
  data: deletedDoc
});
  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
};
export const makePayment= async (req,res)=>{
  try {
    console.log(">>>>40",req.user)
    const tenant_data = await Tenant.findOne({ "admin.adminId":req.user.user_id })
    console.log(">>67",tenant_data)
    const {configuration_id}=tenant_data
    const configuration_data = await Configuration.findOne({ id: configuration_id})
    console.log(">>",configuration_data)
    const account_data=await whatsapp_account.findOne({id:req.body.account_id})
    console.log(">>>>135",account_data)
   const pg_data=await  payment.findOne({config_id:configuration_data._id,enable:true,})
   if(!pg_data)
   return  res.status(200).json({success:false, message: 'Payment gate configuration error' });
  else 
   {
    switch (pg_data.name){
      case 'razorpay':
        {
          console.log(">>>>83",{
           key_id: pg_data.RAZORPAY_KEY_ID,
           key_secret: pg_data.RAZORPAY_KEY_SECRET
         })
          const razorpay = new Razorpay({
           key_id: pg_data.config.RAZORPAY_KEY_ID,
           key_secret: pg_data.config.RAZORPAY_KEY_SECRET
         });
         const options = {
      amount: req.body.amount*100, // INR → paise
      currency: "INR",
      receipt: uuidv4()
    };


    const order = await razorpay.orders.create(options);
    console.log(">>>ordr",order)
    await Order.create({
      orderId: order.id,
      billingAccount: {
        key: configuration_data.id+"_"+tenant_data.id+"_"+account_data.id,
        tenantId: tenant_data.id,
        configurationId: configuration_data.id,
        accountId: account_data.id,
        account_Id:account_data._id
      },
      amount: req.body.amount*100, // store in paise
      gateway:pg_data.name,
      purpose:req.body.purpose,
      status:order.status,
      metadata:order
    });
      res.status(200).json({ success:true,message: 'payment created successfully!', data: {...order,...({key:pg_data.config.RAZORPAY_KEY_ID,pg_name:pg_data.name})} });
        }
        break;
        default:
          return  res.status(200).json({success:false, message: 'Payment gate configuration error' });
    }
     


    // console.log(">>>pg_data",pg_data)
   }
    
    // const {name,config}=req.body
    //  const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
    //  console.log(">>>43",configuration_data)
    // const newLeanManagementEntry = new payment({
    // name: name,
    // config_id:configuration_data._id,
    // config:config
    // });

    // Save entry to the database
    // const savedEntry = await newLeanManagementEntry.save();
    // res.status(200).json({ message: 'payment saved successfully!', savedEntry });

  } catch (error) {
    // If validation fails, error messages will be here
    console.log(">>>204",error)
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
}

export const verifyPayment= async (req,res)=>{
  try {
    console.log(">>>>40",req.user)
    const {configuration_id} = await Tenant.findOne({ "admin.adminId":req.user.user_id })
    // console.log(">>67",tenant_data)
    const configuration_data = await Configuration.findOne({ id: configuration_id})
    console.log(">>",configuration_data)
   const pg_data=await payment.findOne({config_id:configuration_data._id,enable:true,})
   if(!pg_data)
   return  res.status(200).json({success:false, message: 'Payment gate configuration error' });
  else 
   {
    switch (pg_data.name){
      case 'razorpay':
        {
          try {
  console.log(">>>>83", {
    key_id: pg_data.config.RAZORPAY_KEY_ID,
    key_secret: pg_data.config.RAZORPAY_KEY_SECRET
  });

  const instance = new Razorpay({
    key_id: pg_data.config.RAZORPAY_KEY_ID,
    key_secret: pg_data.config.RAZORPAY_KEY_SECRET
  });

  const order =await  instance.orders.fetch(req.body.razorpay_order_id)
  console.log(">>>order", order);

  return res.status(200).json({
    success: true,
    message: "payment created successfully!",
    data: {
      ...order,
      key: pg_data.config.RAZORPAY_KEY_ID,
      pg_name: pg_data.name
    }
  });

} catch (error) {
  console.error("❌ Razorpay order creation failed:", error);

  return res.status(500).json({
    success: false,
    message: "Failed to create payment order",
    error: error?.error?.description || error.message
  });
}

        }
        break;
        default:
          return  res.status(200).json({success:false, message: 'Payment gate configuration error' });
    }
     


    // console.log(">>>pg_data",pg_data)
   }
    
    // const {name,config}=req.body
    //  const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
    //  console.log(">>>43",configuration_data)
    // const newLeanManagementEntry = new payment({
    // name: name,
    // config_id:configuration_data._id,
    // config:config
    // });

    // Save entry to the database
    // const savedEntry = await newLeanManagementEntry.save();
    // res.status(200).json({ message: 'payment saved successfully!', savedEntry });

  } catch (error) {
    // If validation fails, error messages will be here
    res.status(400).json({ message: 'Validation failed', error: error.errors });
  }
}

export const paymentWebhook= async(req,res)=>{
  try {
    await ApiRequestLog.create({
      service: "payment-service",
      endpoint: req.originalUrl,
      method: req.method,

      headers: req.headers,
      body: req.body,
      query: req.query,
      params: req.params,

      ipAddress:
        req.headers["x-forwarded-for"] || req.socket.remoteAddress,

      userAgent: req.headers["user-agent"],

       
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("API LOG SAVE FAILED", err);
  }
}
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
