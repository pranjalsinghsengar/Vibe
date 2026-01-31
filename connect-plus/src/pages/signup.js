// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { BiError } from "react-icons/bi";
// import { BlinkLoader } from "../components/loader";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoArrowRight } from "react-icons/go";

// const Signup = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         // username: "",
//         name: "",
//         email: "",
//         phone: "",
//         tenantname: "",
//         password: "",
//         address: {
//             line1: "",
//             line2: "",
//             city: "",
//             province: "",
//             zip: "",
//             country: "",
//             province_code: "",
//             country_code: ""
//         },
//         preferences: {
//             language: "en",
//             timeZone: "UTC",
//             referralCode: ""
//         },
//         // billing: {
//         //     paymentMethod: "paypal",
//         //     billingCycle: "annually"
//         // },
//         // status: "active"
//     });
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         setError("");
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [name]: value
//             }
//         }));
//         setError("");
//     };

//     const handlePreferencesChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             preferences: {
//                 ...prev.preferences,
//                 [name]: value
//             }
//         }));
//         setError("");
//     };

//     // const handleBillingChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setFormData(prev => ({
//     //         ...prev,
//     //         billing: {
//     //             ...prev.billing,
//     //             [name]: value
//     //         }
//     //     }));
//     //     setError("");
//     // };

//     // const toggleStatus = () => {
//     //     setFormData(prev => ({
//     //         ...prev,
//     //         status: prev.status === "active" ? "inactive" : "active"
//     //     }));
//     //     setError("");
//     // };

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         if (!formData.email) return setError("Please enter email address");
//         if (!formData.password) return setError("Please enter password");
//         if (!formData.username) return setError("Please enter username");
//         if (!formData.tenantname) return setError("Please enter tenant name");

//         try {
//             setLoading(true);
//             const response = await axios.post(
//                 `${apiurl}/api/whatsapp/tenant/create?config_id=10001`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/json"
//                     }
//                 }
//             );

//             if (!response.data.success) {
//                 setError(response.data.message || "Signup failed");
//             } else {
//                 navigate("/login");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Signup failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full min-h-screen flex justify-center bg-[#fffdfc] align-middle items-center p-2 md:p-10">
//             <div className="w-full h-full xl:max-h-[700px] md:w-[95%] xl:w-[85%] md:h-[80%] mx-auto">
//                 <div className="md:w-[100%] mx-auto md:h-screen-xl w-full h-full flex flex-col md:flex-row">
//                     <div className="w-full md:w-[80%] h-full flex flex-col justify-center p-5 items-center text-start">
//                         <div className="w-full max-w-3xl">
//                             <Link to="/">
//                                 <div className="flex justify-start w-full">
//                                     <img src="/logo.png" alt="Logo" className="h-12 mb-6" />
//                                 </div>
//                             </Link>
//                             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
//                                 Create your account
//                             </h2>
//                             <p className="text-gray-500 mb-8">
//                                 Please fill in the details to sign up
//                             </p>

//                             <form onSubmit={signupHandler} className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     {/* <div>
//                                         <label className="text-primary font-medium text-sm">Username</label>
//                                         <input
//                                             type="text"
//                                             name="username"
//                                             placeholder="Username"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.username}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div> */}
//                                     <div className="">
//                                         <label className="text-primary font-medium text-sm">Full Name</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Full Name"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.name}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Email Address</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             placeholder="Email"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Phone Number</label>
//                                         <input
//                                             type="text"
//                                             name="phone"
//                                             placeholder="Phone No."
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.phone}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Tenant Name</label>
//                                         <input
//                                             type="text"
//                                             name="tenantname"
//                                             placeholder="Tenant Name"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.tenantname}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>

//                                     <div className="relative">
//                                         <label className="text-primary font-medium text-sm">Password</label>
//                                         <input
//                                             type={showPassword ? "text" : "password"}
//                                             name="password"
//                                             placeholder="Password"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.password}
//                                             onChange={handleInputChange}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="absolute right-3 top-1/2 translate-y-1 text-gray-500"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                         >
//                                             {showPassword ? <FaEye /> : <FaEyeSlash />}
//                                         </button>
//                                     </div>



//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Address Line 1</label>
//                                         <input
//                                             type="text"
//                                             name="line1"
//                                             placeholder="Address Line 1"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.line1}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Address Line 2</label>
//                                         <input
//                                             type="text"
//                                             name="line2"
//                                             placeholder="Address Line 2"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.line1}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">City</label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.city}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Zip Code</label>
//                                         <input
//                                             type="text"
//                                             name="zip"
//                                             placeholder="Zip Code"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.zip}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Country</label>
//                                         <input
//                                             type="text"
//                                             name="country"
//                                             placeholder="Country"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.country}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Language</label>
//                                         <select
//                                             name="language"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.preferences.language}
//                                             onChange={handlePreferencesChange}
//                                         >
//                                             <option value="en">English</option>
//                                             <option value="es">Spanish</option>
//                                             <option value="fr">French</option>
//                                             <option value="de">German</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-2">
//                                         <label className="text-primary font-medium text-sm">Description</label>
//                                         <textarea
//                                             type="text"
//                                             name="description"
//                                             placeholder="Description"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.name}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>

//                                     {/* <div>
//                                         <label className="text-primary font-medium text-sm">Payment Method</label>
//                                         <select
//                                             name="paymentMethod"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.billing.paymentMethod}
//                                             onChange={handleBillingChange}
//                                         >
//                                             <option value="paypal">PayPal</option>
//                                             <option value="credit_card">Credit Card</option>
//                                             <option value="bank_transfer">Bank Transfer</option>
//                                         </select>
//                                     </div>

//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Billing Cycle</label>
//                                         <select
//                                             name="billingCycle"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.billing.billingCycle}
//                                             onChange={handleBillingChange}
//                                         >
//                                             <option value="monthly">Monthly</option>
//                                             <option value="annually">Annually</option>
//                                             <option value="quarterly">Quarterly</option>
//                                         </select>
//                                     </div> */}

//                                     {/* <div className="flex items-center">
//                                         <label className="text-primary font-medium text-sm mr-3">Status</label>
//                                         <button
//                                             type="button"
//                                             onClick={toggleStatus}
//                                             className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${formData.status === "active" ? "bg-secondary" : "bg-gray-300"
//                                                 }`}
//                                         >
//                                             <span
//                                                 className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${formData.status === "active" ? "translate-x-6" : "translate-x-1"
//                                                     }`}
//                                             />
//                                         </button>
//                                         <span className="ml-2 text-sm text-gray-600">
//                                             {formData.status === "active" ? "Active" : "Inactive"}
//                                         </span>
//                                     </div> */}
//                                 </div>

//                                 {error && (
//                                     <div className="text-red-500 text-sm flex items-center gap-2">
//                                         <BiError /> {error}
//                                     </div>
//                                 )}

//                                 <button
//                                     type="submit"
//                                     className="hover:bg-primary bg-secondary hover:text-secondary text-primary w-full font-semibold h-11 relative py-5 flex items-center justify-center"
//                                     disabled={loading}
//                                 >
//                                     <button className="group flex items-center gap-2 transition-all duration-300">
//                                         {loading ? (
//                                             <BlinkLoader />
//                                         ) : (
//                                             <span className="flex items-center ">
//                                                 Sign Up
//                                                 <GoArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2" />
//                                             </span>
//                                         )}
//                                     </button>
//                                 </button>
//                             </form>

//                             <div className="mt-6">
//                                 <p className="text-sm text-gray-600">
//                                     Already have an account?{" "}
//                                     <Link
//                                         to="/login"
//                                         className="text-sm text-slate-600 hover:text-primary font-medium"
//                                     >
//                                         Sign in
//                                     </Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full md:w-1/2 h-auto md:flex flex-col justify-center items-start hidden">
//                         <div className="">
//                             <img src="/login.png" alt="Signup Illustration" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;



























// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { apiurl } from "../config/config";
// import { BiError } from "react-icons/bi";
// import { BlinkLoader } from "../components/loader";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { GoArrowRight } from "react-icons/go";

// const Signup = () => {
//     const navigate = useNavigate();
//     const [formType, setFormType] = useState("service"); // Default to service
//     const [showPopup, setShowPopup] = useState(false); // State for popup
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         phone: "",
//         tenantname: "",
//         password: "",
//         description: "", // Added for enterprise mode
//         address: {
//             line1: "",
//             line2: "",
//             city: "",
//             province: "",
//             zip: "",
//             country: "",
//             province_code: "",
//             country_code: "",
//         },
//         preferences: {
//             language: "en",
//             timeZone: "UTC",
//             referralCode: "",
//         },
//     });
//     const [error, setError] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//         setError("");
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [name]: value,
//             },
//         }));
//         setError("");
//     };

//     const handlePreferencesChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             preferences: {
//                 ...prev.preferences,
//                 [name]: value,
//             },
//         }));
//         setError("");
//     };

//     useEffect(() => {
//         if (showPopup) {
//             const timer = setTimeout(() => {
//                 setShowPopup(false);
//                 navigate('/'); // Navigate after 10 seconds
//             }, 10000); // Hide popup after 10 seconds
//             return () => clearTimeout(timer);
//         }
//     }, [showPopup]);

//     const signupHandler = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!formData.email) return setError("Please enter email address");
//         if (formType === "service" && !formData.password) return setError("Please enter password");
//         if (!formData.name) return setError("Please enter full name");
//         if (!formData.tenantname) return setError("Please enter tenant name");

//         try {
//             setLoading(true);
//             if (formType === "enterprise") {
//                 // Enterprise mode: Call the provided API
//                 const enterpriseData = {
//                     fullName: formData.name || "John Doe",
//                     emailAddress: formData.email || "johndoe@example.com",
//                     tenantName: formData.tenantname || "Tenant1",
//                     phoneNumber: formData.phone || "1234567890",
//                     companyName: formData.tenantname || "Company ABC",
//                     addressLine: formData.address.line1 || "123 Street",
//                     city: formData.address.city || "New York",
//                     zipCode: formData.address.zip || "10001",
//                     county: formData.address.province || "NYC",
//                     comment: formData.description || "No comment",
//                 };

//                 const response = await axios.post(
//                     `${apiurl}/api/whatsapp/Lead/create`,
//                     enterpriseData,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );

//                 if (response.status === 200) {
//                     setShowPopup(true); // Show popup instead of navigating
//                 } else {
//                     setError("Enterprise lead creation failed.");
//                 }
//             } else {
//                 // Service mode: Original API call
//                 const response = await axios.post(
//                     `${apiurl}/api/whatsapp/tenant/create?config_id=10001`,
//                     formData,
//                     {
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     }
//                 );

//                 if (!response.data.success) {
//                     setError(response.data.message || "Signup failed");
//                 } else {
//                     navigate("/login");
//                 }
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Signup failed. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full min-h-screen flex justify-center bg-[#fffdfc] align-middle items-center p-2 md:p-10">
//             <div className="w-full h-full xl:max-h-[700px] md:w-[95%] xl:w-[85%] md:h-[80%] mx-auto">
//                 <div className="md:w-[100%] mx-auto md:h-screen-xl w-full h-full flex flex-col md:flex-row">
//                     <div className="w-full md:w-[80%] h-full flex flex-col justify-center p-5 items-center text-start">
//                         <div className="w-full max-w-3xl">
//                             <Link to="/">
//                                 <div className="flex justify-start w-full">
//                                     <img src="/vibe/logo.png" alt="Logo" className="h-12 mb-6" />
//                                 </div>
//                             </Link>
//                             <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
//                                 Create your account
//                             </h2>
//                             <p className="text-gray-500 mb-8">
//                                 Please fill in the details to sign up
//                             </p>

//                             <form onSubmit={signupHandler} className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                     <div className="col-span-2">
//                                         <label className="text-primary font-medium text-sm">Sign up as</label>
//                                         <div className="flex gap-4">
//                                             <label className="flex items-center">
//                                                 <input
//                                                     type="radio"
//                                                     name="formType"
//                                                     value="service"
//                                                     checked={formType === "service"}
//                                                     onChange={() => setFormType("service")}
//                                                     className="mr-2"
//                                                 />
//                                                 As a Service
//                                             </label>
//                                             <label className="flex items-center">
//                                                 <input
//                                                     type="radio"
//                                                     name="formType"
//                                                     value="enterprise"
//                                                     checked={formType === "enterprise"}
//                                                     onChange={() => setFormType("enterprise")}
//                                                     className="mr-2"
//                                                 />
//                                                 As an Enterprise
//                                             </label>
//                                         </div>
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Full Name</label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             placeholder="Full Name"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.name}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Email Address</label>
//                                         <input
//                                             type="email"
//                                             name="email"
//                                             placeholder="Email"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.email}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Phone Number</label>
//                                         <input
//                                             type="text"
//                                             name="phone"
//                                             placeholder="Phone No."
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.phone}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Tenant Name</label>
//                                         <input
//                                             type="text"
//                                             name="tenantname"
//                                             placeholder="Tenant Name"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.tenantname}
//                                             onChange={handleInputChange}
//                                         />
//                                     </div>
//                                     {formType === "service" && (
//                                         <div className="relative">
//                                             <label className="text-primary font-medium text-sm">Password</label>
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 name="password"
//                                                 placeholder="Password"
//                                                 className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                                 value={formData.password}
//                                                 onChange={handleInputChange}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 className="absolute right-3 top-1/2 translate-y-1 text-gray-500"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                             >
//                                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                                             </button>
//                                         </div>
//                                     )}
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Address Line 1</label>
//                                         <input
//                                             type="text"
//                                             name="line1"
//                                             placeholder="Address Line 1"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.line1}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Address Line 2</label>
//                                         <input
//                                             type="text"
//                                             name="line2"
//                                             placeholder="Address Line 2"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.line2}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">City</label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             placeholder="City"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.city}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Zip Code</label>
//                                         <input
//                                             type="text"
//                                             name="zip"
//                                             placeholder="Zip Code"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.zip}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Country</label>
//                                         <input
//                                             type="text"
//                                             name="country"
//                                             placeholder="Country"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.address.country}
//                                             onChange={handleAddressChange}
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="text-primary font-medium text-sm">Language</label>
//                                         <select
//                                             name="language"
//                                             className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                             value={formData.preferences.language}
//                                             onChange={handlePreferencesChange}
//                                         >
//                                             <option value="en">English</option>
//                                             <option value="es">Spanish</option>
//                                             <option value="fr">French</option>
//                                             <option value="de">German</option>
//                                         </select>
//                                     </div>
//                                     {formType === "enterprise" && (
//                                         <div className="col-span-2">
//                                             <label className="text-primary font-medium text-sm">Description</label>
//                                             <textarea
//                                                 name="description"
//                                                 placeholder="Description"
//                                                 className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
//                                                 value={formData.description}
//                                                 onChange={handleInputChange}
//                                             />
//                                         </div>
//                                     )}
//                                 </div>

//                                 {error && (
//                                     <div className="text-red-500 text-sm flex items-center gap-2">
//                                         <BiError /> {error}
//                                     </div>
//                                 )}

//                                 <button
//                                     type="submit"
//                                     className="hover:bg-primary bg-secondary hover:text-secondary text-primary w-full font-semibold h-11 relative py-5 flex items-center justify-center"
//                                     disabled={loading}
//                                 >
//                                     <span className="group flex items-center gap-2 transition-all duration-300">
//                                         {loading ? (
//                                             <BlinkLoader />
//                                         ) : (
//                                             <span className="flex items-center">
//                                                 Submit
//                                                 <GoArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2" />
//                                             </span>
//                                         )}
//                                     </span>
//                                 </button>
//                             </form>

//                             <div className="mt-6">
//                                 <p className="text-sm text-gray-600">
//                                     Already have an account?{" "}
//                                     <Link
//                                         to="/login"
//                                         className="text-sm text-slate-600 hover:text-primary font-medium"
//                                     >
//                                         Sign in
//                                     </Link>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="w-full md:w-1/2 h-auto md:flex flex-col justify-center items-start hidden">
//                         <div className="">
//                             <img src="/vibe/login.png" alt="Signup Illustration" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {showPopup && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-sm shadow-lg max-w-sm w-full text-center">
//                         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                             Thank you for submitting your details!
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             We'll contact you regarding this.
//                         </p>
//                         <Link to="/">
//                             <button
//                                 className="bg-secondary text-primary hover:bg-primary hover:text-secondary font-semibold py-2 px-4 rounded-sm transition-all duration-300"
//                                 onClick={() => setShowPopup(false)}
//                             >
//                                 Go to Home Page
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Signup;













import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiurl } from "../config/config";
import { BiError } from "react-icons/bi";
import { BlinkLoader } from "../components/loader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";

const Signup = () => {
  const navigate = useNavigate();
  const [formType, setFormType] = useState("service"); // Default to service
  const [showPopup, setShowPopup] = useState(false); // State for popup
  // New state to hold WhatsApp data from embedded signup
  const [whatsappData, setWhatsappData] = useState(null);
  const [authCode, setAuthCode] = useState(null);
  const [tokenExchangeLoading, setTokenExchangeLoading] = useState(false);
  const [tokenExchangeError, setTokenExchangeError] = useState("");

  console.log("tokenExchangeError :", tokenExchangeError);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tenantname: "",
    password: "",
    description: "", // Added for enterprise mode
    address: {
      line1: "",
      line2: "",
      city: "",
      province: "",
      zip: "",
      country: "",
      province_code: "",
      country_code: "",
    },
    preferences: {
      language: "en",
      timeZone: "UTC",
      referralCode: "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const APP_ID = "1092789926011159"; // Your provided App ID (note: seems incomplete, verify)
  const APP_SECRET = "6ab9cc2cc66d8eda1b02467e242e7298";

  // Load Facebook SDK
  useEffect(() => {
    // Initialize Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID || "1092789926011159", // Replace with your App ID or use env variable
        cookie: true,
        xfbml: true,
        version: "v22.0", // Update to the latest version if needed
      });

      window.FB.AppEvents.logPageView();
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");

    // Handle WhatsApp signup messages
    const handleMessage = (event) => {
      if (!event.origin.endsWith("facebook.com")) return;
      try {
        const data = JSON.parse(event.data);
        if (data.type === "WA_EMBEDDED_SIGNUP") {
          console.log("Embedded Signup Message:", data);

          setWhatsappData({
            wabaId: data.data.waba_id,
            phoneNumberId: data.data.phone_number_id,
            metadata:data
          });

          // Handle WABA ID, phone number, etc.
          if (data.data && data.data.waba_id) {
            setFormData((prev) => ({
              ...prev,
              phone: data.data.phone_number || prev.phone,
              tenantname: data.data.waba_id || prev.tenantname,
            }));
            setShowPopup(true); // Show success popup
          }
        }
      } catch {
        console.log("Received non-JSON message:", event.data);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
        navigate("/"); // Navigate after 10 seconds
      }, 10000); // Hide popup after 10 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value,
      },
    }));
    setError("");
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
    setError("");
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email) return setError("Please enter email address");
    if (formType === "service" && !formData.password)
      return setError("Please enter password");
    if (!formData.name) return setError("Please enter full name");
    if (!formData.tenantname) return setError("Please enter tenant name");

    try {
      setLoading(true);
      if (formType === "enterprise") {
        // Enterprise mode: Call the provided API
        const enterpriseData = {
          fullName: formData.name || "John Doe",
          emailAddress: formData.email || "johndoe@example.com",
          tenantName: formData.tenantname || "Tenant1",
          phoneNumber: formData.phone || "1234567890",
          companyName: formData.tenantname || "Company ABC",
          addressLine: formData.address.line1 || "123 Street",
          city: formData.address.city || "New York",
          zipCode: formData.address.zip || "10001",
          county: formData.address.province || "NYC",
          comment: formData.description || "No comment",
        };

        const response = await axios.post(
          `${apiurl}/api/whatsapp/Lead/create`,
          enterpriseData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setShowPopup(true); // Show popup instead of navigating
        } else {
          setError("Enterprise lead creation failed.");
        }
      } else {
        // Service mode: Original API call
        const response = await axios.post(
          `${apiurl}/api/whatsapp/tenant/create?config_id=10001`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.data.success) {
          setError(response.data.message || "Signup failed");
        } else {
          navigate("/login");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to exchange code for token
  const exchangeCodeForToken = async (code) => {
    console.log(">>>1084",whatsappData)
    if (!whatsappData) {
      setTokenExchangeError(
        "Missing WhatsApp Business Account data. Please complete signup flow."
      );
      return;
    }

    setTokenExchangeLoading(true);
    setTokenExchangeError("");

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/verified/exchangeCodeForToken`,
        {
          code: code,
          app_id: APP_ID,
          app_secret: APP_SECRET,
          wabaId: whatsappData.wabaId,
          phoneNumberId: whatsappData.phoneNumberId,
          metadata:whatsappData
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Token Exchange Success:", response.data);

      // You can store the token or use it for further setup
      // For example, send it to your backend along with signup
      // Or auto-submit the form here if desired

      // alert("WhatsApp account linked successfully! Token received.");
      // Optionally navigate or auto-submit signup
      // navigate("/dashboard");
    } catch (err) {
      console.error(
        "Token exchange failed:",
        err.response?.data || err.message
      );
      setTokenExchangeError(
        err.response?.data?.message || "Failed to exchange code for token."
      );
    } finally {
      setTokenExchangeLoading(false);
    }
  };

  // Handle WhatsApp signup callback
  const fbLoginCallback = (response) => {
    if (response.authResponse) {
      console.log("Auth Code:", response.authResponse.code);
      // Send this to your backend to exchange for a long-lived access token
      exchangeCodeForToken(response.authResponse.code);
    } else {
      console.warn("Login cancelled or failed:", response);
      setError("WhatsApp signup cancelled or failed.");
    }
  };

  // Trigger WhatsApp Embedded Signup
  const launchWhatsAppSignup = () => {
    if (window.FB) {
      window.FB.login(fbLoginCallback, {
        config_id: "1148915433575659", // Replace with your Configuration ID
        response_type: "code",
        override_default_response_type: true,
        extras: {
          setup: {},
          featureType: "EMBEDDED_SIGNUP",
          sessionInfoVersion: "3",
        },
      });
    } else {
      setError("Facebook SDK not loaded. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#fffdfc] align-middle items-center p-2 md:p-10">
      <div className="w-full h-full xl:max-h-[700px] md:w-[95%] xl:w-[85%] md:h-[80%] mx-auto">
        <div className="md:w-[100%] mx-auto md:h-screen-xl w-full h-full flex flex-col md:flex-row">
          <div className="w-full md:w-[80%] h-full flex flex-col justify-center p-5 items-center text-start">
            <div className="w-full max-w-3xl">
              <Link to="/">
                <div className="flex justify-start w-full">
                  <img src="/logo.png" alt="Logo" className="h-12 mb-6" />
                </div>
              </Link>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Create your account
              </h2>
              <p className="text-gray-500 mb-8">
                Please fill in the details to sign up or use WhatsApp
              </p>

              {/* WhatsApp Signup Button */}
              <button
                onClick={launchWhatsAppSignup}
                className="mb-6 hover:bg-primary bg-secondary hover:text-secondary text-primary font-semibold py-3 px-6 rounded-sm transition-all duration-300"
                disabled={loading}
              >
                Signup with WhatsApp
              </button>

              <form onSubmit={signupHandler} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-primary font-medium text-sm">
                      Sign up as
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="formType"
                          value="service"
                          checked={formType === "service"}
                          onChange={() => setFormType("service")}
                          className="mr-2"
                        />
                        As a Service
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="formType"
                          value="enterprise"
                          checked={formType === "enterprise"}
                          onChange={() => setFormType("enterprise")}
                          className="mr-2"
                        />
                        As an Enterprise
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone No."
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Tenant Name
                    </label>
                    <input
                      type="text"
                      name="tenantname"
                      placeholder="Tenant Name"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.tenantname}
                      onChange={handleInputChange}
                    />
                  </div>
                  {formType === "service" && (
                    <div className="relative">
                      <label className="text-primary font-medium text-sm">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 translate-y-1 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  )}
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      name="line1"
                      placeholder="Address Line 1"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.address.line1}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      name="line2"
                      placeholder="Address Line 2"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.address.line2}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.address.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      placeholder="Zip Code"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.address.zip}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.address.country}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="text-primary font-medium text-sm">
                      Language
                    </label>
                    <select
                      name="language"
                      className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                      value={formData.preferences.language}
                      onChange={handlePreferencesChange}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  {formType === "enterprise" && (
                    <div className="col-span-2">
                      <label className="text-primary font-medium text-sm">
                        Description
                      </label>
                      <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full px-4 py-3 bg-[#f4f2f0] focus:outline-none focus:ring-1 focus:ring-primary"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}
                </div>

                {error && (
                  <div className="text-red-500 text-sm flex items-center gap-2">
                    <BiError /> {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="hover:bg-primary bg-secondary hover:text-secondary text-primary w-full font-semibold h-11 relative py-5 flex items-center justify-center"
                  disabled={loading}
                >
                  <span className="group flex items-center gap-2 transition-all duration-300">
                    {loading ? (
                      <BlinkLoader />
                    ) : (
                      <span className="flex items-center">
                        Submit
                        <GoArrowRight className="ml-2 transform transition-transform duration-300 group-hover:translate-x-2" />
                      </span>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-sm text-slate-600 hover:text-primary font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 h-auto md:flex flex-col justify-center items-start hidden">
            <div className="">
              <img src="/login.png" alt="Signup Illustration" />
            </div>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-sm shadow-lg max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Thank you for submitting your details!
            </h3>
            <p className="text-gray-600 mb-6">
              We'll contact you regarding this.
            </p>
            <Link to="/">
              <button
                className="bg-secondary text-primary hover:bg-primary hover:text-secondary font-semibold py-2 px-4 rounded-sm transition-all duration-300"
                onClick={() => setShowPopup(false)}
              >
                Go to Home Page
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
