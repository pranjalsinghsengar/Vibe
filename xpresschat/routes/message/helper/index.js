import WhatsappAccount from "../../whatsapp_account/model/index.js"
import Node from "../../Flows/model/Node.js"
import Edge from "../../Flows/model/Edge.js";
import { secretKey } from "../../../config/index.js"
import jwt from 'jsonwebtoken';
import axios from 'axios';
export const authentication = async (req, res, next) => {
  try {

    try {
      const { api_key } = req.headers;
      const token = api_key
      console.log("token", token);
      if (api_key) {
        const decoded = jwt.decode(token);
        console.log(">>>>>>>>>>decoded", decoded)
        req.user = decoded;
        next();
      }
      else
        res.status(400).json({
          success: false,
          message: "Unauthorized: missing api_key",
        });

    } catch (error) {
      res.status(201).json({
        success: false,
        message: "Unauthorized: Invalid token1",
      });
    }
    // if(!account){
    //     return res.status(400).json({ message: "Authentication failed" });
    // }
    // else{

    //    const configuration_data=await WhatsappAccount.findOne({ id:account });
    //    req.meta_data={
    //     token:configuration_data.meta_api_access_token,
    //     PHONE_NUMBER_ID:configuration_data.PHONE_NUMBER_ID,
    //     tanentId:configuration_data.tenant_id
    //    }

    //    next() 

    // }
  }
  catch (error) {
    console.error("Error in authentication middleware", error);
    res.status(500).json({ message: "Server Error" });
  }
}
export const getNode_Data_by_id = async (node_id, account_id, flow_id) => {
  try {
    const node_data = await Node.findOne({ uniqueid: node_id, account_id: account_id, flow_id: flow_id });
    return node_data;
  } catch (error) {
    console.error("Error in getting node data by id", error);
    return null;
  }
}
export const getNode_Details_by_id = async (node_id, account_id, flow_id) => {
  try {
    // console.log(">>>>56",node_id,account_id,flow_id)
    const node_data = await Node.findOne({ uniqueid: node_id, account_id: account_id, flow_id: flow_id });

    const edge_data = await Edge.find({ from_node: node_data.content.id, account_id: account_id, flow_id: flow_id })

    const return_data = {
      node_data: node_data.content,
      meta_data: []
    }
    for (const e in edge_data) {
      const node_details = await getNode_Data_by_id(edge_data[e].to_node, account_id, flow_id)
      const edge_data5 = await Edge.find({ from_node: edge_data[e].to_node, account_id: account_id, flow_id: flow_id })
      if (edge_data5.length == 0)
        node_details.content.end_chat = true
      return_data.meta_data.push(node_details.content)
    }
    return return_data;
  } catch (error) {
    console.error("Error in getting node data by id", error);
    return null;
  }
}

export const send_message_whatsapp = async (phone_number_id, access_token, data, newLogs) => {
  try {
    console.log(">>>>>>>>>>>>>89", JSON.stringify(data))
    const response = await axios({
      method: "POST",
      url: `https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${access_token}`,
      data: data,
      headers: { "Content-Type": "application/json" },
    });
    console.log(">>>>>>>>>95", {
      method: "POST",
      url: `https://graph.facebook.com/v12.0/${phone_number_id}/messages?access_token=${access_token}`,
      data: data,
      headers: { "Content-Type": "application/json" },
    })
    newLogs.response_id = response.data.messages[0].id
    const responseLocal_timestamp = Date.now()
    newLogs.responseLocal_timestamp = responseLocal_timestamp
    newLogs.requestResposnse_interval = responseLocal_timestamp - newLogs.requestLocal_timestamp

    await newLogs.save()
    console.log("Message sent successfully:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("Error Response:", error.response.data);
      console.error("Status Code:", error.response.status);
    } else if (error.request) {
      // No response received from the server
      console.error("No response received:", error.request);
    } else {
      // Error in setting up the request
      console.error("Axios error:", error.message);
    }
  }
};
 
export const getOutgoingLogJson= async(PHONE_NUMBER_ID,to,response,meta_payload)=>{
  const Whatsapp_data=await WhatsappAccount.findOne({PHONE_NUMBER_ID:PHONE_NUMBER_ID})
  let meta_response=JSON.parse(JSON.stringify(response))
  meta_response.messages[0]={...meta_response.messages[0],...meta_payload,...{timestamp:Math.floor(Date.now() / 1000).toString()}}
  console.log(">>>127",Whatsapp_data)
  const {WHATSAPP_BUSINESS_ACCOUNT_ID,PHONE_NUMBER}=Whatsapp_data
  return {
  "object": "whatsapp_business_account",
  "entry": [
    {
      "id": WHATSAPP_BUSINESS_ACCOUNT_ID,
      "changes": [
        {
          "value": {
            "messaging_product": "whatsapp",
            "metadata": {
              "display_phone_number": PHONE_NUMBER,
              "phone_number_id":PHONE_NUMBER_ID
            },
            ...(meta_response)
          },
          "field": "messages"
        }
      ]
    }
  ]
}

}