import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/config";
import { BiError } from "react-icons/bi";
import { BlinkLoader } from "../components/loader";
import { setCookie } from "../config/webStorage.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useUser } from "../config/userProvider";
import { GoArrowRight } from "react-icons/go";
import { Checkbox } from "../components/checkbox.js";


const UserLogin = () => {
  const { userData, token } = useUser();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loginloading, setloginloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // State to toggle chat window
  const [rememberMe, setRememberMe] = useState(false);
  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email) return setError("Please enter email address");
    if (!password) return setError("Please enter password");
    try {
      setloginloading(true);
      const response = await axios.post(`${apiurl}/api/whatsapp/user/login`, {
        email,
        password,
      });


      setCookie("user", JSON.stringify(response?.data?.user));
      if (!response.data.success) {
        setError(response.data.message);
      } else {
        if (rememberMe === true) {
          const loginToken = response.data.refreshToken;
          setCookie("sctoken", loginToken, 2505600);
        } else {
          const loginToken = response.data.accessToken;
          setCookie("sctoken", loginToken, 25200);
        }
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setloginloading(false);
    }
  };
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/app-release.apk';
    link.download = 'inficonnect.apk';
    link.click();
  };
  return (
    // <div className="w-[100vw] min-h-screen flex justify-center bg-[#fffdfc] align-middle items-center p-2 md:p-10">
    //   <div className="w-full h-full xl:max-h-[600px] md:w-[90%] xl:w-[70%] md:h-[80%] mx-auto ">
    //     <div className="  md:w-[100%] mx-auto  md:h-screen-xl w-full h-full flex flex-col md:flex-row">
    //       <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-5 items-center text-start">
    //         <div className="max-w-md ">
    //           <Link to="/">
    //             <div className="flex  justify-start w-full">
    //               <img src="/logo.png" alt="Logo" className="h-12 mb-6 " />
    //             </div>
    //           </Link>
    //           <h2 className="text-xl md:text-2xl font-semibold   text-primary mb-2">
    //             Welcome back!
    //           </h2>
    //           <p className="text-gray-500   mb-8">
    //             Please login to your account
    //           </p>

    //           <form onSubmit={loginHandler} className="space-y-4">
    //             <div>
    //               <label className="text-primary font-medium text-sm">
    //                 Email Address
    //               </label>
    //               <input
    //                 type="email"
    //                 placeholder="Email"
    //                 className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
    //                 value={email}
    //                 onChange={(e) => {
    //                   setEmail(e.target.value);
    //                   setError("");
    //                 }}
    //               />
    //             </div>
    //             <div>
    //               <label className="text-primary font-medium text-sm">
    //                 Password
    //               </label>
    //               <div className="relative">

    //                 <input
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="Password"
    //                   className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
    //                   value={password}
    //                   onChange={(e) => {
    //                     setPassword(e.target.value);
    //                     setError("");
    //                   }}
    //                 />
    //                 <button
    //                   type="button"
    //                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 >
    //                   {showPassword ? <FaEye /> : <FaEyeSlash />}
    //                 </button>
    //               </div>
    //             </div>

    //             {error && (
    //               <div className="text-red-500 text-sm flex items-center gap-2">
    //                 <BiError /> {error}
    //               </div>
    //             )}

    //             <div className="flex items-center justify-between">
    //               <label className="flex items-center cursor-pointer">
    //                 <Checkbox onChange={handleCheckboxChange} checked={rememberMe} />
    //                 <span className="ml-2 text-sm text-gray-600">
    //                   Remember Me
    //                 </span>
    //               </label>
    //             </div>

    //             <button
    //               type="submit"
    //               className="w-full hover:bg-primary bg-secondary hover:text-secondary text-primary font-semibold  h-11 relative py-5 transition duration-200 flex items-center justify-center"
    //               disabled={loginloading}
    //             >
    //               {/* {loginloading ? <BlinkLoader /> : "Sign In" < GoArrowRight />} */}
    //               <button className="group flex items-center gap-2 transition-all duration-300">
    //                 {loginloading ? (
    //                   <BlinkLoader />
    //                 ) : (
    //                   <span className="flex items-center ">
    //                     Sign In
    //                     <GoArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2" />
    //                   </span>
    //                 )}
    //               </button>
    //             </button>
    //           </form>

    //           <div className="mt-6  ">
    //             <p className="text-sm text-gray-600">
    //               Don't have an account yet?{" "}
    //               <Link
    //                 // to="https://fixall.ai/products/sales/inficonnect/signup"
    //                 to="/signup"
    //                 className="text-sm text-slate-600 hover:text-primary font-medium"
    //               >
    //                 Sign up
    //               </Link>
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-full md:w-1/2 h-auto  md:flex flex-col  justify-center items-start hidden ">
    //         <div className="">
    //           <img src="/login.png"></img>
    //         </div>

    //       </div>

    //     </div>
    //   </div>
    // </div>











    <div className="w-[100vw] min-h-screen flex justify-center align-middle items-center p-2 md:p-10">
      <div className="w-full h-full xl:max-h-[600px] md:w-[90%] xl:w-[70%] md:h-[80%] mx-auto border border-slate-300 rounded-xl md:shadow-md ">
        <div className="rounded-lg  md:w-[100%] mx-auto  md:h-screen-xl w-full h-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-auto  md:flex flex-col  justify-center pr-[5%] items-start hidden ">
            <div
              className=" flex flex-col justify-between h-full relative w-[100%]  rounded-xl"
              style={{
                background:
                  "linear-gradient(156.97deg, #9089FF 14.91%, #CECBFF 58.52%, #FFFFFF 93.18%)",
              }}
            >
              <div className="flex flex-col w-full  justify-start align-middle items-center mt-5 h-full">
              </div>
              <div className="flex absolute bottom-0 -right-[40%] justify-center w-auto h-[70%]">
                <img src="/loginBackground.png" alt="Logo" className=" " />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-5 items-center">
            <div className="max-w-md">
              <div className="flex  justify-center w-full">
                <img src="/logo.png" alt="Logo" className="h-14 mb-2 " />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-2">
                Login in to your account
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Please enter your Login ID and Password
              </p>

              <form onSubmit={loginHandler} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm flex items-center gap-2">
                    <BiError /> {error}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 "
                      onClick={handleCheckboxChange}
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember Me
                    </span>
                  </label>
                  {/* <Link
                    to="/forgetpassword"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot Password?
                  </Link> */}

                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 relative text-white py-5 rounded-md transition duration-200 flex items-center justify-center"
                  disabled={loginloading}
                >
                  {loginloading ? <BlinkLoader /> : "Sign In"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account yet?{" "}
                  <Link
                    to="/signup"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
