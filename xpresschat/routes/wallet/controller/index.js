import transactionModel from "../model/transactionModel.js";
import Configuration from "../../configuration/model/index.js"
import Plan from "../model/plan.js"
import Tenant from "../../tenant/model/index.js"
import { conf_detailsbyuserId, tenantbyadminuserId } from "../../user/helper/index.js"
import Users from "../../user/model/index.js"
export const createPlan = async (req, res) => {
  const { name, minAmount, transaction_id, maxAmount, multiplier, isExpirable, startDate, endDate } = req.body;

  try {
    console.log(">>>>>>>>>>>>>>8888888888", req.user)
    const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
    console.log(">>>>>>>>>>10", configuration_data)
    let transaction
    if (isExpirable == false) {
      transaction = await Plan.create({
        name,
        transaction_id,
        conf_id: configuration_data.id,
        minAmount, maxAmount, multiplier, isExpirable
      });
    }
    else if (isExpirable == true) {
      transaction = await Plan.create({
        name,
        conf_id: configuration_data.id,
        transaction_id,
        minAmount, maxAmount, multiplier, isExpirable, startDate: startDate, expireDate: endDate
      });
    }


    if (!transaction) {
      return res.json({
        success: false,
        msg: `Failed to recharge!`,
      });
    } else {
      return res.json({ success: true, msg: "Plan Created Sucessfully" });
    }
  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};

export const PlanDeletebySuperadmin = async (req, res) => {


  try {
    const { id } = req.params;
    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully', data: deletedPlan });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error });
  }
};

export const DetailsTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(">>>>>>>>>>68124534", id)
    const history = await transactionModel.findById(id)
    const user_data = await Users.findById(history.userId)
    const tanant_data = await Tenant.findOne({ "admin.adminId": user_data.id })
    console.log(">>>>>>>>>>>70", user_data)
    console.log(">>>>>>>>>69", history)
    console.log(">>>>>>>74", tanant_data)

    if (!history || history.length === 0) {
      return res.json({
        success: false,
        msg: `No transaction history found!`
      })
    } else {
      return res.json({
        success: true,
        msg: `transaction history found successfully`,
        data: {
          Transaction: history,
          User: user_data,
          User_details: tanant_data
        }
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transaction history" });
  }
};
export const PlanListbyadmin = async (req, res) => {

  try {
    console.log(">>>>>>>>>>>>50", req.user)
    const tenant_details = await tenantbyadminuserId(req.user.user_id)
    // console.log(">>>>>>>>>>>>>>8888888888", configuration_details)
    const now = new Date();

    const combinedPlans = await Plan.find({
      conf_id: tenant_details.configuration_id,
      $or: [
        { isExpirable: false },
        {
          isExpirable: true,
          startDate: { $lte: now },
          expireDate: { $gte: now }
        }
      ]
    });
    if (combinedPlans) {
      return res.status(200).send({ sucess: true, data: combinedPlans })
    }
    else {
      return res.status(204).send({ sucess: true, data: [] })
    }





  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};
export const PlanListbySuperadmin = async (req, res) => {
  console.log(">>>>>>req.user", req.user)

  try {
    const configuration_details = await conf_detailsbyuserId(req.user.user_id)
    console.log(">>>>>>>>>>>>>>8888888888", configuration_details)
    const now = new Date();

    const combinedPlans = await Plan.find({
      conf_id: configuration_details.id,
      $or: [
        { isExpirable: false },
        {
          isExpirable: true,
          startDate: { $lte: now },
          expireDate: { $gte: now }
        }
      ]
    });
    if (combinedPlans) {
      return res.status(200).send({ sucess: true, data: combinedPlans })
    }
    else {
      return res.status(204).send({ sucess: true, data: [] })
    }





  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};

export const rechargeRequest = async (req, res) => {

  const { reciept_url, amount, paymentReference, planId,accountId } = req.body;

  try {
    const tenant_data = await Tenant.findOne({ "admin.adminId": req.user.user_id })
    const transaction = await transactionModel.create({
      conf_id: tenant_data.configuration_id,
      tenant_id: tenant_data.id,
      userId: req.user.id,
      account_id:accountId,
      amount,
      paymentReference,
      planId,
      reciept_url
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



export const uploadTransactionScreenshot = async (req, res) => {

}


export const getUserTransactionHistory = async (req, res) => {
  const { userId } = req.query;

  try {
    const history = await transactionModel.find({ userId }).sort({ createdAt: -1 });
    if (!history || history.length === 0) {
      return res.json({
        success: false,
        msg: `No transaction history found!`
      })
    } else {
      return res.json({
        success: true,
        msg: `transaction history found successfully`,
        data: history
      });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transaction history" });
  }
};