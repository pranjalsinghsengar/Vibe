import fs from 'fs';
import Message from "../model/index.js";
// import { io } from "../../../socket/index.js";
import Tenant from "../../tenant/model/index.js";
import { fileURLToPath } from 'url';
import User from "../../user/model/index.js";
import WhatsappAccount from "../../whatsapp_account/model/index.js"
import Configuration from "../../configuration/model/index.js"
import ContentPrice from "../../msg_content/model/index.js"
import axios from "axios";
import path from "path"
import { v4 as uuidv4 } from 'uuid';
import Flow from "../../Flows/model/Flow.js"
import Edge from "../../Flows/model/Edge.js";
import jwt from 'jsonwebtoken';
import Logs from "../model/Logs.js"
import { getNode_Data_by_id, getNode_Details_by_id, send_message_whatsapp,getOutgoingLogJson } from '../helper/index.js'
import { trusted } from "mongoose";
import Conversation from "../model/conversation.js"
import { sendMessageToIoClient } from "../../../socket/socketClient.js"
// import { chat } from "../../../index.js"
import { makeConnectionSetup } from "../../../socket/socketClient.js"
const onlineUsers = new Map();
// reuestLocation
export const saveOutgoingLogs = async (data) => {
  const { entry } = data
  const req = {
    "body": data
  }
  console.log(">>>27", entry)
  for (const message of entry) {
    const { id: WHATSAPP_BUSINESS_ACCOUNT_ID, changes } = message
    const account_data = await WhatsappAccount.findOne({
      WHATSAPP_BUSINESS_ACCOUNT_ID: WHATSAPP_BUSINESS_ACCOUNT_ID
    })
    const { id: account_id, tenant_id, configuration_id: conf_id } = account_data
    const requestLocal_timestamp = Date.now()
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let last_conversation = await Conversation.findOne({ conf_id: conf_id, tenant_id: tenant_id, account_id: account_id, user_id: req.body.entry[0].changes[0].value.messages[0].from, createdAt: { $gte: twentyFourHoursAgo } }).sort({ _id: -1 })
    console.log(">>>>854", last_conversation,{
        conf_id: conf_id,
        tenant_id: tenant_id,
        account_id: account_id,
        conversation_id: uuidv4(),
        user_id: req.body.entry[0].changes[0].value.messages[0].from,
        request_type: "messages",
        request_id: req.body.entry[0].changes[0].value.messages[0].id,
        start_Local_timestamp: Date.now(),
        request_timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
        source: req.body.object,
        body_payload: req.body,
      })
    if (!last_conversation) {
     const newConversation= await Conversation.create({
        conf_id: conf_id,
        tenant_id: tenant_id,
        account_id: account_id,
        conversation_id: uuidv4(),
        user_id: req.body.entry[0].changes[0].value.messages[0].from,
        request_type: "messages",
        request_id: req.body.entry[0].changes[0].value.messages[0].id,
        start_Local_timestamp: Date.now(),
        request_timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
        source: req.body.object,
        body_payload: req.body,
      })
      last_conversation = await newConversation.save()
    }
    console.log(">>>69")
    const last_conversation_id = last_conversation?.conversation_id ? last_conversation.conversation_id : "null"
     const newLogs = new Logs({
        body_payload: req.body,
        source: req.body.object,
        conversation_id: last_conversation_id,
        conf_id,
        tenant_id,
        account_id,
        requestLocal_timestamp
      })
    newLogs.conversation_id = last_conversation?.conversation_id
    
    
    // console.log(">>>>data2",data2)

    for (const change of changes) {
      
      console.log(">>>>>>>123", JSON.stringify(change))

      
        if (change.value.statuses) {
          newLogs.request_id = change.value.statuses[0].id
          newLogs.user_id = change.value.statuses[0].recipient_id
          newLogs.request_type = "out"
          newLogs.requestContent_type = "status"
          newLogs.requestContent_value = change.value.statuses[0].status

          newLogs.request_timestamp = change.value.statuses[0].timestamp
          const updatedata = await Logs.updateOne({ response_id: change.value.statuses[0].id, request_type: "messages" }, { $set: { response_status: change.value.statuses[0].status, updatedAt_timestamp: change.value.statuses[0].timestamp } })
          // await newLogs.save()
           
        }
        else if (change.value.messages) {
          const message = change.value.messages[0];
          // let from = req.body.entry[0].changes[0].value?.messages[0]?.from;
          newLogs.request_id = change.value.messages[0].id
          newLogs.user_id = change.value.messages[0].to
          newLogs.request_type = "out"
          newLogs.requestContent_type = message.type
          newLogs.user_name = "Agent"// change.value.contacts[0]?.profile?.name || ""
          newLogs.request_timestamp = change.value.messages[0].timestamp
          const data2 = await newLogs.save()
            console.log(">>>>913", data2)
          // if (change.value.messages[0].type == "text") {
          //   console.log(">>112")
          //   newLogs.requestContent_value = message[message.type].body
          //    console.log(">>113")
          //   newLogs.request_intent = message[message.type].body
          //   // newLogs.response = res_payload
            

          //   const data2 = await newLogs.save()
          //   console.log(">>>>913", data2)
          // }
          //  if (change.value.messages[0].type == "template") {
          //   console.log(">>112")
          //   newLogs.requestContent_value = message[message.type].body
          //    console.log(">>113")
          //   newLogs.request_intent = message[message.type].body
          //   // newLogs.response = res_payload
            

          //   const data2 = await newLogs.save()
          //   console.log(">>>>913", data2)
          // }
        }
      



       
    }
  }
}

export const saveincominglogs = async (data) => {
  const { entry } = data
  const req = {
    "body": data
  }
  console.log(">>>27", entry)
  for (const message of entry) {
    const { id: WHATSAPP_BUSINESS_ACCOUNT_ID, changes } = message
    const account_data = await WhatsappAccount.findOne({
      WHATSAPP_BUSINESS_ACCOUNT_ID: WHATSAPP_BUSINESS_ACCOUNT_ID
    })
    const { id: account_id, tenant_id, configuration_id: conf_id } = account_data
    const requestLocal_timestamp = Date.now()
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    let last_conversation = await Conversation.findOne({ conf_id: conf_id, tenant_id: tenant_id, account_id: account_id, user_id: req.body.entry[0].changes[0].value.messages[0].from, createdAt: { $gte: twentyFourHoursAgo } }).sort({ _id: -1 })
    console.log(">>>>854", last_conversation,{
        conf_id: conf_id,
        tenant_id: tenant_id,
        account_id: account_id,
        conversation_id: uuidv4(),
        user_id: req.body.entry[0].changes[0].value.messages[0].from,
        request_type: "messages",
        request_id: req.body.entry[0].changes[0].value.messages[0].id,
        start_Local_timestamp: Date.now(),
        request_timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
        source: req.body.object,
        body_payload: req.body,
      })
    if (!last_conversation) {
     const newConversation= await Conversation.create({
        conf_id: conf_id,
        tenant_id: tenant_id,
        account_id: account_id,
        conversation_id: uuidv4(),
        user_id: req.body.entry[0].changes[0].value.messages[0].from,
        request_type: "messages",
        request_id: req.body.entry[0].changes[0].value.messages[0].id,
        start_Local_timestamp: Date.now(),
        request_timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
        source: req.body.object,
        body_payload: req.body,
      })
      last_conversation = await newConversation.save()
    }
    const last_conversation_id = last_conversation?.conversation_id ? last_conversation.conversation_id : "null"
     const newLogs = new Logs({
        body_payload: req.body,
        source: req.body.object,
        conversation_id: last_conversation_id,
        conf_id,
        tenant_id,
        account_id,
        requestLocal_timestamp
      })
    newLogs.conversation_id = last_conversation?.conversation_id
    
    
    // console.log(">>>>data2",data2)

    for (const change of changes) {
      
      console.log(">>>>>>>123", JSON.stringify(change))

      
        if (change.value.statuses) {
          newLogs.request_id = change.value.statuses[0].id
          newLogs.user_id = change.value.statuses[0].recipient_id
          newLogs.request_type = "in"
          newLogs.requestContent_type = "status"
          newLogs.requestContent_value = change.value.statuses[0].status

          newLogs.request_timestamp = change.value.statuses[0].timestamp
          const updatedata = await Logs.updateOne({ response_id: change.value.statuses[0].id, request_type: "messages" }, { $set: { response_status: change.value.statuses[0].status, updatedAt_timestamp: change.value.statuses[0].timestamp } })
          // await newLogs.save()
           
        }
        else if (change.value.messages) {
          const message = change.value.messages[0];
          let from = req.body.entry[0].changes[0].value?.messages[0]?.from;
          newLogs.request_id = change.value.messages[0].id
          newLogs.user_id = change.value.messages[0].from
          newLogs.request_type = "in"
          newLogs.requestContent_type = message.type
          newLogs.user_name = change.value.contacts[0].profile.name
          newLogs.request_timestamp = change.value.messages[0].timestamp
          const data2 = await newLogs.save()
            console.log(">>>>913", data2)
          // if (change.value.messages[0].type == "text") {

          //   newLogs.requestContent_value = message[message.type].body
          //   newLogs.request_intent = message[message.type].body
          //   // newLogs.response = res_payload
          //   const data2 = await newLogs.save()
          //   console.log(">>>>913", data2)
          // }
           
        }
      



       
    }
  }
}

export const reuestLocation = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value } = req.body;
    // const { latitude, longitude, name, address } = value

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // console.log(content_data)
    //  const tanent_data= await Tenant.findOne({id:req.meta_data.tanentId})
    //  console.log(">>>",tanent_data)
    //  const data=await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })
    console.log(">>>>>>.113", {
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        to: to,
        "type": "interactive",
        "interactive": {
          "type": "location_request_message",
          "body": {
            "text": "Heelo"
          },
          "action": {
            "name": "send_location"
          }
        }
        // text: { body: "Ack: " + msg_body },
      },
      headers: { "Content-Type": "application/json" },
    })
    const data = {
        messaging_product: "whatsapp",
        to: to,
        "type": "interactive",
        "interactive": {
          "type": "location_request_message",
          "body": {
            "text": value
          },
          "action": {
            "name": "send_location"
          }
        }
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
     data,
      headers: { "Content-Type": "application/json" },
    }).then(async(response) => {
      console.log(JSON.stringify(response.data));
      response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendintractiveButton = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value } = req.body;
    const { header_type, header_value, body, footer, button_type, buttons } = value

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // console.log(content_data)
    //  const tanent_data= await Tenant.findOne({id:req.meta_data.tanentId})
    //  console.log(">>>",tanent_data)
    //  const data=await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })

    const data= {
        messaging_product: "whatsapp",
        to: to,
        "type": "interactive",
        "interactive": {
          "type": button_type == "text" ? "button" : button_type == "url" ? "cta_url" : "",
          "header": {
            ...(header_type == "text" ? {
              "type": header_type,
              "text": header_value
            } : header_type == "video" ? {
              "type": header_type,
              "video": {
                "link": header_value,
              }
            } : header_type == "image" ? {
              "type": header_type,
              "image": {
                "link": header_value,

              }
            } : {})
          },
          "body": {
            "text": body
          },
          "footer": {
            "text": footer
          },
          "action": button_type == "url" ? {
            "name": "cta_url",
            "parameters": buttons
          } : button_type == "text" ? {
            "buttons": buttons
          } : {},
        }
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      "recipient_type": "individual",
      data,
      headers: { "Content-Type": "application/json" },
    }).then(async(response) => {
      console.log(JSON.stringify(response.data));
      response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
    })
      .catch((error) => {

        console.log(error);
        res.status(500).json({ message: "Server Error", error });
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendintractiveList = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value } = req.body;
    const { header, body, footer, sections, button_title } = value

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // console.log(content_data)
    //  const tanent_data= await Tenant.findOne({id:req.meta_data.tanentId})
    //  console.log(">>>",tanent_data)
    //  const data=await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })

const  data= {
        messaging_product: "whatsapp",
        to: to,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "header": {
            "type": "text",
            "text": header
          },
          "body": {
            "text": body
          },
          "footer": {
            "text": footer
          },
          "action": {
            "button": button_title,
            "sections": sections
          }
        }
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      "recipient_type": "individual",
      data,
      headers: { "Content-Type": "application/json" },
    }).then(async(response) => {
      console.log(JSON.stringify(response.data));
      response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendLocation = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value } = req.body;
    const { latitude, longitude, name, address } = value

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // console.log(content_data)
    //  const tanent_data= await Tenant.findOne({id:req.meta_data.tanentId})
    //  console.log(">>>",tanent_data)
    //  const data=await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })
    console.log(">>>>>>.113", {
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        to: to,
        "type": "location",
        "location": {
          "latitude": latitude,
          "longitude": longitude,
          "name": name,
          "address": address
        }
        // text: { body: "Ack: " + msg_body },
      },
      headers: { "Content-Type": "application/json" },
    })
    const data = {
        messaging_product: "whatsapp",
        to: to,
        "type": "location",
        "location": {
          "latitude": latitude,
          "longitude": longitude,
          "name": name,
          "address": address
        }
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      "recipient_type": "individual",
      data: data,
      headers: { "Content-Type": "application/json" },
    }).then(async(response) => {
      console.log(JSON.stringify(response.data));
       response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
// welcomeSendTemplateMessage
export const welcomeSendTemplateMessage = async (req, res) => {
  try {
    const { mobile_number, template_name, language_code, customer_name } = req.body;

    let data = JSON.stringify({
      "messaging_product": "whatsapp",
      "to": mobile_number,
      "type": "template",
      "template": {
        "name": template_name,
        "language": {
          "code": language_code
        },
        "components": [
          {
            "type": "body",
            "parameters": [
              {
                "type": "text",
                "text": customer_name
              }
            ]
          }
        ]
      }
    });
    console.log(">>>>1223", {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v21.0/' + req.user.PHONE_NUMBER_ID + '/messages?access_token=' + req.user.meta_api_access_token,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v21.0/' + req.user.PHONE_NUMBER_ID + '/messages?access_token=' + req.user.meta_api_access_token,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return res.status(200).json(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendTemplateMessage = async (req, res) => {
  try {
   
    const { mobile_number, template_name, language_code, customer_name, components, id } = req.body;
    if(!id)
      return res.status(400).send({error:"Template id is missing."})
    const whatsapp_data=await WhatsappAccount.findOne({PHONE_NUMBER_ID:req.user.PHONE_NUMBER_ID,WHATSAPP_BUSINESS_ACCOUNT_ID:req.user.WHATSAPP_BUSINESS_ACCOUNT_ID})
     console.log(">>>>whatsapp data",whatsapp_data)
      const {WHATSAPP_BUSINESS_ACCOUNT_ID,meta_api_access_token,inficonnect_api_key,PHONE_NUMBER_ID}=whatsapp_data
     if(!whatsapp_data)
    return res.status(400).send({error:"invalid data"})
  let templateMetaData
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://graph.facebook.com/v22.0/${id}?access_token=${meta_api_access_token}`,
    headers: { 
       
    },
  };
  axios.request(config)
  .then((response) => {
    console.log(">>>>632",JSON.stringify(response.data));
    const {name,language,category}=response.data
    if(!((template_name==name)&&(language==language_code)))
      return res.status(400).send({success:false, error:"Template id is invalid."})
    templateMetaData=response.data
     let data =  {
      "messaging_product": "whatsapp",
      "to": mobile_number,
      "type": "template",
      "template": {
        "name": template_name,
        "language": {
          "code": language_code
        },
        components
      }
    };
    // console.log(">>>>1223", {
    //   method: 'post',
    //   maxBodyLength: Infinity,
    //   url: 'https://graph.facebook.com/v21.0/' + req.user.PHONE_NUMBER_ID + '/messages?access_token=' + req.user.meta_api_access_token,
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // })

    axios.request({
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://graph.facebook.com/v21.0/' + req.user.PHONE_NUMBER_ID + '/messages?access_token=' + req.user.meta_api_access_token,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then(async(response) => {
        console.log(">>>>653")
        console.log(JSON.stringify(response.data));
        response.data.success=true
        data.metaData=templateMetaData
        const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,mobile_number,response.data,data)
        await saveOutgoingLogs(logsSaveData)
        return res.status(200).json(response.data)
      })
      .catch((error) => {
        console.log(">>>>662")
        console.log(error);
        return res.status(500).send({ data: error.response.data })
      });
    // return res.status(200).send({data:response.data,inficonnect_api_key,meta_api_access_token,PHONE_NUMBER_ID})
  })
  .catch((error) => {
    console.log(error);
    templateMetaData=error.data
    return res.status(400).send({success:false, error:"Template id is invalid."})
    // return res.status(500).send({data:"error while creating template"})
  });



     
  
    
 
  }
  catch (error) {
    console.log(">>>>>>>665",error)
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendImageMessage = async (req, res) => {
  try {
    console.log(">>>>>hello")
    const { type, to, value, caption } = req.body;
    console.log(">>>>>req.user", req.user)
    // const content_data = await ContentPrice.findOne({ userId: req.user.user_id })
    // console.log(content_data)w
    // // const tanent_data= await Tenant.findOne({id:req.meta_data.tanentId})
    // // console.log(">>>",tanent_data)
    // const data = await User.findOneAndUpdate({ id: tanent_data.admin.adminId },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })
    // console.log(">>>>>>81", {
    //   method: "POST", // Required, HTTP method, a string, e.g. POST, GET
    //   url:
    //     "https://graph.facebook.com/v12.0/" +
    //     req.user.PHONE_NUMBER_ID +
    //     "/messages?access_token=" +
    //     req.user.meta_api_access_token,
    //   data: {
    //     messaging_product: "whatsapp",
    //     to: to,
    //     type: "image",
    //     image: {
    //       "link": value,
    //     },
    //     // text: { body: "Ack: " + msg_body },
    //   },
    //   headers: { "Content-Type": "application/json" },
    // })
    // return
    const data = {
        messaging_product: "whatsapp",
        to: to,
        type: "image",
        image: {
          "link": value,
          ...(caption ? { caption: caption } : {})
        },
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data:data ,
      headers: { "Content-Type": "application/json" },
    }).then(async(response) => {
     response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });
  }
  catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
export const sendTextMessage = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })
    console.log(">>>>>>.113", {
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        to: to,
        text: { body: value },
        // text: { body: "Ack: " + msg_body },
      },
      headers: { "Content-Type": "application/json" },
    })
    const data = {
        messaging_product: "whatsapp",
        to: to,
        "type": "text",
        text: { body: value },
        // text: { body: "Ack: " + msg_body },
      }
    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: data,
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      console.log(">>>>735",JSON.stringify(response.data));
      response.data.success=true
      const logsSaveData=await getOutgoingLogJson(req.user.PHONE_NUMBER_ID ,to,response.data,data)
      await saveOutgoingLogs(logsSaveData)
      return res.status(200).json(response.data)
      
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendreplyonMessageStatus = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { typing_indicator, message_id } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })

    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "status": "read",
        message_id: message_id,
        ...(typing_indicator == true ? {
          "typing_indicator": {
            "type": "text"
          }
        } : {})
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendreplyonMessageText = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value, message_id } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })
    console.log(">>>>>>.113", {
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: to,
        "context": {
          "message_id": message_id
        },
        "type": "text",
        "text": {
          "preview_url": false,
          "body": value
        }
      },
      headers: { "Content-Type": "application/json" },
    })

    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: to,
        "context": {
          "message_id": message_id
        },
        "type": "text",
        "text": {
          "preview_url": false,
          "body": value
        }
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendreplyonMessageImg = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value, message_id } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })


    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: to,
        "context": {
          "message_id": message_id
        },
        "type": "image",
        "image": {
          id: value
        }
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendreplyonMessageImgUrl = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value, message_id } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })


    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: to,
        "context": {
          "message_id": message_id
        },
        "type": "image",
        "image": {
          link: value
        }
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const sendreplyonMessageEmoji = async (req, res) => {
  try {

    console.log(">>>>>>>>52", req.body, req.headers);
    const { type, to, value, message_id } = req.body;

    console.log("req.user", req.user);
    console.log(req.user.user_id)
    // const content_data = await ContentPrice.findOne({ contentType: type, userId: req.user.user_id })
    // // console.log(content_data, ">>>>>>>>>>>>>>428", req.meta_data)
    // // const tanent_data = await Tenant.findOne({ id: req.meta_data.tanentId })
    // // console.log(">>>", tanent_data)
    // const data = await User.findOneAndUpdate({ id: req.user.user_id },
    //   { $inc: { wallet: -`${content_data.subtypes[0].price}` } }, { new: true })


    axios({
      method: "POST", // Required, HTTP method, a string, e.g. POST, GET
      url:
        "https://graph.facebook.com/v12.0/" +
        req.user.PHONE_NUMBER_ID +
        "/messages?access_token=" +
        req.user.meta_api_access_token,
      data: {
        messaging_product: "whatsapp",
        "recipient_type": "individual",
        to: to,
        "type": "reaction",
        "reaction": {
          "message_id": message_id,
          "emoji": value
        }
      },
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json(response.data)
    })
      .catch((error) => {
        console.log(error);
      });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }

}
export const verify = async (req, res) => {
  try {
    const { config_id } = req.params;
    // sample request.query
    //     {
    //   'hub.mode': 'subscribe',
    //   'hub.challenge': '1663122588',
    //   'hub.verify_token': '231`24'
    // }

    const config_data = await Configuration.findOne({ id: config_id })
    console.log(">>>547", req.query)
    console.log(">>>548", config_data)
    if (true) {//if (tanent_data && config_data && account_data) {
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];
      console.log(">>>>>>>>16")
      // Check if a token and mode were sent
      if (mode && token) {
        // Check the mode and token sent are correct
        if (mode === "subscribe" && token === `${config_id}`) {
          // if(true){//if (mode === "subscribe" && token === account_data.callbackUrl_Verify_token) {
          // Respond with 200 OK and challenge token from the request
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          // Responds with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }

      else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
      //   const verify_token = "verify_token"
      //   const verify_token = ver_token;

    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
// Send a Message

export const sendMessage_api = async (req, res) => {
  try {
    console.log(">>>>>>> req.body", JSON.stringify(req.body));
    const { entry } = req.body
    for (const message of entry) {
      const { id: WHATSAPP_BUSINESS_ACCOUNT_ID, changes } = message
       const account_data = await WhatsappAccount.findOne({
      WHATSAPP_BUSINESS_ACCOUNT_ID: WHATSAPP_BUSINESS_ACCOUNT_ID
    })

      // console.log(">>>>data2",data2)

      for (const change of changes) {
        let data
        console.log(">>>>>>>123", JSON.stringify(change))

        if (account_data.meta_webhook_modification == false) {
          data = req.body
        }
        else {
          if (change.value.statuses) {
             
            data = JSON.stringify({
              "from": change.value.statuses[0].recipient_id,
              "to": change.value.metadata.display_phone_number,
              "data": {
                type: "status",
                id: change.value.statuses[0].id,
                value: change.value.statuses[0].status,
                timestamp: change.value.statuses[0].timestamp
              }
            });
          }
          else if (change.value.messages) {
            const message = change.value.messages[0];
            let from = req.body.entry[0].changes[0].value?.messages[0]?.from;
            if (change.value.messages[0].type == "text") {

               
            }
            data = JSON.stringify({
              "from": change.value.messages[0].from,
              "to": change.value.metadata.display_phone_number,
              "data": {
                type: change.value.messages[0].type,
                id: change.value.messages[0].id,
                value: (change.value.messages[0].type == "text") ? change.value.messages[0][change.value.messages[0].type].body : (change.value.messages[0].type == "image") ? change.value.messages[0][change.value.messages[0].type].id : (change.value.messages[0].type == "interactive") ? change.value.messages[0][change.value.messages[0].type].list_reply || change.value.messages[0][change.value.messages[0].type].button_reply : "",
                timestamp: change.value.messages[0].timestamp,
                ...((change.value.messages[0].type == "image" && change.value.messages[0][change.value.messages[0].type].caption) ? { caption: change.value.messages[0][change.value.messages[0].type].caption } : {})
              }
            });
          }
        }



        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${account_data.client_webhook_url}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        try {
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        }
        catch (error) {
          console.log(">>>>>>186", error);
        }
      }
    }
    return res.sendStatus(200)
    const { tenantObjId, sender, receivers, content, replyTo, attachments } = req.body;

    const tenant = await Tenant.findById(tenantObjId);
    if (!tenant) {
      return res
        .status(400)
        .json({ success: false, message: "Tenant not found" });
    }

    const newMessage = new Message({
      tenant: {
        tenantObjId: tenant?._id,
        tenantId: tenant?.id,
        tenantName: tenant?.name,
      },
      sender,
      receivers,
      content,
      replyTo,
      attachments,
    });

    const savedMessage = await newMessage.save();

    // Emit message event to receivers
    receivers.forEach((receiver) => {
      const receiverSocket = onlineUsers.get(receiver.receiverId);
      if (receiverSocket) io.to(receiverSocket).emit("newMessage", savedMessage);
    });

    // Acknowledge sender
    io.to(onlineUsers.get(sender.senderId)).emit("messageSent", savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    console.log(">>>>965", error)
    res.status(500).json({ error: error.message });
  }
};
export const sendMessage = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>615", JSON.stringify(req.body))
    await saveincominglogs(req.body)
    console.log(">>>>done")
    const { entry } = req.body
    // return res.sendStatus(200)
    // return
    const account_data = await WhatsappAccount.findOne({ WHATSAPP_BUSINESS_ACCOUNT_ID: entry[0].id })
    console.log(">>>>689", account_data)
    const { api_enable, flow_enable, status } = account_data
    if (status == "active") {
      if (api_enable == true)
        sendMessage_api(req, res)
      else if (flow_enable == true)
        sendMessage_flow(req, res)
      else
        return res.sendStatus(200)
    }
    else
      return res.sendStatus(200)
    // console.log(account_data)
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export const sendMessage_flow = async (req, res) => {
  try {
    console.log(">>>>>>> req.body`1234567", JSON.stringify(req.body), req.params);

    const { object, entry } = req.body


    for (const message of entry) {
      const { id: WHATSAPP_BUSINESS_ACCOUNT_ID, changes } = message
      const account_data = await WhatsappAccount.findOne({
        WHATSAPP_BUSINESS_ACCOUNT_ID: WHATSAPP_BUSINESS_ACCOUNT_ID
      })
      const { id: account_id, tenant_id, configuration_id: conf_id } = account_data
      const requestLocal_timestamp = Date.now()
      let last_conversation = await Conversation.findOne({ conf_id: conf_id, tenant_id: tenant_id, account_id: account_id, user_id: req.body.entry[0].changes[0].value.messages[0].from }).sort({ _id: -1 })

      let from = req.body.entry[0].changes[0].value?.messages[0]?.from;



      const last_conversation_id = last_conversation?.conversation_id ? last_conversation.conversation_id : "null"

      let end_chat = false
      const newLogs = new Logs({
        body_payload: req.body,
        source: req.body.object,
        conversation_id: last_conversation_id,
        conf_id,
        tenant_id,
        account_id,
        requestLocal_timestamp
      })
      const { PHONE_NUMBER_ID, meta_api_access_token } = account_data

      for (const change of changes) {
        let data
        let res_payload

        if (change.value.statuses) {

          newLogs.request_id = change.value.statuses[0].id
          newLogs.user_id = change.value.statuses[0].recipient_id
          newLogs.request_type = "statuses"
          newLogs.requestContent_type = "status"

          newLogs.requestContent_value = change.value.statuses[0].status

          newLogs.request_timestamp = change.value.statuses[0].timestamp

          await newLogs.save()
          const updatedata = await Logs.updateOne({ response_id: change.value.statuses[0].id, request_type: "messages" }, { $set: { response_status: change.value.statuses[0].status, updatedAt_timestamp: change.value.statuses[0].timestamp } })
          data = JSON.stringify({
            "from": change.value.statuses[0].recipient_id,
            "to": change.value.metadata.display_phone_number,
            "data": {
              type: "status",
              id: change.value.statuses[0].id,
              value: change.value.statuses[0].status,
              timestamp: change.value.statuses[0].timestamp
            }
          });
        }
        else if (change.value.messages) {

          const message = change.value.messages[0];
          const temp = message.type

          const createdAt = last_conversation?.created_at ? new Date(last_conversation?.created_at) : new Date()
          const now = new Date();

          const twoHoursInMs = 2 * 60 * 60 * 1000;

          if (((now - createdAt) >= twoHoursInMs) || last_conversation?.feedback_given == true) {
            const newConversation = new Conversation({
              conf_id, tenant_id, account_id,
              conversation_id: uuidv4(),
              user_id: req.body.entry[0].changes[0].value.messages[0].from,
              request_type: "messages",
              request_id: req.body.entry[0].changes[0].value.messages[0].id,
              start_Local_timestamp: Date.now(),
              request_timestamp: req.body.entry[0].changes[0].value.messages[0].timestamp,
              source: req.body.object,
              body_payload: req.body,

            });

            last_conversation = await newConversation.save()

          }

          newLogs.conversation_id = last_conversation?.conversation_id
          // return res.statusCode(200)
          let from = req.body.entry[0].changes[0].value?.messages[0]?.from;
          newLogs.request_id = change.value.messages[0].id
          newLogs.user_id = change.value.messages[0].from
          newLogs.request_type = "messages"
          newLogs.requestContent_type = message.type
          newLogs.user_name = change.value.contacts[0].profile.name
          newLogs.request_timestamp = change.value.messages[0].timestamp
          console.log(">>>>>>>>>>>>>768")
          if (change.value.messages[0].type == "text") {

            newLogs.requestContent_value = message[message.type].body
            newLogs.request_intent = message[message.type].body
            if (last_conversation?.escalated_to_human == true) {
              // console.log(">>>>802", last_conversation.agent_conversationId, `${conf_id}/${tenant_id}/${account_id}/${from}`, message[message.type].body)
              // chat.sendMessage(`${conf_id}/${tenant_id}/${account_id}/${from}`, last_conversation.agent_conversationId, message[message.type].body, type = "text");
              await sendMessageToIoClient(last_conversation.agent_conversationId, `${conf_id}/${tenant_id}/${account_id}/${from}`, message[message.type].body)
              return res.statusCode(200)
            }
            const input = message[message.type].body.trim().toLowerCase();
            if (/^(hi+|hello+|hii+|hey+)$/.test(input)) {


              const flow_data = await Flow.findOne({ account_id: account_id, status: "active" })
              // console.log(">>>>flow data", flow_data)
              const edge_data = await Edge.findOne({ account_id: account_id, flow_id: flow_data.uniqueid, from_node: "0" })
              // console.log(">>>>>>2345674324", edge_data.to_node, account_id, flow_data.uniqueid)
              // console.log(">>>>>3399", edge_data)
              const msg_data = await getNode_Details_by_id(edge_data.to_node, account_id, flow_data.uniqueid)
              console.log(">>>>>339", msg_data)
              // console.log(">>>>>", account_data)


              if (msg_data.node_data.questionType == "button") {
                newLogs.response_intent = msg_data.node_data.label + `button_list:`
                const button_data = msg_data.meta_data.map(data => {
                  const res_data = {
                    "type": "reply",
                    "reply": {
                      "id": data.id,
                      "title": data.label
                    }
                  }
                  newLogs.response_intent = newLogs.response_intent + data.label + ','
                  return res_data


                })
                res_payload = {
                  messaging_product: "whatsapp",
                  to: from,
                  "type": "interactive",
                  "interactive": {
                    "type": "button",
                    "body": {
                      // "text":"Are you agree with following terms and conditions.\nhttps://ondc.org/terms-and-conditions/"
                      "text": msg_data.node_data.label
                      //    "text":"This is required information to be seller on our platform.\n1.Tax Registration Details(PAN number for business and GST number).\n2.Licence Number (Trade Licence Number).\n3.Bank Account Details.\n4.Choose Shipping Method.\n5.Contact Details (Email, Phone Number, Address)."  
                    },
                    "action": {
                      "buttons": button_data
                    }
                  }
                  // text: { body: "Ack: " + msg_body },
                }
              }
            }
            else {
              console.log(">>>>>>>>>>>>>>>822")
              const response = await axios({
                method: "POST",
                url: `https://stage.myindiabazar.com/query`,
                data: {
                  "query": message[message.type].body
                },
                headers: { "Content-Type": "application/json" },
              });

              console.log(">>>>>>>>821", response.data)

              res_payload = {

                messaging_product: "whatsapp",
                to: from,
                // text: { body: response.data.response },
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "header": {
                    "type": "text",
                    "text": " "
                  },
                  "body": {
                    "text": response.data.response
                  },
                  "footer": {
                    "text": "⚠️ This response is AI-generated."
                  },
                  "action": {
                    "buttons": [
                      {
                        "type": "reply",
                        "reply": {
                          "id": "ai-main-menu",
                          "title": "Main Menu"
                        }
                      },
                      {
                        "type": "reply",
                        "reply": {
                          "id": "ai-end-chat",
                          "title": "End Chat"
                        }
                      },
                      {
                        "type": "reply",
                        "reply": {
                          "id": "live-agent",
                          "title": "Chat With Agent"
                        }
                      }
                    ]
                  }
                }

                // text: { body: "Ack: " + msg_body },
              }

              newLogs.response_intent = response.data.response + "onebutton_list:End Chat,Chat With Agent"

            }
            console.log(">>>701", JSON.stringify(res_payload))

            // return res.sendStatus(200)
            newLogs.response = res_payload
            await newLogs.save()
            if (object == "web_bot") {
              await newLogs.save()
              return res.status(200).send({ sucess: true, data: res_payload })
            }
            send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload, newLogs)
            return res.sendStatus(200)

          }
          else if (change.value.messages[0].type == "interactive") {
            const flow_data = await Flow.findOne({ account_id: account_id, status: "active" })
            //  console.log(">>>>flow data",flow_data)
            let msg_data
            if (change.value.messages[0].interactive?.button_reply?.id) {
              // requestContent_value
              if (change.value.messages[0].interactive?.button_reply?.id == "rating-good" || change.value.messages[0].interactive?.button_reply?.id == "rating-bad") {
                console.log(">>>>feedback")

                const end_Local_timestamp = Date.now()
                const start_end_interval = end_Local_timestamp - last_conversation.start_Local_timestamp
                const update_query = { conversation_id: last_conversation.conversation_id, conf_id: conf_id, tenant_id: tenant_id, account_id: account_id }

                const dataforIntent = await Logs.find({ conversation_id: last_conversation.conversation_id, request_type: "messages" }, { request_intent: 1, response_intent: 1, _id: 0 })
                console.log(">>>>>>>>>987", dataforIntent)
                let response_intent;


                response_intent = await axios({
                  method: "POST",
                  url: `https://stage.myindiabazar.com/intent`,
                  data: dataforIntent,
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
                const update_data = { start_end_interval: start_end_interval, end_Local_timestamp: end_Local_timestamp, feedback_given: true, segmentation: response_intent.data.intent, abandoned: false }
                if (change.value.messages[0].interactive?.button_reply?.id == "rating-good")
                  update_data.thumbs_up = true
                if (change.value.messages[0].interactive?.button_reply?.id == "rating-bad")
                  update_data.thumbs_down = true
                console.log(">>>>>>846", update_query)
                await Conversation.updateOne(update_query, { $set: update_data }, {
                  sort: { _id: -1 },         // get the latest document
                  new: true                  // return the updated document
                })
                const res_payload = {
                  messaging_product: "whatsapp",
                  to: from,
                  text: { body: "Thanks For Giving Your FeedBack" },

                  // text: { body: "Ack: " + msg_body },
                }
                // console.log(">>>>>>>>res_payload", reres_payload)
                console.log(">>>>>>>859", PHONE_NUMBER_ID)
                console.log(">>>>>>>860", meta_api_access_token)
                console.log(">>>>>>>861", res_payload)
                console.log(PHONE_NUMBER_ID, meta_api_access_token, res_payload)
                if (object == "web_bot") {

                  await newLogs.save()
                  return res.status(200).send({ suceess: true, data: res_payload })

                  return res.status(200).send({ sucess: true, data: res_payload })

                }
                await send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload, newLogs)
                return res.sendStatus(200)
              }
              else if (change.value.messages[0].interactive?.button_reply?.id == "ai-end-chat") {
                console.log(">>>>>>>>>>>>>974",)
                const feedbackform = {
                  "messaging_product": "whatsapp",
                  "recipient_type": "individual",
                  to: from,
                  "type": "interactive",
                  "interactive": {
                    "type": "button",
                    "header": {
                      "type": "image",
                      "image": {
                        "link": "https://storage.googleapis.com/ens-ondc/1746446999352_thumbs_up_and_down_circles.jpg"
                      }
                    },
                    "body": {
                      "text": "📢 Thank you for getting in touch with us and we genuinely hope your experience with our service has been a positive one"
                    },
                    "footer": {
                      "text": "👍 Great! | 👎 Needs improvement"
                    },
                    "action": {
                      "buttons": [
                        {
                          "type": "reply",
                          "reply": {
                            "id": "rating-good",
                            "title": "👍"
                          }
                        },
                        {
                          "type": "reply",
                          "reply": {
                            "id": "rating-bad",
                            "title": "👎"
                          }
                        }
                      ]
                    }
                  }
                }
                newLogs.response_intent = "📢 Thank you for getting in touch with us and we genuinely hope your experience with our service has been a positive onebutton_list:rating-good,rating-bad"
                await send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, feedbackform, newLogs)
                last_conversation.abandoned = false
                await last_conversation.save()
                // console.log("This runs after 2 seconds");
                return res.sendStatus(200)

              }
              else if (change.value.messages[0].interactive?.button_reply?.id == "live-agent") {
                if (true) {

                  const dataforIntent = await Logs.find({ conversation_id: last_conversation.conversation_id, request_type: "messages" }, { request_intent: 1, response_intent: 1, _id: 0 })
                  console.log(">>>>>>>>>987", dataforIntent)
                  let response_intent;


                  response_intent = await axios({
                    method: "POST",
                    url: `https://stage.myindiabazar.com/intent`,
                    data: dataforIntent,
                    headers: {
                      "Content-Type": "application/json"
                    }
                  });
                  console.log("Intent response:", response_intent.data);

                  // console.log(">>>>>>984", response_itent)
                  // chat.connectToAgent(`${conf_id}/${tenant_id}/${account_id}/${from}`, { chatTopic: response_intent.data.intent, chatSummary: response_intent.data.summary });
                  console.log(">>>>>>>>1056", {
                    companyId: "683441fb984214c471ff64a1",
                    userId: `${conf_id}/${tenant_id}/${account_id}/${from}`,
                    userType: "customer",
                    chatTopic: response_intent.data.intent,
                    chatSummary: response_intent.data.summary
                  })
                  makeConnectionSetup({
                    companyId: "683441fb984214c471ff64a1",
                    userId: `${conf_id}/${tenant_id}/${account_id}/${from}`,
                    userType: "customer",
                    chatTopic: response_intent.data.intent,
                    chatSummary: response_intent.data.summary
                  });
                  last_conversation.escalated_to_human = true
                  await last_conversation.save()
                }
                return res.sendStatus(200)
              }
              else if (change.value.messages[0].interactive?.button_reply?.id == "ai-main-menu") {


                const flow_data = await Flow.findOne({ account_id: account_id, status: "active" })
                // console.log(">>>>flow data", flow_data)
                const edge_data = await Edge.findOne({ account_id: account_id, flow_id: flow_data.uniqueid, from_node: "0" })
                // console.log(">>>>>>2345674324", edge_data.to_node, account_id, flow_data.uniqueid)
                // console.log(">>>>>3399", edge_data)
                const msg_data = await getNode_Details_by_id(edge_data.to_node, account_id, flow_data.uniqueid)
                console.log(">>>>>339", msg_data)
                // console.log(">>>>>", account_data)


                if (msg_data.node_data.questionType == "button") {
                  newLogs.response_intent = msg_data.node_data.label + `button_list:`
                  const button_data = msg_data.meta_data.map(data => {
                    const res_data = {
                      "type": "reply",
                      "reply": {
                        "id": data.id,
                        "title": data.label
                      }
                    }
                    newLogs.response_intent = newLogs.response_intent + data.label + ','
                    return res_data


                  })
                  res_payload = {
                    messaging_product: "whatsapp",
                    to: from,
                    "type": "interactive",
                    "interactive": {
                      "type": "button",
                      "body": {
                        // "text":"Are you agree with following terms and conditions.\nhttps://ondc.org/terms-and-conditions/"
                        "text": msg_data.node_data.label
                        //    "text":"This is required information to be seller on our platform.\n1.Tax Registration Details(PAN number for business and GST number).\n2.Licence Number (Trade Licence Number).\n3.Bank Account Details.\n4.Choose Shipping Method.\n5.Contact Details (Email, Phone Number, Address)."  
                      },
                      "action": {
                        "buttons": button_data
                      }
                    }
                    // text: { body: "Ack: " + msg_body },
                  }
                }
                newLogs.response = res_payload
                await newLogs.save()
                if (object == "web_bot") {
                  return res.status(200).send({ sucess: true, data: res_payload })
                }
                send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload)
                return res.sendStatus(200)
              }
              msg_data = await getNode_Details_by_id(change.value.messages[0].interactive.button_reply.id, account_id, flow_data.uniqueid)
              console.log(">>>1133", msg_data)
              newLogs.requestContent_value = change.value.messages[0].interactive.button_reply.title
              newLogs.request_intent = `button_reply:` + change.value.messages[0].interactive.button_reply.title

            }

            else {
              msg_data = await getNode_Details_by_id(change.value.messages[0].interactive?.list_reply?.id, account_id, flow_data.uniqueid)
              newLogs.requestContent_value = change.value.messages[0].interactive?.list_reply?.title
              newLogs.request_intent = `button_reply:` + change.value.messages[0].interactive.list_reply?.title
            }



            //  return
            // console.log(">>>>>760", msg_data)



            if (msg_data.node_data.questionType == "button") {
              console.log(">>>>>>>>>>>40999999999")
              // return
              // msg_data=await getNode_Details_by_id(msg_data.meta_data[0].id,account_id,flow_data.uniqueid)
              console.log(">>>>410", msg_data.node_data.label)
              // return
              newLogs.response_intent = msg_data.node_data.label + `button_list:`
              const button_data = msg_data.meta_data.map(data => {

                const res_data = {
                  "type": "reply",
                  "reply": {
                    "id": data.id,
                    "title": data.label
                  }
                }
                newLogs.response_intent = newLogs.response_intent + data.label + ','
                return res_data


              })
              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    // "text":"Are you agree with following terms and conditions.\nhttps://ondc.org/terms-and-conditions/"
                    "text": msg_data.node_data.label
                    //    "text":"This is required information to be seller on our platform.\n1.Tax Registration Details(PAN number for business and GST number).\n2.Licence Number (Trade Licence Number).\n3.Bank Account Details.\n4.Choose Shipping Method.\n5.Contact Details (Email, Phone Number, Address)."  
                  },
                  "action": {
                    "buttons": button_data
                  }
                }
                // text: { body: "Ack: " + msg_body },
              }

            }
            else if (msg_data.meta_data[0].questionType == "button") {
              msg_data = await getNode_Details_by_id(msg_data.meta_data[0].id, account_id, flow_data.uniqueid)
              // console.log(">>>>410",msg_data.node_data.label)
              newLogs.response_intent = msg_data.node_data.label + `button_list:`
              const button_data = msg_data.meta_data.map(data => {
                const res_data = {
                  "type": "reply",
                  "reply": {
                    "id": data.id,
                    "title": data.label
                  }
                }
                newLogs.response_intent = newLogs.response_intent + data.label + ','
                return res_data


              })
              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    // "text":"Are you agree with following terms and conditions.\nhttps://ondc.org/terms-and-conditions/"
                    "text": msg_data.node_data.label
                    //    "text":"This is required information to be seller on our platform.\n1.Tax Registration Details(PAN number for business and GST number).\n2.Licence Number (Trade Licence Number).\n3.Bank Account Details.\n4.Choose Shipping Method.\n5.Contact Details (Email, Phone Number, Address)."  
                  },
                  "action": {
                    "buttons": button_data
                  }
                }
                // text: { body: "Ack: " + msg_body },
              }
            }
            else if (msg_data.meta_data[0].questionType == "query") {
              // return res.sendStatus(200)
              const query_data = await getNode_Details_by_id(msg_data.meta_data[0].id, account_id, flow_data.uniqueid)
              // console.log(">>>>>>44",query_data);
              // console.log(">>>>410", msg_data.node_data.label)
              newLogs.response_intent = msg_data.node_data.label + `menu_list:`
              const rows = query_data.meta_data.map(data => {
                //   const res_data = {
                //     "type": "reply",
                //     "reply": {
                //         "id": data.id,
                //         "title": data.label
                //     }
                // }
                const res_data = {
                  "id": data.id,
                  "title": data.label
                  // "description": "<SECTION_1_ROW_1_DESC>"
                }
                newLogs.response_intent = newLogs.response_intent + data.label + ','
                return res_data


              })
              console.log(">>>>>>44", rows);
              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "list",
                  // "header": {
                  //     "type": "text",
                  //     "text": "<HEADER_TEXT>"
                  // },
                  "body": {
                    "text": query_data.node_data.label
                  },
                  // "footer": {
                  //     "text": "<FOOTER_TEXT>"
                  // },
                  "action": {
                    "button": "Select Options...",
                    "sections": [
                      {
                        "title": "options",
                        "rows": rows
                      }
                    ]
                  }
                }

                // text: { body: "Ack: " + msg_body },
              }
            }
            else if (msg_data.meta_data[0].questionType == "api") {
              // console.log(">>>>>>>>>>>>>>>>>860")
              const headers = {}
              const data = {}
              const url = msg_data.meta_data[0].fetchUrl
              const method = msg_data.meta_data[0].fetchMethod
              // console.log(">>>>>>>>>>>>>>>>>>863")
              const response = await axios({
                method,
                url,
                headers,
                data,
              });
              console.log(">>>>>>>>>response.data", response.data)


              if (msg_data.meta_data[0].fetchResponse.text == true && msg_data.meta_data[0].fetchResponse.image == false && msg_data.meta_data[0].fetchResponse.options == false) {
                console.log(">>>>>>>>>>>926")
                if (object == "web_bot") {
                  const payloads = response.data.map(i => ({
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: i.title },
                  }));

                  await newLogs.save()

                  return res.status(200).send({ suceess: true, data: payloads })

                }
                for (const i of response.data) {
                  const res_payload = {
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: i.title },

                    // text: { body: "Ack: " + msg_body },
                  }
                  console.log(">>>>>>>>>>>>>>>882", res_payload)
                  send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload)

                }
              }
              // else if (msg_data.meta_data[0].fetchResponse.text == true && msg_data.meta_data[0].fetchResponse.image == true && msg_data.meta_data[0].fetchResponse.options == true) {
              else if (true) {
                if (msg_data.meta_data[0].end_chat == true) {
                  end_chat = true
                  const end_mainMenu_options = {
                    "messaging_product": "whatsapp",
                    "recipient_type": "individual",
                    to: from,
                    "type": "interactive",
                    "interactive": {
                      "type": "button",
                      "header": {
                        "type": "text",
                        "text": " "
                      },
                      "body": {
                        "text": "Would you like to end the chat or go back to the main menu?"
                      },
                      // "footer": {
                      //   "text": "👍 Great! | 👎 Needs improvement"
                      // },
                      "action": {
                        "buttons": [
                          {
                            "type": "reply",
                            "reply": {
                              "id": "ai-main-menu",
                              "title": "Main Menu"
                            }
                          },
                          {
                            "type": "reply",
                            "reply": {
                              "id": "ai-end-chat",
                              "title": "End Chat"
                            }
                          }
                        ]
                      }
                    }
                  }
                  // const feedbackform = {
                  //   "messaging_product": "whatsapp",
                  //   "recipient_type": "individual",
                  //   to: from,
                  //   "type": "interactive",
                  //   "interactive": {
                  //     "type": "button",
                  //     "header": {
                  //       "type": "image",
                  //       "image": {
                  //         "link": "https://storage.googleapis.com/ens-ondc/1746446999352_thumbs_up_and_down_circles.jpg"
                  //       }
                  //     },
                  //     "body": {
                  //       "text": "📢 Thank you for getting in touch with us and we genuinely hope your experience with our service has been a positive one"
                  //     },
                  //     "footer": {
                  //       "text": "👍 Great! | 👎 Needs improvement"
                  //     },
                  //     "action": {
                  //       "buttons": [
                  //         {
                  //           "type": "reply",
                  //           "reply": {
                  //             "id": "rating-good",
                  //             "title": "👍"
                  //           }
                  //         },
                  //         {
                  //           "type": "reply",
                  //           "reply": {
                  //             "id": "rating-bad",
                  //             "title": "👎"
                  //           }
                  //         }
                  //       ]
                  //     }
                  //   }
                  // }
                  setTimeout(async () => {
                    await send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, end_mainMenu_options, newLogs)
                    // console.log("This runs after 2 seconds");
                  }, 60000); // 2000 ms = 2 seconds

                }
                if (object == "web_bot") {
                  const payloads = response.data.map(i => ({
                    messaging_product: "whatsapp",
                    to: from,
                    "type": "image",
                    "image": {
                      "link": "https://ondc-marketplace.s3.amazonaws.com/images/560db794-9553-402a-b8be-ef913ec966ad.jpg",
                      "caption": i.title
                    }
                    // text: { body: i.title },

                    // text: { body: "Ack: " + msg_body },
                  }));


                  await newLogs.save()

                  return res.status(200).send({ suceess: true, ...(end_chat = true ? { end_chat: true } : {}), data: payloads })

                }
                for (const i of response.data) {
                  const res_payload = {
                    messaging_product: "whatsapp",
                    to: from,
                    "type": "image",
                    "image": {
                      "link": "https://ondc-marketplace.s3.amazonaws.com/images/560db794-9553-402a-b8be-ef913ec966ad.jpg",
                      "caption": i.title
                    }
                    // text: { body: i.title },

                    // text: { body: "Ack: " + msg_body },
                  }
                  console.log(">>>>>>>>>>>>>>>882", res_payload)
                  send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload)

                }
              }

              //   else if (msg_data.meta_data[0].fetchResponse.text == true && msg_data.meta_data[0].fetchResponse.image == true && msg_data.meta_data[0].fetchResponse.options == false) {
              //   res_payload = {
              //     messaging_product: "whatsapp",
              //     to: from,
              //     text: { body: msg_data.meta_data[0].label },

              //     // text: { body: "Ack: " + msg_body },
              //   }
              // }
            }
            else if (msg_data.meta_data[0].questionType == "image") {

              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "image",
                "image": {
                  "link": msg_data.meta_data[0].uploadedImageUrl,
                  "caption": msg_data.meta_data[0].label
                }

                // text: { body: "Ack: " + msg_body },
              }
              newLogs.response_intent = msg_data.meta_data[0].label
              if (msg_data.meta_data[0].end_chat == true) {
                end_chat = true
                const end_mainMenu_options = {
                  "messaging_product": "whatsapp",
                  "recipient_type": "individual",
                  to: from,
                  "type": "interactive",
                  "interactive": {
                    "type": "button",
                    "header": {
                      "type": "text",
                      "text": " "
                    },
                    "body": {
                      "text": "Would you like to end the chat or go back to the main menu?"
                    },
                    // "footer": {
                    //   "text": "👍 Great! | 👎 Needs improvement"
                    // },
                    "action": {
                      "buttons": [
                        {
                          "type": "reply",
                          "reply": {
                            "id": "ai-main-menu",
                            "title": "Main Menu"
                          }
                        },
                        {
                          "type": "reply",
                          "reply": {
                            "id": "ai-end-chat",
                            "title": "End Chat"
                          }
                        }
                      ]
                    }
                  }
                }
                setTimeout(async () => {
                  await send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, end_mainMenu_options, newLogs)
                  // console.log("This runs after 2 seconds");
                }, 5000); // 2000 ms = 2 seconds

              }

            }
            else if (msg_data.node_data.questionType == "text") {

              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                text: { body: msg_data.meta_data[0].label },

                // text: { body: "Ack: " + msg_body },
              }
              newLogs.response_intent = msg_data.meta_data[0].label
              if (msg_data.meta_data[0].end_chat == true) {
                end_chat = true
                const end_mainMenu_options = {
                  "messaging_product": "whatsapp",
                  "recipient_type": "individual",
                  to: from,
                  "type": "interactive",
                  "interactive": {
                    "type": "button",
                    "header": {
                      "type": "text",
                      "text": " "
                    },
                    "body": {
                      "text": "Would you like to end the chat or go back to the main menu?"
                    },
                    // "footer": {
                    //   "text": "👍 Great! | 👎 Needs improvement"
                    // },
                    "action": {
                      "buttons": [
                        {
                          "type": "reply",
                          "reply": {
                            "id": "ai-main-menu",
                            "title": "Main Menu"
                          }
                        },
                        {
                          "type": "reply",
                          "reply": {
                            "id": "ai-end-chat",
                            "title": "End Chat"
                          }
                        }
                      ]
                    }
                  }
                }
                setTimeout(async () => {
                  await send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, end_mainMenu_options, newLogs)
                  // console.log("This runs after 2 seconds");
                }, 5000); // 2000 ms = 2 seconds

              }

            }
            else if (msg_data.node_data.questionType == "query") {
              // return res.sendStatus(200)
              // const query_data=await getNode_Details_by_id(msg_data.meta_data[0].id,account_id,flow_data.uniqueid)
              // console.log(">>>>>>44",query_data);
              console.log(">>>>410", msg_data.node_data.label)
              newLogs.response_intent = msg_data.node_data.label + `menu_list:`
              const rows = msg_data.meta_data.map(data => {
                //   const res_data = {
                //     "type": "reply",
                //     "reply": {
                //         "id": data.id,
                //         "title": data.label
                //     }
                // }
                const res_data = {
                  "id": data.id,
                  "title": data.label
                  // "description": "<SECTION_1_ROW_1_DESC>"
                }
                newLogs.response_intent = newLogs.response_intent + data.label + ','
                return res_data


              })
              console.log(">>>>>>44", rows);
              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "list",
                  // "header": {
                  //     "type": "text",
                  //     "text": "<HEADER_TEXT>"
                  // },
                  "body": {
                    "text": msg_data.node_data.label
                  },
                  // "footer": {
                  //     "text": "<FOOTER_TEXT>"
                  // },
                  "action": {
                    "button": "Select Options...",
                    "sections": [
                      {
                        "title": "options",
                        "rows": rows
                      }
                    ]
                  }
                }

                // text: { body: "Ack: " + msg_body },
              }
            }
            else if (msg_data.meta_data[0].questionType == "button") {
              msg_data = await getNode_Details_by_id(msg_data.meta_data[0].id, account_id, flow_data.uniqueid)
              // console.log(">>>>410",msg_data.node_data.label)
              newLogs.response_intent = msg_data.node_data.label + `button_list:`
              const button_data = msg_data.meta_data.map(data => {
                const res_data = {
                  "type": "reply",
                  "reply": {
                    "id": data.id,
                    "title": data.label
                  }
                }
                newLogs.response_intent = newLogs.response_intent + data.label + ','
                return res_data


              })
              res_payload = {
                messaging_product: "whatsapp",
                to: from,
                "type": "interactive",
                "interactive": {
                  "type": "button",
                  "body": {
                    // "text":"Are you agree with following terms and conditions.\nhttps://ondc.org/terms-and-conditions/"
                    "text": msg_data.node_data.label
                    //    "text":"This is required information to be seller on our platform.\n1.Tax Registration Details(PAN number for business and GST number).\n2.Licence Number (Trade Licence Number).\n3.Bank Account Details.\n4.Choose Shipping Method.\n5.Contact Details (Email, Phone Number, Address)."  
                  },
                  "action": {
                    "buttons": button_data
                  }
                }
                // text: { body: "Ack: " + msg_body },
              }
            }

            console.log(">>>1234", JSON.stringify(res_payload))
            //  return res.sendStatus(200)
            // if (object == "web_bot") {
            //   return res.status(200).send({ sucess: true, data: res_payload })
            // }
            // send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload)
            // return res.sendStatus(200)

            data = JSON.stringify({
              "from": change.value.messages[0].from,
              "to": change.value.metadata.display_phone_number,
              "data": {
                type: change.value.messages[0].type,
                id: change.value.messages[0].id,
                value: change.value.messages[0][change.value.messages[0].type],
                timestamp: change.value.messages[0].timestamp
              }
            });
          }
          else if (change.value.messages[0].type == "video" || change.value.messages[0].type == "image" || change.value.messages[0].type == "document", change.value.messages[0].type == "audio") {
            newLogs.requestContent_value = message[message.type].id
            // console.log(">>>>audio", change.value.messages[0].audio.id)
            const metaRes = await axios({
              method: "GET",
              url: `https://graph.facebook.com/v19.0/${message[message.type].id}`,
              headers: {
                Authorization: `Bearer ${meta_api_access_token}`,
              },
            });

            console.log(">>>>>>>>>>>>>", metaRes.data)
            // return res.statusCode(200)
            const mediaUrl = metaRes.data.url;
            console.log(">>>>>>>>>>mediaUrl", mediaUrl)
            const mediaRes = await axios.get(mediaUrl, {
              headers: {
                Authorization: `Bearer ${meta_api_access_token}`,
              },
              responseType: 'stream',
            });
            // console.log(">>>>>>>>>>>>1337", mediaRes.data)
            // return res.statusCode(200)
            const contentType = metaRes.data.mime_type;
            const extension = contentType.split("/")[1]; // e.g. pdf, msword
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const audioDir = path.join(__dirname, '..', '..', '..', 'public', 'document');
            const filePath = path.join(audioDir, `image_message_${message[message.type].id}.${extension}`);
            if (!fs.existsSync(audioDir)) {
              fs.mkdirSync(audioDir, { recursive: true });
            }
            const writer = fs.createWriteStream(filePath);
            mediaRes.data.pipe(writer);
            // const filePath = `./voice_message_${change.value.messages[0].audio.id}.ogg`;
            // const writer = fs.createWriteStream(filePath);
            // mediaRes.data.pipe(writer);

            writer.on('finish', () => {
              console.log(`✅ Audio saved successfully at: ${filePath}`);
            });

            writer.on('error', (err) => {
              console.error('❌ Error writing file:', err);
            });
            await newLogs.save()
            return res.sendStatus(200)
          }

          newLogs.response = res_payload

          if (object == "web_bot") {

            await newLogs.save()
            return res.status(200).send({ suceess: true, ...(end_chat = true ? { end_chat: true } : {}), data: res_payload })

            return res.status(200).send({ sucess: true, data: res_payload })

          }
          send_message_whatsapp(PHONE_NUMBER_ID, meta_api_access_token, res_payload, newLogs)
          return res.sendStatus(200)
        }
        return res.sendStatus(200)
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: `${account_data.client_webhook_url}`,
          headers: {
            'Content-Type': 'application/json'
          },
          data: data
        };
        try {
          axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });
        }
        catch (error) {
          console.log(">>>>>>186", error);
        }
      }
    }
    return res.sendStatus(200)
    const { tenantObjId, sender, receivers, content, replyTo, attachments } = req.body;

    const tenant = await Tenant.findById(tenantObjId);
    if (!tenant) {
      return res
        .status(400)
        .json({ success: false, message: "Tenant not found" });
    }

    const newMessage = new Message({
      tenant: {
        tenantObjId: tenant?._id,
        tenantId: tenant?.id,
        tenantName: tenant?.name,
      },
      sender,
      receivers,
      content,
      replyTo,
      attachments,
    });

    const savedMessage = await newMessage.save();

    // Emit message event to receivers
    receivers.forEach((receiver) => {
      const receiverSocket = onlineUsers.get(receiver.receiverId);
      if (receiverSocket) io.to(receiverSocket).emit("newMessage", savedMessage);
    });

    // Acknowledge sender
    io.to(onlineUsers.get(sender.senderId)).emit("messageSent", savedMessage);

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all messages for a user
export const getUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [
        { "sender.senderId": userId },
        { "receivers.receiverId": userId },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark message as delivered
export const markMessageAsDelivered = async (req, res) => {
  try {
    const { messageId, receiverId } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { status: "delivered" },
      { new: true }
    );

    const senderSocket = onlineUsers.get(receiverId);
    if (senderSocket) io.to(senderSocket).emit("messageDelivered", { messageId });

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark message as read
export const markMessageAsRead = async (req, res) => {
  try {
    const { messageId, receiverId } = req.body;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { status: "read" },
      { new: true }
    );

    const senderSocket = onlineUsers.get(receiverId);
    if (senderSocket) io.to(senderSocket).emit("messageRead", { messageId });

    res.status(200).json(updatedMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Message
export const deleteMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    await Message.findByIdAndDelete(messageId);
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handle Socket Events
export const handleSocketEvents = (socket) => {
  socket.on("sendMessage", async (messageData) => {
    try {
      const newMessage = new Message(messageData);
      const savedMessage = await newMessage.save();
      messageData.receivers.forEach((receiver) => {
        const receiverSocket = onlineUsers.get(receiver.receiverId);
        if (receiverSocket) io.to(receiverSocket).emit("newMessage", savedMessage);
      });
      io.to(onlineUsers.get(messageData.sender.senderId)).emit("messageSent", savedMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  });
};
