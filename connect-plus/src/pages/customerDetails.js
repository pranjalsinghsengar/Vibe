// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout, { Container } from '../components/layout';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';
// import BackHeader from '../components/backHeader';
// import { IoMdArrowRoundBack } from 'react-icons/io';
// import SearchContainer from '../components/searchContainer';

// function CustomerDetails() {
//     const { customerId } = useParams();
//     const token = getCookie('sctoken');
//     const [adminInfo, setAdminInfo] = useState(null);
//     const [userList, setUserList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [userListLoading, setUserListLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [userListError, setUserListError] = useState(null);
//     const [isUserListOpen, setIsUserListOpen] = useState(false);
//     const [searchInput, setSearchInput] = useState('');

//     // Fetch admin details
//     useEffect(() => {
//         const fetchAdminInfo = async () => {
//             try {
//                 const response = await axios.get(
//                     `${apiurl}/api/whatsapp/user/getadminInfo?id=${customerId}`,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setAdminInfo(response.data.Super_admin); // Assuming API returns admin data in Super_admin field; adjust if needed
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch admin info');
//                 setLoading(false);
//             }
//         };
//         fetchAdminInfo();
//     }, [customerId, token]);

//     // Fetch user list
//     const fetchUserList = async () => {
//         setUserListLoading(true);
//         setUserListError(null);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getuserlistofadmin?id=${customerId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setUserList(response.data.users || []);
//             setUserListLoading(false);
//             setIsUserListOpen(true); // Open popup
//         } catch (err) {
//             setUserListError('Failed to fetch user list');
//             setUserListLoading(false);
//         }
//     };

//     // Close popup
//     const closeUserList = () => {
//         setIsUserListOpen(false);
//         setUserList([]);
//         setUserListError(null);
//     };

//     if (loading) return <Layout><div className="text-center text-text-primary">Loading...</div></Layout>;
//     if (error) return <Layout><div className="text-center text-error">{error}</div></Layout>;

//     return (
//         <Layout>
//             <Container>
//                 <div className="border bg-white h-full w-full px-2 py-2 overflow-y-scroll custom-scrollbar">
//                     <div className="p-2">
//                         <div className="mb-5">
//                             <BackHeader
//                                 title={<span className="flex flex-col md:flex-row items-center">Customer Details</span>}
//                                 backButton={true}
//                                 link="/customers"
//                             />
//                         </div>

//                         {adminInfo && (
//                             <div className="relative border border-light-primary rounded-2xl p-8 mb-8">
//                                 <div className="relative z-10">
//                                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                                         {/* Left Column */}
//                                         <div className="space-y-5 text-left">
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Name</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.name}</p>
//                                             </div>
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Email</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.email}</p>
//                                             </div>
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Phone</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.phone || 'N/A'}</p>
//                                             </div>
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Tenant</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.tenant.tenantName}</p>
//                                             </div>
//                                         </div>

//                                         {/* Right Column */}
//                                         <div className="space-y-5 text-left">
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">User Type</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.userType}</p>
//                                             </div>
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Status</span>
//                                                 <p className="text-text-primary text-lg font-medium">
//                                                     <span
//                                                         className={`text-lg font-medium ${
//                                                             adminInfo.status === 'active'
//                                                                 ? 'text-success'
//                                                                 : 'text-error'
//                                                         }`}
//                                                     >
//                                                         {adminInfo.status}
//                                                     </span>
//                                                 </p>
//                                             </div>
//                                             <div className="flex items-center gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Wallet</span>
//                                                 <p className="text-text-primary text-lg font-medium">{adminInfo.wallet}</p>
//                                             </div>
//                                             <div className="flex gap-4">
//                                                 <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Address</span>
//                                                 <div className="space-y-2">
//                                                     <p className="text-text-secondary text-base">{adminInfo.address.name}</p>
//                                                     <p className="text-text-secondary text-base">{adminInfo.address.line1}</p>
//                                                     {adminInfo.address.line2 && (
//                                                         <p className="text-text-secondary text-base">{adminInfo.address.line2}</p>
//                                                     )}
//                                                     <p className="text-text-secondary text-base">
//                                                         {adminInfo.address.city}, {adminInfo.address.province}{' '}
//                                                         {adminInfo.address.zip}, {adminInfo.address.country}
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         <div className="flex justify-end">
//                             <button
//                                 onClick={fetchUserList}
//                                 disabled={userListLoading}
//                                 className={`w-full md:w-auto px-4 py-2 rounded-sm text-white font-medium transition-colors
//                                     ${userListLoading ? 'bg-primary cursor-not-allowed opacity-70' : 'bg-primary hover:bg-light-primary'}`}
//                             >
//                                 {userListLoading ? 'Loading...' : 'Show User List'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* User List Popup */}
//                 {isUserListOpen && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                         <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto shadow-xl">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-xl font-semibold text-primary">User List</h3>
//                                 <button
//                                     onClick={closeUserList}
//                                     className="text-text-secondary hover:text-primary transition-colors"
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             {userListError && <p className="text-error mb-4">{userListError}</p>}

//                             {userList.length > 0 ? (
//                                 <>
//                                     <div className="mb-4">
//                                         <SearchContainer
//                                             value={searchInput}
//                                             placeholder="Search Users..."
//                                             onChange={(e) => setSearchInput(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className="overflow-x-auto">
//                                         <table className="w-full">
//                                             <thead className="bg-accent sticky top-0">
//                                                 <tr>
//                                                     {['Name', 'Email', 'Phone', 'Status'].map((header) => (
//                                                         <th key={header} className="px-4 py-2 text-left text-text-primary font-medium border-b border-light-secondary">
//                                                             {header}
//                                                         </th>
//                                                     ))}
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {userList
//                                                     .filter((user) =>
//                                                         user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
//                                                         user.email.toLowerCase().includes(searchInput.toLowerCase())
//                                                     )
//                                                     .map((user) => (
//                                                         <tr key={user.id} className="hover:bg-accent transition-colors">
//                                                             <td className="px-4 py-2 border-b border-light-secondary">{user.name}</td>
//                                                             <td className="px-4 py-2 border-b border-light-secondary">{user.email}</td>
//                                                             <td className="px-4 py-2 border-b border-light-secondary">{user.phone || 'N/A'}</td>
//                                                             <td className="px-4 py-2 border-b border-light-secondary">
//                                                                 <span
//                                                                     className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
//                                                                         user.status === 'active'
//                                                                             ? 'bg-success bg-opacity-20 text-success'
//                                                                             : 'bg-error bg-opacity-20 text-error'
//                                                                     }`}
//                                                                 >
//                                                                     {user.status}
//                                                                 </span>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                 </>
//                             ) : (
//                                 <p className="text-text-secondary">No users found.</p>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </Container>
//         </Layout>
//     );
// }

// export default CustomerDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout, { Container } from "../components/layout";
import { apiurl } from "../config/config"; // Note: your list API is on a different base URL
import { getCookie } from "../config/webStorage";
import BackHeader from "../components/backHeader";
import SearchContainer from "../components/searchContainer";
import { RiCloseFill } from "react-icons/ri";

function CustomerDetails() {
  const { customerId } = useParams();
  const token = getCookie("sctoken");
  const [adminInfo, setAdminInfo] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userListLoading, setUserListLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userListError, setUserListError] = useState(null);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  // Pricing Popup States
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [saving, setSaving] = useState({});
  const [priceError, setPriceError] = useState("");
  const [pricesLoading, setPricesLoading] = useState(false);

  // Prices will be populated from API
  const [prices, setPrices] = useState({
    marketing: null,
    authentication: null,
    utility: null,
    service: null,
  });

  // Fetch admin details
  useEffect(() => {
    const fetchAdminInfo = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/user/getadminInfo?id=${customerId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdminInfo(response.data.Super_admin);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch admin info");
        setLoading(false);
      }
    };
    fetchAdminInfo();
  }, [customerId, token]);

  // Fetch user list
  const fetchUserList = async () => {
    setUserListLoading(true);
    setUserListError(null);
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/user/getuserlistofadmin?id=${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserList(response.data.users || []);
      setUserListLoading(false);
      setIsUserListOpen(true);
    } catch (err) {
      setUserListError("Failed to fetch user list");
      setUserListLoading(false);
    }
  };

  // Fetch existing pricing when Pricing popup opens
  const fetchExistingPricing = async () => {
    if (!adminInfo?.tenant?.tenantId) return;

    setPricesLoading(true);
    setPriceError("");

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/charges/listbysuperadmin`,
        {
          tenantId: adminInfo.tenant.tenantId, // Dynamic tenantId from admin info
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.sucess && Array.isArray(response.data.data)) {
        const pricingMap = {
          marketting: "marketing", // Note: API uses "marketting" (typo?)
          authentication: "authentication",
          utility: "utility",
          service: "service",
        };

        const newPrices = {
          marketing: null,
          authentication: null,
          utility: null,
          service: null,
        };

        response.data.data.forEach((item) => {
          const normalizedType = item.type.toLowerCase();
          const mappedKey = pricingMap[normalizedType];
          if (mappedKey && item.price !== undefined) {
            newPrices[mappedKey] = item.price;
          }
        });

        setPrices(newPrices);
      }
    } catch (err) {
      console.error("Failed to fetch pricing:", err);
      setPriceError(
        "Failed to load existing prices. You can still set new ones."
      );
      // Keep prices as null (empty inputs)
    } finally {
      setPricesLoading(false);
    }
  };

  // Open Pricing Popup → Fetch prices
  const openPricing = () => {
    setIsPricingOpen(true);
    fetchExistingPricing();
  };

  // Close popups
  const closeUserList = () => {
    setIsUserListOpen(false);
    setUserList([]);
    setUserListError(null);
    setSearchInput("");
  };

  const closePricing = () => {
    setIsPricingOpen(false);
    setPriceError("");
    setSaving({});
    setPricesLoading(false);
    // Reset prices only if you want to clear them on close
    // setPrices({ marketing: null, authentication: null, utility: null, service: null });
  };

  // Handle price input change
  const handlePriceChange = (type, value) => {
    if (value === "") {
      setPrices((prev) => ({ ...prev, [type]: null }));
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setPrices((prev) => ({ ...prev, [type]: numValue }));
      }
    }
  };

  // Save pricing
  const savePricing = async (messageType) => {
    setSaving((prev) => ({ ...prev, [messageType]: true }));
    setPriceError("");

    try {
      await axios.post(
        `${apiurl}/api/whatsapp/charges/create`,
        {
          tenantId: adminInfo?.tenant?.tenantId || "1001",
          message_type: messageType,
          price: prices[messageType],
          currency: "INR",
          status: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(
        `${
          messageType.charAt(0).toUpperCase() + messageType.slice(1)
        } pricing saved successfully!`
      );
    } catch (err) {
      console.error(err);
      setPriceError(`Failed to save ${messageType} pricing. Please try again.`);
    } finally {
      setSaving((prev) => ({ ...prev, [messageType]: false }));
    }
  };

  if (loading)
    return (
      <Layout>
        <div className="text-center text-text-primary">Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="text-center text-error">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <div className="border bg-white h-full w-full px-2 py-2 overflow-y-scroll custom-scrollbar">
          <div className="p-2">
            <div className="mb-5">
              <BackHeader
                title={
                  <span className="flex flex-col md:flex-row items-center">
                    Customer Details
                  </span>
                }
                backButton={true}
                link="/customers"
              />
            </div>

            {/* Admin Info Display */}
            {adminInfo && (
              <div className="relative border border-light-primary rounded-2xl p-8 mb-8">
                {/* ... your existing admin info grid ... */}
                <div className="relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-5 text-left">
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Name
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Email
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Phone
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.phone || "N/A"}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Tenant
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.tenant.tenantName}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-5 text-left">
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          User Type
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.userType}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Status
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          <span
                            className={`text-lg font-medium ${
                              adminInfo.status === "active"
                                ? "text-success"
                                : "text-error"
                            }`}
                          >
                            {adminInfo.status}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Wallet
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {adminInfo.wallet}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Address
                        </span>

                        <div className="space-y-2">
                          <p className="text-text-secondary text-base">
                            {adminInfo?.address?.name}
                          </p>

                          <p className="text-text-secondary text-base">
                            {adminInfo?.address?.line1}
                          </p>

                          {adminInfo?.address?.line2 && (
                            <p className="text-text-secondary text-base">
                              {adminInfo.address.line2}
                            </p>
                          )}

                          <p className="text-text-secondary text-base">
                            {adminInfo?.address?.city},{" "}
                            {adminInfo?.address?.province}{" "}
                            {adminInfo?.address?.zip},{" "}
                            {adminInfo?.address?.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={fetchUserList}
                disabled={userListLoading}
                className={`px-6 py-2 rounded-sm text-white font-medium transition-colors
                                    ${
                                      userListLoading
                                        ? "bg-primary cursor-not-allowed opacity-70"
                                        : "bg-primary hover:bg-light-primary"
                                    }`}
              >
                {userListLoading ? "Loading..." : "Show User List"}
              </button>

              <button
                onClick={openPricing}
                className="px-6 py-2 rounded-sm text-white font-medium bg-green-600 hover:bg-green-700 transition-colors"
              >
                Pricing
              </button>
            </div>
          </div>
        </div>

        {/* User List Popup - unchanged */}
        {isUserListOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {/* ... existing user list content ... */}
          </div>
        )}

        {/* Pricing Popup */}
        {isPricingOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl mx-4 p-4 md:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6 text-lg md:text-xl lg:text-2xl">
                <h2 className=" text-left font-bold text-primary">
                  Set WhatsApp Message Pricing
                </h2>
                <button
                  onClick={closePricing}
                  className="text-text-secondary hover:text-error transition-colors"
                >
                  <RiCloseFill />
                </button>
              </div>

              {priceError && (
                <p className="text-error mb-4 text-center">{priceError}</p>
              )}

              {pricesLoading ? (
                <div className="text-center py-8">
                  <p className="text-text-primary">
                    Loading existing prices...
                  </p>
                </div>
              ) : (
                // <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                //   {[
                //     { type: "marketing", label: "Marketing" },
                //     { type: "authentication", label: "Authentication" },
                //     { type: "utility", label: "Utility: Reminders & Updates" },
                //     { type: "service", label: "Service" },
                //   ].map(({ type, label }) => (
                //     <div
                //       key={type}
                //       className="border border-light-primary rounded-lg p-6 bg-accent/20"
                //     >
                //       <h3 className="text-lg font-semibold text-primary mb-4">
                //         {label}
                //       </h3>
                //       <div className="flex items-center justify-between gap-4">
                //         <input
                //           type="number"
                //           min="0"
                //           step="0.01"
                //           placeholder="0.00"
                //           value={prices[type] ?? ""}
                //           onChange={(e) =>
                //             handlePriceChange(type, e.target.value)
                //           }
                //           className="px-4 py-2 border border-primary rounded-md focus:outline-none"
                //           disabled={pricesLoading}
                //         />
                //         <span className="text-text-primary font-medium">
                //           INR
                //         </span>
                //       </div>

                //       <button
                //         onClick={() => savePricing(type)}
                //         disabled={
                //           saving[type] ||
                //           pricesLoading ||
                //           prices[type] === null ||
                //           prices[type] <= 0
                //         }
                //         className={`mt-4 px-6 py-2 rounded-sm text-white font-medium transition-colors w-full ${
                //           saving[type] ||
                //           pricesLoading ||
                //           prices[type] === null ||
                //           prices[type] <= 0
                //             ? "bg-gray-400 cursor-not-allowed"
                //             : "bg-primary hover:bg-light-primary"
                //         }`}
                //       >
                //         {saving[type] ? "Saving..." : "Save"}
                //       </button>
                //     </div>
                //   ))}
                // </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
                  {[
                    { type: "marketing", label: "Marketing" },
                    { type: "authentication", label: "Authentication" },
                    { type: "utility", label: "Utility: Reminders & Updates" },
                    { type: "service", label: "Service" },
                  ].map(({ type, label }) => (
                    <div
                      key={type}
                      className="border border-light-primary rounded-lg
                 p-4 sm:p-5 lg:p-6
                 bg-accent/20"
                    >
                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-4">
                        {label}
                      </h3>

                      {/* Input */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          placeholder="0.00"
                          value={prices[type] ?? ""}
                          onChange={(e) =>
                            handlePriceChange(type, e.target.value)
                          }
                          disabled={pricesLoading}
                          className="w-full sm:flex-1 px-4 py-2.5
                     border border-primary rounded-md
                     focus:outline-none focus:ring-2 focus:ring-primary"
                        />

                        <span className="text-sm sm:text-base text-text-primary font-medium">
                          INR
                        </span>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => savePricing(type)}
                        disabled={
                          saving[type] ||
                          pricesLoading ||
                          prices[type] === null ||
                          prices[type] <= 0
                        }
                        className={`mt-4 w-full px-6 py-2.5 text-sm sm:text-base
          rounded-md font-medium transition-colors
          ${
            saving[type] ||
            pricesLoading ||
            prices[type] === null ||
            prices[type] <= 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-light-primary"
          } text-white`}
                      >
                        {saving[type] ? "Saving..." : "Save"}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 text-center text-sm text-text-secondary">
                Prices are per message in Indian Rupees (INR).
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default CustomerDetails;
