import jwt from "jsonwebtoken";
import crypto from "crypto";
import { secretKey } from "../../../config/index.js";
import bcrypt from "bcryptjs";
// import { generateUserLoginToken } from "../../../middleware/jwt.js";
import User from "../model/index.js";
import Tenant from "../../tenant/model/index.js";
import WhatsappAccount from "../../whatsapp_account/model/index.js";
import { generateUserId } from "../helper/index.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../middleware/jwt.js";
import Configuration from "../../configuration/model/index.js";
import Logs from "../../message/model/Logs.js";
import transactionModel from "../../wallet/model/transactionModel.js";
import Plan from "../../wallet/model/plan.js";
import { conf_detailsbyuserId, tenantbyadminuserId } from "../helper/index.js";
// import Organization from "../../organization/model/index.js";
// import resetPwdModel from "../model/resetModel.js";
// import Vendor from "../../../../vendor/model/index.js";
// import {sendResetEmail, SuccessPwdUpdatedEmail} from "../../../../../middleware/email_sender.js";

export const user = (req, res) => {
  console.log("tokenddd");
  res.status(200).send({
    message: "Hello user v1 route",
  });
};
export const adminBankDetails = async (req, res) => {
  // const { userId, amount, paymentReference } = req.body;

  try {
    console.log(">>>>>>>>30", req.user);
    const tenant_data = await tenantbyadminuserId(req.user.user_id);
    const conf_data = await Configuration.findOne({
      id: tenant_data.configuration_id,
    });
    console.log(">>>>>32", conf_data);
    if (!conf_data) {
      return res.json({
        success: false,
        msg: `Failed to get data!`,
      });
    } else {
      return res.json({ success: true, data: conf_data.banking_detials });
    }
    return;
    const transaction = await transactionModel.create({
      userId,
      amount,
      paymentReference,
    });

    if (!transaction) {
      return res.json({
        success: false,
        msg: `Failed to recharge!`,
      });
    } else {
      return res.json({ success: true, msg: "Recharge request submitted" });
    }
  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};
export const SuperadminBankDetails = async (req, res) => {
  // const { userId, amount, paymentReference } = req.body;

  try {
    console.log(">>>>>>>>30", req.user);
    const conf_data = await conf_detailsbyuserId(req.user.user_id);
    console.log(">>>>>32", conf_data);
    if (!conf_data) {
      return res.json({
        success: false,
        msg: `Failed to get data!`,
      });
    } else {
      return res.json({ success: true, data: conf_data.banking_detials });
    }
    return;
    const transaction = await transactionModel.create({
      userId,
      amount,
      paymentReference,
    });

    if (!transaction) {
      return res.json({
        success: false,
        msg: `Failed to recharge!`,
      });
    } else {
      return res.json({ success: true, msg: "Recharge request submitted" });
    }
  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};
export const rechargeRequest = async (req, res) => {
  const { userId, amount, paymentReference } = req.body;

  try {
    const transaction = await transactionModel.create({
      userId,
      amount,
      paymentReference,
    });

    if (!transaction) {
      return res.json({
        success: false,
        msg: `Failed to recharge!`,
      });
    } else {
      return res.json({ success: true, msg: "Recharge request submitted" });
    }
  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};
// getadminlistofsuperadmin
// UserHistory
export const UserHistory = async (req, res) => {
  try {
    console.log(
      ">>>>>>>>>>>>getAdminlist",
      req.query,
      "<<<<<<<<<<<1234",
      req.user
    );

    // console.log(">>>>>>>req.user", req.query.id, req.user)
    const admin_data = await User.findOne({ id: req.user.user_id });
    console.log(">>>>>>>>>>>>>>", admin_data);
    const tenant_data = await Tenant.findOne({
      id: admin_data.tenant.tenantId,
    });

    // console.log(">>>user_data", req.query.bot_type)
    const query = { user_id: req.query.user_id,account_id:req.query.account_id };
// const query={}
    let chatHistoryQuery = Logs.find(query);

    if (req.query.limit) {
      const limit = Number(req.query.limit);
      const page = Number(req.query.page) || 1;
      const skip = (page - 1) * limit;

      chatHistoryQuery = chatHistoryQuery.skip(skip).limit(limit);
    }

    const chatHistory = await chatHistoryQuery.exec();
    // console.log(">>>>>35", admin_list)
    if (chatHistory) {
      return res.status(200).json({ sucess: true, data: chatHistory });
    }

    return;
    // const { page,limit } = req.body;
    // const page = parseInt(req.body.page) || 1; // default page 1
    // const limit = parseInt(req.body.limit) || 10; // default limit 10
    // const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.findOne({
      configuration_id: User_data.tenant.tenantId,
    });
    // console.log(">>>>>>>>>>35", Conf_data)
    // const User_data_result = await User.find({ "tenant.tenantId": Conf_data.id })

    const existingUser = await User.find({ "tenant.tenantId": Conf_data.id })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// GetAllCustomerListByAdmin
export const GetAllCustomerListByAdmin = async (req, res) => {
  try {
    console.log(
      ">>>>>>>>>>>>getAdminlist11111",
      req.query,
      "<<<<<<<<<<<1234",
      req.user
    );
    const { page, limit } = req.query;
    // items per page
    const skip = (page - 1) * limit;

    // console.log(">>>>>>>req.user", req.query.id, req.user)
    const admin_data = await User.findOne({ id: req.user.user_id });
    console.log(">>>>>>>>>>>>>>", admin_data);
    const tenant_data = await Tenant.findOne({
      id: admin_data.tenant.tenantId,
    });
console.log(">>>>235")
    // console.log(">>>user_data",req.query, req.query.bot_type,req.query.account_id);
    const uniqueid = await Logs.aggregate([
      {
        $match: {
          source: req.query.bot_type,
          account_id:req.query.account_id        // your condition
          // Add more filters here
        }
      },
      {
        $group: {
          _id: "$user_id", // this gives you unique user_ids
          user_name: { $first: "$user_name" }, // pick any associated user_name
          bot_type: { $first: "$source" },
        },
      },
      {
        $sort: { _id: 1 }, // optional: sort by user_id
      },
      {
        $skip: 1,
      },
      {
        $limit: 10,
      },
    ]);
    // console.log(">>>>>35", admin_list)
    if (uniqueid) {
      return res.status(200).json({ sucess: true, data: uniqueid });
    }

    return;
    // const { page,limit } = req.body;
    // const page = parseInt(req.body.page) || 1; // default page 1
    // const limit = parseInt(req.body.limit) || 10; // default limit 10
    // const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.findOne({
      configuration_id: User_data.tenant.tenantId,
    });
    // console.log(">>>>>>>>>>35", Conf_data)
    // const User_data_result = await User.find({ "tenant.tenantId": Conf_data.id })

    const existingUser = await User.find({ "tenant.tenantId": Conf_data.id })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const GetCustomerListByAdmin = async (req, res) => {
  try {
    console.log(
      ">>>>>>>>>>>>getAdminlist111111",
      req.query,
      "<<<<<<<<<<<1234",
      req.user
    );
    const { page, limit } = req.query;
    // items per page
    const skip = (page - 1) * limit;

    // console.log(">>>>>>>req.user", req.query.id, req.user)
    const admin_data = await User.findOne({ id: req.user.user_id });
    console.log(">>>>>>>>>>>>>>", admin_data);
    const tenant_data = await Tenant.findOne({
      id: admin_data.tenant.tenantId,
    });

    console.log(">>>user_data", req.query.bot_type);
    const uniqueid = await Logs.aggregate([
      {
        $match: {
          source: req.query.bot_type,
          account_id:req.query.account_id
          // your condition
          // Add more filters here
        },
      },
      {
        $group: {
          _id: "$user_id", // this gives you unique user_ids
          user_name: { $first: "$user_name" }, // pick any associated user_name
        },
      },
      {
        $sort: { _id: 1 }, // optional: sort by user_id
      },
      {
        $skip: 0,
      },
      {
        $limit: 10,
      },
    ]);
    console.log(">>>>>35", uniqueid)
    if (uniqueid) {
      return res.status(200).json({ sucess: true, data: uniqueid });
    }

    return;
    // const { page,limit } = req.body;
    // const page = parseInt(req.body.page) || 1; // default page 1
    // const limit = parseInt(req.body.limit) || 10; // default limit 10
    // const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.findOne({
      configuration_id: User_data.tenant.tenantId,
    });
    // console.log(">>>>>>>>>>35", Conf_data)
    // const User_data_result = await User.find({ "tenant.tenantId": Conf_data.id })

    const existingUser = await User.find({ "tenant.tenantId": Conf_data.id })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// getadminlistofsuperadmin
export const UpdateAccountDetails = async (req, res) => {
  try {
    const configuration_data = await Configuration.updateOne(
      { "admin.adminId": req.user.user_id },
      { $set: { banking_detials: req.body } }
    );
    if (configuration_data) {
      return res.status(200).json({ sucess: true, data: configuration_data });
    } else {
      return res
        .status(200)
        .json({ sucess: false, message: "error while update account details" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getadminlistofsuperadmin = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>getAdminlist", req.query);
    console.log(">>>>>>>req.user", req.query.id, req.user);
    const superadmin_data = await User.findOne({ id: req.query.id });
    const tenant_data = await Tenant.find({
      configuration_id: superadmin_data.tenant.tenantId,
    });
    console.log(">>>user_data", superadmin_data, tenant_data);
    const admin_list = await Promise.all(
      tenant_data.map(async (data) => {
        return await User.findOne({ id: data.admin.adminId });
      })
    );
    console.log(">>>>>35", admin_list);
    if (superadmin_data) {
      return res.status(200).json({ sucess: true, admin: admin_list });
    }

    return;
    // const { page,limit } = req.body;
    const page = parseInt(req.body.page) || 1; // default page 1
    const limit = parseInt(req.body.limit) || 10; // default limit 10
    const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.findOne({
      configuration_id: User_data.tenant.tenantId,
    });
    // console.log(">>>>>>>>>>35", Conf_data)
    // const User_data_result = await User.find({ "tenant.tenantId": Conf_data.id })

    const existingUser = await User.find({ "tenant.tenantId": Conf_data.id })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getsuperadminInfo = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>getAdminlist", req.query);
    console.log(">>>>>>>req.user", req.query.id, req.user);
    const superadmin_data = await User.findOne({ id: req.query.id });

    // console.log(">>>>>35", admin_list)
    if (superadmin_data) {
      return res
        .status(200)
        .json({ sucess: true, Super_admin: superadmin_data });
    }

    return;
    // const { page,limit } = req.body;
    const page = parseInt(req.body.page) || 1; // default page 1
    const limit = parseInt(req.body.limit) || 10; // default limit 10
    const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.findOne({
      configuration_id: User_data.tenant.tenantId,
    });
    // console.log(">>>>>>>>>>35", Conf_data)
    // const User_data_result = await User.find({ "tenant.tenantId": Conf_data.id })

    const existingUser = await User.find({ "tenant.tenantId": Conf_data.id })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// export const updateSuperadminInfo = async (req, res) => {
//   try {
//     const { id } = req.params; // Superadmin user ID from URL
//     const authenticatedUserId = req.user.user_id; // From JWT/auth middleware

//     // Optional: Allow updating own profile without passing ID, or via params
//     const targetUserId = id || authenticatedUserId;

//     // Security: Ensure user can only update their own profile
//     // if (targetUserId !== authenticatedUserId) {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: "You are not authorized to update this user's information",
//     //   });
//     // }

//     const { name, email, phone } = req.body;

//     // Validate: At least one field must be provided
//     if (!name && !email && !phone) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "No data provided to update. Please provide name, email, or phone.",
//       });
//     }

//     // Find the superadmin user
//     const superadmin = await User.findOne({ id: targetUserId });

//     if (!superadmin) {
//       return res.status(404).json({
//         success: false,
//         message: "Superadmin not found",
//       });
//     }

//     // Check if user is actually a superadmin (optional extra security)
//     // Adjust this condition based on how you mark superadmins in your system
//     // Example: if superadmin has userType === "superadmin" or is the root admin
//     const tenant = await Tenant.findOne({ "admin.adminId": targetUserId });
//     if (!tenant) {
//       return res.status(403).json({
//         success: false,
//         message: "You do not have superadmin privileges",
//       });
//     }

//     // Update allowed fields
//     if (name !== undefined) superadmin.name = name.trim();
//     if (email !== undefined) {
//       // Optional: Add email uniqueness check
//       const existingEmail = await User.findOne({
//         email: email.trim(),
//         id: { $ne: targetUserId },
//       });
//       if (existingEmail) {
//         return res.status(400).json({
//           success: false,
//           message: "Email is already in use by another user",
//         });
//       }
//       superadmin.email = email.trim().toLowerCase();
//     }
//     if (phone !== undefined) {
//       superadmin.phone = phone.trim();
//     }

//     // Optional: Update updatedAt timestamp if your model has it
//     superadmin.updatedAt = new Date();

//     await superadmin.save();

//     // Return updated user (exclude sensitive fields like password)
//     const updatedUser = {
//       id: superadmin.id,
//       name: superadmin.name,
//       email: superadmin.email,
//       phone: superadmin.phone,
//       userType: superadmin.userType,
//       // add other safe fields as needed
//     };

//     return res.status(200).json({
//       success: true,
//       message: "Superadmin information updated successfully",
//       superadmin: updatedUser,
//     });
//   } catch (error) {
//     console.error("Error updating superadmin info:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

export const updateSuperadminInfo = async (req, res) => {
  try {
    const { id } = req.params; // Superadmin user ID from URL: /update/:id
    const authenticatedUserId = req.user.user_id;

    // Use param ID or fallback to authenticated user
    const targetUserId = id || authenticatedUserId;

    // Optional: Restrict to self-update only
    // Remove this block if you want to allow updating other superadmins
    // if (targetUserId !== authenticatedUserId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You are not authorized to update this user's information",
    //   });
    // }

    const { name, email, phone, status } = req.body;

    // Allow partial update: at least one field must be provided
    if (!name && !email && !phone && status === undefined) {
      return res.status(400).json({
        success: false,
        message:
          "No data provided to update. Please provide at least one field: name, email, phone, or status.",
      });
    }

    // Find the superadmin
    const superadmin = await User.findOne({ id: targetUserId });

    if (!superadmin) {
      return res.status(404).json({
        success: false,
        message: "Superadmin not found",
      });
    }

    // Optional: Verify this is actually a superadmin
    const tenant = await Tenant.findOne({ "admin.adminId": targetUserId });
    // if (!tenant) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "You do not have superadmin privileges",
    //   });
    // }

    // Update fields if provided
    if (name !== undefined) {
      superadmin.name = name.trim();
    }

    if (email !== undefined) {
      const normalizedEmail = email.trim().toLowerCase();
      const existingEmail = await User.findOne({
        email: normalizedEmail,
        id: { $ne: targetUserId },
      });
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use by another user",
        });
      }
      superadmin.email = normalizedEmail;
    }

    if (phone !== undefined) {
      superadmin.phone = phone.trim();
    }

    if (status !== undefined) {
      const validStatuses = ["active", "inactive"];
      const lowerStatus = status.toString().toLowerCase();
      if (!validStatuses.includes(lowerStatus)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be 'active' or 'inactive'",
        });
      }
      superadmin.status = lowerStatus;
    }

    // Update timestamp
    superadmin.updatedAt = new Date();

    await superadmin.save();

    // Return safe user data (without password)
    const updatedUser = {
      id: superadmin.id,
      name: superadmin.name,
      email: superadmin.email,
      phone: superadmin.phone,
      status: superadmin.status,
      userType: superadmin.userType,
      wallet: superadmin.wallet,
      tenant: superadmin.tenant,
      address: superadmin.address,
    };

    return res.status(200).json({
      success: true,
      message: "Superadmin information updated successfully",
      superadmin: updatedUser,
    });
  } catch (error) {
    console.error("Error updating superadmin info:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAdminList = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>getAdminlist");
    console.log(">>>>>>>req.user", req.user);
    // const { page,limit } = req.body;
    const page = parseInt(req.body.page) || 1; // default page 1
    const limit = parseInt(req.body.limit) || 10; // default limit 10
    const skip = (page - 1) * limit;

    const User_data = await User.findOne({ id: req.user.user_id });
    // console.log(">>>>32", User1)
    console.log(">>>>34", User_data, User_data.tenant.tenantId);
    const Conf_data = await Tenant.find({
      configuration_id: User_data.tenant.tenantId,
    });
    console.log(">>>>582", Conf_data);
    if (!Conf_data || Conf_data.length === 0) {
      return res.status(204).json({
        success: false,
        message: "No Tenant exists",
      });
    }

    const tenantIds = Conf_data.map((t) => t.id);

    const existingUser = await User.find({
      "tenant.tenantId": { $in: tenantIds },
    })
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getSuperadminList = async (req, res) => {
  try {
    // const { page,limit } = req.body;
    const page = parseInt(req.body.page) || 1; // default page 1
    const limit = parseInt(req.body.limit) || 10; // default limit 10
    const skip = (page - 1) * limit;

    const existingUser = await User.find({ userType: "superadmin" })
      .sort({ uploadedAt: -1 }) // optional sorting
      .skip(skip)
      .limit(limit);
    if (!existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "No User exists" });
    }

    return res.status(200).json({ sucess: true, data: existingUser });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getSuperUserbyId = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.user_id });

    if (user) {
      const config_data = await Configuration.findOne({
        id: user.tenant.tenantId,
      });

      return res
        .status(200)
        .send({ sucess: true, user: user, basic_details: config_data });
    }
  } catch (error) {}
};
export const getUserbyId = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user.user_id });

    if (user) {
      const tanent_data = await Tenant.findOne({ id: user.tenant.tenantId });
      const account_data = await WhatsappAccount.find({
        tenant_id: tanent_data.id,
      });
      return res.status(200).send({
        sucess: true,
        user: user,
        tanent_details: tanent_data,
        account: account_data,
      });
    }
  } catch (error) {}
};
export const updateConfiguration = async (req, res) => {
  try {
    // console.log(">>>>>40", req.user)
    const { logo, ui_theme_colour } = req.body;
    if (!logo && !ui_theme_colour) {
      return res.status(400).json({
        message: "At least one of 'logo' or 'ui_theme_colour' must be provided",
      });
    }

    const config_data = await Configuration.updateOne(
      { "admin.adminId": req.user.user_id },
      {
        $set: {
          ...(logo && { logo }),
          ...(ui_theme_colour && { ui_theme_colour }),
        },
      }
    );
    console.log(">>>>45", config_data);
    if (config_data.matchedCount === 0) {
      return res
        .status(404)
        .json({ message: "Configuration not found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Configuration updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const updateRate = async (req, res) => {
  // try{

  const { userId } = req.query;
  const user_data = await User.findOneAndUpdate(
    { id: userId },
    { $set: { price_chart: price_chart } }
  );
  console.log(user_data);
  // }
  // catch (error) {
  //   return res
  //     .status(500)
  //     .json({
  //       success: false,
  //       message: "Internal Server Error",
  //       error: error.message,
  //     });
  // }
};
// Create User
export const createUser = async (req, res) => {
  try {
    const { tenantObjId, name, email, phone, password, userType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let userId = await generateUserId();

    const newUser = new User({
      id: userId,
      name,
      email,
      phone,
      password: hashedPassword,
      userType,
    });

    await newUser.save();
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email.",
      });
    }
    console.log(">>>>>>>>115", user);
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate a JWT token
    const accessToken = generateAccessToken(user._id, user.id, user.email);
    const refreshToken = generateRefreshToken(user._id, user.id, user.email);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Verify User Token
export const verifyUserToken = async (req, res) => {
  try {
    const user = req.user; // Assuming middleware populates `req.user` after verifying the token

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Token verification failed.",
      });
    }

    const foundUser = await User.findOne({ email: user.email }).select(
      "-password -__v"
    );
    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user: foundUser,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllUserByVendorObjIdAll = async (req, res) => {
  try {
    const { vendorObjId } = req.body;
    const user = await User.find({ "vendorDetails.vendorObjId": vendorObjId });
    console.log("user", user);

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "No user found",
      });
    }
    res.status(200).json({
      success: true,
      message: "users fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
export const getAllUserByOrganizationObjId = async (req, res) => {
  try {
    const { organizationObjId, page = 1, limit = 10 } = req.body;

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    if (!organizationObjId) {
      return res.status(404).json({
        success: false,
        message: "organizationObjId is required",
      });
    }

    // Get users for the vendor with pagination
    const users = await User.find({
      "organizationDetails.organizationObjId": organizationObjId,
      userType: { $ne: "superadmin" },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // console.log("users",users);
    // Count the total number of users for pagination
    const totalCount = await User.countDocuments({
      "organizationDetails.organizationObjId": organizationObjId,
    });

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this Organization",
      });
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
      },
    });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
export const getAllUserByVendorObjIdAndStoreObjId = async (req, res) => {
  try {
    const { vendorObjId, storeObjId, page = 1, limit = 10 } = req.body;

    // Validate input
    if (!vendorObjId || !storeObjId) {
      return res.status(400).json({
        success: false,
        message: "Both vendorObjId and storeObjId are required",
      });
    }

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Query to match both vendorObjId and storeObjId
    const query = {
      "vendorDetails.vendorObjId": vendorObjId,
      "storeDetails.storeObjId": storeObjId,
    };

    // Get users for the vendor and store with pagination
    const users = await User.find(query).skip(skip).limit(parseInt(limit, 10));

    // Count the total number of users for pagination
    const totalCount = await User.countDocuments(query);

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found for this vendor and store",
      });
    }

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
      },
    });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
export const getOrganizationUserById = async (req, res) => {
  try {
    const { userObjId } = req.params;
    const user = await User.findById(userObjId);
    console.log("user", user);

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "No user found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Something went wrong", error);
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
export const allUser = async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).json({
      success: false,
      users: users,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).json({
        success: false,
        message: "Email and password are required",
      });
    }
    const userCheck = await User.findOne({ email });
    if (!userCheck) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, userCheck.password);
    if (isPasswordValid) {
      const token = jwt.sign({ userId: userCheck._id }, secretKey);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        token: token,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(200).json({
        success: false,
        message: "No token provided",
      });
    }

    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Failed to authenticate token",
        });
      }
      const userId = decoded.userId;
      try {
        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(200).json({
            success: false,
            message: "User not found",
          });
        }

        return res.status(200).json({
          success: true,
          message: "Token is valid",
          user,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedata = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updatedata, {
      new: true,
    });
    //console.log('updatedUser',updatedUser);
    if (updatedUser) {
      res.status(200).send({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getUsers = async (req, res) => {
  try {
    console.log("api getusers success");
    let userCheck = await User.find();
    if (userCheck) {
      res.status(200).send({
        success: true,
        message: "Users get successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "Users not found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getAdminUsers = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "admin" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getOnlyActiveAdmin = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "admin", status: "active" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No active users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getOnlyInactiveAdmin = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "admin", status: "inactive" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No active users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getOnlyUsers = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "user" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getOnlyActiveUsers = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "user", status: "active" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No active users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const getOnlyInactiveUsers = async (req, res) => {
  try {
    let userCheck = await User.find({ userType: "user", status: "inactive" });
    if (userCheck.length > 0) {
      res.status(200).send({
        success: true,
        message: "Users retrieved successfully",
        data: userCheck,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "No active users found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { status: req.body.status },
      { new: true }
    );
    if (updatedUser) {
      res.status(200).send({
        success: true,
        message: "User status updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(200).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const sendResetPasswordLink = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordToken = resetToken;
    const resetPasswordExpires = Date.now() + 600000; // Token expiration time (10 minutes)

    await resetPwdModel.create({
      id: user._id,
      email,
      resetPasswordToken,
      resetPasswordExpires,
    });

    sendResetEmail(email, resetToken);
    res.status(200).json({ message: "Password reset link sent!" });
  } catch (error) {
    console.error("Error in sending email:", error);
    res.status(500).json({ message: "Error in sending email", error });
  }
};
export const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  try {
    const resetEntry = await resetPwdModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!resetEntry) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(resetEntry.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = bcrypt.hashSync(newPassword, 10);
    await user.save();

    // Remove the token entry from the resetPwdModel
    await resetPwdModel.deleteOne({ resetPasswordToken: token });
    SuccessPwdUpdatedEmail(user.email, user.name);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password", error });
  }
};
export const getAllMasters = async (req, res) => {
  try {
    const getAllMasters = await User.aggregate([
      {
        $match: { userType: "master" },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).send({ success: true, data: getAllMasters });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  const { userObjId } = req.params;
  try {
    const user = await User.findById(userObjId);
    if (!user) {
      return res.status(404).json({ message: "user not found." });
    }
    await user.deleteOne();
    res.status(200).json({
      success: true,
      message: "user deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the store.",
      error: err.message,
    });
  }
};
export const deleteUsers = async (req, res) => {
  const { userObjIds } = req.body; // Expect an array of store IDs in the request body

  if (!Array.isArray(userObjIds) || userObjIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input. Please provide an array of customer IDs.",
    });
  }

  try {
    // Find all stores matching the provided IDs
    const users = await User.find({ _id: { $in: userObjIds } });

    if (users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found matching the provided IDs.",
      });
    }

    // Delete the matching stores
    await User.deleteMany({ _id: { $in: userObjIds } });

    res.status(200).json({
      success: true,
      message: `${users.length} users(s) deleted successfully.`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the users.",
      error: err.message,
    });
  }
};

export const getPendingRequests = async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>1313", req.user);
  const configuration_data = await Configuration.findOne({
    "admin.adminId": req.user.user_id,
  });
  const requests = await transactionModel
    .find({ status: "pending", conf_id: configuration_data.id })
    .sort({ createdAt: -1 });

  if (!requests) {
    return res.json({
      success: false,
      msg: `No pending transaction found`,
    });
  } else {
    return res.json({
      success: true,
      msg: `Admin pending transaction history found!`,
      data: requests,
    });
  }
};

export const approveRecharge = async (req, res) => {
  try {
    console.log(">>>1335", req.user);
    const { transactionId } = req.query;
    const configuration_data = await Configuration.findOne({
      "admin.adminId": req.user.user_id,
    });
    const transaction = await transactionModel.findById(transactionId);

    console.log(">>>>>>>>>>>>1340", transaction);
    const plan_data = await Plan.find({ conf_id: configuration_data.id });
    const amount = transaction.amount;
    console.log(">>>>plan_data", plan_data);
    const matchedPlan = plan_data.find(
      (plan) => amount >= plan.minAmount && amount < plan.maxAmount
    );
    console.log(">>>>>1344", matchedPlan);
    const points = amount * matchedPlan.multiplier;
    // const tanent_data = await Tenant.findOne({ id: transaction.tenant_id });

    // const User_data = await User.findOne({ id: tanent_data.admin.adminId });
    console.log("before accountdata");
    const account_data = await WhatsappAccount.findById(transaction.account_id);
    console.log("after accountdata",account_data);

    account_data.walletBalance = account_data.walletBalance + points;
    // transaction.prev_points = User_data.wallet;
    // transaction.points = points;

    // const next_points = User_data.wallet + points;
    // transaction.next_points = next_points;
    // User_data.wallet = next_points;
    // await transaction.save()
    console.log(">>>>>>>>>>1340", plan_data);
    if (!transaction || transaction.status !== "pending") {
      return res.status(400).json({ error: "Invalid transaction" });
    } else {
      transaction.status = "approved";
      transaction.approvedAt = new Date();
      await transaction.save();
      await account_data.save();
      // await User.findOneAndUpdate({ id: req.user.user_id }, {
      //   $inc: { walletBalance: transaction.amount },
      // });
      return res.json({ message: "Recharge approved successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to approve transaction" });
  }
};
