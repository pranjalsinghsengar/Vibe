// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { BiSolidDashboard } from "react-icons/bi";
// import { FaRegFolder, FaUserPlus } from "react-icons/fa6";
// import { TbBrandGoogleAnalytics, TbViewfinder } from "react-icons/tb";
// import { FaUsersViewfinder } from "react-icons/fa6";
// import { IoPricetagsOutline, IoStorefront } from "react-icons/io5";
// import { BiCategoryAlt } from "react-icons/bi";
// import { GrCatalog, GrSync } from "react-icons/gr";
// import { PiFilePdfLight, PiWalletLight } from "react-icons/pi";
// import { RiEdit2Line, RiSecurePaymentLine } from "react-icons/ri";
// import {
//   MdOutlineCelebration,
//   MdLeaderboard,
//   MdOutlineSupportAgent,
//   MdOutlineWifiProtectedSetup,
//   MdOutlineFactCheck,
// } from "react-icons/md";
// import { useUser } from "../config/userProvider";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { BiSolidOffer } from "react-icons/bi";
// import { IoStorefrontOutline } from "react-icons/io5";
// import { RiTeamFill } from "react-icons/ri";
// import { VscBroadcast } from "react-icons/vsc";
// import { IoIosPeople } from "react-icons/io";
// import { IoAppsSharp } from "react-icons/io5";
// import { BsViewList } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";
// import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
// import { MdOutlineLoyalty } from "react-icons/md";
// import { AiOutlineFolderView, AiOutlineProduct } from "react-icons/ai";
// import { TbListDetails } from "react-icons/tb";
// import { IoTicketOutline } from "react-icons/io5";
// import { BiSupport } from "react-icons/bi";
// import { SiGoogleanalytics, SiTryitonline } from "react-icons/si";
// import { IoMdChatboxes } from "react-icons/io";
// // import Analytics from "../pages/analytics";
// import { BsRobot } from "react-icons/bs";
// import { LiaUsersSolid } from "react-icons/lia";
// import { IoAnalytics } from "react-icons/io5";
// import { FiUser } from "react-icons/fi";
// import { TbTargetArrow } from "react-icons/tb";
// import { LuLogs, LuWalletMinimal } from "react-icons/lu";
// import { PiChats } from "react-icons/pi";
// import { IoAnalyticsOutline } from "react-icons/io5";
// import { TbMessageChatbot } from "react-icons/tb";
// import { PiFlowArrow } from "react-icons/pi";
// import { TbApiApp } from "react-icons/tb";
// import { MdOutlineManageAccounts } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { HiOutlinePlusSmall } from "react-icons/hi2";




// const Sidebar = () => {
//   // const userType = "master";
//   const { userData } = useUser();
//   const [openDropdowns, setOpenDropdowns] = useState({});
//   const location = useLocation();

//   console.log("userType",userData?.userType)

//   useEffect(() => {
//     const updatedOpenDropdowns = {};
//     NavigationData?.userType?.forEach((item) => {
//       if (
//         item.subMenu &&
//         item.subMenu.some((subItem) => subItem.location === location.pathname)
//       ) {
//         updatedOpenDropdowns[item.title] = true; // Open the dropdown for the matched menu
//       }
//     });

//     setOpenDropdowns(updatedOpenDropdowns);
//   }, [location.pathname, userData?.userType]);

//   const toggleDropdown = (title) => {
//     setOpenDropdowns((prev) => ({
//       ...prev,
//       [title]: !prev[title],
//     }));
//   };


  // const NavigationData = {
  //   masteradmin: [
  //     {
  //       title: "Dashboard",
  //       icon: <BiSolidDashboard />,
  //       location: "/dashboard",
  //     },
  //     // {
  //     //   title: "Analytics",
  //     //   icon: <IoAnalyticsOutline />,
  //     //   location: "/analytics",
  //     // },
  //     {
  //       title: "Clients",
  //       icon: <HiOutlineUserGroup />,
  //       location: "/clients",
  //     },
  //     {
  //       title: "NewClient",
  //       icon: <HiOutlinePlusSmall />,
  //       location: "/newClient",
  //     },
  //     // {
  //     //   title: "Appearance",
  //     //   icon: <AiOutlineFolderView />,
  //     //   location: "/appearance",
  //     // },
  //   ],
  //   superadmin: [
  //     {
  //       title: "Dashboard",
  //       icon: <BiSolidDashboard />,
  //       location: "/dashboard",
  //     },
  //     // {
  //     //   title: "Analytics",
  //     //   icon: <IoAnalyticsOutline />,
  //     //   location: "/analytics",
  //     // },
  //     {
  //       title: "Customers",
  //       icon: <HiOutlineUserGroup />,
  //       location: "/customers",
  //     },
  //     {
  //       title: "Appearance",
  //       icon: <AiOutlineFolderView />,
  //       location: "/appearance",
  //     },
  //     {
  //       title: "Plans",
  //       icon: <LuWalletMinimal />,
  //       location: "/plans",
  //     },
  //     {
  //       title: "Approval Center",
  //       icon: <AiOutlineFolderView />,
  //       location: "/approval-center",
  //     },
  //     {
  //       title: "Pricing",
  //       icon: <IoPricetagsOutline />,
  //       location: "/pricing",
  //     },
  //     {
  //       title: "Payment Methods",
  //       icon: <RiSecurePaymentLine />,
  //       location: "/payment-methods",
  //     },
  //   ],
  //   admin: [
  //     {
  //       title: "Dashboard",
  //       icon: <BiSolidDashboard />,
  //       location: "/dashboard",
  //     },
  //     // {
  //     //   title: "Analytics",
  //     //   icon: <IoAnalyticsOutline />,
  //     //   location: "/analytics",
  //     // },
  //     {
  //       title: "Whatsapp API",
  //       icon: <TbApiApp />,
  //       location: "/whatsapp-api",
  //     },
  //     {
  //       title: "Chatbot Flow",
  //       icon: <PiFlowArrow />,
  //       location: "/bot-flow",
  //     },
  //     {
  //       title: "Whatsapp Accounts",
  //       icon: <MdOutlineManageAccounts />,
  //       location: "/whatsapp-accounts",
  //     },
  //     {
  //       title: "Users",
  //       icon: <HiOutlineUserGroup />,
  //       location: "/users",
  //     },
  //     {
  //       title: "Chats",
  //       icon: <PiChats />,
  //       location: "/chats",
  //     },
  //     // {
  //     //   title: "Plans",
  //     //   icon: <LuWalletMinimal />,
  //     //   location: "/plans",
  //     // },
      
  //   ],
  // };

//   return (
//     <>
//       <div className="flex flex-col gap-1 items-center w-full h-full overflow-y-scroll py-2 hide-scrollbar ">
//         {NavigationData[userData?.userType]?.map((item, index) => (
//           <div key={index} className="w-full">
//             {!item.dropdown ? (
//               <NavLink
//                 className={({ isActive }) =>
//                   `-isActive-${isActive}- px-2 py-2 rounded-sm w-full flex border border-transparent hover:border-secondary items-center gap-1.5 
//                  text-sm ${
//                    isActive
//                      ? "bg-secondary text-primary"
//                      : "hover:border hover:border-primary text-secondary"
//                  }`
//                 }
//                 to={item.location}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 <p className="sm:hidden lg:block">{item.title}</p>
//               </NavLink>
//             ) : (
//               <div
//                 className={
//                   openDropdowns[item.title]
//                     ? `border-x border-b rounded-lg bg-[#0d0808]`
//                     : ""
//                 }
//               >
//                 <button
//                   onClick={() => toggleDropdown(item.title)}
//                   className={`px-2 py-2 rounded-lg w-full flex items-center justify-between gap-1.5 
//                   text-sm transition-colors duration-700 border border-transparent ${
//                     openDropdowns[item.title]
//                       ? "bg-white text-black "
//                       : "text-white"
//                   } hover:bg-black hover:text-white hover:border hover:border-white`}
//                 >
//                   <div className="flex items-center gap-1.5">
//                     <span className="text-xl">{item.icon}</span>
//                     <p className="sm:hidden lg:block">{item.title}</p>
//                   </div>
//                   <span className="text-lg">
//                     {openDropdowns[item.title] ? (
//                       <CiCircleMinus />
//                     ) : (
//                       <CiCirclePlus />
//                     )}
//                   </span>
//                 </button>

//                 {openDropdowns[item.title] && (
//                   <div
//                     className={`ml-3 mr-1 my-2 space-y-1 overfloahidden transition-all duration-700`}
//                   >
//                     {item.subMenu.map((subItem, subIndex) => (
//                       <NavLink
//                         key={subIndex}
//                         className={({ isActive }) =>
//                           `my-2 block px-2 py-2 rounded-lg w-full text-sm transition-colors duration-700 ${
//                             isActive
//                               ? "bg-gray-300 text-black"
//                               : "hover:bg-gray-700 text-white"
//                           }`
//                         }
//                         to={subItem.location}
//                       >
//                         {subItem.title}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Sidebar;




// import React, { useState, useEffect } from "react";
// import { Link, NavLink, useLocation } from "react-router-dom";
// import { BiSolidDashboard } from "react-icons/bi";
// import { FaRegFolder, FaUserPlus } from "react-icons/fa6";
// import { TbBrandGoogleAnalytics, TbViewfinder } from "react-icons/tb";
// import { FaUsersViewfinder } from "react-icons/fa6";
// import { IoPricetagsOutline, IoStorefront } from "react-icons/io5";
// import { BiCategoryAlt } from "react-icons/bi";
// import { GrCatalog, GrSync } from "react-icons/gr";
// import { PiFilePdfLight, PiWalletLight } from "react-icons/pi";
// import { RiEdit2Line, RiSecurePaymentLine } from "react-icons/ri";
// import {
//   MdOutlineCelebration,
//   MdLeaderboard,
//   MdOutlineSupportAgent,
//   MdOutlineWifiProtectedSetup,
//   MdOutlineFactCheck,
// } from "react-icons/md";
// import { useUser } from "../config/userProvider";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { BiSolidOffer } from "react-icons/bi";
// import { IoStorefrontOutline } from "react-icons/io5";
// import { RiTeamFill } from "react-icons/ri";
// import { VscBroadcast } from "react-icons/vsc";
// import { IoIosPeople } from "react-icons/io";
// import { IoAppsSharp } from "react-icons/io5";
// import { BsViewList } from "react-icons/bs";
// import { IoSettingsOutline } from "react-icons/io5";
// import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
// import { MdOutlineLoyalty } from "react-icons/md";
// import { AiOutlineFolderView, AiOutlineProduct } from "react-icons/ai";
// import { TbListDetails } from "react-icons/tb";
// import { IoTicketOutline } from "react-icons/io5";
// import { BiSupport } from "react-icons/bi";
// import { SiGoogleanalytics, SiTryitonline } from "react-icons/si";
// import { IoMdChatboxes } from "react-icons/io";
// // import Analytics from "../pages/analytics";
// import { BsRobot } from "react-icons/bs";
// import { LiaUsersSolid } from "react-icons/lia";
// import { IoAnalytics } from "react-icons/io5";
// import { FiUser } from "react-icons/fi";
// import { TbTargetArrow } from "react-icons/tb";
// import { LuLogs, LuWalletMinimal } from "react-icons/lu";
// import { PiChats } from "react-icons/pi";
// import { IoAnalyticsOutline } from "react-icons/io5";
// import { TbMessageChatbot } from "react-icons/tb";
// import { PiFlowArrow } from "react-icons/pi";
// import { TbApiApp } from "react-icons/tb";
// import { MdOutlineManageAccounts } from "react-icons/md";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { HiOutlinePlusSmall } from "react-icons/hi2";


// const Sidebar = () => {
//   const { userData } = useUser();

//   const NavigationData = {
//     masteradmin: [
//       {
//         title: "Dashboard",
//         icon: <BiSolidDashboard />,
//         location: "/dashboard",
//       },
//       // {
//       //   title: "Analytics",
//       //   icon: <IoAnalyticsOutline />,
//       //   location: "/analytics",
//       // },
//       {
//         title: "Clients",
//         icon: <HiOutlineUserGroup />,
//         location: "/clients",
//       },
//       {
//         title: "NewClient",
//         icon: <HiOutlinePlusSmall />,
//         location: "/newClient",
//       },
//       // {
//       //   title: "Appearance",
//       //   icon: <AiOutlineFolderView />,
//       //   location: "/appearance",
//       // },
//     ],
//     superadmin: [
//       {
//         title: "Dashboard",
//         icon: <BiSolidDashboard />,
//         location: "/dashboard",
//       },
//       // {
//       //   title: "Analytics",
//       //   icon: <IoAnalyticsOutline />,
//       //   location: "/analytics",
//       // },
//       {
//         title: "Customers",
//         icon: <HiOutlineUserGroup />,
//         location: "/customers",
//       },
//       {
//         title: "Appearance",
//         icon: <AiOutlineFolderView />,
//         location: "/appearance",
//       },
//       {
//         title: "Plans",
//         icon: <LuWalletMinimal />,
//         location: "/plans",
//       },
//       {
//         title: "Approval Center",
//         icon: <AiOutlineFolderView />,
//         location: "/approval-center",
//       },
//       {
//         title: "Pricing",
//         icon: <IoPricetagsOutline />,
//         location: "/pricing",
//       },
//       {
//         title: "Payment Methods",
//         icon: <RiSecurePaymentLine />,
//         location: "/payment-methods",
//       },
//     ],
//     admin: [
//       {
//         title: "Dashboard",
//         icon: <BiSolidDashboard />,
//         location: "/dashboard",
//       },
//       // {
//       //   title: "Analytics",
//       //   icon: <IoAnalyticsOutline />,
//       //   location: "/analytics",
//       // },
//       {
//         title: "Whatsapp API",
//         icon: <TbApiApp />,
//         location: "/whatsapp-api",
//       },
//       {
//         title: "Chatbot Flow",
//         icon: <PiFlowArrow />,
//         location: "/bot-flow",
//       },
//       {
//         title: "Whatsapp Accounts",
//         icon: <MdOutlineManageAccounts />,
//         location: "/whatsapp-accounts",
//       },
//       {
//         title: "Users",
//         icon: <HiOutlineUserGroup />,
//         location: "/users",
//       },
//       {
//         title: "Chats",
//         icon: <PiChats />,
//         location: "/chats",
//       },
//       // {
//       //   title: "Plans",
//       //   icon: <LuWalletMinimal />,
//       //   location: "/plans",
//       // },
      
//     ],
//   };

//   const items = NavigationData[userData?.userType || "admin"] || [];

//   return (
//     <div className="w-full h-full flex flex-col items-center py-4 bg-gray-950">
//       {items.map((item, index) => (
//         <div
//           key={index}
//           className="group relative w-16"           // group + fixed width
//         >
//           <NavLink
//             to={item.location}
//             className={({ isActive }) =>
//               `flex h-14 w-16 items-center justify-center transition-colors
//                ${isActive
//                  ? "bg-indigo-900/40 text-white border-r-4 border-indigo-500"
//                  : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
//                }`
//             }
//           >
//             <span className="text-2xl">{item.icon}</span>

//             {/* ────────────────────────────────────────────────
//                 DEBUG TOOLTIP - very visible pink version first
//             ──────────────────────────────────────────────── */}
            // <div
            //   className={`
            //     absolute left-full top-1/2 -translate-y-1/2 ml-2
            //     px-4 py-2.5 rounded-md
            //     bg-indigo-500 text-white font-medium text-sm
            //     shadow-xl border-2 border-indigo-400 whitespace-nowrap z-[9999]
            //     opacity-0 translate-x-[-12px] scale-90
            //     group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
            //     transition-all duration-200 pointer-events-none
            //     after:content-[''] after:absolute after:top-1/2 after:-left-3
            //     after:border-8 after:border-transparent after:border-r-indigo-500
            //   `}
            // >
            //   {item.title}
            // </div>
//           </NavLink>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;




import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaRegFolder, FaUserPlus } from "react-icons/fa6";
import { TbBrandGoogleAnalytics, TbViewfinder } from "react-icons/tb";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoPricetagsOutline, IoStorefront } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrCatalog, GrSync } from "react-icons/gr";
import { PiFilePdfLight, PiWalletLight } from "react-icons/pi";
import { RiEdit2Line, RiSecurePaymentLine } from "react-icons/ri";
import {
  MdOutlineCelebration,
  MdLeaderboard,
  MdOutlineSupportAgent,
  MdOutlineWifiProtectedSetup,
  MdOutlineFactCheck,
} from "react-icons/md";
import { useUser } from "../config/userProvider";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidOffer } from "react-icons/bi";
import { IoStorefrontOutline } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";
import { VscBroadcast } from "react-icons/vsc";
import { IoIosPeople } from "react-icons/io";
import { IoAppsSharp } from "react-icons/io5";
import { BsViewList } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { MdOutlineLoyalty } from "react-icons/md";
import { AiOutlineFolderView, AiOutlineProduct } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { IoTicketOutline } from "react-icons/io5";
import { BiSupport } from "react-icons/bi";
import { SiGoogleanalytics, SiTryitonline } from "react-icons/si";
import { IoMdChatboxes } from "react-icons/io";
// import Analytics from "../pages/analytics";
import { BsRobot } from "react-icons/bs";
import { LiaUsersSolid } from "react-icons/lia";
import { IoAnalytics } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import { TbTargetArrow } from "react-icons/tb";
import { LuLogs, LuWalletMinimal } from "react-icons/lu";
import { PiChats } from "react-icons/pi";
import { IoAnalyticsOutline } from "react-icons/io5";
import { TbMessageChatbot } from "react-icons/tb";
import { PiFlowArrow } from "react-icons/pi";
import { TbApiApp } from "react-icons/tb";
import { MdOutlineManageAccounts } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlinePlusSmall } from "react-icons/hi2";

const Sidebar = () => {
  const { userData } = useUser();

  const NavigationData = {
    masteradmin: [
      { title: "Dashboard", icon: <BiSolidDashboard />, location: "/dashboard" },
      { title: "Clients", icon: <HiOutlineUserGroup />, location: "/clients" },
      { title: "New Client", icon: <HiOutlinePlusSmall />, location: "/newClient" },
    ],
    superadmin: [
      { title: "Dashboard", icon: <BiSolidDashboard />, location: "/dashboard" },
      { title: "Customers", icon: <HiOutlineUserGroup />, location: "/customers" },
      { title: "Appearance", icon: <AiOutlineFolderView />, location: "/appearance" },
      { title: "Plans", icon: <LuWalletMinimal />, location: "/plans" },
      { title: "Approval Center", icon: <AiOutlineFolderView />, location: "/approval-center" },
      { title: "Pricing", icon: <IoPricetagsOutline />, location: "/pricing" },
      { title: "Payment Methods", icon: <RiSecurePaymentLine />, location: "/payment-methods" },
    ],
    admin: [
      { title: "Dashboard", icon: <BiSolidDashboard />, location: "/dashboard" },
      { title: "Whatsapp API", icon: <TbApiApp />, location: "/whatsapp-api" },
      { title: "Chatbot Flow", icon: <PiFlowArrow />, location: "/bot-flow" },
      { title: "Whatsapp Accounts", icon: <MdOutlineManageAccounts />, location: "/whatsapp-accounts" },
      { title: "Users", icon: <HiOutlineUserGroup />, location: "/users" },
      { title: "Chats", icon: <PiChats />, location: "/chats" },
    ],
  };

  const items = NavigationData[userData?.userType] || [];

  return (
    <div className="flex flex-col w-full h-full py-3 md:py-4">
      {items.map((item) => (
        <NavLink
          key={item.location}
          to={item.location}
          className={({ isActive }) =>
            `group relative flex items-center w-full h-12 md:h-14 px-3 md:px-0 transition-colors duration-200
             ${isActive
               ? "bg-indigo-900/30 text-white font-medium lg:border-r-4 lg:border-indigo-500"
               : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
             }`
          }
        >
          {/* Icon column – fixed width for alignment */}
          <div className="flex items-center justify-center w-12 md:w-14 lg:w-16 flex-shrink-0">
            <span className="text-2xl lg:text-2.5xl">{item.icon}</span>
          </div>

          {/* Name – visible on phone & tablet, hidden on desktop */}
          <span className="lg:hidden ml-3 text-sm font-medium truncate">
            {item.title}
          </span>
                      <div
              className={`
                absolute left-full top-1/2 -translate-y-1/2 ml-2
                 hidden lg:block
                px-4 py-2.5 rounded-md
                bg-indigo-500 text-white font-medium text-sm
                shadow-xl border-2 border-indigo-400 whitespace-nowrap z-[9999]
                opacity-0 translate-x-[-12px] scale-90
                group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100
                transition-all duration-200 pointer-events-none
                after:content-[''] after:absolute after:top-1/2 after:-left-3
                after:border-8 after:border-transparent after:border-r-indigo-500
              `}
            >
              {item.title}
            </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;