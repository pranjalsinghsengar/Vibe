import User from "../model/index.js";
import Configuration from "../../configuration/model/index.js"
import Tenant from "../../tenant/model/index.js";
export const generateUserId = async () => {
  const user = await User.findOne().sort({ id: -1 });

  if (user) {
    return parseInt(user?.id) + 1;
  }
  return 1000001;
};

export const conf_detailsbyuserId = async (userId) => {
  try {

    // console.log(">>>>>>>>>>>>>>8888888888", req.user)
    return await Configuration.findOne({ "admin.adminId": userId })

  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
}

export const tenantbyadminuserId = async (userId) => {
  try {

    // console.log(">>>>>>>>>>>>>>8888888888", req.user)
    // const tenant_data = await Tennat.findOne({ "admin.adminId": userId })
    return await Tenant.findOne({ "admin.adminId": userId })

  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
}
