// socketClient.js
import { io } from 'socket.io-client';
import { SOCKET_EVENTS } from './socketEvents.js';
import { handleCloseConversation, handleMessageReceived, initiateConversation, sendMessageHandler } from './socketHandlers.js';

let ioInstance = null;

export const setIOInstance = (io) => {
  ioInstance = io;
};

export const getIOInstance = () => {
  if (!ioInstance) {
    throw new Error("Socket.io instance not initialized");
  }
  return ioInstance;
};

export const createSocketConnection = ({ serverUrl, token = null }) => {
  console.log("||::🔌 CONNECTING TO SERVER:", serverUrl, '::||');

  const socket = io(serverUrl, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 20000,
    path: '/agent/socket.io/',
    auth: token ? { token } : undefined
  });

  socket.on(SOCKET_EVENTS.CONNECT, () => {
    console.log('✅ ||:: CONNECTED TO SOCKET SERVER ::||');
  });

  socket.on(SOCKET_EVENTS.MESSAGE_RECEIVED, handleMessageReceived);

  socket.on(SOCKET_EVENTS.CONVERSATION_ASSIGNED_USER, (data) =>
    handleConversationAssigned(data, initiateConversation, joinRoom)
  );

  socket.on(SOCKET_EVENTS.CLOSE_CONVERSATION, (data) =>
    handleCloseConversation(data)
  );

  socket.on(SOCKET_EVENTS.ERROR, (reason) => {
    console.warn('⚠️ Error from server:', reason);
  });

  socket.on(SOCKET_EVENTS.DISCONNECT, (reason) => {
    console.warn('⚠️ Disconnected. Reason:', reason);
  });

  socket.on(SOCKET_EVENTS.CONNECT_ERROR, (error) => {
    console.error('❌ Connection error:', error?.message || error);
  });

  setIOInstance(socket);
  return socket;
};

export const makeConnectionSetup = async ({ companyId, userId, userType = 'customer', chatTopic, chatSummary }) => {
  try {
    console.log(companyId, userId, "makeConnectionSetup================>")
    if (!companyId || !userId) {
      throw new Error("companyId and userId are required for setup.");
    }
    const socket = getIOInstance();
    socket.emit(SOCKET_EVENTS.SETUP, {
      companyId,
      userId,
      userType, chatTopic, chatSummary
    });
  } catch (error) {
    console.error("Error in makeConnectionSetup ::>>", error);
    throw error;
  }
};

export const joinRoom = (conversationId) => {
  const socket = getIOInstance();
  socket.emit(SOCKET_EVENTS.JOIN_ROOM, conversationId);
};

export const sendMessageToIoClient = sendMessageHandler;

export const handleConversationAssigned = (data, initiateConversation, joinRoom) => {
  try {
    console.log('👤 Assigned a conversation:', data);
    const conversationId = data?.conversationId;
    const userId = data?.userId;
    if (conversationId && userId) {
      initiateConversation(conversationId, userId);
      joinRoom(conversationId);
    }
  } catch (error) {
    console.error("Error in conversation assigned handler ::>>", error);
  }
};

