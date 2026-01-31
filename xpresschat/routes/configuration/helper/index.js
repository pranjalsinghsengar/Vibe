import { request } from "express";
import Tenant from "../model/index.js";
import User from "../../user/model/index.js";
export const generateTenantId = async () => {
  const tenant = await Tenant.findOne().sort({ id: -1 });

  if (tenant) {
    return parseInt(tenant?.id) + 1;
  }
  return 10001;
};

export const authorizeMasterAdminUser = async (req, res, next) => {

  try {
    console.log(">>>>>16", req.user.id)
    const user_data = await User.findOne({ id: req.user.user_id })
    console.log(">>>>17", user_data.userType)
    if (user_data.userType == "masteradmin")
      next()
    else {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No permission ",
      });
    }

  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Unauthorized: Invalid token1",
    });
  }


}