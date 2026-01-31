// // socketHandlers.js
import { getIOInstance } from './socketClient.js';
import { SOCKET_EVENTS } from './socketEvents.js';
import { joinRoom } from './socketClient.js';
import WhatsappAccount from "../routes/whatsapp_account/model/index.js"
import Conversation from "../routes/message/model/conversation.js"
import axios from "axios";

export const sendMessageHandler = async (conversationId, senderId, text) => {
  try {
    // console.log(">>>>>>>*******", conversationId, senderId, text, type = 'text')
    const socket = getIOInstance();
    joinRoom(conversationId);
    socket.emit(SOCKET_EVENTS.MESSAGE_SEND, {
      conversationId,
      senderId,
      senderType: 'user',
      text,
      type: 'text'
    });
  } catch (error) {
    console.error("Error in sendMessage handler ::>>", error);
    throw error;
  }
};


export const handleMessageReceived = async (data) => {
  try {
    const config = data.userId.split('/');
    const account_data = await WhatsappAccount.findOne({
      id: config[2]
    })
    const { PHONE_NUMBER_ID, meta_api_access_token } = account_data
    const res_payload = {

      messaging_product: "whatsapp",
      to: config[3],
      text: { body: data.text },
    }
    const response = await axios({
      method: "POST",
      url: `https://graph.facebook.com/v12.0/${PHONE_NUMBER_ID}/messages?access_token=${meta_api_access_token}`,
      data: res_payload,
      headers: { "Content-Type": "application/json" },
    });

    console.log(">>>>>>>aaccount", account_data)
    console.log("📩 Received message ::>>", data);//conversation Id and user Id
    // Process message here
  } catch (error) {
    console.error("Error in message received handler ::>>", error);
  }
};

export const initiateConversation = async (conversationId, userId) => {
  try {
    const config = userId.split('/');
    const updatedConversation = await Conversation.findOneAndUpdate(
      { user_id: config[3] },
      { $set: { agent_conversationId: conversationId } },
      { sort: { _id: -1 }, new: true }
    );

    console.log("📞 Initiating conversation:", updatedConversation.agent_conversationId, "User:", updatedConversation.user_id);

    // Your conversation start logic
  } catch (error) {
    console.error("Error in initiateConversation ::>>", error);
  }
};

export const handleCloseConversation = async (data) => {
  try {
    console.log(">>>>", data)
    const config = data.userId.split('/');
    const updatedConversation = await Conversation.findOneAndUpdate(
      { user_id: config[3] },
      { $set: { escalated_to_human: false } },
      { sort: { _id: -1 }, new: true }
    );
    console.log(">>>>>>79", updatedConversation)
    console.log('👤 Close a conversation:', data);
  } catch (error) {
    console.error("Error in conversation assigned handler ::>>", error);
  }
};

