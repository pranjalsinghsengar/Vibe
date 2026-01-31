// import { Server } from "socket.io";
// import Message from "../routes/message/model/index.js";

// const onlineUsers = new Map();

// const initializeSocket = (server) => {
//   const io = new Server(server, { cors: { origin: "*" } });

//   io.on("connection", (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Handle user joining
//     socket.on("join", (userId) => {
//       if (userId) {
//         onlineUsers.set(userId, socket.id);
//         console.log(`User ${userId} is online with socket ID: ${socket.id}`);
//       }
//     });

//     // Handle typing events
//     socket.on("startTyping", ({ senderId, receiverId }) => {
//       const receiverSocket = onlineUsers.get(receiverId);
//       if (receiverSocket) io.to(receiverSocket).emit("typing", { senderId });
//     });

//     socket.on("stopTyping", ({ senderId, receiverId }) => {
//       const receiverSocket = onlineUsers.get(receiverId);
//       if (receiverSocket) io.to(receiverSocket).emit("stopTyping", { senderId });
//     });

//     // Handle sending messages
//     socket.on("messageSend", async ({ sender, receivers, content, replyTo }) => {
//       try {
//         const newMessage = new Message({ sender, receivers, content, replyTo });
//         await newMessage.save();

//         // Notify receivers
//         receivers.forEach((receiver) => {
//           const receiverSocket = onlineUsers.get(receiver.receiverId);
//           if (receiverSocket) io.to(receiverSocket).emit("newMessage", newMessage);
//         });

//         // Acknowledge sender
//         io.to(socket.id).emit("messageSent", newMessage);
//       } catch (error) {
//         console.error("Error sending message:", error);
//         io.to(socket.id).emit("error", { message: "Message send failed" });
//       }
//     });

//     // Mark message as delivered
//     socket.on("messageDelivered", async ({ messageId, receiverId }) => {
//       try {
//         await Message.findByIdAndUpdate(messageId, { status: "delivered" });
//         const senderSocket = onlineUsers.get(receiverId);
//         if (senderSocket) io.to(senderSocket).emit("messageDelivered", { messageId });
//       } catch (error) {
//         console.error("Error marking message as delivered:", error);
//       }
//     });

//     // Mark message as read
//     socket.on("messageRead", async ({ messageId, receiverId }) => {
//       try {
//         await Message.findByIdAndUpdate(messageId, { status: "read" });
//         const senderSocket = onlineUsers.get(receiverId);
//         if (senderSocket) io.to(senderSocket).emit("messageRead", { messageId });
//       } catch (error) {
//         console.error("Error marking message as read:", error);
//       }
//     });

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);
//       for (const [userId, socketId] of onlineUsers.entries()) {
//         if (socketId === socket.id) {
//           onlineUsers.delete(userId);
//           console.log(`User ${userId} removed from online users.`);
//           break;
//         }
//       }
//     });
//   });

//   return io;
// };

// export default initializeSocket;



import { Server } from "socket.io";
const onlineUsers = new Map();

console.log("onlineUsers",onlineUsers);


let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online with socket ID: ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
        }
      });
    });
  });

  return io;
};

export { io };
