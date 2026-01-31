import bcrypt from "bcrypt";
import mongoose from "mongoose";
import WhatsappAccount from "../../whatsapp_account/model/index.js";
import Tenant from "../../tenant/model/index.js"
import User from "../../user/model/index.js";
import Configuration from "../../configuration/model/index.js"
import { generateTenantId } from "../helper/index.js";
import { generateUserId } from "../../user/helper/index.js";
import crypto from 'crypto';
import jwt from "jsonwebtoken";
import { secretKey } from "../../../config/index.js"
import axios from "axios";
// Create Tenant with Superadmin User
export const createAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const whatsapp_data=await WhatsappAccount.findById(req.body.id)
    console.log(">>>>whatsapp data",whatsapp_data)
    const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token}=whatsapp_data
    if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})

     let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/v22.0/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?access_token=${meta_api_access_token}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : req.body.template
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response));
  console.log(JSON.stringify(response.data));
  return res.status(200).send({data:response.data})
})
.catch((error) => {
  console.log(">>>38", error.response);

  const statusCode = error.response?.status || 500;
  const errorData =
    error.response?.data ||
    error.message ||
    "Something went wrong";

  return res.status(statusCode).send({
    success: false,
    data: errorData,
  });
});
  return
    // const { name, account_type,
    //   WHATSAPP_BUSINESS_ACCOUNT_ID, //avinash
    //   PHONE_NUMBER, //avinash@gmail.com
    //   PHONE_NUMBER_ID,//0clik
    //   client_webhook_url,
    //   meta_api_access_token,
    //   status, api_enable, flow_enable, bot_enable_type//{"status":"active"}
    // } = req.body;
    // const callbackUrl_Verify_token = crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex token
    // console.log(JSON.stringify(req.body));

    // const tenant_data = await Tenant.findOne({ "admin.adminId": user_id });


    // if (!tenant_data) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid tenants",
    //   });
    // }


    // console.log(">>>>>>>>>50", tenant_data)
    // // Create the tenant

    // const tenantId = await generateTenantId();

    // const configuration_data = await Configuration.findOne({ id: tenant_data.configuration_id })
    // console.log(">>>>>>>>53", configuration_data)

    // const newTenant = new WhatsappAccount({
    //   id: tenantId,
    //   name,
    //   account_type,
    //   tenant_id: tenant_data.id,
    //   configuration_id: tenant_data.configuration_id,
    //   WHATSAPP_BUSINESS_ACCOUNT_ID,
    //   PHONE_NUMBER,
    //   PHONE_NUMBER_ID,
    //   callbackUrl_Verify_token,
    //   meta_api_access_token,
    //   client_webhook_url,
    //   flow_enable,
    //   api_enable,
    //   bot_enable_type,
    //   status: status || "active",
    // });

    // console.log("newTenant", newTenant);

    // await newTenant.save();
    // const Callback_URL = account_type == "web_bot" ? configuration_data.server_domain + "/api/webBot/message/webhook/" + tenant_data.configuration_id + "/" + tenant_data.id + "/" + newTenant.id : configuration_data.server_domain + "/api/whatsapp/message/webhook/" + tenant_data.configuration_id + "/" + tenant_data.id + "/" + newTenant.id
    // // Assign admin details to the tenant
    // newTenant.Callback_URL = Callback_URL;
    // const token = jwt.sign({ id: tenantId, user_id, PHONE_NUMBER_ID, WHATSAPP_BUSINESS_ACCOUNT_ID, meta_api_access_token }, secretKey);
    // newTenant.inficonnect_api_key = token
    // await newTenant.save();

    // return res.status(201).json({
    //   success: true,
    //   message: "Tenant and Superadmin user created successfully",
    //   tenant: newTenant,
    // });
  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const whatsapp_data=await WhatsappAccount.findById(req.body.id)
    console.log(">>>>whatsapp data",whatsapp_data)
    const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token}=whatsapp_data
    if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})

     let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/v22.0/${req.params.id}?access_token=${meta_api_access_token}`,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : req.body.template
};
axios.request(config)
.then((response) => {
  console.log(">>146")
  // console.log(JSON.stringify(response));
  // console.log(JSON.stringify(response.data));
  return res.status(200).send({data:response.data})
})
.catch((error) => {
  console.log(">>>38", error);

  const statusCode = error.response?.status || 500;
  const errorData =
    error.response?.data ||
    error.message ||
    "Something went wrong";

  return res.status(statusCode).send({
    success: false,
    data: errorData,
  });
});
  return
    // const { name, account_type,
    //   WHATSAPP_BUSINESS_ACCOUNT_ID, //avinash
    //   PHONE_NUMBER, //avinash@gmail.com
    //   PHONE_NUMBER_ID,//0clik
    //   client_webhook_url,
    //   meta_api_access_token,
    //   status, api_enable, flow_enable, bot_enable_type//{"status":"active"}
    // } = req.body;
    // const callbackUrl_Verify_token = crypto.randomBytes(32).toString('hex'); // Generates a 64-character hex token
    // console.log(JSON.stringify(req.body));

    // const tenant_data = await Tenant.findOne({ "admin.adminId": user_id });


    // if (!tenant_data) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid tenants",
    //   });
    // }


    // console.log(">>>>>>>>>50", tenant_data)
    // // Create the tenant

    // const tenantId = await generateTenantId();

    // const configuration_data = await Configuration.findOne({ id: tenant_data.configuration_id })
    // console.log(">>>>>>>>53", configuration_data)

    // const newTenant = new WhatsappAccount({
    //   id: tenantId,
    //   name,
    //   account_type,
    //   tenant_id: tenant_data.id,
    //   configuration_id: tenant_data.configuration_id,
    //   WHATSAPP_BUSINESS_ACCOUNT_ID,
    //   PHONE_NUMBER,
    //   PHONE_NUMBER_ID,
    //   callbackUrl_Verify_token,
    //   meta_api_access_token,
    //   client_webhook_url,
    //   flow_enable,
    //   api_enable,
    //   bot_enable_type,
    //   status: status || "active",
    // });

    // console.log("newTenant", newTenant);

    // await newTenant.save();
    // const Callback_URL = account_type == "web_bot" ? configuration_data.server_domain + "/api/webBot/message/webhook/" + tenant_data.configuration_id + "/" + tenant_data.id + "/" + newTenant.id : configuration_data.server_domain + "/api/whatsapp/message/webhook/" + tenant_data.configuration_id + "/" + tenant_data.id + "/" + newTenant.id
    // // Assign admin details to the tenant
    // newTenant.Callback_URL = Callback_URL;
    // const token = jwt.sign({ id: tenantId, user_id, PHONE_NUMBER_ID, WHATSAPP_BUSINESS_ACCOUNT_ID, meta_api_access_token }, secretKey);
    // newTenant.inficonnect_api_key = token
    // await newTenant.save();

    // return res.status(201).json({
    //   success: true,
    //   message: "Tenant and Superadmin user created successfully",
    //   tenant: newTenant,
    // });
  } catch (error) {
    console.error("Error creating tenant or superadmin:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get all accounts
// getAllAccount

export const getAccoundbyId = async (req, res) => {
   try {
    const user_id = req.user.user_id
    console.log(">>>req.params",req.params)
     
    const whatsapp_data=await WhatsappAccount.findById(req.body.id)
    console.log(">>>>whatsapp data",whatsapp_data)
    const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token,inficonnect_api_key,PHONE_NUMBER_ID}=whatsapp_data
    if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})

     let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/v22.0/${req.params.id}?access_token=${meta_api_access_token}`,
  headers: { 
     
  },
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  return res.status(200).send({data:response.data,inficonnect_api_key,meta_api_access_token,PHONE_NUMBER_ID})
})
.catch((error) => {
  console.log(error);
  return res.status(500).send({data:"error while creating template"})
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

export const deleteAccoundbyId = async (req, res) => {
   try {
    const user_id = req.user.user_id
    console.log(">>>req.params",req.params)
     
    const whatsapp_data=await WhatsappAccount.findById(req.body.id)
    console.log(">>>>whatsapp data",whatsapp_data)
    const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token,inficonnect_api_key}=whatsapp_data
    if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})

     let config = {
  method: 'delete',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/v22.0/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?hsm_id=${req.params.id}&name=${req.body.name}&access_token=${meta_api_access_token}`,
  headers: { 
     
  },
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  return res.status(200).send({data:response.data,inficonnect_api_key})
})
.catch((error) => {
  console.log(error);
  return res.status(500).send({data:error.response.data})
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

export const updateAccountById = async (req, res) => {
  try {
    const { id } = req.params; // WhatsApp account ID to update
    const user_id = req.user.user_id;

    const {
      name,
      account_type,
      WHATSAPP_BUSINESS_ACCOUNT_ID,
      PHONE_NUMBER,
      PHONE_NUMBER_ID,
      client_webhook_url,
      meta_api_access_token,
      status,
      api_enable,
      flow_enable,
      bot_enable_type,
    } = req.body;

    // Find the tenant that this admin belongs to
    const tenant_data = await Tenant.findOne({ "admin.adminId": user_id });

    if (!tenant_data) {
      return res.status(400).json({
        success: false,
        message: "Invalid tenant or unauthorized access",
      });
    }

    // Find the WhatsApp account that belongs to this tenant
    const whatsappAccount = await WhatsappAccount.findOne({
      id,
      tenant_id: tenant_data.id,
      configuration_id: tenant_data.configuration_id,
    });

    if (!whatsappAccount) {
      return res.status(404).json({
        success: false,
        message: "WhatsApp account not found or access denied",
      });
    }

    // Update only the fields that are provided in the request
    if (name !== undefined) whatsappAccount.name = name;
    if (account_type !== undefined) whatsappAccount.account_type = account_type;
    if (WHATSAPP_BUSINESS_ACCOUNT_ID !== undefined)
      whatsappAccount.WHATSAPP_BUSINESS_ACCOUNT_ID = WHATSAPP_BUSINESS_ACCOUNT_ID;
    if (PHONE_NUMBER !== undefined) whatsappAccount.PHONE_NUMBER = PHONE_NUMBER;
    if (PHONE_NUMBER_ID !== undefined) whatsappAccount.PHONE_NUMBER_ID = PHONE_NUMBER_ID;
    if (client_webhook_url !== undefined) whatsappAccount.client_webhook_url = client_webhook_url;
    if (meta_api_access_token !== undefined) whatsappAccount.meta_api_access_token = meta_api_access_token;
    if (status !== undefined) whatsappAccount.status = status;
    if (api_enable !== undefined) whatsappAccount.api_enable = api_enable;
    if (flow_enable !== undefined) whatsappAccount.flow_enable = flow_enable;
    if (bot_enable_type !== undefined) whatsappAccount.bot_enable_type = bot_enable_type;

    // If meta_api_access_token or other key fields changed, regenerate the inficonnect_api_key
    const shouldRegenerateToken =
      meta_api_access_token !== undefined ||
      PHONE_NUMBER_ID !== undefined ||
      WHATSAPP_BUSINESS_ACCOUNT_ID !== undefined;

    if (shouldRegenerateToken) {
      const token = jwt.sign(
        {
          id: whatsappAccount.id,
          user_id,
          PHONE_NUMBER_ID: whatsappAccount.PHONE_NUMBER_ID,
          WHATSAPP_BUSINESS_ACCOUNT_ID: whatsappAccount.WHATSAPP_BUSINESS_ACCOUNT_ID,
          meta_api_access_token: whatsappAccount.meta_api_access_token,
        },
        secretKey
      );
      whatsappAccount.inficonnect_api_key = token;
    }

    // Recompute Callback_URL if account_type changed
    if (account_type !== undefined) {
      const configuration_data = await Configuration.findOne({ id: tenant_data.configuration_id });
      if (configuration_data) {
        const Callback_URL =
          account_type === "web_bot"
            ? `${configuration_data.server_domain}/api/webBot/message/webhook/${tenant_data.configuration_id}/${tenant_data.id}/${whatsappAccount.id}`
            : `${configuration_data.server_domain}/api/whatsapp/message/webhook/${tenant_data.configuration_id}/${tenant_data.id}/${whatsappAccount.id}`;

        whatsappAccount.Callback_URL = Callback_URL;
      }
    }

    await whatsappAccount.save();

    return res.status(200).json({
      success: true,
      message: "WhatsApp account updated successfully",
      account: whatsappAccount,
    });
  } catch (error) {
    console.error("Error updating WhatsApp account:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// AccountListByAdmin
export const AccountListByAdmin = async (req, res) => {
  try {
    // const tenantId = req.params.tenantId;
    console.log(":>>>>>>", req.user)
    const admin_data = await User.findOne({ id: req.user.user_id })
    console.log(">>>>>>>>>>>>>>", admin_data)
    const tenant_data = await Tenant.findOne({
      id: admin_data.tenant.tenantId
    })

    console.log(":>>>>>>12345", tenant_data)
    console.log(">>>>>136", { tenant_id: tenant_data.id, configuration_id: tenant_data.id })
    const WhatsappAccount_details = await WhatsappAccount.find({ tenant_id: tenant_data.id, configuration_id: tenant_data.configuration_id })
    if (!WhatsappAccount_details) {
      return res.status(404).json({
        success: false,
        message: "Account not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Accout Details Fetched Successfully",
      WhatsappAccount_details,
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
export const getAllAccount = async (req, res) => {
  try {
    const user_id = req.user.user_id
    const whatsapp_data=await WhatsappAccount.findById(req.body.id)
    console.log(">>>>whatsapp data",whatsapp_data)
    const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token}=whatsapp_data
    if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})

     let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://graph.facebook.com/v22.0/${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?access_token=${meta_api_access_token}`,
  headers: { 
     
  },
};
axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  return res.status(200).send({data:response.data})
})
.catch((error) => {
  console.log(error);
  return res.status(500).send({data:"error while creating template"})
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

export const get_testing_api_key = async (req, res) => {
  try {
    const WhatsappAccount_details = await WhatsappAccount.findOne({

      PHONE_NUMBER_ID: "480518401812550"
    })
    return res.status(200).json({ token: WhatsappAccount_details.inficonnect_api_key })
  }
  catch (error) {
    console.error("Error fetching tenant details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}