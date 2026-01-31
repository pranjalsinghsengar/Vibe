// import transactionModel from "../model/transactionModel.js";
import Configuration from "../../configuration/model/index.js"
import charge from "../model/index.js"
import Tenant from "../../tenant/model/index.js"
import { conf_detailsbyuserId, tenantbyadminuserId } from "../../user/helper/index.js"
import Users from "../../user/model/index.js"
export const  createcharge = async (req, res) => {
  const { tenantId,message_type,price,status  } = req.body;

  try {
    console.log(">>>>>>>>>>>>>>8888888888", req.user)
    const configuration_data = await Configuration.findOne({ "admin.adminId": req.user.user_id })
    console.log(">>>>>>>>>>10", configuration_data)
    const {id}=configuration_data
    console.log(">>>",id)
    const charge_id=id+"_"+tenantId
    const transaction = await charge.findOneAndUpdate(
  {
    id: charge_id,
    type: message_type,
  },
  {
    $set: {
      id: charge_id,
      type: message_type,
      price: price,
      enable: status
    }
  },
  {
    new: true,    // updated / created document return karega
    upsert: true  // present → update | absent → create
  }
);
console.log(">>>35",transaction)
  if (!transaction) {
      return res.json({
        success: false,
        msg: `Failed to recharge!`,
      });
    } else {
      return res.json({ success: true, msg: "charge Created Sucessfully" });
    }
  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};


export const chargeDeletebySuperadmin = async (req, res) => {


  try {
    const { id } = req.params;
    const deletedcharge = await charge.findByIdAndDelete(id);

    if (!deletedcharge) {
      return res.status(404).json({ message: 'charge not found' });
    }

    res.status(200).json({ message: 'charge deleted successfully', data: deletedcharge });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting charge', error });
  }
};

export const DetailsTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(">>>>>>>>>>68124534", id)
    // const history = await transactionModel.findById(id)
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
export const chargeListbyadmin = async (req, res) => {

  try {
    console.log(">>>>>>>>>>>>50", req.user)
    const tenant_details = await tenantbyadminuserId(req.user.user_id)
    console.log(">>>>>>>>>>>>>>8888888888", tenant_details)
    const {configuration_id,id}=tenant_details
    const charge_id=configuration_id+"_"+id
    const message_type=["marketing","authentication", "utility", "service"]
     const result=[]
     for(let message of message_type){
      let data=await charge.findOne({id:charge_id,type:message})
      console.log(">>>144",data)
      if(data){
        console.log(">>>146")
        result.push(data)
      } 
      else
       {
        let data=await charge.findOne({id:configuration_id+"_"+"0",type:message})
        result.push(data)
       }
     }
    
    if (result) {
      return res.status(200).send({ sucess: true, data: result })
    }
    else {
      return res.status(204).send({ sucess: true, data: [] })
    }





  } catch (err) {
    console.log("error----->", err);
    res.status(500).json({ error: "Failed to create recharge request" });
  }
};
export const chargeListbySuperadmin = async (req, res) => {
  console.log(">>>>>>req.user", req.user)
const {tenantId}=req.body
  try {
    const configuration_data = await conf_detailsbyuserId(req.user.user_id)
     const {id}=configuration_data
     const charge_id=id+"_"+tenantId
     const message_type=["marketing","authentication", "utility", "service"]
     const result=[]
     for(let message of message_type){
      let data=await charge.findOne({id:charge_id,type:message})
      console.log(">>>144",data)
      if(data){
        console.log(">>>146")
        result.push(data)
      } 
      else
       {
        let data=await charge.findOne({id:id+"_"+"0",type:message})
        result.push(data)
       }
     }
     
    
    if (result) {
      return res.status(200).send({ sucess: true, data: result })
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

  const { reciept_url, amount, paymentReference, chargeId,accountId } = req.body;

  try {
    const tenant_data = await Tenant.findOne({ "admin.adminId": req.user.user_id })
    // const transaction = await transactionModel.create({
    //   conf_id: tenant_data.configuration_id,
    //   tenant_id: tenant_data.id,
    //   userId: req.user.id,
    //   account_id:accountId,
    //   amount,
    //   paymentReference,
    //   chargeId,
    //   reciept_url
    // });

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
    // const history = await transactionModel.find({ userId }).sort({ createdAt: -1 });
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