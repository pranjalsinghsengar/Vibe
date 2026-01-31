// import React, { useEffect, useState } from "react";
// import Layout, { Container } from "../components/layout";
// import { useUser } from "../config/userProvider";
// import { apiurl } from "../config/config";
// import axios from "axios";
// import { toast } from "react-toastify";
// import BackHeader from "../components/backHeader";

// const PaymentMethods = () => {
//   const { userData, token } = useUser();

 

//   // All hooks are now unconditional
//   const [gateways, setGateways] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // Form states
//   const [gatewayName, setGatewayName] = useState("razorpay");
//   const [gatewayEnable, setGatewayEnable] = useState(true);
//   const [configFields, setConfigFields] = useState([
//     { key: "RAZORPAY_KEY_ID", value: "" },
//     { key: "RAZORPAY_KEY_SECRET", value: "" },
//     { key: "RAZORPAY_WEBHOOK_URL", value: "" },
//     { key: "RAZORPAY_WEBHOOK_PASSWORD", value: "" },
//   ]);

//   const [editId, setEditId] = useState(null); // _id for update/delete


//   useEffect(() => {
//     fetchGateways();
//   }, []);

//    // Early return for non-superadmin (no hooks before this)
//   if (!userData || userData?.userType !== "superadmin") {
//     return (
//       <Layout>
//         <Container>
//           <div className="min-h-screen flex items-center justify-center">
//             <div className="text-center">
//               <h2 className="text-3xl font-bold text-error mb-4">Access Denied</h2>
//               <p className="text-text-secondary text-lg">Only Superadmin can manage payment gateways.</p>
//             </div>
//           </div>
//         </Container>
//       </Layout>
//     );
//   }


//   const fetchGateways = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/payment/get`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.data.message?.includes("success")) {
//         setGateways(response.data.payment_data || []);
//       }
//     } catch (err) {
//       toast.error("Failed to load payment gateways");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load existing gateway for editing
//   const handleEdit = (gateway) => {
//     setEditId(gateway._id);
//     setGatewayName(gateway.name);
//     setGatewayEnable(gateway.enable);

//     const fields = Object.entries(gateway.config || {}).map(([key, value]) => ({
//       key,
//       value: value || "",
//     }));

//     setConfigFields(fields.length > 0 ? fields : [{ key: "", value: "" }]);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // Delete gateway
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this payment gateway permanently?")) return;

//     try {
//       await axios.post(
//         `${apiurl}/api/whatsapp/payment/deletebyId`,
//         { id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("Gateway deleted");
//       fetchGateways();
//     } catch (err) {
//       toast.error("Failed to delete gateway");
//     }
//   };

//   // Add/remove/update fields
//   const addField = () => setConfigFields([...configFields, { key: "", value: "" }]);

//   const removeField = (index) => {
//     if (configFields.length === 1) return;
//     setConfigFields(configFields.filter((_, i) => i !== index));
//   };

//   const updateField = (index, fieldName, value) => {
//     const updated = [...configFields];
//     updated[index][fieldName] = value;
//     setConfigFields(updated);
//   };

//   // Reset form
//   const resetForm = () => {
//     setEditId(null);
//     setGatewayName("razorpay");
//     setGatewayEnable(true);
//     setConfigFields([
//       { key: "RAZORPAY_KEY_ID", value: "" },
//       { key: "RAZORPAY_KEY_SECRET", value: "" },
//       { key: "RAZORPAY_WEBHOOK_URL", value: "" },
//       { key: "RAZORPAY_WEBHOOK_PASSWORD", value: "" },
//     ]);
//   };

//   // Submit: Create or Update
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const hasEmpty = configFields.some((f) => !f.key.trim() || !f.value.trim());
//     if (hasEmpty) {
//       toast.error("All fields must have a key and value.");
//       return;
//     }

//     const config = {};
//     configFields.forEach((f) => {
//       config[f.key.trim()] = f.value.trim();
//     });

//     const payload = {
//       name: gatewayName,
//       config,
//       status: gatewayEnable,
//     };

//     if (editId) {
//       payload.id = editId;
//     }

//     setSaving(true);
//     try {
//       const url = editId
//         ? `${apiurl}/api/whatsapp/payment/updatebyId`
//         : `${apiurl}/api/whatsapp/payment/create`;

//       const response = await axios.post(url, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.message?.includes("success")) {
//         toast.success(editId ? "Gateway updated!" : "Gateway created!");
//         resetForm();
//         fetchGateways();
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Operation failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <Layout>
//       <Container>
//         <div className="bg-white h-full rounded-2xl shadow-xl border border-light-secondary p-8 overflow-y-scroll custom-scrollbar">
//           <BackHeader
//             title={<h1 className="text-3xl font-bold text-primary">Payment Gateway Management</h1>}
//             backButton={true}
//             link="/dashboard"
//           />

//           {/* Form - Create / Edit */}
//           <div className="mt-10 max-w-4xl mx-auto bg-accent/5 p-8 rounded-2xl border">
//             <h2 className="text-2xl font-bold text-primary mb-6">
//               {editId ? "Edit" : "Add New"} Payment Gateway
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Gateway Name & Status */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-lg font-medium mb-2">Gateway Name</label>
//                   <input
//                     type="text"
//                     value={gatewayName}
//                     onChange={(e) => setGatewayName(e.target.value.toLowerCase())}
//                     className="w-full px-5 py-3 border rounded-xl focus:outline-none focus:border-primary"
//                     required
//                   />
//                 </div>
//                 <div className="flex items-center space-x-4">
//                   <label className="text-lg font-medium">Status</label>
//                   <button
//                     type="button"
//                     onClick={() => setGatewayEnable(!gatewayEnable)}
//                     className={`w-16 h-8 rounded-full transition ${gatewayEnable ? "bg-success" : "bg-gray-300"} relative`}
//                   >
//                     <span
//                       className={`block w-6 h-6 bg-white rounded-full shadow-md transform transition ${gatewayEnable ? "translate-x-9" : "translate-x-1"} mt-1`}
//                     />
//                   </button>
//                   <span className="font-medium">{gatewayEnable ? "Active" : "Inactive"}</span>
//                 </div>
//               </div>

//               {/* Config Fields */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-semibold">Configuration Fields</h3>
//                   <button
//                     type="button"
//                     onClick={addField}
//                     className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 text-sm"
//                   >
//                     + Add Field
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {configFields.map((field, i) => (
//                     <div key={i} className="flex gap-3 items-center bg-white p-4 rounded-xl border">
//                       <input
//                         type="text"
//                         placeholder="Key (e.g. RAZORPAY_KEY_ID)"
//                         value={field.key}
//                         onChange={(e) => updateField(i, "key", e.target.value)}
//                         className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
//                         required
//                       />
//                       <input
//                         type="text"
//                         placeholder="Value"
//                         value={field.value}
//                         onChange={(e) => updateField(i, "value", e.target.value)}
//                         className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary"
//                         required
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeField(i)}
//                         className="text-error hover:bg-red-50 p-2 rounded-lg"
//                         disabled={configFields.length === 1}
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Submit */}
//               <div className="flex gap-4 justify-end">
//                 {editId && (
//                   <button
//                     type="button"
//                     onClick={resetForm}
//                     className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50"
//                   >
//                     Cancel Edit
//                   </button>
//                 )}
//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-60"
//                 >
//                   {saving ? "Saving..." : editId ? "Update Gateway" : "Create Gateway"}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* List of Existing Gateways */}
//           <div className="mt-16">
//             <h2 className="text-2xl font-bold text-primary mb-6">Configured Payment Gateways</h2>

//             {loading ? (
//               <p className="text-center py-10 text-lg">Loading gateways...</p>
//             ) : gateways.length === 0 ? (
//               <p className="text-center text-text-secondary py-10 text-lg">No payment gateways configured yet.</p>
//             ) : (
//               <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                 {gateways.map((gw) => (
//                   <div key={gw._id} className="bg-white border rounded-2xl p-6 shadow hover:shadow-lg transition">
//                     <div className="flex justify-between items-start mb-4">
//                       <div>
//                         <h3 className="text-xl font-bold text-primary capitalize">{gw.name}</h3>
//                         <span
//                           className={`inline-block px-3 py-1 mt-2 text-xs rounded-full ${
//                             gw.enable ? "bg-success/20 text-success" : "bg-gray-200 text-gray-600"
//                           }`}
//                         >
//                           {gw.enable ? "Active" : "Inactive"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className="text-sm text-text-secondary space-y-1 mb-6">
//                       {Object.entries(gw.config)
//                         .slice(0, 3)
//                         .map(([key, val]) => (
//                           <p key={key}>
//                             <strong>{key}:</strong> {String(val).slice(0, 20)}...
//                           </p>
//                         ))}
//                       {Object.keys(gw.config).length > 3 && (
//                         <p className="text-xs">+ {Object.keys(gw.config).length - 3} more...</p>
//                       )}
//                     </div>

//                     <div className="flex gap-3">
//                       <button
//                         onClick={() => handleEdit(gw)}
//                         className="flex-1 py-2 bg-accent text-primary rounded-lg hover:bg-light-primary font-medium"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(gw._id)}
//                         className="flex-1 py-2 bg-red-100 text-error rounded-lg hover:bg-red-200 font-medium"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </Container>
//     </Layout>
//   );
// };

// export default PaymentMethods;






import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import { useUser } from "../config/userProvider";
import { apiurl } from "../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import BackHeader from "../components/backHeader";

const PaymentMethods = () => {
  const { userData, token } = useUser();

 

  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form states
  const [gatewayName, setGatewayName] = useState("razorpay");
  const [gatewayEnable, setGatewayEnable] = useState(true);
  const [configFields, setConfigFields] = useState([
    { key: "RAZORPAY_KEY_ID", value: "" },
    { key: "RAZORPAY_KEY_SECRET", value: "" },
    { key: "RAZORPAY_WEBHOOK_URL", value: "" },
    { key: "RAZORPAY_WEBHOOK_PASSWORD", value: "" },
  ]);

  useEffect(() => {
    fetchGateways();
  }, []);

   // Access control
  if (!userData || userData?.userType !== "superadmin") {
    return (
      <Layout>
        <Container>
          <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-3xl font-bold text-error">Access Denied</h2>
            <p className="text-text-secondary mt-4">Only Superadmin can manage payment gateways.</p>
          </div>
        </Container>
      </Layout>
    );
  }

  const fetchGateways = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/payment/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.payment_data) {
        setGateways(response.data.payment_data);
      }
    } catch (err) {
      toast.error("Failed to load gateways");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for Add
  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const openEditModal = (gateway) => {
    setIsEditMode(true);
    setEditId(gateway._id);
    setGatewayName(gateway.name);
    setGatewayEnable(gateway.enable);

    const fields = Object.entries(gateway.config || {}).map(([key, value]) => ({
      key,
      value: value || "",
    }));
    setConfigFields(fields.length > 0 ? fields : [{ key: "", value: "" }]);

    setIsModalOpen(true);
  };

  // Close modal & reset
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setIsEditMode(false);
    setEditId(null);
    setGatewayName("razorpay");
    setGatewayEnable(true);
    setConfigFields([
      { key: "RAZORPAY_KEY_ID", value: "" },
      { key: "RAZORPAY_KEY_SECRET", value: "" },
      { key: "RAZORPAY_WEBHOOK_URL", value: "" },
      { key: "RAZORPAY_WEBHOOK_PASSWORD", value: "" },
    ]);
  };

  // Dynamic field handlers
  const addField = () => {
    setConfigFields([...configFields, { key: "", value: "" }]);
  };

  const removeField = (index) => {
    if (configFields.length === 1) {
      toast.warning("At least one field is required");
      return;
    }
    setConfigFields(configFields.filter((_, i) => i !== index));
  };

  const updateField = (index, fieldName, value) => {
    const updated = [...configFields];
    updated[index][fieldName] = value;
    setConfigFields(updated);
  };

  // Delete gateway
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment gateway? This cannot be undone.")) return;

    try {
      await axios.post(
        `${apiurl}/api/whatsapp/payment/deletebyId`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Gateway deleted");
      fetchGateways();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  // Submit (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmpty = configFields.some((f) => !f.key.trim() || !f.value.trim());
    if (hasEmpty) {
      toast.error("Please fill all key-value pairs");
      return;
    }

    const config = {};
    configFields.forEach((f) => {
      config[f.key.trim()] = f.value.trim();
    });

    const payload = {
      name: gatewayName,
      config,
      status: gatewayEnable,
    };

    if (isEditMode) {
      payload.id = editId;
    }

    setSaving(true);
    try {
      const url = isEditMode
        ? `${apiurl}/api/whatsapp/payment/updatebyId`
        : `${apiurl}/api/whatsapp/payment/create`;

      const response = await axios.post(url, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.message?.includes("success")) {
        toast.success(isEditMode ? "Gateway updated!" : "Gateway added!");
        closeModal();
        fetchGateways();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <>
        <div className="bg-white rounded-2xl shadow-xl border border-light-secondary p-8">
          <BackHeader
            title={<h1 className="text-3xl font-bold text-primary">Payment Gateway Management</h1>}
            backButton={true}
            link="/dashboard"
          />

          {/* Add Button */}
          <div className="mt-8 text-right">
            <button
              onClick={openAddModal}
              className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-indigo-700 shadow-lg transition text-lg"
            >
              + Add Payment Method
            </button>
          </div>

          {/* List of Gateways */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-primary mb-8">Configured Gateways</h2>

            {loading ? (
              <p className="text-center py-16 text-lg text-text-secondary">Loading gateways...</p>
            ) : gateways.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-text-secondary">No payment gateways configured yet.</p>
                <p className="text-text-secondary mt-4">Click "Add Payment Method" to get started.</p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {gateways.map((gw) => (
                  <div
                    key={gw._id}
                    className="bg-gradient-to-br from-white to-gray-50 border rounded-2xl p-8 shadow hover:shadow-2xl transition"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-primary capitalize">{gw.name}</h3>
                        <span
                          className={`inline-block px-4 py-1 mt-3 text-sm rounded-full font-medium ${
                            gw.enable
                              ? "bg-success/20 text-success"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {gw.enable ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-text-secondary mb-8">
                      {Object.entries(gw.config)
                        .slice(0, 4)
                        .map(([key, val]) => (
                          <p key={key}>
                            <strong>{key}:</strong> {String(val).slice(0, 25)}...
                          </p>
                        ))}
                      {Object.keys(gw.config).length > 4 && (
                        <p className="text-xs text-gray-500">
                          + {Object.keys(gw.config).length - 4} more fields
                        </p>
                      )}
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => openEditModal(gw)}
                        className="flex-1 py-3 bg-accent text-primary font-semibold rounded-xl hover:bg-light-primary transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(gw._id)}
                        className="flex-1 py-3 bg-red-100 text-error font-semibold rounded-xl hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-10">
              <h2 className="text-3xl font-bold text-primary mb-8">
                {isEditMode ? "Edit" : "Add"} Payment Gateway
              </h2>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-lg font-medium mb-3">Gateway Name</label>
                    <select
                      value={gatewayName}
                      onChange={(e) => setGatewayName(e.target.value)}
                      className="w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:border-primary text-lg"
                    >
                      <option value="razorpay">Razorpay</option>
                      <option value="stripe">Stripe</option>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="payu">PayU</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="text-lg font-medium">Status</label>
                    <button
                      type="button"
                      onClick={() => setGatewayEnable(!gatewayEnable)}
                      className={`w-20 h-10 rounded-full transition ${gatewayEnable ? "bg-success" : "bg-gray-300"} relative`}
                    >
                      <span
                        className={`block w-8 h-8 bg-white rounded-full shadow-md transform transition mt-1 ${gatewayEnable ? "translate-x-11" : "translate-x-1"}`}
                      />
                    </button>
                    <span className="text-lg font-medium">{gatewayEnable ? "Active" : "Inactive"}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Configuration</h3>
                    <button
                      type="button"
                      onClick={addField}
                      className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700"
                    >
                      + Add Field
                    </button>
                  </div>

                  <div className="space-y-4">
                    {configFields.map((field, i) => (
                      <div key={i} className="flex gap-4 items-center">
                        <input
                          type="text"
                          placeholder="Key"
                          value={field.key}
                          onChange={(e) => updateField(i, "key", e.target.value)}
                          className="flex-1 px-5 py-4 border-2 rounded-xl focus:outline-none focus:border-primary"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          value={field.value}
                          onChange={(e) => updateField(i, "value", e.target.value)}
                          className="flex-1 px-5 py-4 border-2 rounded-xl focus:outline-none focus:border-primary"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => removeField(i)}
                          className="text-error text-2xl hover:bg-red-50 w-12 h-12 rounded-xl"
                          disabled={configFields.length === 1}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-6 pt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-semibold text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-indigo-700 disabled:opacity-60 text-lg shadow-lg"
                  >
                    {saving ? "Saving..." : isEditMode ? "Update Gateway" : "Add Gateway"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </Layout>
  );
};

export default PaymentMethods;