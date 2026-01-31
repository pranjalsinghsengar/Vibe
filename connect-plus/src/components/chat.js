// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { useUser } from "../config/userProvider";
// import DownloadChatPDF from "./downloadChatPdf";
// import { toast } from "react-toastify"; // assuming you're using react-toastify

// const Chat = ({ selectedCustomer, selectedAccount }) => {
//   const { userData, token } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState({});

//   // New states for sending messages
//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // Fetch chat history
//   useEffect(() => {
//     if (!selectedCustomer) {
//       setMessages([]);
//       setImageUrls({});
//       return;
//     }

//     const fetchChatHistory = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerHistory?account_id=${selectedAccount.id}&limit=20&page=1&user_id=${selectedCustomer}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const sortedData = response.data.data.sort(
//           (a, b) => parseInt(a.request_timestamp) - parseInt(b.request_timestamp)
//         );

//         const flattenedMessages = sortedData.flatMap((msg) => {
//           const messagesArray = [
//             {
//               _id: msg.request_id,
//               type: "request",
//               source: msg.source,
//               content: msg.requestContent_value,
//               contentType: msg.requestContent_type,
//               timestamp: msg.request_timestamp,
//               contactName:
//                 msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name ||
//                 "Unknown",
//               body_payload: msg.body_payload,
//             },
//           ];

//           if (msg.response) {
//             messagesArray.push({
//               _id: msg.response_id || `response-${msg.request_id}`,
//               type: "response",
//               source: "bot",
//               content: msg.response,
//               contentType: msg.response?.type || "text",
//               timestamp: msg.responseLocal_timestamp || msg.request_timestamp,
//               contactName: "Bot",
//             });
//           }
//           return messagesArray;
//         });

//         setMessages(flattenedMessages);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();
//   }, [selectedCustomer, token]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Fetch image media
//   const fetchImage = async (mediaId, messageId) => {
//     try {
//       const response = await axios.get(
//         `${apiurl}/api/whatsapp/dashboard/getMediaById?account_id=${selectedAccount?.id}&media_id=${mediaId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//           responseType: "blob",
//         }
//       );
//       const imageUrl = URL.createObjectURL(response.data);
//       setImageUrls((prev) => ({ ...prev, [messageId]: imageUrl }));
//     } catch (error) {
//       console.error("Error fetching image:", error);
//       setImageUrls((prev) => ({ ...prev, [messageId]: "error" }));
//     }
//   };

//   const downloadImage = (imageUrl, messageId) => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = `image-${messageId}.jpg`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   // ──────────────── Sending Messages Logic ────────────────

// const uploadImage = async (file) => {
//   if (!file) return null;
//   setIsUploading(true);

//   const formData = new FormData();
//   formData.append("file", file);

//   try {
//     const response = await axios.post(
//       `${apiurl}/api/whatsapp/content/imageupload`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.data.success && response.data.urls?.length > 0) {
//       return response.data.urls[0];
//     }
//     toast.error("Image upload failed");
//     return null;
//   } catch (err) {
//     console.error("Image upload error:", err);
//     toast.error("Failed to upload image");
//     return null;
//   } finally {
//     setIsUploading(false);
//   }
// };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       toast.error("Please select an image file");
//       return;
//     }

//     setSelectedFile(file);
//     const objectUrl = URL.createObjectURL(file);
//     setPreviewUrl(objectUrl);
//   };

//   const clearImage = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

// const handleSendMessage = async () => {
//   const trimmedText = inputMessage.trim();
//   const hasText = trimmedText.length > 0;
//   const hasImage = !!selectedFile;

//   if (!hasText && !hasImage) return;

//   let imageUrl = null;

//   // Upload image if present
//   if (hasImage) {
//     imageUrl = await uploadImage(selectedFile);
//     if (!imageUrl) return;
//   }

//   try {
//     let response;

//     const baseSendUrl = "https://vibe.fixall.ai/xpresschat/api/whatsapp/message";

//     const apiKey = selectedAccount?.inficonnect_api_key;
//     if (!apiKey) {
//       toast.error("API key not available");
//       return;
//     }

//     if (hasImage) {
//       // Image + optional caption
//       response = await axios.post(
//         `${baseSendUrl}/image`,
//         {
//           to: selectedCustomer,
//           type: "img",
//           value: imageUrl,
//           caption: hasText ? trimmedText : undefined,
//         },
//         {
//           headers: {
//             "api_key": apiKey,
//             "Content-Type": "application/json",
//             accept: "*/*",
//           },
//         }
//       );
//     } else {
//       // Text only
//       response = await axios.post(
//         `${baseSendUrl}/text`,
//         {
//           to: selectedCustomer,
//           type: "text",
//           value: trimmedText,
//         },
//         {
//           headers: {
//             "api_key": apiKey,
//             "Content-Type": "application/json",
//             accept: "*/*",
//           },
//         }
//       );
//     }

//     if (response?.status === 200) {
//     // if (response?.data?.success) {
//       // Optimistic UI update
//       const optimisticMsg = {
//         _id: `sent-${Date.now()}`,
//         type: "response",
//         source: "you",
//         content: hasImage
//           ? { type: "image", image: { link: imageUrl }, caption: trimmedText || "" }
//           : { type: "text", text: { body: trimmedText } },
//         contentType: hasImage ? "image" : "text",
//         timestamp: Math.floor(Date.now() / 1000).toString(),
//         contactName: userData?.name || "You",
//       };

//       setMessages((prev) => [...prev, optimisticMsg]);

//       // Clear inputs
//       setInputMessage("");
//       clearImage();

//       // Optional: refresh history after delay
//       // setTimeout(() => fetchChatHistory(), 2000);
//     }
//   } catch (err) {
//     console.error("Failed to send message:", err);
//     toast.error("Failed to send message");
//   }
// };

//   // ──────────────── Message Rendering Logic (unchanged mostly) ────────────────

//   const renderMessageContent = (msg) => {
//     if (msg.type === "request") {
//       if (msg.contentType === "text") {
//         return (
//           <p className="text-gray-900 text-xs">
//             {msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body}
//           </p>
//         );
//       } else if (msg.contentType === "image") {
//         const imageUrl = imageUrls[msg._id];
//         return (
//           <div className="space-y-1">
//             {!imageUrl ? (
//               <div className="flex flex-col items-start gap-1">
//                 <img src="/defaultImage.jpg" alt="Placeholder" className="w-32 h-24 rounded" />
//                 <button
//                   onClick={() => fetchImage(msg.content, msg._id)}
//                   className="px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
//                 >
//                   Tap to View Image
//                 </button>
//               </div>
//             ) : imageUrl === "error" ? (
//               <p className="text-red-500 text-xs">Failed to load image</p>
//             ) : (
//               <div className="flex flex-col items-start gap-1">
//                 <img
//                   src={imageUrl}
//                   alt="Fetched"
//                   className="max-w-[180px] max-h-[180px] object-contain rounded"
//                 />
//                 <button
//                   onClick={() => downloadImage(imageUrl, msg._id)}
//                   className="px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
//                 >
//                   Download
//                 </button>
//               </div>
//             )}
//           </div>
//         );
//       }
//       // ... other types (interactive, etc.)
//       return <p className="text-gray-900 text-xs">{msg.content}</p>;
//     }

//     // Your own sent messages + bot responses
//     if (msg.type === "response") {
//       if (msg.contentType === "text") {
//         const text = msg.content?.text?.body || msg.content;
//         return (
//           <p className="text-white text-xs">
//             {text.split(" ").map((word, i) =>
//               word.match(/^(https?:\/\/|www\.)/) ? (
//                 <a
//                   key={i}
//                   href={word.startsWith("http") ? word : `https://${word}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-200 underline"
//                 >
//                   {word}
//                 </a>
//               ) : (
//                 word + " "
//               )
//             )}
//           </p>
//         );
//       } else if (msg.contentType === "image") {
//         return (
//           <div>
//             {msg.content?.image?.link && (
//               <img
//                 src={msg.content.image.link}
//                 alt="Sent image"
//                 className="max-w-[220px] rounded-lg mb-1"
//               />
//             )}
//             {msg.content?.caption && (
//               <p className="text-white text-xs">{msg.content.caption}</p>
//             )}
//           </div>
//         );
//       }
//     }

//     return <p className="text-gray-400 text-xs italic">Unsupported message</p>;
//   };

//   const formatTimestamp = (ts) => {
//     return new Date(parseInt(ts) * 1000).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const getDate = (ts) => {
//     return new Date(parseInt(ts) * 1000).toLocaleDateString([], {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const groupedMessages = [];
//   let lastDate = null;
//   messages.forEach((msg) => {
//     const currentDate = getDate(msg.timestamp);
//     if (currentDate !== lastDate) {
//       groupedMessages.push({ type: "date", date: currentDate, _id: `date-${currentDate}` });
//       lastDate = currentDate;
//     }
//     groupedMessages.push(msg);
//   });

//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-full w-full flex flex-col font-sans">
//       {/* Header */}
//       <div className="bg-gray-300 p-3 flex justify-between items-center shadow-sm">
//         <h2 className="text-sm font-semibold text-gray-800">
//           {selectedCustomer
//             ? `Chat with ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}`
//             : "Select a Customer"}
//         </h2>
//         <DownloadChatPDF
//           selectedCustomer={selectedCustomer}
//           messages={messages}
//           token={token}
//         />
//       </div>

//       {/* Messages Area */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-400/40"
//       >
//         {loading ? (
//           <div className="space-y-3 animate-pulse">
//             {[...Array(4)].map((_, i) => (
//               <div key={i} className="flex items-end gap-2">
//                 <div className="w-8 h-8 bg-gray-300 rounded-full" />
//                 <div className="flex-1 space-y-2">
//                   <div className="h-3 bg-gray-300 rounded w-1/4" />
//                   <div className="h-5 bg-gray-300 rounded w-3/4" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         // ) : groupedMessages.length > 0 ? (
//         //   groupedMessages.map((item) =>
//         //     item.type === "date" ? (
//         //       <div key={item._id} className="text-center text-xs text-gray-500 my-3">
//         //         <span className="bg-white/80 px-3 py-1 rounded-full shadow-sm">
//         //           {item.date}
//         //         </span>
//         //       </div>
//         //     ) : (
//         //       <div
//         //         key={item._id}
//         //         className={`flex items-end gap-2 ${
//         //           item.type === "request" ? "justify-start" : "justify-end flex-row-reverse"
//         //         }`}
//         //       >
//         //         <div
//         //           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shadow-sm ${
//         //             item.type === "request"
//         //               ? "bg-green-400 text-green-900"
//         //               : "bg-blue-600 text-white"
//         //           }`}
//         //         >
//         //           {item.contactName?.charAt(0) || "?"}
//         //         </div>

//         //         <div
//         //           className={`max-w-[70%] p-3 rounded-2xl shadow-sm ${
//         //             item.type === "request"
//         //               ? "bg-green-100 text-gray-900 rounded-tl-none"
//         //               : "bg-blue-600 text-white rounded-tr-none"
//         //           }`}
//         //         >
//         //           <p className="text-xs font-semibold mb-1 opacity-90">
//         //             {item.contactName}
//         //           </p>
//         //           {renderMessageContent(item)}
//         //           <p className="text-[10px] mt-1 opacity-70 text-right">
//         //             {formatTimestamp(item.timestamp)}
//         //           </p>
//         //         </div>
//         //       </div>
//         //     )
//         //   )
//         // ) : (

//                 ) : groupedMessages.length > 0 ? (
//           groupedMessages.map((item, index) =>
//             item.type === "date" ? (
//               <div
//                 key={item._id}
//                 className="text-center text-[9px] text-gray-600 my-1"
//               >
//                 {/* <span className="bg-white/90 px-1.5 py-0.5 rounded-full shadow-sm">
//                   {item.date}
//                 </span> */}
//               </div>
//             ) : (
//               <div
//                 key={item._id}
//                 className={`flex items-end gap-1 animate-[bounceIn_0.2s_ease-out] ${
//                   item.type === "request"
//                     ? "justify-start"
//                     : "justify-end flex-row-reverse"
//                 }`}
//               >
//                 <div
//                   className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-medium ${
//                     item.type === "request"
//                       ? "bg-green-300 text-green-900"
//                       : "bg-blue-600 text-white"
//                   }`}
//                 >
//                   {item.contactName.charAt(0)}
//                 </div>
//                 <div
//                   className={`flex w-full mb-2 ${
//                     item.type === "request" ? "justify-start" : "justify-end"
//                   }`}
//                 >
//                   <div
//                     className={`relative max-w-[50%] p-2 shadow-sm ${
//                       item.type === "request"
//                         ? "bg-green-200 text-gray-900 rounded-tl-xl text-start rounded-tr-xl rounded-br-xl before:content-[''] before:absolute before:-left-1 before:bottom-0.5 before:border-4 before:border-transparent before:border-r-green-200"
//                         : "bg-blue-600 text-white rounded-tl-xl rounded-tr-xl text-end rounded-bl-xl before:content-[''] before:absolute before:-right-1 before:bottom-0.5 before:border-4 before:border-transparent before:border-l-blue-600"
//                     }`}
//                   >
//                     <p className="text-[10px] font-semibold mb-0.5">
//                       {item.contactName}
//                     </p>
//                     {renderMessageContent(item)}
//                     <p
//                       className={`text-[9px] mt-0.5 ${
//                         item.type === "request"
//                           ? "text-gray-600"
//                           : "text-blue-200"
//                       }`}
//                     >
//                       {formatTimestamp(item.timestamp)}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             )
//           )
//         ) : (
//           <p className="text-center text-gray-500 mt-10 text-sm">
//             Select a customer to start viewing messages
//           </p>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="bg-white border-t p-3 shadow-lg">
//         {/* Image Preview */}
//         {previewUrl && (
//           <div className="mb-3 relative inline-block">
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="max-h-24 rounded-lg border shadow-sm object-contain"
//             />
//             <button
//               onClick={clearImage}
//               className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md"
//             >
//               ×
//             </button>
//           </div>
//         )}

//         <div className="flex items-center gap-2">
//           {/* Image Upload Button */}
//           {/* <label className="cursor-pointer p-3 hover:bg-gray-100 rounded-full transition-colors">
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               ref={fileInputRef}
//               className="hidden"
//             />
//             <svg
//               className="w-6 h-6 text-gray-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//           </label> */}

//           {/* Message Input */}
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 handleSendMessage();
//               }
//             }}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             disabled={isUploading}
//           />

//           {/* Send Button */}
//           <button
//             onClick={handleSendMessage}
//             disabled={(!inputMessage.trim() && !selectedFile) || isUploading}
//             className={`p-3 rounded-full transition-colors ${
//               (inputMessage.trim() || selectedFile) && !isUploading
//                 ? "bg-blue-600 text-white hover:bg-blue-700"
//                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {isUploading ? (
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                 <circle
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                   fill="none"
//                 />
//               </svg>
//             ) : (
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                 <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { useUser } from "../config/userProvider";
// import DownloadChatPDF from "./downloadChatPdf";
// import { toast } from "react-toastify";

// const Chat = ({ selectedCustomer, selectedAccount }) => {
//   const { userData, token } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState({});

//   console.log("selectedCustomer",selectedCustomer);
//   console.log("selectedAccount",selectedAccount)

//   // Sending states
//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // ── New: Templates ───────────────────────────────────────
//   const [templates, setTemplates] = useState([]);
//   const [showTemplateModal, setShowTemplateModal] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [templateParams, setTemplateParams] = useState({});

//   // Fetch chat history (unchanged)
//   useEffect(() => {
//     if (!selectedCustomer) {
//       setMessages([]);
//       setImageUrls({});
//       return;
//     }

//     const fetchChatHistory = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerHistory?account_id=${selectedAccount.id}&limit=20&page=1&user_id=${selectedCustomer}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const sortedData = response.data.data.sort(
//           (a, b) => parseInt(a.request_timestamp) - parseInt(b.request_timestamp)
//         );

//         const flattened = sortedData.flatMap((msg) => {
//           const arr = [
//             {
//               _id: msg.request_id,
//               type: "request",
//               source: msg.source,
//               content: msg.requestContent_value,
//               contentType: msg.requestContent_type,
//               timestamp: msg.request_timestamp,
//               contactName:
//                 msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name ||
//                 "Customer",
//               body_payload: msg.body_payload,
//             },
//           ];

//           if (msg.response) {
//             arr.push({
//               _id: msg.response_id || `resp-${msg.request_id}`,
//               type: "response",
//               source: "bot",
//               content: msg.response,
//               contentType: msg.response?.type || "text",
//               timestamp: msg.responseLocal_timestamp || msg.request_timestamp,
//               contactName: "Bot",
//             });
//           }
//           return arr;
//         });

//         setMessages(flattened);
//       } catch (err) {
//         console.error("Chat history error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();
//   }, [selectedCustomer, selectedAccount?.id, token]);

//   // Auto scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // ── Fetch templates on mount ─────────────────────────────
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       if (!selectedAccount?.id || !token) return;
//       try {
//         const res = await axios.post(
//           `${apiurl}/api/whatsapp/template/get`,
//           { id: selectedAccount.account_id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const data = res.data?.data?.data || res.data?.data || [];
//         setTemplates(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load templates", err);
//       }
//     };

//     fetchTemplates();
//   }, [selectedAccount?.account_id, token]);

//   // ── Template logic ───────────────────────────────────────
//   const handleSelectTemplate = (tpl) => {
//     setSelectedTemplate(tpl);

//     // Extract variables from body (most common case)
//     const vars = {};
//     tpl.components?.forEach((comp) => {
//       if (comp.type === "BODY" && comp.text) {
//         const matches = comp.text.match(/{{([^{}]+)}}/g) || [];
//         matches.forEach((m) => {
//           const name = m.replace(/{{|}}/g, "").trim();
//           vars[name] = "";
//         });
//       }
//     });

//     setTemplateParams(vars);
//     setShowTemplateModal(true);
//   };

//   const sendTemplateMessage = async () => {
//     if (!selectedTemplate || !selectedCustomer || !selectedAccount?.inficonnect_api_key) {
//       toast.error("Missing required data");
//       return;
//     }

//     const paramsArray = Object.entries(templateParams).map(([name, text]) => ({
//       type: "text",
//       parameter_name: name,
//       text: text.trim(),
//     }));

//     const payload = {
//       mobile_number: selectedCustomer,
//       template_name: selectedTemplate.name,
//       language_code: selectedTemplate.language || "en_US",
//       components: [{ type: "body", parameters: paramsArray }],
//     };

//     try {
//       await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
//         headers: {
//           accept: "*/*",
//           api_key: selectedAccount.inficonnect_api_key,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success("Template message sent!");

//       // Optimistic update
//       const optimistic = {
//         _id: `sent-tpl-${Date.now()}`,
//         type: "response",
//         source: "you",
//         content: selectedTemplate.components.find(c => c.type === "BODY")?.text || "Template sent",
//         contentType: "text",
//         timestamp: Math.floor(Date.now() / 1000).toString(),
//         contactName: userData?.name || "You",
//       };
//       setMessages((prev) => [...prev, optimistic]);

//       setShowTemplateModal(false);
//       setSelectedTemplate(null);
//       setTemplateParams({});
//       setInputMessage("");
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to send template");
//     }
//   };

//   // ── Existing image upload / send logic (shortened) ───────
//   const uploadImage = async (file) => {
//     // ... your existing uploadImage code ...
//     // returns url or null
//   };

//   const handleFileChange = (e) => { /* unchanged */ };
//   const clearImage = () => { /* unchanged */ };

//   const handleSendMessage = async () => {
//     // ... your existing text + image send logic ...
//     // unchanged
//   };

//   // ── Render message content (unchanged / minimal) ─────────
//   const renderMessageContent = (msg) => {
//     // ... your existing renderMessageContent ...
//     // (keep as is)
//   };

//   const formatTimestamp = (ts) => new Date(parseInt(ts) * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   // ── JSX ──────────────────────────────────────────────────
//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-full w-full flex flex-col font-sans">
//       {/* Header */}
//       <div className="bg-gray-300 p-3 flex justify-between items-center shadow-sm">
//         <h2 className="text-sm font-semibold text-gray-800">
//           {selectedCustomer ? `Chat with ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}` : "Select a Customer"}
//         </h2>
//         <DownloadChatPDF selectedCustomer={selectedCustomer} messages={messages} token={token} />
//       </div>

//       {/* Messages */}
//       <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-400/40">
//         {loading ? (
//           <div className="space-y-3 animate-pulse"> {/* skeletons */} </div>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-sm">Select a customer to view messages</p>
//         ) : (
//           // your groupedMessages rendering logic here (unchanged)
//           messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`flex items-end gap-1 ${msg.type === "request" ? "justify-start" : "justify-end flex-row-reverse"}`}
//             >
//               {/* avatar + bubble - your existing style */}
//               <div className={`w-4 h-4 rounded-full ... ${msg.type === "request" ? "bg-green-300" : "bg-blue-600"}`}>
//                 {msg.contactName?.charAt(0)}
//               </div>
//               <div className={`max-w-[65%] p-2 rounded-xl shadow-sm ${msg.type === "request" ? "bg-green-200" : "bg-blue-600 text-white"}`}>
//                 <p className="text-[10px] font-semibold">{msg.contactName}</p>
//                 {renderMessageContent(msg)}
//                 <p className="text-[9px] mt-0.5 opacity-80 text-right">{formatTimestamp(msg.timestamp)}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input Area + Template Button */}
//       <div className="bg-white border-t p-3 shadow-lg">
//         {previewUrl && (
//           <div className="mb-3 relative inline-block">
//             <img src={previewUrl} alt="preview" className="max-h-24 rounded-lg border" />
//             <button onClick={clearImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
//           </div>
//         )}

//         <div className="flex items-center gap-2">
//           {/* Template Selector */}
//           <div className="relative group">
//             <button
//               type="button"
//               className="p-2.5 rounded-full hover:bg-gray-100 transition"
//               title="Quick templates"
//             >
//               <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             </button>

//             {/* Dropdown */}
//             <div className="absolute bottom-full left-0 w-64 bg-white border rounded-lg shadow-xl hidden group-hover:block z-20 max-h-80 overflow-y-auto">
//               {templates.length === 0 ? (
//                 <div className="p-3 text-sm text-gray-500">No templates found</div>
//               ) : (
//                 templates.map((tpl) => (
//                   <button
//                     key={tpl.id || tpl.name}
//                     onClick={() => handleSelectTemplate(tpl)}
//                     className="w-full text-left px-4 py-2.5 hover:bg-gray-100 text-sm border-b last:border-none"
//                   >
//                     {tpl.name}
//                     <span className="block text-xs text-gray-500">
//                       {tpl.language} • {tpl.category}
//                     </span>
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Message Input */}
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//             disabled={isUploading}
//           />

//           {/* Send */}
//           <button
//             onClick={handleSendMessage}
//             disabled={(!inputMessage.trim() && !selectedFile) || isUploading}
//             className={`p-3 rounded-full ${ (inputMessage.trim() || selectedFile) && !isUploading ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-500 cursor-not-allowed" }`}
//           >
//             {isUploading ? (
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
//             ) : (
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Template Parameter Modal */}
//       {showTemplateModal && selectedTemplate && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="p-5 border-b flex justify-between items-center">
//               <h3 className="text-lg font-bold">Send Template: {selectedTemplate.name}</h3>
//               <button onClick={() => setShowTemplateModal(false)} className="text-gray-500 hover:text-gray-800 text-2xl">×</button>
//             </div>

//             <div className="p-6 space-y-5">
//               {Object.keys(templateParams).length === 0 ? (
//                 <p className="text-center text-gray-600 py-6">This template has no variables</p>
//               ) : (
//                 Object.entries(templateParams).map(([key, value]) => (
//                   <div key={key}>
//                     <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                       {key}
//                     </label>
//                     <input
//                       type="text"
//                       value={value}
//                       onChange={(e) =>
//                         setTemplateParams((prev) => ({ ...prev, [key]: e.target.value }))
//                       }
//                       className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
//                       placeholder={`Value for ${key}`}
//                     />
//                   </div>
//                 ))
//               )}

//               <div className="flex justify-end gap-4 pt-4 border-t">
//                 <button
//                   onClick={() => setShowTemplateModal(false)}
//                   className="px-5 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={sendTemplateMessage}
//                   className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
//                 >
//                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
//                   Send
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { useUser } from "../config/userProvider";
// import DownloadChatPDF from "./downloadChatPdf";
// import { toast } from "react-toastify";

// const Chat = ({ selectedCustomer, selectedAccount }) => {
//   const { userData, token } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState({});
//   const [templatePreviewParts, setTemplatePreviewParts] = useState([]); // array of {type: 'text'|'var', content: string, varName?: string}

//   // Sending states (normal text/image)
//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // Template states
//   const [templates, setTemplates] = useState([]);
//   const [showTemplateList, setShowTemplateList] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [templateVariables, setTemplateVariables] = useState({}); // { "first_name": "Deepak", "order_number": "ORD123" }

//   // Fetch chat history
//   useEffect(() => {
//     if (!selectedCustomer) {
//       setMessages([]);
//       setImageUrls({});
//       return;
//     }

//     const fetchChatHistory = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerHistory?account_id=${selectedAccount.id}&limit=20&page=1&user_id=${selectedCustomer}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         const sortedData = response.data.data.sort(
//           (a, b) => parseInt(a.request_timestamp) - parseInt(b.request_timestamp)
//         );

//         const flattenedMessages = sortedData.flatMap((msg) => {
//           const arr = [
//             {
//               _id: msg.request_id,
//               type: "request",
//               source: msg.source,
//               content: msg.requestContent_value,
//               contentType: msg.requestContent_type,
//               timestamp: msg.request_timestamp,
//               contactName:
//                 msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]?.profile?.name ||
//                 "Unknown",
//               body_payload: msg.body_payload,
//             },
//           ];

//           if (msg.response) {
//             arr.push({
//               _id: msg.response_id || `response-${msg.request_id}`,
//               type: "response",
//               source: "bot",
//               content: msg.response,
//               contentType: msg.response?.type || "text",
//               timestamp: msg.responseLocal_timestamp || msg.request_timestamp,
//               contactName: "Bot",
//             });
//           }
//           return arr;
//         });

//         setMessages(flattenedMessages);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();
//   }, [selectedCustomer, selectedAccount?.id, token]);

//   // Auto-scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Fetch templates
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       if (!selectedAccount?.id || !token) return;
//       try {
//         const res = await axios.post(
//           `${apiurl}/api/whatsapp/template/get`,
//           { id: selectedAccount.account_id },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const data = res.data?.data?.data || res.data?.data || [];
//         setTemplates(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load templates", err);
//       }
//     };

//     fetchTemplates();
//   }, [selectedAccount?.id, token]);

//   // When template is selected → extract variables & examples
//   // const handleSelectTemplate = (tpl) => {
//   //   setSelectedTemplate(tpl);
//   //   setShowTemplateList(false);

//   //   const bodyComp = tpl.components?.find((c) => c.type === "BODY");
//   //   if (!bodyComp?.text) {
//   //     toast.warn("No body text found in this template");
//   //     return;
//   //   }

//   //   // Find all {{variable}} placeholders
//   //   const matches = bodyComp.text.match(/{{([^{}]+)}}/g) || [];
//   //   const vars = {};

//   //   matches.forEach((match) => {
//   //     const name = match.replace(/{{|}}/g, "").trim();
//   //     vars[name] = "";
//   //   });

//   //   // Try to pre-fill from examples (positional or named)
//   //   if (bodyComp.example) {
//   //     if (bodyComp.example.body_text?.[0]) {
//   //       // Positional: {{1}}, {{2}}, ...
//   //       bodyComp.example.body_text[0].forEach((val, idx) => {
//   //         const key = String(idx + 1);
//   //         if (vars[key]) vars[key] = val;
//   //       });
//   //     } else if (bodyComp.example.body_text_named_params) {
//   //       // Named parameters
//   //       bodyComp.example.body_text_named_params.forEach((p) => {
//   //         if (vars[p.param_name]) {
//   //           vars[p.param_name] = p.example || "";
//   //         }
//   //       });
//   //     }
//   //   }

//   //   setTemplateVariables(vars);
//   //   toast.info(`Template "${tpl.name}" selected – fill values below`);
//   // };
// const handleSelectTemplate = (tpl) => {
//   setSelectedTemplate(tpl);
//   setShowTemplateList(false);

//   const bodyComp = tpl.components?.find(c => c.type === "BODY");
//   if (!bodyComp?.text) {
//     toast.warn("No body text in this template");
//     return;
//   }

//   // Extract variables and their example values
//   const varsMap = {}; // name → default/example value
//   const matches = bodyComp.text.match(/{{([^{}]+)}}/g) || [];

//   matches.forEach(match => {
//     const name = match.replace(/{{|}}/g, "").trim();
//     varsMap[name] = ""; // default empty
//   });

//   // Try to fill examples if available
//   if (bodyComp.example) {
//     if (bodyComp.example.body_text?.[0]) {
//       // positional
//       bodyComp.example.body_text[0].forEach((val, i) => {
//         const key = String(i + 1);
//         if (varsMap[key]) varsMap[key] = val;
//       });
//     } else if (bodyComp.example.body_text_named_params) {
//       bodyComp.example.body_text_named_params.forEach(p => {
//         if (varsMap[p.param_name]) {
//           varsMap[p.param_name] = p.example || "";
//         }
//       });
//     }
//   }

//   setTemplateVariables(varsMap);

//   // Now split the text into renderable parts
//   const parts = [];
//   let lastIndex = 0;

//   bodyComp.text.replace(/{{([^{}]+)}}/g, (match, varName, offset) => {
//     // Add text before this variable
//     if (offset > lastIndex) {
//       parts.push({
//         type: 'text',
//         content: bodyComp.text.slice(lastIndex, offset)
//       });
//     }

//     // Add variable input placeholder
//     const trimmedName = varName.trim();
//     parts.push({
//       type: 'var',
//       varName: trimmedName,
//       content: trimmedName // displayed as label inside input
//     });

//     lastIndex = offset + match.length;
//     return match; // not really needed
//   });

//   // Add remaining text after last variable
//   if (lastIndex < bodyComp.text.length) {
//     parts.push({
//       type: 'text',
//       content: bodyComp.text.slice(lastIndex)
//     });
//   }

//   setTemplatePreviewParts(parts);

//   toast.info(`Template "${tpl.name}" loaded – edit values below`);
// };
//   // Send template with filled variables
//   const handleSendTemplate = async () => {
//     if (!selectedTemplate || !selectedCustomer || !selectedAccount?.inficonnect_api_key) {
//       toast.error("Cannot send: missing data");
//       return;
//     }

//     const bodyComp = selectedTemplate.components?.find((c) => c.type === "BODY");
//     if (!bodyComp) return;

//     const paramsArray = Object.entries(templateVariables).map(([param_name, text]) => ({
//       type: "text",
//       parameter_name: param_name,
//       text: text.trim() || "", // allow empty, but API may reject
//     }));

//     const payload = {
//       mobile_number: selectedCustomer,
//       template_name: selectedTemplate.name,
//       language_code: selectedTemplate.language || "en_US",
//       components: [{ type: "body", parameters: paramsArray }],
//     };

//     try {
//       await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
//         headers: {
//           accept: "*/*",
//           api_key: selectedAccount.inficonnect_api_key,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success("Template message sent!");

//       // Optimistic UI update (show preview of the message)
//       const previewText = bodyComp.text.replace(/{{([^{}]+)}}/g, (_, name) => templateVariables[name] || `{{${name}}}`);
//       const optimistic = {
//         _id: `tpl-${Date.now()}`,
//         type: "response",
//         source: "you",
//         content: previewText,
//         contentType: "text",
//         timestamp: Math.floor(Date.now() / 1000).toString(),
//         contactName: userData?.name || "You",
//       };
//       setMessages((prev) => [...prev, optimistic]);

//       // Reset
//       setSelectedTemplate(null);
//       setTemplateVariables({});
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to send template message");
//     }
//   };

//   // ──────────────── Normal send / upload / render logic ────────────────
//   // (keeping placeholders – replace with your real code)

//   const uploadImage = async (file) => {
//     // your implementation
//     return null;
//   };

//   const handleFileChange = (e) => {
//     // your implementation
//   };

//   const clearImage = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSendMessage = async () => {
//     // your normal text/image send logic
//   };

//   const renderMessageContent = (msg) => {
//     // your message rendering logic
//     return <p>{msg.content}</p>;
//   };

//   const formatTimestamp = (ts) => new Date(parseInt(ts) * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-full w-full flex flex-col font-sans">
//       {/* Header */}
//       <div className="bg-gray-300 p-3 flex justify-between items-center shadow-sm">
//         <h2 className="text-sm font-semibold text-gray-800">
//           {selectedCustomer ? `Chat with ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}` : "Select a Customer"}
//         </h2>
//         <DownloadChatPDF selectedCustomer={selectedCustomer} messages={messages} token={token} />
//       </div>

//       {/* Messages */}
//       <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-400/40">
//         {loading ? (
//           <div className="space-y-3 animate-pulse">
//             {/* skeletons */}
//           </div>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-sm">Select a customer to view messages</p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`flex items-end gap-1 ${msg.type === "request" ? "justify-start" : "justify-end flex-row-reverse"}`}
//             >
//               <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${msg.type === "request" ? "bg-green-400" : "bg-blue-600 text-white"}`}>
//                 {msg.contactName?.charAt(0)}
//               </div>
//               <div className={`max-w-[70%] p-2.5 rounded-2xl ${msg.type === "request" ? "bg-green-100" : "bg-blue-600 text-white"}`}>
//                 <p className="text-xs font-semibold">{msg.contactName}</p>
//                 {renderMessageContent(msg)}
//                 <p className="text-[10px] mt-1 opacity-70 text-right">{formatTimestamp(msg.timestamp)}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input Area + Template UI */}
//       <div className="bg-white border-t p-3 shadow-lg relative">
//         {/* Image Preview */}
//         {previewUrl && (
//           <div className="mb-3 relative inline-block">
//             <img src={previewUrl} alt="preview" className="max-h-24 rounded border" />
//             <button onClick={clearImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs">×</button>
//           </div>
//         )}

//         {/* Template selection list */}
//         {showTemplateList && (
//           <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-20">
//             <div className="sticky top-0 bg-gray-50 border-b px-4 py-2 text-sm font-medium text-gray-700">
//               Select Template
//             </div>
//             {templates.map((tpl) => (
//               <button
//                 key={tpl.id}
//                 onClick={() => handleSelectTemplate(tpl)}
//                 className="w-full text-left px-4 py-3 hover:bg-green-50 border-b last:border-none"
//               >
//                 <div className="font-medium text-green-700">{tpl.name}</div>
//                 <div className="text-xs text-gray-500">
//                   {tpl.language} • {tpl.category}
//                 </div>
//               </button>
//             ))}
//             {templates.length === 0 && (
//               <div className="p-4 text-sm text-gray-500 text-center">No templates found</div>
//             )}
//           </div>
//         )}

//         {/* Template variables form – appears when template selected */}
//         {/* {selectedTemplate && (
//           <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//             <div className="flex justify-between items-center mb-2">
//               <h4 className="text-sm font-semibold text-green-800">
//                 Sending: {selectedTemplate.name}
//               </h4>
//               <button
//                 onClick={() => {
//                   setSelectedTemplate(null);
//                   setTemplateVariables({});
//                 }}
//                 className="text-red-600 hover:text-red-800 text-sm"
//               >
//                 Cancel
//               </button>
//             </div>

//             <div className="mb-3 p-2 bg-white border rounded text-sm text-gray-700 italic">
//               {selectedTemplate.components?.find(c => c.type === "BODY")?.text || "No body text"}
//             </div>

//             {Object.keys(templateVariables).length > 0 ? (
//               <div className="space-y-3">
//                 {Object.entries(templateVariables).map(([key, value]) => (
//                   <div key={key}>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">
//                       {key}
//                     </label>
//                     <input
//                       type="text"
//                       value={value}
//                       onChange={(e) =>
//                         setTemplateVariables(prev => ({
//                           ...prev,
//                           [key]: e.target.value
//                         }))
//                       }
//                       className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//                       placeholder={`Enter value for ${key}`}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-600">This template has no variables to fill.</p>
//             )}

//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={handleSendTemplate}
//                 className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
//               >
//                 Send Template
//                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         )} */}

//         {selectedTemplate && (
//   <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
//     <div className="flex justify-between items-center mb-3">
//       <h4 className="text-sm font-semibold text-green-800">
//         {selectedTemplate.name}
//       </h4>
//       <button
//         onClick={() => {
//           setSelectedTemplate(null);
//           setTemplateVariables({});
//           setTemplatePreviewParts([]);
//         }}
//         className="text-red-600 hover:text-red-800 text-sm font-medium"
//       >
//         Cancel
//       </button>
//     </div>

//     {/* Inline editable message preview */}
//     <div className="p-3 bg-white border border-gray-200 rounded-lg mb-4 text-sm leading-relaxed whitespace-pre-wrap">
//       {templatePreviewParts.map((part, index) => (
//         part.type === 'text' ? (
//           <span key={index} className="text-gray-800">
//             {part.content}
//           </span>
//         ) : (
//           <input
//             key={index}
//             type="text"
//             value={templateVariables[part.varName] || ""}
//             onChange={(e) => {
//               setTemplateVariables(prev => ({
//                 ...prev,
//                 [part.varName]: e.target.value
//               }));
//             }}
//             placeholder={part.varName}
//             className="inline-block mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm text-green-800 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all"
//             style={{ verticalAlign: 'middle' }}
//           />
//         )
//       ))}
//     </div>

//     <div className="flex justify-end">
//       <button
//         onClick={handleSendTemplate}
//         className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2"
//         disabled={Object.values(templateVariables).some(v => !v.trim())}
//       >
//         Send Template
//         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//           <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//         </svg>
//       </button>
//     </div>
//   </div>
// )}

//         {/* Main input bar */}
//         <div className="flex items-center gap-2">
//           <button
//             onClick={() => setShowTemplateList(!showTemplateList)}
//             className={`px-4 py-2 rounded-lg text-sm font-medium ${
//               showTemplateList ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"
//             }`}
//           >
//             Template {showTemplateList ? "▲" : "▼"}
//           </button>

//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//             disabled={isUploading}
//           />

//           <button
//             onClick={handleSendMessage}
//             disabled={(!inputMessage.trim() && !selectedFile) || isUploading}
//             className={`p-3 rounded-full ${
//               (inputMessage.trim() || selectedFile) && !isUploading
//                 ? "bg-green-600 text-white hover:bg-green-700"
//                 : "bg-gray-200 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             {isUploading ? (
//               <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
//             ) : (
//               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { useUser } from "../config/userProvider";
// import DownloadChatPDF from "./downloadChatPdf";
// import { toast } from "react-toastify";
// import { GoRepoTemplate } from "react-icons/go";

// const Chat = ({ selectedCustomer, selectedAccount }) => {
//   const { userData, token } = useUser();
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imageUrls, setImageUrls] = useState({});
//   const [templatePreviewParts, setTemplatePreviewParts] = useState([]); // body parts

//   // ── New states for full template support ──
//   const [headerParts, setHeaderParts] = useState([]); // header preview parts
//   const [headerVariables, setHeaderVariables] = useState({}); // header var values
//   const [bodyVariables, setBodyVariables] = useState({}); // body var values
//   const [footerText, setFooterText] = useState(""); // static footer

//   // Sending states (normal text/image)
//   const [inputMessage, setInputMessage] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const fileInputRef = useRef(null);
//   const chatContainerRef = useRef(null);

//   // Template states
//   const [templates, setTemplates] = useState([]);
//   const [showTemplateList, setShowTemplateList] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);

//   // Fetch chat history
//   useEffect(() => {
//     if (!selectedCustomer) {
//       setMessages([]);
//       setImageUrls({});
//       return;
//     }

//     const fetchChatHistory = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerHistory?account_id=${selectedAccount.id}&limit=20&page=1&user_id=${selectedCustomer}`,
//           { headers: { Authorization: `Bearer ${token}` } },
//         );

//         const sortedData = response.data.data.sort(
//           (a, b) =>
//             parseInt(a.request_timestamp) - parseInt(b.request_timestamp),
//         );

//         const flattenedMessages = sortedData.flatMap((msg) => {
//           const arr = [
//             {
//               _id: msg.request_id,
//               type: "request",
//               source: msg.source,
//               content: msg.requestContent_value,
//               contentType: msg.requestContent_type,
//               timestamp: msg.request_timestamp,
//               contactName:
//                 msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]
//                   ?.profile?.name || "Unknown",
//               body_payload: msg.body_payload,
//             },
//           ];

//           if (msg.response) {
//             arr.push({
//               _id: msg.response_id || `response-${msg.request_id}`,
//               type: "response",
//               source: "bot",
//               content: msg.response,
//               contentType: msg.response?.type || "text",
//               timestamp: msg.responseLocal_timestamp || msg.request_timestamp,
//               contactName: "Bot",
//             });
//           }
//           return arr;
//         });

//         setMessages(flattenedMessages);
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchChatHistory();
//   }, [selectedCustomer, selectedAccount?.id, token]);

//   // Auto-scroll
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Fetch templates list
//   useEffect(() => {
//     const fetchTemplates = async () => {
//       if (!selectedAccount?.id || !token) return;
//       try {
//         const res = await axios.post(
//           `${apiurl}/api/whatsapp/template/get`,
//           { id: selectedAccount.account_id },
//           { headers: { Authorization: `Bearer ${token}` } },
//         );
//         const data = res.data?.data?.data || res.data?.data || [];
//         setTemplates(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Failed to load templates", err);
//       }
//     };

//     fetchTemplates();
//   }, [selectedAccount?.id, token]);

//   // ── When user selects a template ──
//   const handleSelectTemplate = async (tpl) => {
//     setSelectedTemplate(tpl);
//     setShowTemplateList(false);

//     try {
//       // Fetch full template details
//       const detailRes = await axios.post(
//         `${apiurl}/api/whatsapp/template/get/${tpl.id}`,
//         { id: selectedAccount.account_id },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       const fullTemplate = detailRes.data?.data || tpl; // fallback

//       // Reset all states
//       setHeaderParts([]);
//       setHeaderVariables({});
//       setBodyVariables({});
//       setFooterText("");
//       setTemplatePreviewParts([]);

//       let hParts = [];
//       let bParts = [];
//       let fText = "";

//       fullTemplate.components?.forEach((comp) => {
//         if (comp.type === "HEADER" && comp.format === "TEXT" && comp.text) {
//           // ── Header ──
//           let lastIdx = 0;
//           comp.text.replace(/{{([^{}]+)}}/g, (match, varName, offset) => {
//             if (offset > lastIdx) {
//               hParts.push({
//                 type: "text",
//                 content: comp.text.slice(lastIdx, offset),
//               });
//             }
//             const name = varName.trim();
//             hParts.push({ type: "var", varName: name });
//             lastIdx = offset + match.length;
//             return match;
//           });
//           if (lastIdx < comp.text.length) {
//             hParts.push({ type: "text", content: comp.text.slice(lastIdx) });
//           }

//           // Pre-fill header variables from example
//           const hVars = {};
//           if (comp.example?.header_text?.[0]) {
//             hVars["1"] = comp.example.header_text[0]; // most common case
//           }
//           setHeaderVariables(hVars);
//         } else if (comp.type === "BODY" && comp.text) {
//           // ── Body ── (same logic as before)
//           let lastIdx = 0;
//           comp.text.replace(/{{([^{}]+)}}/g, (match, varName, offset) => {
//             if (offset > lastIdx) {
//               bParts.push({
//                 type: "text",
//                 content: comp.text.slice(lastIdx, offset),
//               });
//             }
//             const name = varName.trim();
//             bParts.push({ type: "var", varName: name });
//             lastIdx = offset + match.length;
//             return match;
//           });
//           if (lastIdx < comp.text.length) {
//             bParts.push({ type: "text", content: comp.text.slice(lastIdx) });
//           }

//           // Pre-fill body variables
//           const bVars = {};
//           if (comp.example?.body_text?.[0]) {
//             comp.example.body_text[0].forEach((val, i) => {
//               bVars[String(i + 1)] = val;
//             });
//           } else if (comp.example?.body_text_named_params) {
//             comp.example.body_text_named_params.forEach((p) => {
//               bVars[p.param_name] = p.example || "";
//             });
//           }
//           setBodyVariables(bVars);
//         } else if (comp.type === "FOOTER" && comp.text) {
//           fText = comp.text;
//           setFooterText(comp.text);
//         }
//       });

//       setHeaderParts(hParts);
//       setTemplatePreviewParts(bParts); // body parts

//       if (hParts.length === 0 && bParts.length === 0) {
//         toast.warn("This template has no header or body variables");
//       } else {
//         toast.info(`Template "${tpl.name}" loaded – edit values`);
//       }
//     } catch (err) {
//       console.error("Failed to load full template", err);
//       toast.error("Could not load complete template details");
//       setSelectedTemplate(null);
//     }
//   };

//   // Send template message with header + body + footer
//   const handleSendTemplate = async () => {
//     if (
//       !selectedTemplate ||
//       !selectedCustomer ||
//       !selectedAccount?.inficonnect_api_key
//     ) {
//       toast.error("Missing required data to send template");
//       return;
//     }

//     const components = [];

//     // 1. Header
//     if (headerParts.length > 0) {
//       const headerParams = Object.entries(headerVariables)
//         .filter(([, val]) => val.trim())
//         .map(([name, text]) => ({
//           type: "text",
//           parameter_name: name,
//           text: text.trim(),
//         }));

//       if (headerParams.length > 0) {
//         components.push({
//           type: "header",
//           parameters: headerParams,
//         });
//       }
//     }

//     // 2. Body
//     const bodyParams = Object.entries(bodyVariables)
//       .filter(([, val]) => val.trim())
//       .map(([name, text]) => ({
//         type: "text",
//         parameter_name: name,
//         text: text.trim(),
//       }));

//     if (bodyParams.length > 0) {
//       components.push({
//         type: "body",
//         parameters: bodyParams,
//       });
//     }

//     // 3. Footer (no parameters)
//     if (footerText.trim()) {
//       components.push({
//         type: "footer",
//         parameters: [],
//       });
//     }

//     if (components.length === 0) {
//       toast.warn("No content to send (header/body empty)");
//       return;
//     }

//     const payload = {
//       mobile_number: selectedCustomer,
//       template_name: selectedTemplate.name,
//       language_code: selectedTemplate.language || "en_US",
//       components,
//     };

//     try {
//       await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
//         headers: {
//           accept: "*/*",
//           api_key: selectedAccount.inficonnect_api_key,
//           "Content-Type": "application/json",
//         },
//       });

//       toast.success("Template message sent!");

//       // Optimistic UI update
//       let preview = "";

//       if (headerParts.length > 0) {
//         preview +=
//           headerParts
//             .map((p) =>
//               p.type === "text"
//                 ? p.content
//                 : headerVariables[p.varName] || `{{${p.varName}}}`,
//             )
//             .join("") + "\n\n";
//       }

//       preview += templatePreviewParts
//         .map((p) =>
//           p.type === "text"
//             ? p.content
//             : bodyVariables[p.varName] || `{{${p.varName}}}`,
//         )
//         .join("");

//       if (footerText) preview += "\n\n" + footerText;

//       const optimistic = {
//         _id: `tpl-${Date.now()}`,
//         type: "response",
//         source: "you",
//         content: preview.trim(),
//         contentType: "text",
//         timestamp: Math.floor(Date.now() / 1000).toString(),
//         contactName: userData?.name || "You",
//       };

//       setMessages((prev) => [...prev, optimistic]);

//       // Reset
//       setSelectedTemplate(null);
//       setHeaderParts([]);
//       setTemplatePreviewParts([]);
//       setHeaderVariables({});
//       setBodyVariables({});
//       setFooterText("");
//     } catch (err) {
//       console.error("Template send failed", err);
//       toast.error("Failed to send template message");
//     }
//   };

//   // ──────────────── Normal message handlers (unchanged placeholders) ────────────────
//   const uploadImage = async (file) => {
//     // your implementation
//     return null;
//   };

//   const handleFileChange = (e) => {
//     // your implementation
//   };

//   const clearImage = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//     if (fileInputRef.current) fileInputRef.current.value = "";
//   };

//   const handleSendMessage = async () => {
//     // your normal text/image send logic
//   };

//   const renderMessageContent = (msg) => {
//     return <p>{msg.content}</p>;
//   };

//   const formatTimestamp = (ts) =>
//     new Date(parseInt(ts) * 1000).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });

//   return (
//     <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-full w-full flex flex-col font-sans">
//       {/* Header */}
//       <div className="bg-gray-300 p-3 flex justify-between items-center shadow-sm">
//         <h2 className="text-sm font-semibold text-gray-800">
//           {selectedCustomer
//             ? `Chat with ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}`
//             : "Select a Customer"}
//         </h2>
//         <DownloadChatPDF
//           selectedCustomer={selectedCustomer}
//           messages={messages}
//           token={token}
//         />
//       </div>

//       {/* Messages */}
//       <div
//         ref={chatContainerRef}
//         className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-400/40"
//       >
//         {loading ? (
//           <div className="space-y-3 animate-pulse">{/* skeletons */}</div>
//         ) : messages.length === 0 ? (
//           <p className="text-center text-gray-500 mt-10 text-sm">
//             Select a customer to view messages
//           </p>
//         ) : (
//           messages.map((msg) => (
//             <div
//               key={msg._id}
//               className={`flex items-end gap-1 ${msg.type === "request" ? "justify-start" : "justify-end flex-row-reverse"}`}
//             >
//               <div
//                 className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
//                   msg.type === "request"
//                     ? "bg-green-400"
//                     : "bg-blue-600 text-white"
//                 }`}
//               >
//                 {msg.contactName?.charAt(0)}
//               </div>
//               <div
//                 className={`max-w-[70%] p-2.5 rounded-2xl ${
//                   msg.type === "request"
//                     ? "bg-green-100"
//                     : "bg-blue-600 text-white"
//                 }`}
//               >
//                 <p className="text-xs font-semibold">{msg.contactName}</p>
//                 {renderMessageContent(msg)}
//                 <p className="text-[10px] mt-1 opacity-70 text-right">
//                   {formatTimestamp(msg.timestamp)}
//                 </p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input Area + Template UI */}
//       {selectedCustomer && (
//         <div className="bg-white border-t p-3 shadow-lg relative">
//           {/* Image Preview */}
//           {previewUrl && (
//             <div className="mb-3 relative inline-block">
//               <img
//                 src={previewUrl}
//                 alt="preview"
//                 className="max-h-24 rounded border"
//               />
//               <button
//                 onClick={clearImage}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
//               >
//                 ×
//               </button>
//             </div>
//           )}

//           {/* Template selection list */}
//           {showTemplateList && (
//             <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-20">
//               <div className="sticky top-0 bg-gray-50 border-b px-4 py-2 text-sm font-medium text-gray-700">
//                 Select Template
//               </div>
//               {templates.map((tpl) => (
//                 <button
//                   key={tpl.id}
//                   onClick={() => handleSelectTemplate(tpl)}
//                   className="w-full text-left px-4 py-3 hover:bg-green-50 border-b last:border-none"
//                 >
//                   <div className="font-medium text-green-700">{tpl.name}</div>
//                   <div className="text-xs text-gray-500">
//                     {tpl.language} • {tpl.category}
//                   </div>
//                 </button>
//               ))}
//               {templates.length === 0 && (
//                 <div className="p-4 text-sm text-gray-500 text-center">
//                   No templates found
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Template editing preview – now with HEADER + BODY + FOOTER */}
//           {selectedTemplate && (
//             <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg max-h-96 overflow-y-auto">
//               <div className="flex justify-between items-center mb-3">
//                 <h4 className="text-sm font-semibold text-green-800">
//                   {selectedTemplate.name}
//                 </h4>
//                 <button
//                   onClick={() => {
//                     setSelectedTemplate(null);
//                     setHeaderParts([]);
//                     setTemplatePreviewParts([]);
//                     setHeaderVariables({});
//                     setBodyVariables({});
//                     setFooterText("");
//                   }}
//                   className="text-red-600 hover:text-red-800 text-sm font-medium"
//                 >
//                   Cancel
//                 </button>
//               </div>

//               {/* Header preview + inputs */}
//               {headerParts.length > 0 && (
//                 <div className="mb-4 p-3 bg-white border border-gray-200 rounded-lg text-sm leading-relaxed">
//                   <div className="font-medium text-gray-700 mb-1">Header:</div>
//                   {headerParts.map((part, i) =>
//                     part.type === "text" ? (
//                       <span key={i} className="text-gray-800">
//                         {part.content}
//                       </span>
//                     ) : (
//                       <input
//                         key={i}
//                         type="text"
//                         value={headerVariables[part.varName] || ""}
//                         onChange={(e) =>
//                           setHeaderVariables((prev) => ({
//                             ...prev,
//                             [part.varName]: e.target.value,
//                           }))
//                         }
//                         placeholder={part.varName}
//                         className="inline-block mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm text-green-800 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-green-400"
//                         style={{ verticalAlign: "middle" }}
//                       />
//                     ),
//                   )}
//                 </div>
//               )}

//               {/* Body preview + inputs */}
//               {/* <div className="p-3 bg-white border border-gray-200 rounded-lg mb-4 text-sm leading-relaxed whitespace-pre-wrap">
//                 <div className="font-medium text-gray-700 mb-1">Message:</div>
//                 {templatePreviewParts.map((part, i) =>
//                   part.type === "text" ? (
//                     <span key={i} className="text-gray-800">
//                       {part.content}
//                     </span>
//                   ) : (
//                     <input
//                       key={i}
//                       type="text"
//                       value={bodyVariables[part.varName] || ""}
//                       onChange={(e) =>
//                         setBodyVariables((prev) => ({
//                           ...prev,
//                           [part.varName]: e.target.value,
//                         }))
//                       }
//                       placeholder={part.varName}
//                       className="inline-block mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm text-green-800 min-w-[100px] focus:outline-none focus:ring-2 focus:ring-green-400"
//                       style={{ verticalAlign: "middle" }}
//                     />
//                   ),
//                 )}
//               </div> */}
//               <div className="p-3 bg-white border border-gray-200 rounded-lg mb-4 text-sm">
//                 <div className="font-medium text-gray-700 mb-1">Message:</div>

//                 <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 break-words">
//                   {templatePreviewParts.map((part, i) =>
//                     part.type === "text" ? (
//                       <span key={i} className="text-gray-800 break-words">
//                         {part.content}
//                       </span>
//                     ) : (
//                       <input
//                         key={i}
//                         type="text"
//                         value={bodyVariables[part.varName] || ""}
//                         onChange={(e) =>
//                           setBodyVariables((prev) => ({
//                             ...prev,
//                             [part.varName]: e.target.value,
//                           }))
//                         }
//                         placeholder={part.varName}
//                         className="inline-flex mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm text-green-800 min-w-[100px] max-w-full focus:outline-none focus:ring-2 focus:ring-green-400"
//                       />
//                     ),
//                   )}
//                 </div>
//               </div>

//               {/* Footer (static) */}
//               {footerText && (
//                 <div className="p-3 bg-gray-100 border rounded-lg text-sm italic text-gray-600 mb-4">
//                   {footerText}
//                 </div>
//               )}

//               <div className="flex justify-end">
//                 <button
//                   onClick={handleSendTemplate}
//                   disabled={
//                     Object.values(headerVariables).some((v) => !v.trim()) ||
//                     Object.values(bodyVariables).some((v) => !v.trim())
//                   }
//                   className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   Send Template
//                   <svg
//                     className="w-4 h-4"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Main input bar */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setShowTemplateList(!showTemplateList)}
//               className={`px-4 py-2 rounded-lg text-sm font-medium ${
//                 showTemplateList
//                   ? "bg-green-600 text-white"
//                   : "bg-green-100 text-green-700 hover:bg-green-200"
//               }`}
//             >
//               <div className="flex flex-row gap-1 justify-center items-center">
//                 <div className="md:block hidden">Template</div>
//                 <div className="block md:hidden">
//                   <GoRepoTemplate />
//                 </div>
//                 {showTemplateList ? "▲" : "▼"}
//               </div>
//             </button>

//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyDown={(e) =>
//                 e.key === "Enter" &&
//                 !e.shiftKey &&
//                 (e.preventDefault(), handleSendMessage())
//               }
//               placeholder="Type a message..."
//               className="flex-1 border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//               disabled={isUploading || !!selectedTemplate}
//             />

//             <button
//               onClick={handleSendMessage}
//               disabled={
//                 (!inputMessage.trim() && !selectedFile) ||
//                 isUploading ||
//                 !!selectedTemplate
//               }
//               className={`p-3 rounded-full ${
//                 (inputMessage.trim() || selectedFile) &&
//                 !isUploading &&
//                 !selectedTemplate
//                   ? "bg-green-600 text-white hover:bg-green-700"
//                   : "bg-gray-200 text-gray-500 cursor-not-allowed"
//               }`}
//             >
//               {isUploading ? (
//                 <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                     fill="none"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="w-5 h-5"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chat;

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { apiurl } from "../config/config";
import { useUser } from "../config/userProvider";
import DownloadChatPDF from "./downloadChatPdf";
import { toast } from "react-toastify";
import { BsImage } from "react-icons/bs"; // or any image icon you like
import { GoRepoTemplate } from "react-icons/go";
import { MdLocationPin, MdMyLocation } from "react-icons/md"; // or use BsPinMap, etc.
import { HiOutlineLocationMarker } from "react-icons/hi"; // alternative
import { getCookie } from "../config/webStorage";
import { Discovery } from "aws-sdk";

const Chat = ({ selectedCustomerName, selectedCustomer, selectedAccount }) => {
  const { userData, token } = useUser();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});

  // Template related
  const [templates, setTemplates] = useState([]);
  const [showTemplateList, setShowTemplateList] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [metaToken, setMetaToken] = useState(null);
  const [phoneNumberId, setPhoneNumberId] = useState(null);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const locationButtonRef = useRef(null); // optional — for positioning popover
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationMode, setLocationMode] = useState(null); // 'current' | 'manual' | null

  // For manual mode + current mode preview
  const [locationData, setLocationData] = useState({
    latitude: "",
    longitude: "",
    name: "",
    address: "",
  });

  // Loading / error state for getting current location
  const [gettingCurrentLocation, setGettingCurrentLocation] = useState(false);

  console.log("metaToken", metaToken);
  console.log("phoneNumberId", phoneNumberId);

  const [headerParts, setHeaderParts] = useState([]);
  const [headerVariables, setHeaderVariables] = useState({});
  const [bodyVariables, setBodyVariables] = useState({});
  const [footerText, setFooterText] = useState("");
  const [templatePreviewParts, setTemplatePreviewParts] = useState([]); // body

  // ── Document header support ──
  const [documentFile, setDocumentFile] = useState(null);
  const [documentFileName, setDocumentFileName] = useState("");
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [uploadedMediaId, setUploadedMediaId] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // Normal message states
  const [inputMessage, setInputMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // ────────────────────────────────────────────────
  // Fetch chat history
  // ────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedCustomer) {
      setMessages([]);
      setImageUrls({});
      return;
    }

    fetchChatHistory();
  }, [selectedCustomer, selectedAccount?.id, token]);

  const fetchChatHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/user/getCustomerHistory?account_id=${selectedAccount.id}&limit=20&page=1&user_id=${selectedCustomer}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const sortedData = response.data.data.sort(
        (a, b) => parseInt(a.created_at) - parseInt(b.created_at),
      );
      console.log(">>>>sortedData", sortedData);
      let messagesArray = [];
      const flattenedMessages = sortedData.flatMap((msg) => {
        messagesArray = [];
        if (msg.request_type == "in") {
          messagesArray.push({
            _id: msg.request_id,
            type: "request",
            source: msg.source,
            content: msg.body_payload,
            contentType: msg.requestContent_type,
            timestamp: Math.floor(
              new Date(msg.created_at).getTime() / 1000,
            ).toString(),
            contactName:
              msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]
                ?.profile?.name || "Unknown",
            body_payload: msg.body_payload,
          });
        }

        if (msg.request_type == "out") {
          messagesArray.push({
            _id: msg.request_id,
            type: "response",
            source: "agent",
            content: msg.body_payload,
            contentType: msg.requestContent_type,
            timestamp: Math.floor(
              new Date(msg.created_at).getTime() / 1000,
            ).toString(),
            contactName:
              msg.body_payload?.entry?.[0]?.changes?.[0]?.value?.contacts?.[0]
                ?.profile?.name || "Agent",
            body_payload: msg.body_payload,
          });
        }
        return messagesArray;
      });
      console.log(">>>>>482", flattenedMessages);
      setMessages(flattenedMessages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Fetch templates
  useEffect(() => {
    const fetchTemplates = async () => {
      if (!selectedAccount?.id || !token) return;
      try {
        const res = await axios.post(
          `${apiurl}/api/whatsapp/template/get`,
          { id: selectedAccount.account_id },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        const data = res.data?.data?.data || res.data?.data || [];
        setTemplates(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load templates", err);
      }
    };

    fetchTemplates();
  }, [selectedAccount?.id, token]);

  // ────────────────────────────────────────────────
  // Select template → load full details
  // ────────────────────────────────────────────────
  const handleSelectTemplate = async (tpl) => {
    setSelectedTemplate(tpl);
    setShowTemplateList(false);

    // Reset document states
    setDocumentFile(null);
    setDocumentFileName("");
    setUploadedMediaId(null);

    try {
      const detailRes = await axios.post(
        `${apiurl}/api/whatsapp/template/get/${tpl.id}`,
        { id: selectedAccount.account_id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const fullTemplate = detailRes.data?.data || tpl;

      console.log("detailRes", detailRes);

      setMetaToken(detailRes?.data?.meta_api_access_token);
      setPhoneNumberId(detailRes?.data?.PHONE_NUMBER_ID);

      setHeaderParts([]);
      setHeaderVariables({});
      setBodyVariables({});
      setFooterText("");
      setTemplatePreviewParts([]);

      let hParts = [];
      let bParts = [];
      let fText = "";

      fullTemplate.components?.forEach((comp) => {
        if (comp.type === "HEADER" && comp.format === "TEXT" && comp.text) {
          let lastIdx = 0;
          comp.text.replace(/{{([^{}]+)}}/g, (match, varName, offset) => {
            if (offset > lastIdx) {
              hParts.push({
                type: "text",
                content: comp.text.slice(lastIdx, offset),
              });
            }
            const name = varName.trim();
            hParts.push({ type: "var", varName: name });
            lastIdx = offset + match.length;
            return match;
          });
          if (lastIdx < comp.text.length) {
            hParts.push({ type: "text", content: comp.text.slice(lastIdx) });
          }

          const hVars = {};
          if (comp.example?.header_text?.[0]) {
            hVars["1"] = comp.example.header_text[0];
          }
          setHeaderVariables(hVars);
        } else if (comp.type === "BODY" && comp.text) {
          let lastIdx = 0;
          comp.text.replace(/{{([^{}]+)}}/g, (match, varName, offset) => {
            if (offset > lastIdx) {
              bParts.push({
                type: "text",
                content: comp.text.slice(lastIdx, offset),
              });
            }
            const name = varName.trim();
            bParts.push({ type: "var", varName: name });
            lastIdx = offset + match.length;
            return match;
          });
          if (lastIdx < comp.text.length) {
            bParts.push({ type: "text", content: comp.text.slice(lastIdx) });
          }

          const bVars = {};
          if (comp.example?.body_text?.[0]) {
            comp.example.body_text[0].forEach((val, i) => {
              bVars[String(i + 1)] = val;
            });
          } else if (comp.example?.body_text_named_params) {
            comp.example.body_text_named_params.forEach((p) => {
              bVars[p.param_name] = p.example || "";
            });
          }
          setBodyVariables(bVars);
        } else if (comp.type === "FOOTER" && comp.text) {
          fText = comp.text;
          setFooterText(comp.text);
        }
      });

      setHeaderParts(hParts);
      setTemplatePreviewParts(bParts);

      if (hParts.length === 0 && bParts.length === 0) {
        toast.warn("This template has no editable variables");
      } else {
        toast.info(`Template "${tpl.name}" loaded`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Could not load full template details");
      setSelectedTemplate(null);
    }
  };

  // ────────────────────────────────────────────────
  // Upload document → Meta Cloud API
  // ────────────────────────────────────────────────

  // New function — almost your original handleImageUpload
  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    // Local preview
    const preview = URL.createObjectURL(file);
    setImagePreview(preview);
    setSelectedImageFile(file);

    // ── Upload immediately (recommended UX) ──
    const formData = new FormData();
    formData.append("files", file);

    try {
      const token = getCookie("sctoken"); // ← make sure this function exists!

      const res = await axios.post(
        `${apiurl}/api/whatsapp/content/imageupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            // no need for Content-Type — browser sets it with boundary
          },
        },
      );

      if (res.data?.success && res.data?.urls?.length > 0) {
        setUploadedImageUrl(res.data.urls[0]);
        toast.success("Image ready to send!");
      } else {
        toast.error("Image upload failed");
        clearImageSelection();
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      toast.error("Failed to upload image");
      clearImageSelection();
    }
  };

  const clearImageSelection = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
    setUploadedImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const uploadDocument = async (file) => {
    if (!file) return null;

    if (!metaToken || !phoneNumberId) {
      toast.error("Missing Meta token or Phone Number ID");
      return null;
    }

    setUploadingDocument(true);

    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", file);

    try {
      const res = await axios.post(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/media`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${metaToken}`,
          },
        },
      );

      const mediaId = res.data?.id;
      if (!mediaId) throw new Error("No media ID received");

      toast.success("Document uploaded successfully");
      return mediaId;
    } catch (err) {
      console.error("Document upload error:", err.response?.data || err);
      toast.error("Failed to upload document");
      return null;
    } finally {
      setUploadingDocument(false);
    }
  };

  const getCurrentDeviceLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setGettingCurrentLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData((prev) => ({
          ...prev,
          latitude: latitude.toFixed(6),
          longitude: longitude.toFixed(6),
        }));
        setGettingCurrentLocation(false);
        toast.success("Current location captured!");
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Failed to get location";
        if (error.code === 1) msg = "Location permission denied";
        if (error.code === 2) msg = "Position unavailable";
        if (error.code === 3) msg = "Location request timeout";
        toast.error(msg);
        setGettingCurrentLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleSendLocation = async () => {
    const { latitude, longitude, name, address } = locationData;

    if (!latitude || !longitude) {
      toast.error("Latitude and longitude are required");
      return;
    }

    // Optional: you can require name/address too
    // if (!name.trim() || !address.trim()) { ... }

    try {
      const apiKey = selectedAccount?.inficonnect_api_key;
      if (!apiKey) {
        toast.error("Missing API key");
        return;
      }

      const payload = {
        to: selectedCustomer,
        type: "location",
        value: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          name: name.trim() || undefined, // optional
          address: address.trim() || undefined,
        },
      };

      const response = await axios.post(
        "https://vibe.fixall.ai/xpresschat/api/whatsapp/message/location",
        payload,
        {
          headers: {
            accept: "*/*",
            api_key: apiKey,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        // Optimistic UI update
        const displayName = name.trim() || "Location";
        const displayAddr = address.trim() ? ` - ${address}` : "";

        const optimisticMsg = {
          _id: `loc-${Date.now()}`,
          type: "response",
          source: "you",
          content: {
            type: "location",
            location: {
              latitude,
              longitude,
              name,
              address,
            },
          },
          contentType: "location",
          timestamp: Math.floor(Date.now() / 1000).toString(),
          contactName: userData?.name || "You",
        };

        setMessages((prev) => [...prev, optimisticMsg]);

        toast.success("Location sent!");

        // Reset
        setShowLocationPicker(false);
        setLocationMode(null);
        setLocationData({ latitude: "", longitude: "", name: "", address: "" });
      }
    } catch (err) {
      console.error("Location send failed:", err);
      toast.error("Failed to send location");
    }
  };

  // ── Send CURRENT location ───────────────────────────────────────
  const handleSendCurrentLocation = async () => {
    if (gettingLocation) return;

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setGettingLocation(true);
    setShowLocationMenu(false);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const apiKey = selectedAccount?.inficonnect_api_key;
          if (!apiKey) {
            toast.error("Missing API key");
            return;
          }

          const payload = {
            to: selectedCustomer,
            type: "location",
            value: {
              latitude,
              longitude,
              name: "My Location", // you can make dynamic / ask user
              address: "Current position", // optional — can be empty string
            },
          };

          const response = await axios.post(
            "https://vibe.fixall.ai/xpresschat/api/whatsapp/message/location",
            payload,
            {
              headers: {
                accept: "*/*",
                api_key: apiKey,
                "Content-Type": "application/json",
              },
            },
          );

          if (response.status === 200) {
            toast.success("Location sent!");

            // Optimistic UI update
            const optimisticMsg = {
              _id: `loc-${Date.now()}`,
              type: "response",
              source: "you",
              content: {
                type: "location",
                location: {
                  latitude,
                  longitude,
                  name: "My Location",
                  address: "Current position",
                },
              },
              contentType: "location",
              timestamp: Math.floor(Date.now() / 1000).toString(),
              contactName: userData?.name || "You",
            };

            setMessages((prev) => [...prev, optimisticMsg]);
          }
        } catch (err) {
          console.error("Failed to send location:", err);
          toast.error("Failed to send location");
        } finally {
          setGettingLocation(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        let msg = "Failed to get location";
        if (error.code === 1) msg = "Location permission denied";
        if (error.code === 2) msg = "Position unavailable";
        if (error.code === 3) msg = "Location request timeout";
        toast.error(msg);
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  };

  // ── Request user location ───────────────────────────────────────
  const handleRequestLocation = async (
    customMessage = "Hi, please send your location",
  ) => {
    setShowLocationMenu(false);

    try {
      const apiKey = selectedAccount?.inficonnect_api_key;
      if (!apiKey) {
        toast.error("Missing API key");
        return;
      }

      const payload = {
        to: selectedCustomer,
        type: "location-request",
        value: customMessage.trim(),
      };

      const response = await axios.post(
        "https://vibe.fixall.ai/xpresschat/api/whatsapp/message/requestlocation",
        payload,
        {
          headers: {
            accept: "*/*",
            api_key: apiKey,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("Location request sent!");

        // Optimistic UI
        const optimisticMsg = {
          _id: `req-loc-${Date.now()}`,
          type: "response",
          source: "you",
          content: {
            type: "interactive",
            interactive: {
              type: "location_request_message",
              body: { text: customMessage },
            },
          },
          contentType: "location-request",
          timestamp: Math.floor(Date.now() / 1000).toString(),
          contactName: userData?.name || "You",
        };

        setMessages((prev) => [...prev, optimisticMsg]);
      }
    } catch (err) {
      console.error("Failed to request location:", err);
      toast.error("Failed to send location request");
    }
  };

  // ────────────────────────────────────────────────
  // Send template (now supports document header)
  // ────────────────────────────────────────────────
  const handleSendTemplate = async () => {
    if (
      !selectedTemplate ||
      !selectedCustomer ||
      !selectedAccount?.inficonnect_api_key
    ) {
      toast.error("Missing required data");
      return;
    }

    const hasDocumentHeader = selectedTemplate.components?.some(
      (c) => c.type === "HEADER" && c.format === "DOCUMENT",
    );

    let finalMediaId = uploadedMediaId;

    if (hasDocumentHeader) {
      if (!documentFile) {
        toast.error("This template requires a document. Please upload one.");
        return;
      }

      if (!finalMediaId) {
        finalMediaId = await uploadDocument(documentFile);
        if (!finalMediaId) return;
        setUploadedMediaId(finalMediaId);
      }
    }

    const components = [];

    // Header
    if (hasDocumentHeader) {
      components.push({
        type: "header",
        parameters: [
          {
            type: "document",
            document: {
              id: finalMediaId,
              // filename: documentFileName || undefined, // optional
            },
          },
        ],
      });
    } else if (headerParts.length > 0) {
      const headerParams = Object.entries(headerVariables)
        .filter(([, v]) => v.trim())
        .map(([name, text]) => ({
          type: "text",
          parameter_name: name,
          text: text.trim(),
        }));

      if (headerParams.length > 0) {
        components.push({ type: "header", parameters: headerParams });
      }
    }

    // Body
    const bodyParams = Object.entries(bodyVariables)
      .filter(([, v]) => v.trim())
      .map(([name, text]) => ({
        type: "text",
        parameter_name: name,
        text: text.trim(),
      }));

    if (bodyParams.length > 0) {
      components.push({ type: "body", parameters: bodyParams });
    }

    // Footer
    if (footerText.trim()) {
      components.push({ type: "footer", parameters: [] });
    }

    if (components.length === 0) {
      toast.warn("No valid content to send");
      return;
    }

    const payload = {
      mobile_number: selectedCustomer,
      template_name: selectedTemplate.name,
      language_code: selectedTemplate.language || "en_US",
      components,
      id: selectedTemplate.id,
    };

    try {
      await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
        headers: {
          accept: "*/*",
          api_key: selectedAccount.inficonnect_api_key,
          "Content-Type": "application/json",
        },
      });

      toast.success("Template sent!");

      // Optimistic update
      let previewText = "";

      if (hasDocumentHeader) {
        previewText += `[Document: ${documentFileName || "uploaded file"}]\n\n`;
      } else if (headerParts.length > 0) {
        previewText +=
          headerParts
            .map((p) =>
              p.type === "text"
                ? p.content
                : headerVariables[p.varName] || `{{${p.varName}}}`,
            )
            .join("") + "\n\n";
      }

      previewText += templatePreviewParts
        .map((p) =>
          p.type === "text"
            ? p.content
            : bodyVariables[p.varName] || `{{${p.varName}}}`,
        )
        .join("");

      if (footerText) previewText += "\n\n" + footerText;

      const optimisticMsg = {
        _id: `tpl-${Date.now()}`,
        type: "response",
        source: "you",
        content: previewText.trim(),
        contentType: hasDocumentHeader ? "document" : "text",
        timestamp: Math.floor(Date.now() / 1000).toString(),
        contactName: userData?.name || "You",
      };

      setMessages((prev) => [...prev, optimisticMsg]);

      // Reset everything
      setSelectedTemplate(null);
      setHeaderParts([]);
      setTemplatePreviewParts([]);
      setHeaderVariables({});
      setBodyVariables({});
      setFooterText("");
      setDocumentFile(null);
      setDocumentFileName("");
      setUploadedMediaId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send template");
    }
  };
  const clearImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const formatTimestamp = (ts) =>
    new Date(parseInt(ts) * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const renderMessageContent = (msg) => {
    console.log(">>>>> renderMessageContent called with:", msg);

    // ✅ SAFELY extract message
    const message =
      msg?.content?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    // ❌ If message does not exist, handle gracefully
    if (!message) {
      // Special case: button reply (flattened structure)
      if (msg?.type === "button" && msg?.button) {
        const replyText = msg.button.text || msg.button.payload || "—";

        return (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#dcf8c6",
              color: "#111",
              padding: "8px 14px",
              borderRadius: "18px",
              borderBottomRightRadius: "4px",
              margin: "4px 0",
              maxWidth: "80%",
              fontWeight: 500,
            }}
          >
            Button clicked: <strong>{replyText}</strong>
          </div>
        );
      }

      console.warn("⚠️ Invalid or unsupported message structure:", msg);
      return <p style={{ color: "#ef4444" }}>Invalid message structure</p>;
    }

    /* ======================================================
     BELOW THIS POINT: message IS GUARANTEED TO EXIST
     ====================================================== */

    // 📍 Location
    if (message.type === "location") {
      const { latitude, longitude, name, address } = message.location || {};

      if (!latitude || !longitude) {
        return <p style={{ color: "#ef4444" }}>Invalid location data</p>;
      }

      const googleMapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

      // Embed URL - simple centered pin view
      const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${btoa(`${latitude},${longitude}`)}!5e0!3m2!1sen!2sin!4v${Date.now()}`;

      return (
        <div style={{ margin: "8px 0" }}>
          {/* Map preview */}
          <iframe
            src={embedUrl}
            width="100%"
            height="220"
            style={{
              border: 0,
              borderRadius: "12px",
              marginBottom: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location map preview"
          ></iframe>
          {name && (
            <p style={{ fontWeight: "bold", marginBottom: "6px" }}>{name}</p>
          )}
          {address && <p style={{ marginBottom: "10px" }}>{address}</p>}

          {/* Link to open in full Google Maps */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#1d4ed8",
              fontWeight: "500",
              textDecoration: "none",
            }}
          >
            <span style={{ fontSize: "1.2em", color: "#000000" }}>📍</span>
            Open in Google Maps
          </a>
        </div>
      );
    }

    // 📝 Text
    if (message.type === "text") {
      return <p>{message.text?.body || "No text content"}</p>;
    }

    // 🔘 Button reply
    if (message.type === "button" && message.button) {
      const replyText = message.button.text || message.button.payload || "—";

      return (
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#dcf8c6",
            padding: "8px 14px",
            borderRadius: "18px",
          }}
        >
          Button clicked: <strong>{replyText}</strong>
        </div>
      );
    }

    // 🖼 Image
    if (message.type === "image") {
      const imageUrl = message.image?.link || message.image?.url;
      const caption = message.image?.caption || "";

      if (!imageUrl) {
        return <p style={{ color: "#ef4444" }}>Image URL missing</p>;
      }

      return (
        <div>
          <img
            src={imageUrl}
            alt={caption}
            style={{ maxWidth: "100%", borderRadius: "12px", display: "block" }}
          />
          {caption && caption.trim() !== "" && (
            <p style={{ marginTop: "6px", textAlign: "left" }}>{caption}</p>
          )}
        </div>
      );
    }

    if (message.type === "interactive" && message.interactive) {
      const interactive = message.interactive;

      // ── Location Request Message ────────────────────────────────────────
      if (interactive.type === "location_request_message") {
        const requestText =
          interactive.body?.text || "Please share your location";

        return (
          <div
            style={{
              border: "1px solid #bfdbfe",
              borderRadius: "12px",
              padding: "12px 16px",
              backgroundColor: "#eff6ff", // very light blue
              margin: "8px 0",
            }}
          >
            <p
              style={{
                margin: 0,
                fontWeight: 500,
                color: "#1e40af", // blue text
                lineHeight: "1.4",
              }}
            >
              {requestText}
            </p>

            {/* Simulated "Share Location" button */}
            <div
              style={{
                marginTop: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#3b82f6", // WhatsApp blue
                color: "white",
                padding: "10px 18px",
                borderRadius: "9999px",
                fontSize: "0.95rem",
                fontWeight: 500,
                boxShadow: "0 2px 6px rgba(59,130,246,0.3)",
                cursor: "not-allowed", // shows it's not clickable here
              }}
            >
              <span style={{ fontSize: "1.3em" }}>📍</span>
              Share Location
            </div>

            {/* Small hint text */}
            <p
              style={{
                marginTop: "12px",
                fontSize: "0.82rem",
                color: "#64748b",
                fontStyle: "italic",
              }}
            >
              (This is a request for you to share your current location)
            </p>
          </div>
        );
      }
      if (interactive.type === "list") {
        const header = interactive.header?.text || "";
        const body = interactive.body?.text || "";
        const button = interactive.action?.button || "Select option";
        const sections = interactive.action?.sections || [];

        return (
          <div
            style={{
              padding: "12px",

              borderRadius: "10px",
              border: "1px solid #cbd5e1",
              margin: "6px 0",
            }}
          >
            {header && (
              <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
                {header}
              </div>
            )}
            {body && <p style={{ margin: "0 0 12px 0" }}>{body}</p>}

            <div
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
                margin: "12px 0",
              }}
            >
              {button} ▼
            </div>

            {sections.length > 0 && (
              <div style={{ fontSize: "0.9rem" }}>
                {sections.map((s, i) => (
                  <div key={i} style={{ marginBottom: "12px" }}>
                    {s.title && (
                      <div style={{ fontWeight: "600", marginBottom: "6px" }}>
                        {s.title}
                      </div>
                    )}
                    {s.rows?.map((r, j) => (
                      <div key={j} style={{ padding: "6px 0" }}>
                        • {r.title}
                        {r.description && (
                          <div style={{ fontSize: "0.85rem" }}>
                            {r.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {interactive.footer?.text && (
              <p
                style={{
                  fontSize: "0.82rem",
                  marginTop: "10px",
                  textAlign: "center",
                }}
              >
                {interactive.footer.text}
              </p>
            )}
          </div>
        );
      }
      // ── Button(s) Message ───────────────────────────────────────
      if (interactive.type === "button") {
        const header = interactive.header;
        const bodyText = interactive.body?.text || "";
        const footerText = interactive.footer?.text || "";
        const buttons = interactive.action?.buttons || [];

        return (
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "14px 16px",
              backgroundColor: "#f9fafb",
              margin: "8px 0",
              maxWidth: "100%",
            }}
          >
            {/* Header - Image / Text / Video */}
            {header && (
              <div style={{ marginBottom: "12px" }}>
                {header.type === "image" && header.image?.link && (
                  <img
                    src={header.image.link}
                    alt="Header image"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  />
                )}

                {header.type === "text" && header.text && (
                  <h4
                    style={{
                      margin: "0 0 10px 0",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      color: "#1e40af",
                    }}
                  >
                    {header.text}
                  </h4>
                )}

                {/* You can add video case later if needed */}
              </div>
            )}

            {/* Body text */}
            {bodyText && (
              <p
                style={{
                  margin: "0 0 16px 0",
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.45",
                  color: "#111827",
                }}
              >
                {bodyText}
              </p>
            )}

            {/* Reply Buttons - rendered as non-clickable preview */}
            {buttons.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  margin: "12px 0",
                }}
              >
                {buttons.map((btn, index) => {
                  // Currently only "reply" type is widely supported
                  if (btn.type === "reply" && btn.reply) {
                    const btnTitle = btn.reply.title || "Button";
                    return (
                      <div
                        key={index}
                        style={{
                          backgroundColor: "#3b82f6",
                          color: "white",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          textAlign: "center",
                          fontWeight: 500,
                          cursor: "not-allowed",
                          boxShadow: "0 1px 3px rgba(59,130,246,0.2)",
                        }}
                      >
                        {btnTitle}
                      </div>
                    );
                  }

                  // Fallback for unknown button types
                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "#6b7280",
                        color: "white",
                        padding: "10px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontSize: "0.9rem",
                      }}
                    >
                      [Unsupported button type]
                    </div>
                  );
                })}
              </div>
            ) : (
              <p style={{ color: "#9ca3af", fontStyle: "italic" }}>
                No buttons available
              </p>
            )}

            {/* Footer */}
            {footerText && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                {footerText}
              </p>
            )}
          </div>
        );
      }

      // ── Button Reply from User ────────────────────────────────────────
      if (interactive?.type === "button_reply") {
        const reply = message.interactive.button_reply;
        const buttonId = reply?.id || "—";
        const buttonTitle = reply?.title || "Selected option";

        return (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#dcf8c6", // WhatsApp user message green
              color: "#111",
              padding: "10px 16px",
              borderRadius: "18px",
              borderBottomRightRadius: "4px", // typical right-aligned bubble shape
              margin: "4px 0",
              maxWidth: "80%",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "0.95rem" }}>{buttonTitle}</div>

            {/* Optional: show ID or small metadata (useful in debug/admin view) */}
            {buttonId !== "—" && (
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#555",
                  marginTop: "4px",
                  opacity: 0.8,
                }}
              >
                Button ID: {buttonId}
              </div>
            )}
          </div>
        );
      }
      if (interactive?.type === "list_reply") {
        const reply = message.interactive.list_reply;
        const buttonId = reply?.id || "—";
        const buttonTitle = reply?.title || "Selected option";

        return (
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#dcf8c6", // WhatsApp user message green
              color: "#111",
              padding: "10px 16px",
              borderRadius: "18px",
              borderBottomRightRadius: "4px", // typical right-aligned bubble shape
              margin: "4px 0",
              maxWidth: "80%",
              fontWeight: 500,
              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}
          >
            <div style={{ fontSize: "0.95rem" }}>{buttonTitle}</div>

            {/* Optional: show ID or small metadata (useful in debug/admin view) */}
            {buttonId !== "—" && (
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "#555",
                  marginTop: "4px",
                  opacity: 0.8,
                }}
              >
                Button ID: {buttonId}
              </div>
            )}
          </div>
        );
      }
      // ... other interactive types (list, button, etc.) ...

      // Fallback for unknown interactive types
      return (
        <p style={{ color: "#f59e0b" }}>
          Interactive message: {interactive.type || "unknown"}
        </p>
      );
    }

    // ⚠️ Fallback
    return (
      <p style={{ color: "#9ca3af" }}>
        Unsupported message type: {message.type}
      </p>
    );
  };

  const handleSendMessage = async () => {
    const text = inputMessage.trim();
    const isImageMode = !!selectedImageFile;

    if (!text && !isImageMode) return;

    if (isImageMode && !uploadedImageUrl) {
      toast.warn("Image is still uploading...");
      return;
    }

    try {
      const apiKey = selectedAccount?.inficonnect_api_key;
      if (!apiKey) {
        toast.error("Missing API key");
        return;
      }

      let response;

      if (isImageMode) {
        // Send image with optional caption
        response = await axios.post(
          "https://vibe.fixall.ai/xpresschat/api/whatsapp/message/image",
          {
            to: selectedCustomer,
            type: "img",
            value: uploadedImageUrl,
            caption: text || "", // ← caption is optional
          },
          {
            headers: {
              accept: "*/*",
              api_key: apiKey,
              "Content-Type": "application/json",
            },
          },
        );
      } else {
        // Normal text message
        response = await axios.post(
          `${apiurl}/api/whatsapp/message/text`,
          {
            to: selectedCustomer,
            type: "text",
            value: text,
          },
          {
            headers: {
              api_key: apiKey,
              "Content-Type": "application/json",
              accept: "*/*",
            },
          },
        );
      }

      if (response.status === 200 /* || response.data?.success */) {
        // Optimistic update
        const optimisticMsg = {
          _id: `sent-${Date.now()}`,
          type: "response",
          source: "you",
          content: isImageMode
            ? {
                type: "image",
                image: { link: uploadedImageUrl },
                caption: text || "",
              }
            : { type: "text", text: { body: text } },
          contentType: isImageMode ? "image" : "text",
          timestamp: Math.floor(Date.now() / 1000).toString(),
          contactName: userData?.name || "You",
        };

        setMessages((prev) => [...prev, optimisticMsg]);

        // Cleanup
        setInputMessage("");
        if (isImageMode) clearImageSelection();
        fetchChatHistory();
      }
    } catch (err) {
      console.error("Send failed:", err);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-full w-full flex flex-col font-sans">
      {/* Header */}
      <div className="bg-gray-300 p-3 flex justify-between items-center shadow-sm">
        <h2 className="text-sm font-semibold text-gray-800">
          {selectedCustomer
            ? // ? `Chat with ${"*".repeat(selectedCustomer.length - 4) + selectedCustomer.slice(-4)}`
              `Chat with ${selectedCustomerName}`
            : "Select a Customer"}
        </h2>
        <DownloadChatPDF
          selectedCustomer={selectedCustomer}
          messages={messages}
          token={token}
        />
      </div>

      {/* Messages area */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-gray-400/40 chat-bg"
        style={{
          backgroundImage: `url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')`,
        }}
      >
        {loading ? (
          <div className="space-y-3 animate-pulse">
            {/* loading skeletons */}
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-sm">
            Select a customer to view messages
          </p>
        ) : (
          // messages.map((msg) => (
          //   <div
          //     key={msg._id}
          //     className={`flex items-end gap-1 ${msg.type === "request" ? "justify-start" : "justify-end flex-row"}`}
          //   >
            
          //     <div
          //       className={`max-w-[70%] min-w-[10%] p-2.5  ${
          //         msg.type === "request"
          //           ? "bg-white rounded-t-lg rounded-br-lg"
          //           : "bg-[#d9fdd3] rounded-t-lg rounded-bl-lg"
          //       }`}
          //     >
          //       {/* <p className="text-xs font-semibold">{msg.contactName}</p> */}
          //       {renderMessageContent(msg)}
          //       <p className="text-[10px] mt-1 opacity-70 text-right">
          //         {formatTimestamp(msg.timestamp)}
          //       </p>
          //     </div>
          //   </div>
          // ))
          messages.map((msg) => (
  <div
    key={msg._id}
    className={`flex items-start gap-2 px-3 ${msg.type === "request" ? "justify-start" : "justify-end"}`}
  >
    <div
      className={`
        relative max-w-[78%] px-3.5 py-2.5 text-[15px] leading-[1.4] shadow-[0_1px_2px_rgba(0,0,0,0.1)]
        ${msg.type === "request"
          ? "bg-white rounded-xl rounded-tl-none"   // incoming: flat top-left for tail
          : "bg-[#e1ffc7] rounded-xl rounded-tr-none" // outgoing: flat top-right (bottom tail style)
        }
      `}
    >
      {/* Top-left triangle tail – only for incoming ("request") messages */}
      {msg.type === "request" ?
      
          <div
            className="
              absolute -left-[16px] -top-[18.5px] w-0 h-0
              border-[13px] border-solid
              border-l-white border-r-transparent
              border-t-transparent border-b-transparent
              rotate-[-45deg] origin-top-right
            "
          />
          :
              <div
            className="
              absolute -right-[35px] -top-[0px] w-0 h-0
              border-[13px] border-solid
              border-l-[#e1ffc7] border-r-transparent
              border-t-transparent border-b-transparent
              rotate-[90deg] origin-top-left
            
            "
          /> 
      }

      {/* Message content */}
      {renderMessageContent(msg)}

      {/* Timestamp area */}
      <div className="flex items-center justify-end mt-1 gap-1.5">
        <span className="text-[11px] text-gray-500 font-normal">
          {formatTimestamp(msg.timestamp)}
        </span>
        {/* {msg.type !== "request" && (
          <span className="text-[13px] text-[#53bdeb]">✓✓</span>
        )} */}
      </div>
    </div>
  </div>
))
        )}
      </div>

      {selectedCustomer && (
        <div className="bg-white border-t p-3 shadow-lg relative">
          {/* Preview of selected image (normal send) */}
          {previewUrl && (
            <div className="mb-3 relative inline-block">
              <img
                src={previewUrl}
                alt="preview"
                className="max-h-24 rounded border"
              />
              <button
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs"
              >
                ×
              </button>
            </div>
          )}

          {/* Template list dropdown */}
          {showTemplateList && (
            <div className="absolute bottom-full left-3 right-3 mb-2 bg-white border rounded-lg shadow-lg max-h-72 overflow-y-auto z-20">
              <div className="sticky top-0 bg-gray-50 border-b px-4 py-2 text-sm font-medium text-gray-700">
                Select Template
              </div>
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleSelectTemplate(tpl)}
                  className="w-full text-left px-4 py-3 hover:bg-green-50 border-b last:border-none"
                >
                  <div className="font-medium text-green-700">{tpl.name}</div>
                  <div className="text-xs text-gray-500">
                    {tpl.language} • {tpl.category}
                  </div>
                </button>
              ))}
              {templates.length === 0 && (
                <div className="p-4 text-sm text-gray-500 text-center">
                  No templates found
                </div>
              )}
            </div>
          )}

          {/* Template edit/preview area */}
          {selectedTemplate && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg max-h-96 overflow-y-auto">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-green-800">
                  {selectedTemplate.name}
                </h4>
                <button
                  onClick={() => {
                    setSelectedTemplate(null);
                    setHeaderParts([]);
                    setTemplatePreviewParts([]);
                    setHeaderVariables({});
                    setBodyVariables({});
                    setFooterText("");
                    setDocumentFile(null);
                    setDocumentFileName("");
                    setUploadedMediaId(null);
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>

              {/* Document upload field — only if needed */}
              {selectedTemplate.components?.some(
                (c) => c.type === "HEADER" && c.format === "DOCUMENT",
              ) && (
                <div className="mb-4 p-3 bg-white border rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Document for Header{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setDocumentFile(file);
                      setDocumentFileName(file.name);
                      setUploadedMediaId(null); // force re-upload
                    }}
                    disabled={uploadingDocument}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {documentFileName && (
                    <div className="mt-2 text-sm flex items-center gap-3">
                      <span className="text-gray-700">
                        {documentFileName}
                        {uploadedMediaId && (
                          <span className="ml-2 text-green-600">
                            (uploaded)
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setDocumentFile(null);
                          setDocumentFileName("");
                          setUploadedMediaId(null);
                        }}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                  {uploadingDocument && (
                    <p className="text-blue-600 mt-1 text-sm">Uploading...</p>
                  )}
                </div>
              )}

              {/* Header (text) */}
              {headerParts.length > 0 && (
                <div className="mb-4 p-3 bg-white border rounded-lg">
                  <div className="font-medium text-gray-700 mb-1">Header:</div>
                  {headerParts.map((part, i) =>
                    part.type === "text" ? (
                      <span key={i} className="text-gray-800">
                        {part.content}
                      </span>
                    ) : (
                      <input
                        key={i}
                        type="text"
                        value={headerVariables[part.varName] || ""}
                        onChange={(e) =>
                          setHeaderVariables((prev) => ({
                            ...prev,
                            [part.varName]: e.target.value,
                          }))
                        }
                        placeholder={part.varName}
                        className="inline-block mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm min-w-[100px]"
                      />
                    ),
                  )}
                </div>
              )}

              {/* Body */}
              <div className="p-3 bg-white border rounded-lg mb-4">
                <div className="font-medium text-gray-700 mb-1">Message:</div>
                <div className="flex flex-wrap items-center gap-x-1 gap-y-2">
                  {templatePreviewParts.map((part, i) =>
                    part.type === "text" ? (
                      <span key={i} className="text-gray-800 break-words">
                        {part.content}
                      </span>
                    ) : (
                      <input
                        key={i}
                        type="text"
                        value={bodyVariables[part.varName] || ""}
                        onChange={(e) =>
                          setBodyVariables((prev) => ({
                            ...prev,
                            [part.varName]: e.target.value,
                          }))
                        }
                        placeholder={part.varName}
                        className="inline-flex mx-1 px-2 py-0.5 bg-green-100 border border-green-300 rounded text-sm min-w-[100px] max-w-full"
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Footer */}
              {footerText && (
                <div className="p-3 bg-gray-100 border rounded-lg text-sm italic text-gray-600 mb-4">
                  {footerText}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={handleSendTemplate}
                  disabled={
                    uploadingDocument ||
                    (selectedTemplate.components?.some(
                      (c) => c.type === "HEADER" && c.format === "DOCUMENT",
                    ) &&
                      !documentFile) ||
                    Object.values(headerVariables).some((v) => !v.trim()) ||
                    Object.values(bodyVariables).some((v) => !v.trim())
                  }
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  Send Template
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Normal input bar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTemplateList(!showTemplateList)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showTemplateList
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              <div className="flex items-center gap-1">
                <GoRepoTemplate />
                {showTemplateList ? "▲" : "▼"}
              </div>
            </button>

            {/* Location button + menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                disabled={gettingLocation}
                className={`p-2.5 rounded-full transition-colors ${
                  showLocationMenu || gettingLocation
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                {gettingLocation ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <MdLocationPin className="w-5 h-5" />
                )}
              </button>

              {showLocationMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border rounded-lg shadow-xl z-30 overflow-hidden">
                  {/* NEW: Location button */}
                  <button
                    type="button"
                    onClick={() => setShowLocationPicker(true)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                    disabled={!!selectedTemplate}
                  >
                    <HiOutlineLocationMarker className="text-blue-600 w-5 h-5" />
                    <div>
                      <div className="font-medium">Send location</div>
                      <div className="text-xs text-gray-500">
                        (current Location / Location)
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() =>
                      handleRequestLocation("Hi, please send your location")
                    }
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                  >
                    <HiOutlineLocationMarker className="text-blue-600 w-5 h-5" />
                    <div>
                      <div className="font-medium">Request location</div>
                      <div className="text-xs text-gray-500">
                        Ask customer to share position
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* ── Location Picker Modal ── */}
            {showLocationPicker && (
              <div
                className="absolute bottom-full left-24 right-0 mb-3 bg-white border rounded-lg shadow-xl p-4 z-30 max-w-lg"
                onClick={(e) => e.stopPropagation()} // ← prevents closing when clicking inside
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800">Send Location</h4>
                  <button
                    onClick={() => {
                      setShowLocationPicker(false);
                      setLocationMode(null);
                      setLocationData({
                        latitude: "",
                        longitude: "",
                        name: "",
                        address: "",
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 text-xl font-bold w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 transition-colors"
                    aria-label="Close location picker"
                  >
                    ×
                  </button>
                </div>

                {!locationMode ? (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setLocationMode("current");
                        getCurrentDeviceLocation();
                      }}
                      disabled={gettingCurrentLocation}
                      className="py-3 px-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {gettingCurrentLocation
                        ? "Getting location..."
                        : "Use Current Location"}
                    </button>

                    <button
                      onClick={() => setLocationMode("manual")}
                      className="py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
                    >
                      Enter Manually
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Latitude *
                        </label>
                        <input
                          type="number"
                          step="any"
                          value={locationData.latitude}
                          onChange={(e) =>
                            setLocationData((prev) => ({
                              ...prev,
                              latitude: e.target.value,
                            }))
                          }
                          placeholder="e.g. 28.7041"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1 font-medium">
                          Longitude *
                        </label>
                        <input
                          type="number"
                          step="any"
                          value={locationData.longitude}
                          onChange={(e) =>
                            setLocationData((prev) => ({
                              ...prev,
                              longitude: e.target.value,
                            }))
                          }
                          placeholder="e.g. 77.1025"
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Name (optional)
                      </label>
                      <input
                        type="text"
                        value={locationData.name}
                        onChange={(e) =>
                          setLocationData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="e.g. My Office"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-1 font-medium">
                        Address (optional)
                      </label>
                      <input
                        type="text"
                        value={locationData.address}
                        onChange={(e) =>
                          setLocationData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                        placeholder="e.g. Sector 18, Noida"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400"
                      />
                    </div>

                    <div className="flex justify-end gap-3 mt-5">
                      <button
                        onClick={() => {
                          setLocationMode(null);
                          setLocationData({
                            latitude: "",
                            longitude: "",
                            name: "",
                            address: "",
                          });
                        }}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleSendLocation}
                        disabled={
                          !locationData.latitude?.trim() ||
                          !locationData.longitude?.trim()
                        }
                        className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Send Location
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <label
              htmlFor="image-upload"
              className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition-colors"
            >
              <BsImage className="w-5 h-5 text-gray-700" />
            </label>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
            />
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSendMessage())
              }
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              disabled={isUploading || !!selectedTemplate}
            />

            {/* <button
              onClick={handleSendMessage}
              disabled={
                (!inputMessage.trim() && !selectedFile) ||
                isUploading ||
                !!selectedTemplate
              }
              className={`p-3 rounded-full ${
                (inputMessage.trim() || selectedFile) &&
                !isUploading &&
                !selectedTemplate
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isUploading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button> */}

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={
                (!inputMessage.trim() && !selectedImageFile) ||
                !!selectedTemplate ||
                (selectedImageFile && !uploadedImageUrl) // prevent send during upload
              }
              className={`p-3 rounded-full transition-colors ${
                (inputMessage.trim() || selectedImageFile) && !selectedTemplate
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>

            {/* ── Location Picker Modal ── */}

            {/* Image Preview - above input bar */}
            {imagePreview && (
              <div className="absolute bottom-full left-0 mb-3 bg-white p-2 rounded-lg shadow-lg border">
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="max-h-28 rounded object-contain"
                  />
                  <button
                    onClick={clearImageSelection}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-1">
                  Image selected
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
