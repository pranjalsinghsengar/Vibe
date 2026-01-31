import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

// Create socket instance (backend URL should match your server)
const socket = io("http://localhost:5050", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  useEffect(() => {
    // Handle successful connection
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to server:", socket.id);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from server");
    });

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for typing status
    socket.on("typing", (user) => {
      setTypingStatus(`${user} is typing...`);
      setTimeout(() => setTypingStatus(""), 2000);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message");
      socket.off("typing");
    };
  }, []);

  // Function to send messages
  const sendMessage = (messageData) => {
    socket.emit("message", messageData);
  };

  // Function to emit typing event
  const sendTypingStatus = (user) => {
    socket.emit("typing", user);
  };

  return (
    <SocketContext.Provider value={{ isConnected, messages, sendMessage, sendTypingStatus, typingStatus }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for using socket context
export const useSocket = () => useContext(SocketContext);