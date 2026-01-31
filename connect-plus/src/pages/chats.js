// import React, { useState } from "react";
// import Chat from "../components/chat.js";
// import Layout from "../components/layout.js";
// import { IoClose } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbChevronRight } from "react-icons/tb";
// import { TbChevronLeft } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";

// const Chats = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <Layout>
//       <div className="layout h-full w-full overflow-hidden bg-zinc-50">
//         {/* <FixallAi /> */}
//         <div className="flex h-full md:p-1">
//           <div
//             className={` sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${isMenuOpen
//               ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
//               : "absolute flex  w-[0%] -translate-x-full opacity-0 sm:opacity-100"
//               }  md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
//           >
//             <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar ">
//               <p className="text-xl text-white text-start w-full">Chatlist</p>
//               <div className="px-4 flex items-center py-1 border border-white rounded-md w-full text-start">
//                 <div className=" rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                   <img src="defaultprofile.png" alt="profile" className="w-full h-full rounded-full object-cover" />
//                 </div>
//                 <div className="w-full">
//                   <p className="text-sm">User Name</p>
//                   <p className="text-xs text-slate-400">This is the message</p>
//                 </div>
//               </div>
//               <div className="px-4 flex items-center py-1 border border-white rounded-md w-full text-start">
//                 <div className=" rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                   <img src="defaultprofile.png" alt="profile" className="w-full h-full rounded-full object-cover" />
//                 </div>
//                 <div className="w-full">
//                   <p className="text-sm">User Name</p>
//                   <p className="text-xs text-slate-400">This is the message</p>
//                 </div>
//               </div>
//               <div className="px-4 flex items-center py-1 border border-white rounded-md w-full text-start">
//                 <div className=" rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                   <img src="defaultprofile.png" alt="profile" className="w-full h-full rounded-full object-cover" />
//                 </div>
//                 <div className="w-full">
//                   <p className="text-sm">User Name</p>
//                   <p className="text-xs text-slate-400">This is the message</p>
//                 </div>
//               </div>
//               <div className="px-4 flex items-center py-1 border border-white rounded-md w-full text-start">
//                 <div className=" rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                   <img src="defaultprofile.png" alt="profile" className="w-full h-full rounded-full object-cover" />
//                 </div>
//                 <div className="w-full">
//                   <p className="text-sm">User Name</p>
//                   <p className="text-xs text-slate-400">This is the message</p>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-primary p-2 md:hidden flex">
//               {isMenuOpen ? <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div> : <div className="py-2 cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>}
//             </div>
//           </div>
//           <div className="bg-primary p-2 h-full flex items-center justify-center">
//             {isMenuOpen ? (
//               <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div>
//             ) : (
//               <div className="cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>
//             )}
//           </div>

//           <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
//             {isMenuOpen && (
//               <div
//                 className=" block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//                 onClick={() => setIsMenuOpen(false)}
//               ></div>
//             )}
//             <div
//               className="h-[95vh] overflow-hidden "
//             >
//               <Chat />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chats;

// import React, { useState, useEffect } from "react";
// import Chat from "../components/chat.js";
// import Layout from "../components/layout.js";
// import { IoClose } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbChevronRight } from "react-icons/tb";
// import { TbChevronLeft } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import axios from "axios";
// import { apiurl } from "../config/config.js";
// import { useUser } from "../config/userProvider.js";

// const Chats = () => {
//   const { userData, token } = useUser();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState({ id: "", bot_enable_type: null });
//   const [botTypeOptions, setBotTypeOptions] = useState([]);
//   const [selectedBotType, setSelectedBotType] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [loadingAccounts, setLoadingAccounts] = useState(false);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [searchId, setSearchId] = useState("");

//   // Fetch accounts on mount
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setLoadingAccounts(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/account/accountListbyAdmin?limit=10&page=1`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAccounts(response.data.WhatsappAccount_details);
//         // Set default account if available
//         if (response.data.WhatsappAccount_details.length > 0) {
//           const defaultAccount = response.data.WhatsappAccount_details.find(acc => acc.id === "30002") || response.data.WhatsappAccount_details[0];
//           setSelectedAccount({
//             id: defaultAccount.id,
//             bot_enable_type: defaultAccount.bot_enable_type || null,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//       setLoadingAccounts(false);
//     };
//     fetchAccounts();
//   }, []);

//   // Update bot type options when account is selected
//   useEffect(() => {
//     console.log("Selected account:", selectedAccount); // Debug log
//     setSelectedBotType(null);
//     setCustomers([]);
//     setSelectedCustomer(null);

//     if (selectedAccount?.bot_enable_type && typeof selectedAccount.bot_enable_type === "object" && !Array.isArray(selectedAccount.bot_enable_type)) {
//       const options = Object.entries(selectedAccount.bot_enable_type).map(([label, value]) => ({
//         label,
//         value,
//       }));
//       console.log("Bot type options:", options); // Debug log
//       setBotTypeOptions(options);
//       if (options.length > 0) {
//         setSelectedBotType(options[0].value);
//       }
//     } else {
//       console.log("No valid bot_enable_type:", selectedAccount?.bot_enable_type); // Debug log
//       setBotTypeOptions([]);
//     }
//   }, [selectedAccount]);

//   // Fetch customers when bot type is selected
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!selectedAccount.id || !selectedBotType) {
//         setCustomers([]);
//         return;
//       }
//       setLoadingCustomers(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerListofadmin?limit=10&page=1&account_id=${selectedAccount.id}&bot_type=${selectedBotType}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCustomers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setCustomers([]);
//       }
//       setLoadingCustomers(false);
//     };
//     fetchCustomers();
//   }, [selectedAccount.id, selectedBotType]);

//   return (
//     <Layout>
//       <div className="h-full w-full overflow-hidden bg-zinc-50">
//         {/* Header with Filters */}
//         <div className="flex items-center justify-between bg-primary px-4 py-2 h-[55px] text-sm">
//           <div className="text-white">
//             <p>Select Account & Bot Type -</p>
//           </div>
//           <div className="flex gap-2 text-xs">
//             {/* Account Filter */}
//             <select
//               className=" p-2 rounded-md bg-white text-black"
//               value={selectedAccount.id}
//               onChange={(e) => {
//                 const account = accounts.find((acc) => acc.id === e.target.value);
//                 setSelectedAccount({
//                   id: account.id,
//                   bot_enable_type: account.bot_enable_type || null,
//                 });
//                 setSelectedCustomer(null); // Reset customer selection
//               }}
//             >
//               <option value="" disabled>Select an account</option>
//               {loadingAccounts ? (
//                 <option>Loading...</option>
//               ) : (
//                 accounts.map((account) => (
//                   <option key={account.id} value={account.id}>
//                     {account.name} ({account.PHONE_NUMBER || "N/A"})
//                   </option>
//                 ))
//               )}
//             </select>
//             {/* Bot Type Filter */}
//             <select
//               className=" p-2 rounded-md bg-white text-black"
//               value={selectedBotType || ""}
//               onChange={(e) => setSelectedBotType(e.target.value || null)}
//               disabled={!botTypeOptions.length}
//             >
//               <option value="" disabled>Select bot type</option>
//               {botTypeOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="flex  h-[calc(100%-55px)]">
//           <div
//             className={`sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${isMenuOpen
//               ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
//               : "absolute flex w-[0%] -translate-x-full opacity-0 sm:opacity-100"
//               } md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
//           >
//             <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar">
//               <p className="text-xl text-white text-start w-full mb-2">Chatlist</p>
//               <input
//                 type="text"
//                 placeholder="Search by ID"
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className="w-full px-3 py-1 rounded-md text-sm focus:outline-none text-black"
//               />

//               {/* Customer List */}
//               {/* {loadingCustomers ? (
//                 <p className="text-white">Loading customers...</p>
//               ) : customers.length > 0 ? (
//                 customers.map((customer) => (
//                   <div
//                     key={customer._id}
//                     className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${selectedCustomer === customer._id ? "bg-secondary text-primary" : "text-secondary"
//                       }`}
//                     onClick={() => setSelectedCustomer(customer._id)}
//                   >
//                     <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                       <img
//                         src="defaultprofile.png"
//                         alt="profile"
//                         className="w-full h-full rounded-full object-cover"
//                       />
//                     </div>
//                     <div className="w-full">
//                       <p className="text-sm">
//                         {'*'.repeat(customer._id.length - 4) + customer._id.slice(-4)}
//                       </p>

//                       <p className="text-xs text-slate-400">Click to view chat</p>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-white">No customers available</p>
//               )} */}
//               {loadingCustomers ? (
//                 <p className="text-white">Loading customers...</p>
//               ) : customers.length > 0 ? (
//                 customers
//                   .filter((customer) =>
//                     customer._id.toLowerCase().includes(searchId.toLowerCase())
//                   )
//                   .map((customer) => (
//                     <div
//                       key={customer._id}
//                       className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${selectedCustomer === customer._id
//                           ? "bg-secondary text-primary"
//                           : "text-secondary"
//                         }`}
//                       onClick={() => setSelectedCustomer(customer._id)}
//                     >
//                       <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                         <img
//                           src="defaultprofile.png"
//                           alt="profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="w-full">
//                         <p className="text-sm">
//                           {"*".repeat(customer._id.length - 4) + customer._id.slice(-4)}
//                         </p>
//                         <p className="text-xs text-slate-400">Click to view chat</p>
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <p className="text-white">No customers available</p>
//               )}
//             </div>
//             <div className="bg-primary p-2 md:hidden flex">
//               {isMenuOpen ? (
//                 <div
//                   className="text-2xl text-secondary cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <TbChevronLeft className="text-xl" />
//                 </div>
//               ) : (
//                 <div className="py-2 text-secondary cursor-pointer">
//                   <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="bg-primary p-2 h-full flex items-center justify-center">
//             {isMenuOpen ? (
//               <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div>
//             ) : (
//               <div className=" text-secondary cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>
//             )}
//           </div>
//           <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
//             {isMenuOpen && (
//               <div
//                 className="block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//                 onClick={() => setIsMenuOpen(false)}
//               ></div>
//             )}
//             <div className="h-full">
//               <Chat selectedCustomer={selectedCustomer} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chats;

// import React, { useState, useEffect, useRef } from "react";
// import Chat from "../components/chat.js";
// import Layout from "../components/layout.js";
// import { IoClose } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import axios from "axios";
// import { apiurl } from "../config/config.js";
// import { useUser } from "../config/userProvider.js";
// import DownloadChatPDF from "../components/downloadChatPdf.js";

// const Chats = () => {
//   const { userData, token } = useUser();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState({ id: "", bot_enable_type: null });
//   const [botTypeOptions, setBotTypeOptions] = useState([]);
//   const [selectedBotType, setSelectedBotType] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [loadingAccounts, setLoadingAccounts] = useState(false);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const chatRef = useRef(null);

//   // Fetch accounts on mount
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setLoadingAccounts(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/account/accountListbyAdmin?limit=10&page=1`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAccounts(response.data.WhatsappAccount_details);
//         if (response.data.WhatsappAccount_details.length > 0) {
//           const defaultAccount = response.data.WhatsappAccount_details.find(acc => acc.id === "30002") || response.data.WhatsappAccount_details[0];
//           setSelectedAccount({
//             id: defaultAccount.id,
//             bot_enable_type: defaultAccount.bot_enable_type || null,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//       setLoadingAccounts(false);
//     };
//     fetchAccounts();
//   }, []);

//   // Update bot type options when account is selected
//   useEffect(() => {
//     console.log("Selected account:", selectedAccount);
//     setSelectedBotType(null);
//     setCustomers([]);
//     setSelectedCustomer(null);

//     if (selectedAccount?.bot_enable_type && typeof selectedAccount.bot_enable_type === "object" && !Array.isArray(selectedAccount.bot_enable_type)) {
//       const options = Object.entries(selectedAccount.bot_enable_type)?.map(([label, value]) => ({
//         label,
//         value,
//       }));
//       console.log("Bot type options:",
// options);
//       setBotTypeOptions(options);
//       if (options.length > 0) {
//         setSelectedBotType(options[0].value);
//       }
//     } else {
//       console.log("No valid bot_enable_type:", selectedAccount?.bot_enable_type);
//       setBotTypeOptions([]);
//     }
//   }, [selectedAccount]);

//   // Fetch customers when bot type is selected
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!selectedAccount.id || !selectedBotType) {
//         setCustomers([]);
//         return;
//       }
//       setLoadingCustomers(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerListofadmin?limit=10&page=1&account_id=${selectedAccount.id}&bot_type=${selectedBotType}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCustomers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setCustomers([]);
//       }
//       setLoadingCustomers(false);
//     };
//     fetchCustomers();
//   }, [selectedAccount.id, selectedBotType]);

//   // Fetch complete chat messages when a customer is selected
//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       if (!selectedCustomer) {
//         setChatMessages([]);
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/chat/messages?customer_id=${selectedCustomer}&account_id=${selectedAccount.id}&limit=1000`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setChatMessages(response.data.messages || []);
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//         setChatMessages([
//           { sender: "Customer", text: "Hello, I need help with my order.", timestamp: "2025-05-17 10:00" },
//           { sender: "Bot", text: "Hi! Could you provide your order number?", timestamp: "2025-05-17 10:01" },
//           { sender: "Customer", text: "It's #12345.", timestamp: "2025-05-17 10:02" },
//           { sender: "Bot", text: "Thank you! Let me check the status for you.", timestamp: "2025-05-17 10:03" },
//           { sender: "Bot", text: "Your order is being processed and will ship tomorrow.", timestamp: "2025-05-17 10:04" },
//           { sender: "Customer", text: "Great, thanks for the update!", timestamp: "2025-05-17 10:05" },
//           { sender: "Customer", text: "Can you confirm the shipping address?", timestamp: "2025-05-17 10:06" },
//           { sender: "Bot", text: "The address is 123 Main St, City, Country. Is that correct?", timestamp: "2025-05-17 10:07" },
//         ]);
//       }
//     };
//     fetchChatMessages();
//   }, [selectedCustomer, selectedAccount.id, token]);

//   return (
//     <Layout>
//       <div className="h-full w-full overflow-hidden bg-zinc-50">
//         {/* Header with Filters */}
//         <div className="flex items-center justify-between bg-primary px-4 py-2 h-[55px] text-sm">
//           <div className="text-white">
//             <p>Select Account & Bot Type -</p>
//           </div>
//           <div className="flex gap-2 text-xs items-center">
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedAccount.id}
//               onChange={(e) => {
//                 const account = accounts.find((acc) => acc.id === e.target.value);
//                 setSelectedAccount({
//                   id: account.id,
//                   bot_enable_type: account.bot_enable_type || null,
//                 });
//                 setSelectedCustomer(null);
//               }}
//             >
//               <option value="" disabled>Select an account</option>
//               {loadingAccounts ? (
//                 <option>Loading...</option>
//               ) : (
//                 accounts?.map((account) => (
//                   <option key={account.id} value={account.id}>
//                     {account.name} ({account.PHONE_NUMBER || "N/A"})
//                   </option>
//                 ))
//               )}
//             </select>
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedBotType || ""}
//               onChange={(e) => setSelectedBotType(e.target.value || null)}
//               disabled={!botTypeOptions.length}
//             >
//               <option value="" disabled>Select bot type</option>
//               {botTypeOptions?.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <DownloadChatPDF
//               selectedCustomer={selectedCustomer}
//               chatMessages={chatMessages}
//               selectedAccount={selectedAccount}
//               token={token}
//             />
//           </div>
//         </div>
//         <div className="flex h-[calc(100%-55px)]">
//           <div
//             className={`sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${
//               isMenuOpen
//                 ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
//                 : "absolute flex w-[0%] -translate-x-full opacity-0 sm:opacity-100"
//             } md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
//           >
//             <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar">
//               <p className="text-xl text-white text-start w-full mb-2">Chatlist</p>
//               <input
//                 type="text"
//                 placeholder="Search by ID"
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className="w-full px-3 py-1 rounded-md text-sm focus:outline-none text-black"
//               />
//               {loadingCustomers ? (
//                 <p className="text-white">Loading customers...</p>
//               ) : customers.length > 0 ? (
//                 customers
//                   .filter((customer) =>
//                     customer._id.toLowerCase().includes(searchId.toLowerCase())
//                   )
//                   .map((customer) => (
//                     <div
//                       key={customer._id}
//                       className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${
//                         selectedCustomer === customer._id ? "bg-secondary text-primary" : "text-secondary"
//                       }`}
//                       onClick={() => setSelectedCustomer(customer._id)}
//                     >
//                       <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                         <img
//                           src="defaultprofile.png"
//                           alt="profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="w-full">
//                         <p className="text-sm">
//                           {"*".repeat(customer._id.length - 4) + customer._id.slice(-4)}
//                         </p>
//                         <p className="text-xs text-slate-400">Click to view chat</p>
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <p className="text-white">No customers available</p>
//               )}
//             </div>
//             <div className="bg-primary p-2 md:hidden flex">
//               {isMenuOpen ? (
//                 <div
//                   className="text-2xl text-secondary cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <TbChevronLeft className="text-xl" />
//                 </div>
//               ) : (
//                 <div className="py-2 text-secondary cursor-pointer">
//                   <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="bg-primary p-2 h-full flex items-center justify-center">
//             {isMenuOpen ? (
//               <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div>
//             ) : (
//               <div className="text-secondary cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>
//             )}
//           </div>
//           <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
//             {isMenuOpen && (
//               <div
//                 className="block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//                 onClick={() => setIsMenuOpen(false)}
//               ></div>
//             )}
//             <div className="h-full" ref={chatRef}>
//               <Chat selectedCustomer={selectedCustomer} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chats;

// import React, { useState, useEffect, useRef } from "react";
// import Chat from "../components/chat.js";
// import Layout from "../components/layout.js";
// import { IoClose } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import axios from "axios";
// import { apiurl } from "../config/config.js";
// import { useUser } from "../config/userProvider.js";
// import DownloadChatPDF from "../components/downloadChatPdf.js";

// const Chats = () => {
//   const { userData, token } = useUser();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState({ id: "", bot_enable_type: null });
//   const [botTypeOptions, setBotTypeOptions] = useState([]);
//   const [selectedBotType, setSelectedBotType] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [loadingAccounts, setLoadingAccounts] = useState(false);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const chatRef = useRef(null);

//   // Fetch accounts on mount
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setLoadingAccounts(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/account/accountListbyAdmin?limit=10&page=1`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAccounts(response.data.WhatsappAccount_details);
//         if (response.data.WhatsappAccount_details.length > 0) {
//           const defaultAccount = response.data.WhatsappAccount_details.find(acc => acc.id === "30002") || response.data.WhatsappAccount_details[0];
//           setSelectedAccount({
//             id: defaultAccount.id,
//             bot_enable_type: defaultAccount.bot_enable_type || null,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//       setLoadingAccounts(false);
//     };
//     fetchAccounts();
//   }, []);

//   // Update bot type options when account is selected
//   useEffect(() => {
//     console.log("Selected account:", selectedAccount);
//     setSelectedBotType(null);
//     setCustomers([]);
//     setSelectedCustomer(null);

//     if (selectedAccount?.bot_enable_type && typeof selectedAccount.bot_enable_type === "object" && !Array.isArray(selectedAccount.bot_enable_type)) {
//       const options = Object.entries(selectedAccount.bot_enable_type)?.map(([label, value]) => ({
//         label,
//         value,
//       }));
//       console.log("Bot type options:", options);
//       setBotTypeOptions(options);
//       if (options.length > 0) {
//         setSelectedBotType(options[0].value);
//       }
//     } else {
//       console.log("No valid bot_enable_type:", selectedAccount?.bot_enable_type);
//       setBotTypeOptions([]);
//     }
//   }, [selectedAccount]);

//   // Fetch customers when bot type is selected
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!selectedAccount.id || !selectedBotType) {
//         setCustomers([]);
//         return;
//       }
//       setLoadingCustomers(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerListofadmin?limit=10&page=1&account_id=${selectedAccount.id}&bot_type=${selectedBotType}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setCustomers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setCustomers([]);
//       }
//       setLoadingCustomers(false);
//     };
//     fetchCustomers();
//   }, [selectedAccount.id, selectedBotType]);

//   // Fetch complete chat messages when a customer is selected
//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       if (!selectedCustomer) {
//         setChatMessages([]);
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/chat/messages?customer_id=${selectedCustomer}&account_id=${selectedAccount.id}&limit=1000`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setChatMessages(response.data.messages || []);
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//         setChatMessages([
//           { sender: "Customer", text: "Hello, I need help with my order.", timestamp: "2025-05-17 10:00" },
//           { sender: "Bot", text: "Hi! Could you provide your order number?", timestamp: "2025-05-17 10:01" },
//           { sender: "Customer", text: "It's #12345.", timestamp: "2025-05-17 10:02" },
//           { sender: "Bot", text: "Thank you! Let me check the status for you.", timestamp: "2025-05-17 10:03" },
//           { sender: "Bot", text: "Your order is being processed and will ship tomorrow.", timestamp: "2025-05-17 10:04" },
//           { sender: "Customer", text: "Great, thanks for the update!", timestamp: "2025-05-17 10:05" },
//           { sender: "Customer", text: "Can you confirm the shipping address?", timestamp: "2025-05-17 10:06" },
//           { sender: "Bot", text: "The address is 123 Main St, City, Country. Is that correct?", timestamp: "2025-05-17 10:07" },
//         ]);
//       }
//     };
//     fetchChatMessages();
//   }, [selectedCustomer, selectedAccount.id, token]);

//   return (
//     <Layout>
//       <div className="h-full w-full overflow-hidden bg-zinc-50">
//         {/* Header with Filters */}
//         <div className="flex items-center justify-between bg-primary px-4 py-2 h-[55px] text-sm">
//           <div className="text-white">
//             <p>Select Account & Bot Type -</p>
//           </div>
//           <div className="flex gap-2 text-xs items-center">
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedAccount.id}
//               onChange={(e) => {
//                 const account = accounts.find((acc) => acc.id === e.target.value);
//                 setSelectedAccount({
//                   id: account.id,
//                   bot_enable_type: account.bot_enable_type || null,
//                 });
//                 setSelectedCustomer(null);
//               }}
//             >
//               <option value="" disabled>Select an account</option>
//               {loadingAccounts ? (
//                 <option>Loading...</option>
//               ) : (
//                 accounts?.map((account) => (
//                   <option key={account.id} value={account.id}>
//                     {account.name} ({account.PHONE_NUMBER || "N/A"})
//                   </option>
//                 ))
//               )}
//             </select>
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedBotType || ""}
//               onChange={(e) => setSelectedBotType(e.target.value || null)}
//               disabled={!botTypeOptions.length}
//             >
//               <option value="" disabled>Select bot type</option>
//               {botTypeOptions?.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <DownloadChatPDF
//               selectedCustomer={selectedCustomer}
//               chatMessages={chatMessages}
//               selectedAccount={selectedAccount}
//               token={token}
//             />
//           </div>
//         </div>
//         <div className="flex h-[calc(100%-55px)]">
//           <div
//             className={`sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${
//               isMenuOpen
//                 ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
//                 : "absolute flex w-[0%] -translate-x-full opacity-0 sm:opacity-100"
//             } md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
//           >
//             <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar">
//               <p className="text-xl text-white text-start w-full mb-2">Chatlist</p>
//               <input
//                 type="text"
//                 placeholder="Search by ID"
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className="w-full px-3 py-1 rounded-md text-sm focus:outline-none text-black"
//               />
//               {loadingCustomers ? (
//                 <p className="text-white">Loading customers...</p>
//               ) : customers.length > 0 ? (
//                 customers
//                   .filter((customer) =>
//                     customer._id.toLowerCase().includes(searchId.toLowerCase())
//                   )
//                   .map((customer) => (
//                     <div
//                       key={customer._id}
//                       className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${
//                         selectedCustomer === customer._id ? "bg-secondary text-primary" : "text-secondary"
//                       }`}
//                       onClick={() => setSelectedCustomer(customer._id)}
//                     >
//                       <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                         <img
//                           src="defaultprofile.png"
//                           alt="profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="w-full">
//                         <p className="text-sm">
//                           {customer._id}
//                           {/* Optionally mask ID in UI: {"*".repeat(customer._id.length - 4) + customer._id.slice(-4)} */}
//                         </p>
//                         <p className="text-xs text-slate-400">Click to view chat</p>
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <p className="text-white">No customers available</p>
//               )}
//             </div>
//             <div className="bg-primary p-2 md:hidden flex">
//               {isMenuOpen ? (
//                 <div
//                   className="text-2xl text-secondary cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <TbChevronLeft className="text-xl" />
//                 </div>
//               ) : (
//                 <div className="py-2 text-secondary cursor-pointer">
//                   <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="bg-primary p-2 h-full flex items-center justify-center">
//             {isMenuOpen ? (
//               <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div>
//             ) : (
//               <div className="text-secondary cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>
//             )}
//           </div>
//           <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
//             {isMenuOpen && (
//               <div
//                 className="block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//                 onClick={() => setIsMenuOpen(false)}
//               ></div>
//             )}
//             <div className="h-full" ref={chatRef}>
//               <Chat selectedCustomer={selectedCustomer} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chats;

// import React, { useState, useEffect, useRef } from "react";
// import Chat from "../components/chat.js";
// import Layout from "../components/layout.js";
// import { IoClose } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
// import { CgProfile } from "react-icons/cg";
// import axios from "axios";
// import { apiurl } from "../config/config.js";
// import { useUser } from "../config/userProvider.js";
// import DownloadChatPDF from "../components/downloadChatPdf.js";

// const Chats = () => {
//   const { userData, token } = useUser();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [accounts, setAccounts] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState({ id: "", bot_enable_type: null });
//   const [botTypeOptions, setBotTypeOptions] = useState([]);
//   const [selectedBotType, setSelectedBotType] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [loadingAccounts, setLoadingAccounts] = useState(false);
//   const [loadingCustomers, setLoadingCustomers] = useState(false);
//   const [searchId, setSearchId] = useState("");
//   const [chatMessages, setChatMessages] = useState([]);
//   const chatRef = useRef(null);

//   // Fetch accounts on mount
//   useEffect(() => {
//     const fetchAccounts = async () => {
//       setLoadingAccounts(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/account/accountListbyAdmin?limit=10&page=1`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setAccounts(response.data.WhatsappAccount_details);
//         if (response.data.WhatsappAccount_details.length > 0) {
//           const defaultAccount = response.data.WhatsappAccount_details.find(acc => acc.id === "30002") || response.data.WhatsappAccount_details[0];
//           setSelectedAccount({
//             id: defaultAccount.id,
//             bot_enable_type: defaultAccount.bot_enable_type || null,
//             PHONE_NUMBER: defaultAccount.PHONE_NUMBER || "N/A",
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching accounts:", error);
//       }
//       setLoadingAccounts(false);
//     };
//     fetchAccounts();
//   }, []);

//   // Update bot type options when account is selected
//   useEffect(() => {
//     console.log("Selected account:", selectedAccount);
//     setSelectedBotType(null);
//     setCustomers([]);
//     setSelectedCustomer(null);

//     if (selectedAccount?.bot_enable_type && typeof selectedAccount.bot_enable_type === "object" && !Array.isArray(selectedAccount.bot_enable_type)) {
//       const options = Object.entries(selectedAccount.bot_enable_type)?.map(([label, value]) => ({
//         label,
//         value,
//       }));
//       console.log("Bot type options:", options);
//       setBotTypeOptions(options);
//       if (options.length > 0) {
//         setSelectedBotType(options[0].value);
//       }
//     } else {
//       console.log("No valid bot_enable_type:", selectedAccount?.bot_enable_type);
//       setBotTypeOptions([]);
//     }
//   }, [selectedAccount]);

//   // Fetch customers when bot type is selected
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       if (!selectedAccount.id || !selectedBotType) {
//         setCustomers([]);
//         return;
//       }
//       setLoadingCustomers(true);
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/user/getCustomerListofadmin?limit=10&page=1&account_id=${selectedAccount.id}&bot_type=${selectedBotType}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         // Ensure customers include account_id
//         setCustomers(response.data.data);
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//         setCustomers([]);
//       }
//       setLoadingCustomers(false);
//     };
//     fetchCustomers();
//   }, [selectedAccount.id, selectedBotType]);

//   // Fetch complete chat messages when a customer is selected
//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       if (!selectedCustomer || !selectedAccount.id) {
//         setChatMessages([]);
//         return;
//       }
//       try {
//         const response = await axios.get(
//           `${apiurl}/api/whatsapp/chat/messages?customer_id=${selectedCustomer}&account_id=${selectedAccount.id}&limit=1000`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setChatMessages(response.data.messages || []);
//       } catch (error) {
//         console.error("Error fetching chat messages:", error);
//         setChatMessages([
//           { sender: "Customer", text: "Hello, I need help with my order.", timestamp: "2025-05-17 10:00" },
//           { sender: "Bot", text: "Hi! Could you provide your order number?", timestamp: "2025-05-17 10:01" },
//           { sender: "Customer", text: "It's #12345.", timestamp: "2025-05-17 10:02" },
//           { sender: "Bot", text: "Thank you! Let me check the status for you.", timestamp: "2025-05-17 10:03" },
//           { sender: "Bot", text: "Your order is being processed and will ship tomorrow.", timestamp: "2025-05-17 10:04" },
//           { sender: "Customer", text: "Great, thanks for the update!", timestamp: "2025-05-17 10:05" },
//           { sender: "Customer", text: "Can you confirm the shipping address?", timestamp: "2025-05-17 10:06" },
//           { sender: "Bot", text: "The address is 123 Main St, City, Country. Is that correct?", timestamp: "2025-05-17 10:07" },
//         ]);
//       }
//     };
//     fetchChatMessages();
//   }, [selectedCustomer, selectedAccount.id, token]);

//   // Handle customer selection and update selectedAccount
//   const handleCustomerSelect = (customer) => {
//     setSelectedCustomer(customer._id);
//     // Find the account associated with the customer's account_id
//     const customerAccount = accounts.find(acc => acc.id === customer.account_id);
//     if (customerAccount) {
//       setSelectedAccount({
//         id: customerAccount.id,
//         bot_enable_type: customerAccount.bot_enable_type || null,
//         PHONE_NUMBER: customerAccount.PHONE_NUMBER || "N/A",
//       });
//     } else {
//       console.warn("No matching account found for customer account_id:", customer.account_id);
//       // Keep current selectedAccount as fallback
//     }
//   };

//   return (
//     <Layout>
//       <div className="h-full w-full overflow-hidden bg-zinc-50">
//         {/* Header with Filters */}
//         <div className="flex items-center justify-between bg-primary px-4 py-2 h-[55px] text-sm">
//           <div className="text-white">
//             <p>Select Account & Bot Type -</p>
//           </div>
//           <div className="flex gap-2 text-xs items-center">
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedAccount.id}
//               onChange={(e) => {
//                 const account = accounts.find((acc) => acc.id === e.target.value);
//                 setSelectedAccount({
//                   id: account.id,
//                   bot_enable_type: account.bot_enable_type || null,
//                   PHONE_NUMBER: account.PHONE_NUMBER || "N/A",
//                 });
//                 setSelectedCustomer(null);
//               }}
//             >
//               <option value="" disabled>Select an account</option>
//               {loadingAccounts ? (
//                 <option>Loading...</option>
//               ) : (
//                 accounts?.map((account) => (
//                   <option key={account.id} value={account.id}>
//                     {account.name} ({account.PHONE_NUMBER || "N/A"})
//                   </option>
//                 ))
//               )}
//             </select>
//             <select
//               className="p-2 rounded-md bg-white text-black"
//               value={selectedBotType || ""}
//               onChange={(e) => setSelectedBotType(e.target.value || null)}
//               disabled={!botTypeOptions.length}
//             >
//               <option value="" disabled>Select bot type</option>
//               {botTypeOptions?.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//             <DownloadChatPDF
//               selectedCustomer={selectedCustomer}
//               chatMessages={chatMessages}
//               selectedAccount={selectedAccount}
//               token={token}
//             />
//           </div>
//         </div>
//         <div className="flex h-[calc(100%-55px)]">
//           <div
//             className={`sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${
//               isMenuOpen
//                 ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
//                 : "absolute flex w-[0%] -translate-x-full opacity-0 sm:opacity-100"
//             } md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
//           >
//             <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar">
//               <p className="text-xl text-white text-start w-full mb-2">Chatlist</p>
//               <input
//                 type="text"
//                 placeholder="Search by ID"
//                 value={searchId}
//                 onChange={(e) => setSearchId(e.target.value)}
//                 className="w-full px-3 py-1 rounded-md text-sm focus:outline-none text-black"
//               />
//               {loadingCustomers ? (
//                 <p className="text-white">Loading customers...</p>
//               ) : customers.length > 0 ? (
//                 customers
//                   .filter((customer) =>
//                     customer._id.toLowerCase().includes(searchId.toLowerCase())
//                   )
//                   .map((customer) => (
//                     <div
//                       key={customer._id}
//                       className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${
//                         selectedCustomer === customer._id ? "bg-secondary text-primary" : "text-secondary"
//                       }`}
//                       onClick={() => handleCustomerSelect(customer)}
//                     >
//                       <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
//                         <img
//                           src="defaultprofile.png"
//                           alt="profile"
//                           className="w-full h-full rounded-full object-cover"
//                         />
//                       </div>
//                       <div className="w-full">
//                         <p className="text-sm">{customer._id}</p>
//                         <p className="text-xs text-slate-400">Click to view chat</p>
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <p className="text-white">No customers available</p>
//               )}
//             </div>
//             <div className="bg-primary p-2 md:hidden flex">
//               {isMenuOpen ? (
//                 <div
//                   className="text-2xl text-secondary cursor-pointer"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <TbChevronLeft className="text-xl" />
//                 </div>
//               ) : (
//                 <div className="py-2 text-secondary cursor-pointer">
//                   <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="bg-primary p-2 h-full flex items-center justify-center">
//             {isMenuOpen ? (
//               <div
//                 className="text-2xl text-secondary cursor-pointer"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <TbChevronLeft className="text-xl" />
//               </div>
//             ) : (
//               <div className="text-secondary cursor-pointer">
//                 <TbChevronRight onClick={() => setIsMenuOpen(true)} className="text-xl" />
//               </div>
//             )}
//           </div>
//           <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
//             {isMenuOpen && (
//               <div
//                 className="block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//                 onClick={() => setIsMenuOpen(false)}
//               ></div>
//             )}
//             <div className="h-full" ref={chatRef}>
//               <Chat selectedCustomer={selectedCustomer} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Chats;

import React, { useState, useEffect, useRef } from "react";
import Chat from "../components/chat.js";
import Layout from "../components/layout.js";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { apiurl } from "../config/config.js";
import { useUser } from "../config/userProvider.js";

const Chats = () => {
  const { userData, token } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({
    account_id: "",
    id: "",
    bot_enable_type: null,
  });
  const [botTypeOptions, setBotTypeOptions] = useState([]);
  const [selectedBotType, setSelectedBotType] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState(null);
  const [loadingAccounts, setLoadingAccounts] = useState(false);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const chatRef = useRef(null);

  // Fetch accounts on mount
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoadingAccounts(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/account/accountListbyAdmin?limit=10&page=1`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setAccounts(response.data.WhatsappAccount_details);
        if (response.data.WhatsappAccount_details.length > 0) {
          const defaultAccount =
            response.data.WhatsappAccount_details.find(
              (acc) => acc.id === "30002",
            ) || response.data.WhatsappAccount_details[0];
          setSelectedAccount({
            account_id: defaultAccount._id,
            id: defaultAccount.id,
            bot_enable_type: defaultAccount.bot_enable_type || null,
            PHONE_NUMBER: defaultAccount.PHONE_NUMBER || "N/A",
            inficonnect_api_key: defaultAccount.inficonnect_api_key || null,
          });
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
      setLoadingAccounts(false);
    };
    fetchAccounts();
  }, []);

  // Update bot type options when account is selected
  useEffect(() => {
    console.log("Selected account:", selectedAccount);
    setSelectedBotType(null);
    setCustomers([]);
    setSelectedCustomer(null);
    setSelectedCustomerName(null);

    if (
      selectedAccount?.bot_enable_type &&
      typeof selectedAccount.bot_enable_type === "object" &&
      !Array.isArray(selectedAccount.bot_enable_type)
    ) {
      const options = Object.entries(selectedAccount.bot_enable_type)?.map(
        ([label, value]) => ({
          label,
          value,
        }),
      );
      console.log("Bot type options:", options);
      setBotTypeOptions(options);
      if (options.length > 0) {
        setSelectedBotType(options[0].value);
      }
    } else {
      console.log(
        "No valid bot_enable_type:",
        selectedAccount?.bot_enable_type,
      );
      setBotTypeOptions([]);
    }
  }, [selectedAccount]);

  // Fetch customers when bot type is selected
  useEffect(() => {
    const fetchCustomers = async () => {
      if (!selectedAccount.id || !selectedBotType) {
        setCustomers([]);
        return;
      }
      setLoadingCustomers(true);
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/user/getCustomerListofadmin?limit=10&page=1&account_id=${selectedAccount.id}&bot_type=${selectedBotType}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // Ensure customers include account_id
        setCustomers(response.data.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setCustomers([]);
      }
      setLoadingCustomers(false);
    };
    fetchCustomers();
  }, [selectedAccount.id, selectedBotType]);

  // Fetch complete chat messages when a customer is selected
  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!selectedCustomer || !selectedAccount.id) {
        setChatMessages([]);
        return;
      }
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/chat/messages?customer_id=${selectedCustomer}&account_id=${selectedAccount.id}&limit=1000`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setChatMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
        setChatMessages([
          {
            sender: "Customer",
            text: "Hello, I need help with my order.",
            timestamp: "2025-05-17 10:00",
          },
          {
            sender: "Bot",
            text: "Hi! Could you provide your order number?",
            timestamp: "2025-05-17 10:01",
          },
          {
            sender: "Customer",
            text: "It's #12345.",
            timestamp: "2025-05-17 10:02",
          },
          {
            sender: "Bot",
            text: "Thank you! Let me check the status for you.",
            timestamp: "2025-05-17 10:03",
          },
          {
            sender: "Bot",
            text: "Your order is being processed and will ship tomorrow.",
            timestamp: "2025-05-17 10:04",
          },
          {
            sender: "Customer",
            text: "Great, thanks for the update!",
            timestamp: "2025-05-17 10:05",
          },
          {
            sender: "Customer",
            text: "Can you confirm the shipping address?",
            timestamp: "2025-05-17 10:06",
          },
          {
            sender: "Bot",
            text: "The address is 123 Main St, City, Country. Is that correct?",
            timestamp: "2025-05-17 10:07",
          },
        ]);
      }
    };
    fetchChatMessages();
  }, [selectedCustomer, selectedAccount.id, token]);

  // Handle customer selection and update selectedAccount
  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer._id);
    setSelectedCustomerName(customer?.user_name)
    // Find the account associated with the customer's account_id
    const customerAccount = accounts.find(
      (acc) => acc.id === customer.account_id,
    );
    if (customerAccount) {
      setSelectedAccount({
        account_id: customerAccount._id,
        id: customerAccount.id,
        bot_enable_type: customerAccount.bot_enable_type || null,
        PHONE_NUMBER: customerAccount.PHONE_NUMBER || "N/A",
        inficonnect_api_key: customerAccount.inficonnect_api_key || null,
      });
    } else {
      console.warn(
        "No matching account found for customer account_id:",
        customer.account_id,
      );
      // Keep current selectedAccount as fallback
    }
  };

  return (
    <Layout>
      <div className="h-full w-full overflow-hidden bg-zinc-50">
        {/* Header with Filters */}
        <div className="flex items-center justify-between bg-primary px-4 py-2 h-[55px] text-sm">
          <div className="text-white">
            <p>Select Account & Bot Type -</p>
          </div>
          <div className="flex gap-2 text-xs items-center">
            <select
              className="p-2 rounded-md bg-white text-black"
              value={selectedAccount.id}
              onChange={(e) => {
                const account = accounts.find(
                  (acc) => acc.id === e.target.value,
                );
                setSelectedAccount({
                  account_id: account._id,
                  id: account.id,
                  bot_enable_type: account.bot_enable_type || null,
                  PHONE_NUMBER: account.PHONE_NUMBER || "N/A",
                  inficonnect_api_key: account.inficonnect_api_key || null,
                });
                setSelectedCustomer(null);
                setSelectedCustomerName(null);
              }}
            >
              <option value="" disabled>
                Select an account
              </option>
              {loadingAccounts ? (
                <option>Loading...</option>
              ) : (
                accounts?.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.PHONE_NUMBER || "N/A"})
                  </option>
                ))
              )}
            </select>
            <select
              className="p-2 rounded-md bg-white text-black"
              value={selectedBotType || ""}
              onChange={(e) => setSelectedBotType(e.target.value || null)}
              disabled={!botTypeOptions.length}
            >
              <option value="" disabled>
                Select bot type
              </option>
              {botTypeOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex h-[calc(100%-55px)]">
          <div
            className={`sm:relative transition-all duration-500 ease-in-out sm:translate-x-0 z-20 pb-8 overflow-hidden ${
              isMenuOpen
                ? "absolute flex w-[75%] md:w-[45%] lg:w-[25%] z-40 opacity-100 translate-x-0 px-3"
                : "absolute flex w-[0%] -translate-x-full opacity-0 sm:opacity-100"
            } md:flex flex-row md:relative gap-4 items-center h-full pt-2 shadow-sm bg-primary`}
          >
            <div className="flex flex-col gap-2 items-center w-full h-full overflow-y-scroll hide-scrollbar">
              <p className="text-xl text-white text-start w-full mb-2">
                Chatlist
              </p>
              <input
                type="text"
                placeholder="Search by ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-3 py-1 rounded-md text-sm focus:outline-none text-black"
              />
              {loadingCustomers ? (
                <p className="text-white">Loading customers...</p>
              ) : customers.length > 0 ? (
                customers
                  .filter((customer) =>
                    customer._id.toLowerCase().includes(searchId.toLowerCase()),
                  )
                  .map((customer) => (
                    <div
                      key={customer._id}
                      className={`px-4 flex items-center py-1 border border-white rounded-md w-full text-start cursor-pointer ${
                        selectedCustomer === customer._id
                          ? "bg-secondary text-primary"
                          : "text-secondary"
                      }`}
                      onClick={() => handleCustomerSelect(customer)}
                    >
                      <div className="rounded-full w-6 h-6 border border-white mr-4 flex justify-center items-center flex-shrink-0">
                        <img
                          src="defaultprofile.png"
                          alt="profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="w-full">
                        {/* <p className="text-sm">{customer._id}</p> */}
                        <p className="text-sm">
                          {customer?.user_name}
                          {/* {"*".repeat(customer._id.length - 4) +
                            customer._id.slice(-4)} */}
                        </p>
                        <p className="text-xs text-slate-400">
                          {/* Click to view chat */}
                            {customer._id}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-white">No customers available</p>
              )}
            </div>
            <div className="bg-primary p-2 md:hidden flex">
              {isMenuOpen ? (
                <div
                  className="text-2xl text-secondary cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TbChevronLeft className="text-xl" />
                </div>
              ) : (
                <div className="py-2 text-secondary cursor-pointer">
                  <TbChevronRight
                    onClick={() => setIsMenuOpen(true)}
                    className="text-xl"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="bg-primary p-2 h-full flex items-center justify-center">
            {isMenuOpen ? (
              <div
                className="text-2xl text-secondary cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                <TbChevronLeft className="text-xl" />
              </div>
            ) : (
              <div className="text-secondary cursor-pointer">
                <TbChevronRight
                  onClick={() => setIsMenuOpen(true)}
                  className="text-xl"
                />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col overflow-hidden h-full border border-primary">
            {isMenuOpen && (
              <div
                className="block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
                onClick={() => setIsMenuOpen(false)}
              ></div>
            )}
            <div className="h-full" ref={chatRef}>
              <Chat
                selectedCustomerName= {selectedCustomerName}
                selectedCustomer={selectedCustomer}
                selectedAccount={selectedAccount}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Chats;
