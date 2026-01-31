// import React, { useEffect, useState } from 'react'
// import Layout, { Container } from '../components/layout'
// import { useParams } from 'react-router-dom';
// import { apiurl } from '../config/config';
// import axios from 'axios';
// import BackHeader from '../components/backHeader';
// import { RiCustomerServiceFill } from "react-icons/ri";
// import { InfiLoader } from '../components/loader';

// const TicketManage = () => {

//   const [ticketDetails, setTicketDetails] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { ticketId } = useParams(); // Extract the ID from the URL
//   const {
//     ticketID,
//     user,
//     email,
//     description,
//     store,
//     vendor,
//     subject,
//     category,
//     subcategory,
//     status,
//     priority,
//     createdAt,
//   } = ticketDetails;
//   console.log("ticketId", ticketId)
//   console.log("ticketDetails", ticketDetails)


//   const fetchTicketDetails = async () => {
//     setLoading(true);

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: `${apiurl}/api/ticket/get/assignee`,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       data: { userObjId: ticketId },
//     };

//     axios
//       .request(config)
//       .then((response) => {
//         console.log("Customer Data:", response.data.data);
//         setTicketDetails({
//           user: response?.data?.data[0]?.firstname + response?.data?.data[0]?.lastname || "",
//           ticketID: response?.data?.data[0]?.id || "",
//           email: response?.data?.data[0]?.email || "",
//           description: response?.data?.data[0]?.description || "",
//           store: response?.data?.data[0]?.store || "",
//           vendor: response?.data?.data[0]?.vendor || "",
//           subject: response?.data?.data[0]?.subject || "",
//           category: response?.data?.data[0]?.category || "",
//           subcategory: response?.data?.data[0]?.subcategory || "",
//           status: response?.data?.data[0]?.status || "",
//           priority: response?.data?.data[0]?.priority || "",
//           createdAt: response?.data?.data[0]?.createdAt || "",
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     fetchTicketDetails();

//   }, []);


//   return (
//     <Layout>
//       {loading === true ?
//         <InfiLoader maintext="Fetching Ticket Data..." />
//         :
//         <div className="px-4 py-4 h-full w-full bg-[#fffdfc]">
//           <div className='h-[10%]'>
//             <BackHeader title="Manage Ticket" backButton={true} link="/tickets" rightSide={<div>
//               <button className="px-4 py-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">Save</button>
//             </div>} />
//           </div>
//           <div className="flex flex-col overflow-scroll hide-scrollbar h-[90%] gap-5 px-4">
//             <div className="grid grid-cols-2 gap-2 gap-x-0.5 p-4  sm:p-0 sm:grid-cols-2 lg:grid-cols-3 xl:gap-2">
//               <div className="flex flex-col items-start max-w-4xl ">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   User
//                 </h4>
//                 <p className="px-2 py-0 text-sm text-secondary font-medium">
//                   {user}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Email
//                 </h4>
//                 <p className="px-2 py-0 text-sm text-secondary font-medium">
//                   {email}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Status
//                 </h4>
//                 <p className={`px-3 py-1 rounded-sm text-xs font-medium ${status === "Pending"
//                   ? "text-red-500 bg-red-100"
//                   : "text-green-500 bg-green-100"
//                   }`}>
//                   {status}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Priority
//                 </h4>
//                 <p className={`px-3 py-1 rounded-sm text-xs font-medium ${priority === "High"
//                   ? "text-red-500 bg-red-100"
//                   : priority === "Medium"
//                     ? "text-yellow-500 bg-yellow-100"
//                     : "text-green-500 bg-green-100"
//                   }`}>
//                   {priority}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Subject
//                 </h4>
//                 <p className="px-2 py-0 text-sm text-secondary font-medium">
//                   {subject}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Created At
//                 </h4>
//                 <p className="px-2 py-0 text-sm text-secondary font-medium">
//                   {new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}
//                 </p>
//               </div>
//               <div className="flex flex-col items-start max-w-4xl ">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
//                   Ticket ID
//                 </h4>
//                 <p className="px-2 py-0 text-sm text-secondary font-medium">
//                   1234515
//                 </p>
//               </div>
//             </div>
//             <div className="border rounded-sm bg-[white] px-4 py-4 border-primary">
//               <p className="py-2 px-2 text-secondary font-medium text-start">
//                 Ticket Issue
//               </p>
//               <p className="py-1 px-2 text-secondary text-sm text-start">
//                 {description}
//               </p>
//               <img
//                 class="flex justify-start ml-2 px-2 py-2 mt-6 w-20 h-auto border-gray border"
//                 src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"
//                 alt="..."
//               ></img>
//             </div>
//             <div className="flex flex-wrap items-center gap-2 px-4 py-4 border border-primary">
//               <p className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">
//                 Choose an assignee and set status to “In Progress” to add
//                 response.
//               </p>
//               <p className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">
//                 This ticket has been solved.
//               </p>
//               <p className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">
//                 This ticket is deferred.
//               </p>
//               <p className="px-4 py-3 bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">
//                 Add Response
//               </p>
//             </div>
//             <div className="px-2 bg-white">
//               <p className="px-4 py-8 text-xl text-secondary font-medium text-start">
//                 Assignee
//               </p>
//               <div className="mt-5 flex items-center justify-start pb-2">
//                 <div className="ml-2 p-2 rounded-sm bg-primary text-secondary text-lg">
//                   <RiCustomerServiceFill />

//                 </div>

//                 <p className=" ml-4 text-sm text-secondary font-medium">
//                   Brent Rodriguez
//                 </p>
//               </div>

//               <div className="mt-5 py-3">
//                 <p className="px-3 py-2 border rounded-sm text-secondary font-normal  text-sm">
//                   Choose Assignee
//                 </p>
//               </div>

//               <div className="mt-5 py-3">
//                 <h4 className="px-3 py-2 text-lg font-medium text-secondary text-start">
//                   Status
//                 </h4>
//                 <p className="px-3 py-2 border rounded-sm text-secondary font-normal text-sm">
//                   Select status
//                 </p>
//               </div>

//               <div className="mt-5 py-3">
//                 <h4 className="px-3 py-2 text-lg font-medium text-secondary text-start">
//                   Priority
//                 </h4>
//                 <p className="px-3 py-2 border rounded-sm text-secondary font-normal  text-sm">
//                   Select Priority
//                 </p>
//               </div>
//             </div>
//             <div className="border rounded-sm border border-primary px-4 py-4">
//               <div className="flex px-0 py-0 pb-4 items-center justify-between">
//                 <div className='flex gap-5 items-center'>
//                   <div className="ml-2 p-2 rounded-sm bg-primary text-secondary text-lg">
//                     <RiCustomerServiceFill />
//                   </div>
//                   <p className="text-sm text-secondary font-medium px-2">
//                     Deanna Jones
//                   </p>
//                 </div>

//                 <p className="px-2 py-2 text-end text-secondary text-sm">
//                   20.00
//                 </p>
//               </div>
//               <p className="py-1 px-2 text-secondary text-sm text-start">
//                 Have you tried turning your phone off and on again?
//               </p>
//               <img
//                 class="bg-gray-200 flex justify-start ml-2 px-2 py-2 mt-6 w-20 h-auto border-gray border"
//                 src="https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image-768x576.png"
//                 alt="..."
//               ></img>
//             </div>
//           </div>
//         </div>
//       }
//     </Layout>
//   )
// }

// export default TicketManage













// import React, { useEffect, useState } from 'react';
// import Layout from '../components/layout';
// import { useParams } from 'react-router-dom';
// import { apiurl } from '../config/config';
// import axios from 'axios';
// import BackHeader from '../components/backHeader';
// import { RiCustomerServiceFill } from "react-icons/ri";
// import { InfiLoader } from '../components/loader';

// const TicketManage = () => {
//   const [ticketDetails, setTicketDetails] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { ticketId } = useParams(); // Extract ticket ID from URL
// console.log("ticketDetails",ticketDetails)
//   useEffect(() => {
//     fetchTicketDetails();
//   }, []);

//   const fetchTicketDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(`${apiurl}/api/ticket/get/assignee`, { userObjId: ticketId });
//       const data = response.data?.data?.[0] || {};
//       setTicketDetails({
//         user: `${data.firstname || ''} ${data.lastname || ''}`.trim() || 'N/A',
//         ticketID: data.id || 'N/A',
//         email: data.email || 'N/A',
//         description: data.description || 'N/A',
//         store: data.store || 'N/A',
//         vendor: data.vendor || 'N/A',
//         subject: data.subject || 'N/A',
//         category: data.category || 'N/A',
//         subcategory: data.subcategory || 'N/A',
//         status: data.status || 'N/A',
//         priority: data.priority || 'N/A',
//         createdAt: data.createdAt || 'N/A',
//       });
//     } catch (error) {
//       console.error("Error fetching ticket details:", error);
//     }
//     setLoading(false);
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     setTicketDetails({ ...ticketDetails, [e.target.name]: e.target.value });
//   };

//   // Save updated data to API
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       await axios.post(`${apiurl}/api/ticket/update`, ticketDetails);
//       alert("Ticket details updated successfully!");
//     } catch (error) {
//       console.error("Error updating ticket:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Layout>
//       {loading ? (
//         <InfiLoader maintext="Fetching Ticket Data..." />
//       ) : (
//         <div className="px-4 py-4 h-full w-full bg-[#fffdfc]">
//           <div className="h-[10%]">
//             <BackHeader
//               title="Manage Ticket"
//               backButton={true}
//               link="/tickets"
//               rightSide={
//                 <button 
//                   className="px-4 py-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium rounded-sm"
//                   onClick={handleSave}
//                 >
//                   Save
//                 </button>
//               }
//             />
//           </div>
//           <div className="h-[90%] overflow-scroll hide-scrollbar flex flex-col gap-5">
//           {/* Editable Ticket Details */}
//           <div className="grid grid-cols-2 gap-2 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-2">
//             {[
//               { label: "User", name: "user" },
//               { label: "Email", name: "email" },
//               { label: "Subject", name: "subject" },
//               { label: "Category", name: "category" },
//               { label: "Subcategory", name: "subcategory" },
//               { label: "Store", name: "store" },
//               { label: "Vendor", name: "vendor" }
//             ].map(({ label, name }) => (
//               <div key={name} className="flex flex-col items-start max-w-4xl">
//                 <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">{label}</h4>
//                 <input
//                   type="text"
//                   name={name}
//                   value={ticketDetails[name]}
//                   onChange={handleChange}
//                   className="px-2 py-1 text-sm text-secondary font-medium border border-gray-300 rounded-sm w-full outline-none"
//                 />
//               </div>
//             ))}

//             {/* Status and Priority (Dropdown) */}
//             <div className="flex flex-col items-start max-w-4xl">
//               <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Status</h4>
//               <select
//                 name="status"
//                 value={ticketDetails.status}
//                 onChange={handleChange}
//                 className="px-3 py-1 rounded-sm text-xs font-medium border border-gray-300 w-full outline-none"
//               >
//                 <option value="Pending">Pending</option>
//                 <option value="In Progress">In Progress</option>
//                 <option value="Resolved">Resolved</option>
//               </select>
//             </div>

//             <div className="flex flex-col items-start max-w-4xl">
//               <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Priority</h4>
//               <select
//                 name="priority"
//                 value={ticketDetails.priority}
//                 onChange={handleChange}
//                 className="px-3 py-1 rounded-sm text-xs font-medium border border-gray-300 w-full outline-none"
//               >
//                 <option value="Low">Low</option>
//                 <option value="Medium">Medium</option>
//                 <option value="High">High</option>
//               </select>
//             </div>
//           </div>

//           {/* Description */}
//           <div className="border rounded-sm bg-white px-4 py-4 border-primary">
//             <p className="py-2 px-2 text-secondary font-medium text-start">Ticket Issue</p>
//             <textarea
//               name="description"
//               value={ticketDetails.description}
//               onChange={handleChange}
//               className="w-full px-2 py-1 text-sm text-secondary border border-gray-300 rounded-sm outline-none"
//               rows="3"
//             />
//           </div>

//           {/* Buttons (Different API calls) */}
//           <div className="flex flex-wrap items-center justify-evenly gap-2 px-4 py-4 border border-primary">
//             <button className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium rounded-sm">
//               Choose an assignee and set status to “In Progress”
//             </button>
//             <button className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium rounded-sm">
//               This ticket has been solved.
//             </button>
//             <button className="px-2 py-3 bg-gray-200 text-secondary text-xs md:text-sm font-medium rounded-sm">
//               This ticket is deferred.
//             </button>
//             <button className="px-4 py-3 bg-primary text-secondary text-xs md:text-sm font-medium rounded-sm">
//               Add Response
//             </button>
//           </div>
//           </div>
//         </div>
//       )}
//     </Layout>
//   );
// };

// export default TicketManage;












import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import { useParams } from 'react-router-dom';
import { apiurl } from '../config/config';
import axios from 'axios';
import BackHeader from '../components/backHeader';
import { InfiLoader } from '../components/loader';
import { LuReply } from "react-icons/lu";
import { RiStickyNoteAddLine } from "react-icons/ri";
import { LuForward } from "react-icons/lu";
import { VscSend } from "react-icons/vsc";
import { IoCloseSharp } from "react-icons/io5";


const TicketManage = () => {
  // const [ticketDetails, setTicketDetails] = useState({});
  const [ticketDetails, setTicketDetails] = useState({
    tenant: {
      tenantId: "",
      tenantName: "",
      tenantObjId: "",
    },
    assignee: {
      userName: "",
      userId: "",
      userObjId: "",
      timestamp: "",
    },
    assignor: {
      userName: "",
      userId: "",
      userObjId: "",
      timestamp: "",
    },
    _id: "",
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    category: "",
    description: "",
    status: "",
    priority: "",
    notes: [],
  });
  
  const [loading, setLoading] = useState(false);
  const { ticketId } = useParams();
  console.log("ticketDetails", ticketDetails)
  const [showReplyPopup, setShowReplyPopup] = useState(false);

  const toggleReplyPopup = () => {
    setShowReplyPopup(!showReplyPopup)
  }

  useEffect(() => {
    fetchTicketDetails();
  }, []);

  const fetchTicketDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiurl}/api/ticket/get/assignee`, { userObjId: ticketId });
      setTicketDetails(response.data);
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
    setLoading(false);
  };

  // Handle input changes (supports nested properties)
  const handleChange = (e, section = null, key = null) => {
    const { name, value } = e.target;

    if (section && key) {
      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        [section]: {
          ...prevDetails[section],
          [key]: value,
        },
      }));
    } else {
      setTicketDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  // Save updated data to API
  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(`${apiurl}/api/ticket/update`, ticketDetails);
      alert("Ticket details updated successfully!");
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
    setLoading(false);
  };

  const [replyInput, setReplyInput] = useState("");

  console.log("replyInput", replyInput)


  const [showAddNotePopup, setShowAddNotePopup] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);

  const toggleAddNotePopup = () => {
    setShowAddNotePopup(!showAddNotePopup);
    setNoteInput("");
  };

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, noteInput]);
      setNoteInput(""); // Clear input after adding
      setShowAddNotePopup(false); // Close popup after adding
    }
  };

  const staticAssignees = [
    { id: 1, userName: "John Doe" },
    { id: 2, userName: "Jane Smith" },
    { id: 3, userName: "Alice Johnson" },
    { id: 4, userName: "Bob Williams" }
  ];

  const [assignees, setAssignees] = useState([]); // Stores selected assignees
  const [inputValue, setInputValue] = useState(""); // Input field value
  const [suggestions, setSuggestions] = useState([]); // Stores filtered suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // Controls dropdown visibility

  console.log("assignees",assignees)

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.includes("@")) {
      const searchText = value.split("@").pop().toLowerCase();
      const filtered = staticAssignees.filter((assignee) =>
        assignee.userName.toLowerCase().includes(searchText)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Add assignee when clicked from suggestions
  const addAssignee = (assignee) => {
    if (!assignees.some((a) => a.id === assignee.id)) {
      setAssignees([...assignees, assignee]);
    }
    setInputValue(""); // Clear input after selection
    setShowSuggestions(false);
  };

  // Remove assignee when clicked
  const removeAssignee = (id) => {
    setAssignees(assignees.filter((assignee) => assignee.id !== id));
  };


  useEffect(() => {
    if (ticketDetails.assignee) {
      ticketDetails.assignee.userName = assignees.map(a => a.userName).join(", ");
      ticketDetails.assignee.userId = assignees.map(a => a.id).join(", ");
    }
    ticketDetails.notes = notes;
  }, [assignees, notes]);
  

  return (
    <Layout>
      {loading === true ?
        <InfiLoader maintext="Fetching Ticket Data..." />
        :
        <div className="px-4 py-4 h-full w-full bg-[#fffdfc]">
          <div className="h-[10%]">
            <BackHeader
              title="Manage Ticket"
              backButton={true}
              link="/tickets"
              rightSide={
                <div className='flex items-center gap-5'>
                  <button className="px-4 py-2 flex items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm" onClick={toggleAddNotePopup}>
                    <RiStickyNoteAddLine />
                    Add Note
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium rounded-sm"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              }
            />
          </div>

          <div className='flex flex-col gap-5 h-[90%] overflow-scroll hide-scrollbar' >
            {/* Editable Fields */}
            <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3 xl:gap-2">
              {/* {[
                { label: "Tenant Name", section: "tenant", key: "tenantName" },
                { label: "Tenant ID", section: "tenant", key: "tenantId" },
                { label: "Assignee Name", section: "assignee", key: "userName" },
                { label: "Assignee ID", section: "assignee", key: "userId" },
                { label: "Assignor Name", section: "assignor", key: "userName" },
                { label: "Assignor ID", section: "assignor", key: "userId" },
                { label: "Email", key: "email" },
                { label: "Subject", key: "subject" },
                { label: "Category", key: "category" },
              ].map(({ label, section, key }) => (
                <div key={label} className="flex flex-col items-start max-w-4xl">
                  <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">{label}</h4>
                  <input
                    type="text"
                    name={key}
                    value={section ? ticketDetails[section]?.[key] || "" : ticketDetails[key] || ""}
                    onChange={(e) => handleChange(e, section, key)}
                    className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                  />
                </div>
              ))} */}

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Tenant Name</h4>
                <input
                  type="text"
                  name="tenantName"
                  value={ticketDetails.tenant?.tenantName || ""}
                  onChange={(e) => handleChange(e, "tenant", "tenantName")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Tenant ID</h4>
                <input
                  type="text"
                  name="tenantId"
                  value={ticketDetails.tenant?.tenantId || ""}
                  onChange={(e) => handleChange(e, "tenant", "tenantId")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              {/* <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Assignee Name</h4>
                <input
                  type="text"
                  name="userName"
                  value={ticketDetails.assignee?.userName || ""}
                  onChange={(e) => handleChange(e, "assignee", "userName")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div> */}

              

              {/* <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Assignee ID</h4>
                <input
                  type="text"
                  name="userId"
                  value={ticketDetails.assignee?.userId || ""}
                  onChange={(e) => handleChange(e, "assignee", "userId")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div> */}

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Assignor Name</h4>
                <input
                  type="text"
                  name="userName"
                  value={ticketDetails.assignor?.userName || ""}
                  onChange={(e) => handleChange(e, "assignor", "userName")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Assignor ID</h4>
                <input
                  type="text"
                  name="userId"
                  value={ticketDetails.assignor?.userId || ""}
                  onChange={(e) => handleChange(e, "assignor", "userId")}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Email</h4>
                <input
                  type="text"
                  name="email"
                  value={ticketDetails.email || ""}
                  onChange={(e) => handleChange(e)}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Subject</h4>
                <input
                  type="text"
                  name="subject"
                  value={ticketDetails.subject || ""}
                  onChange={(e) => handleChange(e)}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Category</h4>
                <input
                  type="text"
                  name="category"
                  value={ticketDetails.category || ""}
                  onChange={(e) => handleChange(e)}
                  className="px-2 py-1 text-sm text-secondary font-semibold border border-gray-300 rounded-sm w-full focus:outline-1 focus:outline-primary"
                />
              </div>


              {/* Status & Priority Dropdowns */}
              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Status</h4>
                <select
                  name="status"
                  value={ticketDetails.status}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-sm text-sm font-medium text-secondary border border-gray-300 w-full focus:outline-1 focus:outline-primary"
                >
                  <option value="Pending">Pending</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div className="flex flex-col items-start max-w-4xl">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">Priority</h4>
                <select
                  name="priority"
                  value={ticketDetails.priority}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-sm text-sm text-secondary font-medium border border-gray-300 w-full focus:outline-1 focus:outline-primary"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex flex-col md:col-span-2 lg:col-span-3 items-start relative">
                <h4 className="px-2 pt-2 text-sm text-gray-400 font-medium">
                  Assignee Name
                </h4>

                {/* Selected Assignees Display */}
                <div className="flex flex-col flex-wrap gap-2 px-2 py-1 border border-gray-300 rounded-sm w-full">
                  <div className='flex flex-wrap gap-2'>
                  {assignees.map((assignee) => (
                    <span
                      key={assignee.id}
                      className="bg-gray-200 text-sm px-2 py-1 rounded-sm cursor-pointer"
                      onClick={() => removeAssignee(assignee.id)}
                    >
                      {assignee.userName} ✕
                    </span>
                  ))}
                  </div>

                  {/* Input Field */}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="text-sm text-secondary font-semibold outline-none flex-1"
                    placeholder="Type @ to assign"
                  />
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full mt-1 text-start bg-white border border-gray-300 w-fit rounded-sm shadow-md max-h-40 overflow-auto z-10">
                    {suggestions.map((assignee) => (
                      <li
                        key={assignee.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        onClick={() => addAssignee(assignee) }
                      >
                        {assignee.userName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="border rounded-sm  px-4 py-4 border-primary">
              <p className="py-2 px-2 text-gray-400 font-medium text-start">Ticket Issue</p>
              {/* <textarea
                name="description"
                value={ticketDetails.description}
                onChange={handleChange}
                className="w-full px-2 py-1 text-sm text-secondary border border-gray-300 rounded-sm focus:outline-1 focus:outline-primary"
                rows="3"
                disabled
              /> */}
              <p className="w-full px-2 py-1 text-sm text-start font-semibold text-secondary border border-gray-300 rounded-sm focus:outline-1 focus:outline-primary">
                {ticketDetails.description || "N/A"}
              </p>
            </div>
            {replyInput && (
              <div className="mt-4 p-4 border bg-primary text-start rounded">
                <h3 className="text-lg font-medium">Message from : </h3>
                <p>{replyInput}</p>
              </div>
            )}

            {showReplyPopup &&
              <div className="border relative rounded-sm bg-white px-4 py-4 border-primary">
                <div className='absolute right-5 top-5 text-primary hover:text-secondary text-lg' onClick={toggleReplyPopup}>
                  <IoCloseSharp />
                </div>
                <p className="py-2 px-2 text-secondary font-medium text-start">Reply</p>
                <textarea
                  name="reply"
                  onChange={(e) => setReplyInput(e.target.value)}
                  className="w-full px-2 py-1 text-sm text-secondary border border-gray-300 rounded-sm focus:outline-1 focus:outline-primary"
                  rows="3"
                  placeholder='Reply the message ...'
                />
                <button className="px-4 py-2 mt-2 flex justify-start items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-start w-fit rounded-sm ">
                  Send
                  <VscSend />
                </button>
              </div>
            }
            {showAddNotePopup && (
              // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              //   <div className="bg-white p-6 rounded-md shadow-lg w-80">
              //     <h2 className="text-lg font-medium mb-2">Add a Note</h2>
              //     <input
              //       type="text"
              //       value={noteInput}
              //       onChange={(e) => setNoteInput(e.target.value)}
              //       className="w-full border p-2 rounded-md mb-4"
              //       placeholder="Enter your note..."
              //     />
              //     <div className="flex justify-between">
              //       <button
              //         className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
              //         onClick={toggleAddNotePopup}
              //       >
              //         Cancel
              //       </button>
              //       <button
              //         className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
              //         onClick={addNote}
              //       >
              //         Add
              //       </button>
              //     </div>
              //   </div>
              // </div>

              <div className="border relative rounded-sm bg-white px-4 py-4 border-primary">
                <div className='absolute right-5 top-5 text-primary hover:text-secondary text-lg' onClick={toggleAddNotePopup}>
                  <IoCloseSharp />
                </div>
                <p className="py-2 px-2 text-secondary font-medium text-start">Add a Note</p>
                <textarea
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="w-full px-2 py-1 text-sm text-secondary border border-gray-300 rounded-sm focus:outline-1 focus:outline-primary"
                  rows="3"
                  placeholder='Add the Note ...'
                />
                <button className="px-4 py-2 mt-2 flex justify-start items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-start w-fit rounded-sm " onClick={addNote}>
                  Add
                  <RiStickyNoteAddLine />
                </button>
              </div>
            )}

            {/* <div className="flex flex-wrap items-center gap-2 px-4 py-4 border border-primary">
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm " onClick={toggleReplyPopup}>
                <LuReply />
                Reply
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm">
                <LuForward />
                Forward
              </button>
              <button className="px-4 py-2 flex items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium text-center w-fit m-auto rounded-sm" onClick={toggleAddNotePopup}>
                <RiStickyNoteAddLine />
                Add Note
              </button>
            </div> */}

            {notes.length > 0 && (
              <div className="mt-4 p-4 border border-primary text-start rounded">
                <h3 className=" font-medium text-gray-400">Notes:</h3>
                <ul className="list-disc pl-4">
                  {notes.map((note, index) => (
                    <li key={index} className="mt-2 text-gray-700">
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activity Log */}
            {/* <div className="px-4 py-4 border border-primary">
              <h4 className="text-lg font-medium text-secondary mb-2">Activity Log</h4>
              {ticketDetails.log?.length > 0 ? (
                ticketDetails.log.map((logItem, index) => (
                  <div key={index} className="border-b py-2">
                    <p className="text-sm text-secondary font-medium">{logItem.action}</p>
                    <p className="text-xs text-gray-400">{new Date(logItem.timestamp).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No logs available.</p>
              )}
            </div> */}
          </div>

        </div>
      }
    </Layout >
  );
};

export default TicketManage;
