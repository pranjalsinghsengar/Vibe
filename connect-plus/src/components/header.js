// import React, { useState, useEffect } from "react";
// import "./layout.css";
// // import { useUser } from "../config/userProvider";
// import { IoHelp, IoPowerSharp, IoSettingsOutline } from "react-icons/io5";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { removeCookie } from "../config/webStorage.js";
// import { useNavigate, NavLink } from "react-router-dom";
// import Error from "../components/error";
// // import moment from "moment";
// import { GoBell } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import Input from "../components/inputContainer";
// import { IoSearch } from "react-icons/io5";
// import Notification from "./notification.js";
// import axios from "axios";
// import { apiurl } from "../config/config";

// const Header = ({ className }) => {
//   // const {
//   //   openProfile,
//   //   setCloseProfile,
//   //   userData,
//   //   isMenuOpen,
//   //   setIsMenuOpen,
//   //   showSearch,
//   //   setShowSearch,
//   // } = useUser();
//   const [openSearch, setOpenSearch] = useState(false);
//   const navigate = useNavigate();
//   const logOutHandler = () => {
//     removeCookie("sctoken");
//     window.location.reload();
//   };
//   const [message, setMessage] = useState({ type: "", message: "" });

//   // const verificationDetails = userData?.verificationDetails;
//   // useEffect(() => {
//   //   if (userData?.userType === "admin" || userData?.userType === "user") {
//   //     if (userData?.storeDetails?.storeObjId) {
//   //       if (
//   //         !verificationDetails?.isEmailVerified &&
//   //         !verificationDetails?.isPhoneVerified
//   //       ) {
//   //         setMessage({
//   //           type: "error",
//   //           message: "Email & Phone Verification is pending...",
//   //         });
//   //       } else if (
//   //         !verificationDetails?.isEmailVerified &&
//   //         verificationDetails?.isPhoneVerified
//   //       ) {
//   //         setMessage({
//   //           type: "error",
//   //           message: "Email Verification is pending...",
//   //         });
//   //       } else if (
//   //         verificationDetails?.isEmailVerified &&
//   //         !verificationDetails?.isPhoneVerified
//   //       ) {
//   //         setMessage({
//   //           type: "error",
//   //           message: "Phone Verification is pending...",
//   //         });
//   //       }
//   //     } else if (!userData?.storeDetails?.storeObjId) {
//   //       setMessage({
//   //         type: "error",
//   //         message: "Please verify the store from the admin",
//   //       });
//   //     }
//   //   }
//   // }, [userData]);

//   // const Verification =
//   //   ((userData?.userType === "admin" || userData?.userType === "user") &&
//   //     !userData?.storeDetails?.storeObjId) ||
//   //   (userData?.storeDetails?.storeObjId &&
//   //     verificationDetails?.isEmailVerified);

//   // console.log("userData", Verification);
//   const FormattedDate = () => {
//     // const currentDate = moment(); // Get the current date and time
//     // const formattedDate = currentDate.format("dddd, DD MMMM YYYY");

//     // return <span>{formattedDate}</span>;
//   };

//   const [isNotificationCartOpen, setIsNotificationCartOpen] = useState(false);

//   // Function to toggle component visibility
//   const notificationCartHandle = () => {
//     setIsNotificationCartOpen(!isNotificationCartOpen);
//   };
//   // const notificationCartHandle = () => {
//   //   setIsNotificationCartOpen((prev) => !prev);
//   // };

//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notifications, setNotifications] = useState([]);

//   // const fetchNotifications = async () => {
//   //   try {
//   //     const response = await axios.post(
//   //       `${apiurl}/admin/v1/notifications/user`,
//   //       // JSON.stringify({ userObjId: "67401dbcb258c964b7567dc6" }),
//   //       JSON.stringify({ userObjId: userData?._id }),
//   //       { headers: { "Content-Type": "application/json" } }
//   //     );

//   //     if (response.data.success) {
//   //       const notifications = response.data.data;
//   //       setNotifications(notifications);

//   //       // Count unread notifications
//   //       const unread = response?.data?.unread;
//   //       // const unread = notifications.filter((n) => !n.isRead).length;
//   //       setUnreadCount(unread);
//   //     }
//   //   } catch (error) {
//   //     console.error("Failed to fetch notifications:", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchNotifications();
//   // }, []);


//   return (
//     <div
//       className={`bg-white shadow mb-2 rounded-lg px-3 py-2 flex items-center justify-between w-full border-b ${className}`}
//     >
//       <div className="py-2 md:hidden block cursor-pointer">
//         {/* <RxHamburgerMenu onClick={() => setIsMenuOpen(true)} /> */}
//       </div>
//       <div className="md:flex gap-2 items-center hidden">
//         <div>
//           <h1 className="text-xs md:text-sm lg:text-xl font-medium capitalize hidden md:block">
//             Hi,
//             {/* {userData?.name} */}
//           </h1>
//           <p className="text-zinc-400 text-xs">Today is {FormattedDate()}</p>
//         </div>

//         <div className="capitalize bg-blue-50 border-[1px] border-blue-200 rounded-md hidden md:block py-1 px-2 md:px-4 text-blue-500 text-xs">
//           {/* {userData?.userType} */}
//           Admin
//         </div>
//       </div>
//       {/* <div className="hidden " onClick={() => setShowSearch(true)}>
//         <IoSearch className="" />
//       </div> */}
//       {/* <div className="md:hidden w-36">
//         {
//           vendor?.vendorDetails?.logo?.url ?
//             <img src={vendor?.vendorDetails?.logo?.url} className="" /> :
//             <img src="/logo.png" className="" />}
//       </div> */}

//       {/* <div className="flex items-center gap-2 lg:gap-4 relative">

//         <div className="flex-shrink-0">
//           <button
//             className="bg-zinc-100 w-8 h-8 lg:w-10 lg:h-10 border rounded-full text-xs md:text-base lg:text-xl relative flex items-center justify-center"
//             onClick={notificationCartHandle}
//           >
//             {unreadCount > 0 && (
//               <span className="absolute bg-red-500 text-white text-[0.6rem] md:text-sm font-bold rounded-full sm:w-4 w-3 sm:h-4 h-3 flex items-center justify-center md:right-2 sm:top-2 top-1 right-1  md:top-1">
//                 {unreadCount}
//               </span>
//             )}
//             <GoBell className="text-gray-800 text-xl md:text-2xl" />
//           </button>
//         </div>

//         <div
//           className="uppercase bg-zinc-100 rounded-full w-8 h-8 lg:w-10 border border-blue-500 lg:h-10 overflow-hidden cursor-pointer flex justify-center items-center"
//           onClick={() => setCloseProfile(!openProfile)}
//         >
//           <span>{userData?.name.charAt(0)}</span>
//         </div>

//         {openProfile && (
//           <div className="absolute  shadow-sm right-0 top-[100%] bg-white/100  z-30 p-2 px-4 mt-2 rounded-md capitalize whitespace-pre">
//             <NavLink to="/account">
//               <div className="  flex items-center  gap-2 cursor-pointer border-b border-transparent  hover:border-zinc-100 py-1 ">
//                 <IoSettingsOutline />
//                 account & settings
//               </div>
//             </NavLink>

//             <div
//               className="mt-3 text-red-500 flex items-center  gap-2 cursor-pointer"
//               onClick={logOutHandler}
//             >
//               <IoPowerSharp />
//               logout
//             </div>
//           </div>
//         )}
//       </div> */}
//       {isNotificationCartOpen && (
//         <Notification
//           notifications={notifications}
//           onClose={notificationCartHandle}
//         />
//       )}
//     </div>
//   );
// };

// export default Header;












import React, { useState, useEffect, useContext } from "react";
import { useUser } from "../config/userProvider";
import { IoHelp, IoPowerSharp, IoSettingsOutline } from "react-icons/io5";
import { FaHome, FaUser, FaShoppingCart } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { removeCookie } from "../config/webStorage.js";
import { useNavigate, NavLink, Link } from "react-router-dom";
import moment from "moment";
import { GoBell } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import Notification from "./notification.js";
import axios from "axios";
import { apiurl } from "../config/config";
import { CgProfile } from "react-icons/cg";
import { ThemeContext } from "../config/themeContext.js";


const Header = ({ className }) => {
  // const [selectedCountry, setSelectedCountry] = useState("");
  // const countries = [
  //   "India",
  //   "United States",
  //   "Canada",
  //   "Australia",
  //   "Germany",
  // ];
  // const handleChange = (e) => {
  //   setSelectedCountry(e.target.value);
  // };
  const {
    openProfile,
    setCloseProfile,
    userData,
    isMenuOpen,
    setIsMenuOpen,
    showSearch,
    setShowSearch,
  } = useUser();
  const { colors, setColors, logoUrl, setLogoUrl, applyColors } = useContext(ThemeContext);
  const [openSearch, setOpenSearch] = useState(false);
  const navigate = useNavigate();
  const logOutHandler = () => {
    removeCookie("sctoken");
    window.location.reload();
    navigate("/");
  };
  const [message, setMessage] = useState({ type: "", message: "" });

  const verificationDetails = userData?.verificationDetails;
  // useEffect(() => {
  //   if (userData?.userType === "admin" || userData?.userType === "user") {
  //     if (userData?.storeDetails?.storeObjId) {
  //       if (
  //         !verificationDetails?.isEmailVerified &&
  //         !verificationDetails?.isPhoneVerified
  //       ) {
  //         setMessage({
  //           type: "error",
  //           message: "Email & Phone Verification is pending...",
  //         });
  //       } else if (
  //         !verificationDetails?.isEmailVerified &&
  //         verificationDetails?.isPhoneVerified
  //       ) {
  //         setMessage({
  //           type: "error",
  //           message: "Email Verification is pending...",
  //         });
  //       } else if (
  //         verificationDetails?.isEmailVerified &&
  //         !verificationDetails?.isPhoneVerified
  //       ) {
  //         setMessage({
  //           type: "error",
  //           message: "Phone Verification is pending...",
  //         });
  //       }
  //     } else if (!userData?.storeDetails?.storeObjId) {
  //       setMessage({
  //         type: "error",
  //         message: "Please verify the store from the admin",
  //       });
  //     }
  //   }
  // }, [userData]);

  const Verification =
    ((userData?.userType === "admin" || userData?.userType === "user") &&
      !userData?.storeDetails?.storeObjId) ||
    (userData?.storeDetails?.storeObjId &&
      verificationDetails?.isEmailVerified);

  // console.log("userData", Verification);
  const FormattedDate = () => {
    const currentDate = moment(); // Get the current date and time
    const formattedDate = currentDate.format("dddd, DD MMMM YYYY");

    return <span>{formattedDate}</span>;
  };

  const [isNotificationCartOpen, setIsNotificationCartOpen] = useState(false);

  // Function to toggle component visibility
  const notificationCartHandle = () => {
    setIsNotificationCartOpen(!isNotificationCartOpen);
  };
  // const notificationCartHandle = () => {
  //   setIsNotificationCartOpen((prev) => !prev);
  // };

  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${apiurl}/admin/v1/notifications/user`,
  //       // JSON.stringify({ userObjId: "67401dbcb258c964b7567dc6" }),
  //       JSON.stringify({ userObjId: userData?._id }),
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     if (response.data.success) {
  //       const notifications = response.data.data;
  //       setNotifications(notifications);

  //       // Count unread notifications
  //       const unread = response?.data?.unread;
  //       // const unread = notifications.filter((n) => !n.isRead).length;
  //       setUnreadCount(unread);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch notifications:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotifications();
  // }, []);

  return (
    <div
      className={`bg-secondary px-3 py-2 flex items-center justify-between w-full border-b border-slate-200 ${className}`}
    >
      <div className="py-2 lg:hidden block cursor-pointer">
        <RxHamburgerMenu onClick={() => setIsMenuOpen(true)} />
      </div>
      {/* <div className="md:flex gap-2 items-center hidden">
        <div>

          <p className="text-zinc-400 text-[0.55rem]">
            Today is {FormattedDate()}
          </p>
        </div>
        <div className="capitalize bg-light-secondary border-[1px] border-primary rounded-sm hidden md:block py-0.5 px-2 text-primary text-[0.55rem]">
          {userData?.userType}
        </div>
      </div> */}
      {/* <div className="md:hidden " onClick={() => setShowSearch(true)}>
        <IoSearch className="" />
      </div> */}
      <Link to="/">
        {logoUrl === '' ? (
          <div className="lg:hidden">
            <img src="/logo.png" className="h-6 md:h-8" />
          </div>
        ) : (
          <div className="lg:hidden">
            <img src={logoUrl} className="h-6 md:h-8" />
          </div>
        )}
      </Link>


      {/* {message?.type === "error" && <Error err={message?.message} />} */}
      <div className="flex items-center gap-2 lg:gap-4 relative">
        {/* <div
          className=" hidden md:flex items-center text-xs md:text-base lg:text-lg gap-3 bg-zinc-100 rounded-full px-2 py-2 md:px-4 md:py-2"
          onClick={() => setShowSearch(true)}
        >
          <IoSearch className="" />
          <input
            className=" bg-transparent outline-none"
            placeholder="Search for something"
          />
        </div> */}
        {/* <div className="flex-shrink-0">
          <button
            className="bg-zinc-100 w-8 h-8 lg:w-10 lg:h-10 border rounded-full text-xs md:text-base lg:text-xl relative flex items-center justify-center"
            onClick={notificationCartHandle}
          >

            {unreadCount > 0 && (
              <span className="absolute bg-red-500 text-white text-[0.6rem] md:text-sm font-bold rounded-full sm:w-4 w-3 sm:h-4 h-3 flex items-center justify-center md:right-2 sm:top-2 top-1 right-1  md:top-1">
                {unreadCount}
              </span>
            )}

            <GoBell className="text-gray-800 text-xl md:text-2xl" />
          </button>
        </div> */}
        {/* <div className="country-selector">
          <select
            id="country"
            value={selectedCountry}
            onChange={handleChange}
            className="outline-none border border-[#00425b] p-2 rounded"
          >
            <option value="">--Select a Country--</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div> */}
        <div
          className="uppercase bg-zinc-100 rounded-full w-5 h-5 lg:w-8 lg:h-8 border border-primary  overflow-hidden cursor-pointer flex justify-center items-center"
          onClick={() => setCloseProfile(!openProfile)}
        >
          <span className="text-xs lg:text-base">{userData?.name.charAt(0) || <CgProfile className="text-slate-400" />}</span>
        </div>

        {openProfile && (
          <div className="absolute shadow-sm text-sm right-0 top-[100%] bg-white z-40 mt-2 rounded-md capitalize whitespace-pre border border-light-secondary">
            <NavLink to="/">
              <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-primary text-primary hover:text-secondary">
                <FaHome className="text-light-primary" />
                Homepage
              </div>
            </NavLink>
            {userData?.userType === "masterAdmin" ? (
              <NavLink to="/masteradmin-account">
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-primary text-primary hover:text-secondary">
                  <IoSettingsOutline className="text-light-primary" />
                  account & settings
                </div>
              </NavLink>
            ) : userData?.userType === "superadmin" ? (
              <NavLink to="/superadmin-account">
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-primary text-primary hover:text-secondary">
                  <IoSettingsOutline className="text-light-primary" />
                  account & settings
                </div>
              </NavLink>
            ) : (
              <NavLink to="/admin-account">
                <div className="flex items-center gap-2 cursor-pointer px-4 py-2 hover:bg-primary text-primary hover:text-secondary">
                  <IoSettingsOutline className="text-light-primary" />
                  account & settings
                </div>
              </NavLink>
            )}

            <div
              className="text-error flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-error hover:text-secondary"
              onClick={logOutHandler}
            >
              <IoPowerSharp />
              logout
            </div>
          </div>
        )}
      </div>

      {isNotificationCartOpen && (
        <Notification
          notifications={notifications}
          onClose={notificationCartHandle}
        />
      )}
    </div>
  );
};

export default Header;
