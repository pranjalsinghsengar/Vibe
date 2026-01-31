import express from "express";
import http from "http";
import cors from "cors";
import connectDatabase, { PORT } from "./config/index.js";
import mainRouter from "./routes/index.js";
// import { initializeSocket } from "./socket/index.js";
import swagger from 'swagger-ui-express';
import fs from 'fs/promises';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const apidocs = JSON.parse(readFileSync(path.join(__dirname, 'swagger.json'), 'utf-8'));
import { exec } from 'child_process';
// import { LiveChatClient } from 'ens-livechat-client';
// import { createSocketConnection } from "./socket/socketClient.js"
import { handleMessageReceived, handleCloseConversation, initiateConversation } from "./socket/socketHandlers.js"
// serverUrlx: 'https://victor.fixall.ai',
// createSocketConnection({
//   serverUrl: 'https://victor.fixall.ai',
//   token: null
//   // serverUrl: 'https://1df1-103-206-131-194.ngrok-free.app'
// });


//from npm package
// export const chat = new LiveChatClient({
//   serverUrl: 'https://victor.fixall.ai',
//   token: 'secure-token',
//   companyId: '683441fb984214c471ff64a1',
//   onMessage: (data) => {
//     console.log('message data:', data)
//     handleMessageReceived(data)
//   },
//   onAssigned: (conversationId, userId) => {
//     console.log('Assigned to convo:', conversationId)
//     initiateConversation(conversationId, userId)
//   },
//   onCloseConversation: (data) => {
//     console.log('Conversation closed:', data)
//     handleCloseConversation(data)
//   },
// });
// chat.connect();

connectDatabase();
const app = express();


app.use(express.json());

app.use(cors({ origin: "*" }));
// const server = http.createServer(app);
// const io = new Server(server, { cors: { origin: "*" } });

// app.use("/api", mainRouter);
app.use("/xpresschat/api/whatsapp", mainRouter);
app.use("/xpresschat/api-docs", swagger.serve, swagger.setup(apidocs));


app.get("/", (req, res) => {
  res.send({ success: true, message: "Welcome to the CSX server!" });
});

app.get("/xpresschat", (req, res) => {
  res.send({ success: true, message: "Welcome to the CSX server!" });
});
app.get("/vibeconnect", (req, res) => {
  res.send({ success: true, message: "Welcome to the CSX server!" });
});
app.get("/testing",(req,res)=>{
  console.log("========= INCOMING REQUEST =========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("IP:", req.ip);
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", JSON.stringify(req.body));
  console.log("====================================");
})
app.post("/testing",(req,res)=>{
  console.log("========= INCOMING REQUEST =========");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("IP:", req.ip);
  console.log("Headers:", req.headers);
  console.log("Params:", req.params);
  console.log("Query:", req.query);
  console.log("Body:", JSON.stringify(req.body));
  console.log("====================================");
})
const server = http.createServer(app);

// Initialize Socket.IO and pass the HTTP server
// initializeSocket(server);


// Store connected users
// const onlineUsers = new Map();

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("join", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   // Typing status
//   socket.on("typing", ({ senderId, receiverId }) => {
//     const receiverSocket = onlineUsers.get(receiverId);
//     if (receiverSocket) io.to(receiverSocket).emit("typing", senderId);
//   });

//   socket.on("stopTyping", ({ senderId, receiverId }) => {
//     const receiverSocket = onlineUsers.get(receiverId);
//     if (receiverSocket) io.to(receiverSocket).emit("stopTyping", senderId);
//   });

//   // Send message
//   socket.on("sendMessage", async ({ senderId, receiverId, text, replyTo }) => {
//     const message = new Message({ senderId, receiverId, text, replyTo });
//     await message.save();

//     const receiverSocket = onlineUsers.get(receiverId);
//     if (receiverSocket) {
//       io.to(receiverSocket).emit("newMessage", message);
//     }

//     io.to(socket.id).emit("messageSent", message);
//   });

//   // Mark message as delivered
//   socket.on("delivered", async ({ messageId, receiverId }) => {
//     await Message.findByIdAndUpdate(messageId, { status: "delivered" });
//     const senderSocket = onlineUsers.get(receiverId);
//     if (senderSocket) io.to(senderSocket).emit("messageDelivered", messageId);
//   });

//   // Mark message as read
//   socket.on("read", async ({ messageId, receiverId }) => {
//     await Message.findByIdAndUpdate(messageId, { status: "read" });
//     const senderSocket = onlineUsers.get(receiverId);
//     if (senderSocket) io.to(senderSocket).emit("messageRead", messageId);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//     onlineUsers.forEach((socketId, userId) => {
//       if (socketId === socket.id) {
//         onlineUsers.delete(userId);
//       }
//     });
//   });
// });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// import { verify } from "./webhook/index.js";
// import connectDB from "./db/index.js";
import axios from "axios";
import bodyParser from "body-parser";
import dns from 'dns';
import util from 'util';


// wss.on('connection', (ws) => {
//     console.log('New client connected');
//     const clientId = Date.now();
//     clients.set(clientId, { ws, state: 'initial' });

//     ws.on('message', (data) => {
//         try {
//             const messageData = JSON.parse(data);
//             console.log('Received message:', messageData);

//             switch(messageData.type) {
//                 case 'MOBILE_NUMBER':
//                     if(/^\d{10}$/.test(messageData.data)) {
//                         const client = clients.get(clientId);
//                         client.mobile = messageData.data;
//                         client.state = 'awaiting_password';

//                         ws.send(JSON.stringify({
//                             type: 'BOT_RESPONSE',
//                             message: 'Please enter your password'
//                         }));
//                     } else {
//                         ws.send(JSON.stringify({
//                             type: 'BOT_RESPONSE',
//                             message: 'Please enter a valid 10-digit mobile number'
//                         }));
//                     }
//                     break;

//                 case 'PASSWORD':
//                     const client = clients.get(clientId);
//                     if (client.state === 'awaiting_password') {
//                         // Mock validation - replace with actual validation
//                         if (messageData.password && messageData.password.length >= 6) {
//                             ws.send(JSON.stringify({
//                                 type: 'LOGIN_ATTEMPT',
//                                 data: {
//                                     success: true,
//                                     message: 'Login successful!'
//                                 }
//                             }));
//                             client.state = 'authenticated';
//                         } else {
//                             ws.send(JSON.stringify({
//                                 type: 'LOGIN_ATTEMPT',
//                                 data: {
//                                     success: false,
//                                     message: 'Invalid credentials. Please try again.'
//                                 }
//                             }));
//                             client.state = 'initial';
//                         }
//                     }
//                     break;

//                 case 'CHAT_MESSAGE':
//                     const activeClient = clients.get(clientId);
//                     if (activeClient.state === 'authenticated') {
//                         ws.send(JSON.stringify({
//                             type: 'BOT_RESPONSE',
//                             message: `You said: ${messageData.data}`
//                         }));
//                     } else {
//                         ws.send(JSON.stringify({
//                             type: 'BOT_RESPONSE',
//                             message: 'Please login first'
//                         }));
//                     }
//                     break;

//                 // default:
//                 //     ws.send(JSON.stringify({
//                 //         type: 'BOT_RESPONSE',
//                 //         // message: 'Welcome! Please select a login method.'
//                 //     }));
//             }
//         } catch (error) {
//             console.error('Error processing message:', error);
//             ws.send(JSON.stringify({
//                 type: 'ERROR',
//                 message: 'Error processing your request'
//             }));
//         }
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
//         clients.delete(clientId);
//     });

//     ws.on('error', (error) => {
//         console.error('WebSocket error:', error);
//         clients.delete(clientId);
//     });
// });
const lookupMx = util.promisify(dns.resolveMx);


app.use(bodyParser.json());
app.use(express.json());




// app.use('/apis', apisRouter);




app.use("/vibeconnect", express.static(path.join(__dirname, 'public')));
app.use("/vibeconnect", express.static(path.join(__dirname, 'dist')));
app.use('/audio', express.static(path.join(__dirname, 'public', 'audio')));
// app.get("/webhook", verify);

// app.post("/webhook", integration);
// app.post("/webhook/whatsapp", (req, res) => {
//     console.log("Line no 141:", req.body);
// });
// app.get('/api/webBot/message/webhook/10001/20001/30004', async (req, res) => {
//   // const { companyName, logoFileName } = req.body;

//   // if (!companyName || !logoFileName) {
//   //   return res.status(400).json({ success: false, error: 'Missing companyName or logoFileName' });
//   // }

//   // const logoSrc = path.join(__dirname, 'assets', 'logos', companyName, logoFileName);
//   const logoSrc = path.join(__dirname, 'public', 'FINAL_BOT-02.png');
//   const logoDest = path.join(__dirname, 'public', 'FINAL_BOT-01.png'); // Always overwrite as logo.png
//   const mainJsPath = path.join(__dirname, 'public', 'main.js');

//   try {
//     // Copy logo into public folder
//     await fs.copyFile(logoSrc, logoDest);

//     // Create main.js with dynamic logo import
//     //   const jsContent = `
//     //     import logo from './logo.png';

//     //     const img = document.createElement('img');
//     //     img.src = logo;
//     //     img.alt = 'Company Logo';
//     //     document.body.appendChild(img);

//     //     console.log('Injected logo for ${companyName}');
//     //   `;

//     //   await fs.writeFile(mainJsPath, jsContent, 'utf-8');

//     // Run webpack
//     exec('npx webpack --config webpack.config.js', async (err, stdout, stderr) => {
//       if (err || stderr) {
//         console.error(stderr);
//         return res.status(500).json({ success: false, error: stderr || err.message });
//       }

//       try {
//         const builtJsPath = path.join(__dirname, 'dist', 'fixlabs.js');
//         const fileContent = await fs.readFile(builtJsPath, 'utf-8');

//         return res.send({
//           fileContent, // Send JS code here
//         });
//       } catch (readErr) {
//         return res.status(500).json({ success: false, error: 'Build succeeded, but failed to read JS file.' });
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// });
app.get("/", (req, res) => {
  try {
    console.log("<<<<<123>>>>>");
    res.status(200).json({
      status: 200,
      message: "health is ok!"
    });
  } catch (error) {
    res.status(200).json({
      status: 500,
      message: "flag0"
    });
  }
});

const clients = new Map();
app.post('/api/send-message', (req, res) => {
  const { message, userMobile } = req.body;

  if (!userMobile) {
    return res.status(400).json({ error: "User mobile is required" });
  }

  // 1. (Optional) Store user message - if needed for history
  // ... (database or storage logic if you want to save user messages)

  // 2. Bot logic directly within the route handler
  let botReply;

  switch (req.body.type) {
    case 'MOBILE_NUMBER':
      if (/^\d{10}$/.test(message)) {
        let client = clients.get(userMobile);
        if (!client) {
          client = { messages: [], state: 'initial' };
          clients.set(userMobile, client);
        }
        client.mobile = message;
        client.state = 'awaiting_password';
        botReply = 'Please enter your password';
      } else {
        botReply = 'Please enter a valid 10-digit mobile number';
      }
      break;

    case 'PASSWORD':
      let client = clients.get(userMobile);
      if (client && client.state === 'awaiting_password') {
        if (message && message.length >= 6) {
          client.state = 'authenticated';
          botReply = {
            type: 'LOGIN_ATTEMPT',
            data: {
              success: true,
              message: 'Login successful!'
            }
          };
        } else {
          client.state = 'initial';
          botReply = {
            type: 'LOGIN_ATTEMPT',
            data: {
              success: false,
              message: 'Invalid credentials. Please try again.'
            }
          };
        }
      } else {
        botReply = "Please enter your mobile number first.";
      }
      break;

    case 'CHAT_MESSAGE':
      const activeClient = clients.get(userMobile);
      if (activeClient && activeClient.state === 'authenticated') {
        botReply = `You said: ${message}`;
      } else {
        botReply = 'Please login first';
      }
      break;

    default:
      botReply = "I didn't understand that.";
  }


  // 3. Store bot's reply directly in the clients map
  if (typeof botReply === 'string') { // Check if botReply is a string before pushing
    client = clients.get(userMobile);
    if (!client) {
      client = { messages: [] };
      clients.set(userMobile, client);
    }
    client.messages.push(botReply);
  } else {
    // If botReply is an object (like in LOGIN_ATTEMPT), handle it differently
    // You might want to store this kind of structured data differently
    client = clients.get(userMobile);
    if (!client) {
      client = { messages: [] };
      clients.set(userMobile, client);
    }
    client.messages.push(botReply);
  }


  res.json({ success: true }); // Acknowledge message received
});

app.get('/api/bot-messages', (req, res) => {
  const userMobile = req.query.userMobile;

  if (!userMobile) {
    return res.status(400).json({ error: "User mobile is required" });
  }

  const client = clients.get(userMobile);
  if (!client) {
    return res.json({ messages: [] }); // No messages yet
  }

  const messages = client.messages;
  client.messages = []; // Clear messages after sending
  res.json({ messages });
});
app.post('/api/verify-mobile', (req, res) => {  // New route
  const { mobile } = req.body;

  if (!/^\d{10}$/.test(mobile)) {
    return res.status(400).json({ success: false, message: 'Invalid mobile number' });
  }

  let client = clients.get(mobile); // Use mobile as the key
  if (!client) {
    client = { messages: [], state: 'initial' };
    clients.set(mobile, client);
  }
  client.mobile = mobile;
  client.state = 'awaiting_password';

  res.json({ success: true, message: 'Mobile number verified' }); // Respond to the client
});


// Function to check if email is valid and domain has MX records
async function isEmailValid(email) {
  if (!email || !email.includes("@")) return false;

  const domain = email.split("@")[1]; // Extract domain from email

  try {
    const mxRecords = await lookupMx(domain);
    return mxRecords.length > 0; // If MX records exist, email is valid
  } catch (error) {
    console.error(`MX lookup failed for ${domain}:`, error);
    return false;
  }
}
app.post('/approve', async (req, res) => {
  const { username, email } = req.body;

  let userEmail = await getGitHubEmail(username);

  if (!userEmail) {
    userEmail = email;
  }

  if (!userEmail || !userEmail.endsWith("@ens.enterprises")) {
    return res.status(400).json({ message: "❌ Invalid email domain", email: userEmail });
  }

  const isValid = await isEmailValid(userEmail);
  if (!isValid) {
    return res.status(400).json({ message: "❌ Invalid email (no MX record found)", email: userEmail });
  }

  return res.status(200).json({ message: "✅ Approval granted", email: userEmail });
});
