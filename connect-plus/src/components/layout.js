// import React, { useContext, useState } from "react";
// import Header from "./header";
// import Sidebar from "./sidebar";
// import { IoClose } from "react-icons/io5";
// import { useUser } from "../config/userProvider";
// import "../styles/Admin.css";
// import MobileFooter from "./mobileFooter";
// import { IoSearch } from "react-icons/io5";
// import { CiSearch } from "react-icons/ci";
// // import Card from "./card";
// // import FixallAi from "./fixallAi.js";
// import { BsChatFill, BsSend } from "react-icons/bs";
// import { MdClose } from "react-icons/md";
// import { IoLogoAndroid } from "react-icons/io";
// import { DiApple } from "react-icons/di";
// import { RiMobileDownloadLine } from "react-icons/ri";
// import { toast } from "react-toastify";
// import UniversalChats from "../pages/universalChats";
// import { Link, useLocation } from "react-router-dom";
// import { ThemeContext } from "../config/themeContext";

// const Layout = ({ children }) => {
//   const {
//     user,
//     openProfile,
//     setCloseProfile,
//     isMenuOpen,
//     setIsMenuOpen,
//     showSearch,
//     setShowSearch,
//   } = useUser();
//   const { colors, setColors, logoUrl, setLogoUrl, applyColors } =
//     useContext(ThemeContext);
//   const [isButtonVisible, setIsButtonVisible] = useState(false);
//   const toggleButtonVisibility = () => {
//     setIsButtonVisible(!isButtonVisible);
//   };
//   const [isOpen, setIsOpen] = useState(false); // State to toggle chat window

//   const location = useLocation();

//   const hideUniversalChats = location.pathname === "/chats";

//   return (
//     <div
//       className=" h-screen w-full overflow-hidden"
//       onClick={() => (openProfile === true ? setCloseProfile(false) : null)}
//     >
//       <div className="flex  h-full">
//         <div
//           className={`sm:relative z-20 transition-all duration-500 ${
//             isMenuOpen
//               ? "absolute inset-y-0 left-0 w-72 translate-x-0 opacity-100 z-50"
//               : "absolute inset-y-0 left-0 w-16 -translate-x-full sm:translate-x-0 sm:w-16 opacity-0 sm:opacity-100"
//           }
//     flex flex-col bg-gradient-to-b from-gray-950 to-black
//     border-r border-gray-800/40
//     overflow-visible              
//   `}
//         >
//           <div className="w-full flex justify-between items-center">
//             <div className="flex justify-center w-full">
//               <Link to="/">
//                 <Link to="/">
//                   {logoUrl === "" ? (
//                     <img
//                       className="w-auto h-10 lg:h-12 max-h-12 max-w-33 "
//                       src="/logo.png"
//                       alt="logo"
//                     />
//                   ) : (
//                     <img
//                       className="w-auto h-10 lg:h-12 max-h-12 max-w-33 "
//                       src={logoUrl}
//                       alt="logo"
//                     />
//                   )}
//                 </Link>
//               </Link>
//             </div>
//             <div
//               className="text-2xl text-primary  block lg:hidden cursor-pointer"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <IoClose />
//             </div>
//           </div>
//           <Sidebar />
//           <p className="absolute hidden bottom-0.5  bg-inherit w-full lg:flex flex-col justify-center h-15 items-center left-1/2 transform -translate-x-1/2 text-secondary text-xs">
//             Powered By{" "}
//             <img
//               src="/fixlabWhiteLogo.png"
//               alt="FixLab Logo"
//               className="h-8 ml-1"
//             />
//           </p>
//         </div>
//         <div className="w-full  lg:w-full flex flex-col overflow-hidden h-full border-2 border-primary">
//           {isMenuOpen && (
//             <div
//               className=" block lg:hidden w-full h-full fixed backdrop-blur-[0.2rem] z-30"
//               onClick={() => setIsMenuOpen(false)}
//             ></div>
//           )}
//           <Header className="h-[6vh] " />
//           <div
//             className="h-[94vh] overflow-auto custom-scrollbar"
//             onClick={() => setCloseProfile(false)}
//           >
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

// export const Container = ({ children, className, overflow, ...props }) => {
//   return (
//     <div
//       className={`bg-white/100 relative rounded-2xl p-2  h-full ${className} ${
//         overflow ? overflow : "overflow-hidden"
//       } `}
//       {...props}
//     >
//       {children}
//     </div>
//   );
// };









import React, { useContext } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { IoClose } from "react-icons/io5";
import { useUser } from "../config/userProvider";
import "../styles/Admin.css";
import MobileFooter from "./mobileFooter";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../config/themeContext";

const Layout = ({ children }) => {
  const {
    user,
    openProfile,
    setCloseProfile,
    isMenuOpen,
    setIsMenuOpen,
  } = useUser();

  const { logoUrl } = useContext(ThemeContext);

  const location = useLocation();
  // const hideUniversalChats = location.pathname === "/chats"; // unused in this snippet

  return (
    <div
      className="h-screen w-full overflow-hidden"
      onClick={() => (openProfile === true ? setCloseProfile(false) : null)}
    >
      <div className="flex h-full">
        <div
          className={`
            fixed lg:static lg:translate-x-0 z-50 lg:z-[100]
            inset-y-0 left-0
            w-72 lg:w-auto
            transition-transform duration-500 ease-in-out
            ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
            flex flex-col bg-gradient-to-b from-gray-950 to-black
            border-r border-gray-800/40
            overflow-visible
          `}
        >
          <div className="w-full flex justify-between items-center px-4 lg:px-1 py-3 border-b border-gray-800/40">
            <div className="flex w-full justify-center">
              <Link to="/">
                {logoUrl === "" ? (
                  <img
                    className="w-full h-auto max-w-14"
                    src="/logo.png"
                    alt="logo"
                  />
                ) : (
                  <img
                    className="w-full h-auto max-w-14"
                    src={logoUrl}
                    alt="logo"
                  />
                )}
              </Link>
            </div>

            {/* Close button – only visible on mobile */}
            <div
              className="text-2xl text-secondary block lg:hidden cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoClose />
            </div>
          </div>

          <Sidebar />

          {/* Powered by footer – desktop only */}
          {/* <p className="absolute hidden lg:flex bottom-0.5 bg-inherit w-full flex-col justify-center h-14 items-center left-1/2 transform -translate-x-1/2 text-secondary text-[0.65rem]">
            Powered By
            <img
              src="/fixlabWhiteLogo.png"
              alt="FixLab Logo"
              className="h-8 ml-1"
            />
          </p> */}
        </div>
        <div className="flex-1 flex flex-col overflow-hidden h-full border-2 border-primary">
          {/* Mobile backdrop when menu is open */}
          {isMenuOpen && (
            <div
              className="block lg:hidden fixed inset-0 bg-black/50 backdrop-blur-[0.2rem] z-30"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          <Header className="h-[6vh]" />
          <div
            className="flex-1 overflow-auto custom-scrollbar"
            onClick={() => setCloseProfile(false)}
          >
            {children}
          </div>
          {/* <div className="lg:hidden">
            <MobileFooter />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Layout;

export const Container = ({ children, className, overflow, ...props }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-2 h-full ${className} ${
        overflow ? overflow : "overflow-hidden"
      }`}
      {...props}
    >
      {children}
    </div>
  );
};