import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import axios from "axios";
import { apiurl } from "../config/config";
import { getCookie } from "../config/webStorage";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { MdContentCopy } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr";


import { useUser } from "../config/userProvider";

function WhatsappAccounts() {
  const token = getCookie("sctoken");
  const navigate = useNavigate();
  // Mock BackHeader component
  const BackHeader = ({ title, rightSide }) => (
    <div className="flex justify-between items-center mb-4 p-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-primary">{title}</h1>
      <div>{rightSide}</div>
    </div>
  );

  // Mock Pagination component
  const Pagination = ({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-primary text-white"
                : "bg-light-secondary text-primary hover:bg-accent"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  // MockCheckbox component
  const Checkbox = ({ checked, onChange }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-light-primary"
    />
  );
  const {userData} = useUser();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [showPopup, setShowPopup] = useState(false);
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  const [newAccount, setNewAccount] = useState({
    name: "",
    WHATSAPP_BUSINESS_ACCOUNT_ID: "",
    PHONE_NUMBER: "",
    PHONE_NUMBER_ID: "",
    client_webhook_url: "",
    status: "active",
  });

    console.log("newAccount",accounts)

  // Fetch all accounts
  const fetchAccounts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiurl}/api/whatsapp/account/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAccounts(response.data.WhatsappAccount_details || []);
    } catch (err) {
      setError("Failed to fetch WhatsApp accounts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single account and show popup
  const fetchSingleAccount = async (id) => {
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/account/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSelectedAccount(response.data.WhatsappAccount_details[0]);
      setEditData({
        name: response.data.WhatsappAccount_details[0].name,
        api_enable:
          response.data.WhatsappAccount_details[0].api_enable || false,
        flow_enable:
          response.data.WhatsappAccount_details[0].flow_enable || false,
        client_webhook_url:
          response.data.WhatsappAccount_details[0].client_webhook_url || "",
      });
      setIsEditing(false); // Start in view mode
      setShowDetailsPopup(true);
    } catch (err) {
      setError("Error fetching account details");
      console.error("Error fetching single account:", err);
    }
  };
  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(
        // `http://localhost:5050/xpresschat/api/whatsapp/account/update/${selectedAccount.id}`,
        `${apiurl}/api/whatsapp/account/update/${selectedAccount.id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update the selectedAccount with new data
      setSelectedAccount({ ...selectedAccount, ...editData });
      setIsEditing(false);
      toast.success("Account updated successfully!");

      // Optionally refresh the list
      fetchAccounts();
    } catch (err) {
      console.error("Error updating account:", err);
      toast.error("Failed to update account.");
    } finally {
      setSaving(false);
    }
  };

  // Create new account
  const createAccount = async () => {
    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/account/create`,
        newAccount,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAccounts([...accounts, response.data]);
      setShowPopup(false);
      setNewAccount({
        name: "",
        account_type: "",
        WHATSAPP_BUSINESS_ACCOUNT_ID: "",
        PHONE_NUMBER: "",
        PHONE_NUMBER_ID: "",
        client_webhook_url: "",
        status: "active",
        meta_api_access_token: "",
        flow_enable: false,
      });
    } catch (err) {
      setError("Failed to create WhatsApp account.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [currentPage, itemsPerPage]);

  // Filter and search logic
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name?.toLowerCase().includes(searchInput?.toLowerCase()) ||
      account.PHONE_NUMBER?.toLowerCase().includes(searchInput?.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      account.status?.toLowerCase() === statusFilter?.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filteredAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // const copyToClipboard = (text) => {
  //     navigator.clipboard.writeText(text);
  //     toast.success("Copied to clipboard!");
  // };
  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.success("Copied to clipboard!"))
        .catch((err) => toast.error("Failed to copy: " + err));
    } else {
      toast.error("Clipboard not supported in this browser or context.");
    }
  };

  const truncateText = (text, start = 10, end = 10) => {
    if (text.length > start + end) {
      return `${text.slice(0, start)}...${text.slice(-end)}`;
    }
    return text;
  };

  const handleRecharge = (accountId, account) =>{
   navigate(`/plans/${accountId}/${account}`);
  }
  const handleTemplate = (accountId, account) =>{
   navigate(`/template/${accountId}/${account}`);
  }

  return (
    <Layout>
      <div className="border bg-light-secondary h-full w-full px-2 py-2">
        <div className="relative flex flex-col gap-2 w-full overflow-hidden rounded-sm sm:rounded-xl px-2 h-full p-2">
          <BackHeader
            title={
              <span className="flex flex-col md:flex-row items-center gap-2">
                WhatsApp Accounts
                <span className="hidden lg:flex"> - {accounts.length}</span>
                <div className="hidden lg:flex gap-2 flex-row items-center">
                  <label className="text-xs text-primary">Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-primary/50 bg-white px-2 py-1 rounded-sm text-xs outline-none text-primary"
                  >
                    <option value="All">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </span>
            }
            rightSide={
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowPopup(true)}
                  className="bg-primary hover:bg-light-primary text-white font-medium px-3 py-1 rounded-sm text-sm flex items-center gap-1"
                >
                  <span className="hidden md:block">Create</span>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            }
          />
          {loading ? (
            <div className="text-center py-4 text-primary">Loading...</div>
          ) : error ? (
            <div className="text-center py-4 text-error">{error}</div>
          ) : filteredAccounts.length === 0 ? (
            <div className="text-center py-4 text-primary">
              No WhatsApp accounts found.
            </div>
          ) : (
            <div className="relative overflow-y-auto h-full sm:rounded-sm">
              <table className="w-full text-sm text-left text-primary">
                <thead className="text-xs text-primary uppercase bg-accent sticky top-0">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Business Account ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone Number ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Actions
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Manage Template
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentAccounts.map((account, index) => (
                    <tr
                      key={account._id}
                      className={`${
                        index % 2 === 0
                          ? "odd:bg-white"
                          : "even:bg-light-secondary"
                      } border-b border-primary/50`}
                    >
                      <td className="px-6 py-4">{account.name}</td>
                      <td className="px-6 py-4">{account.PHONE_NUMBER}</td>
                      <td className="px-6 py-4">
                        {account.WHATSAPP_BUSINESS_ACCOUNT_ID}
                      </td>
                      <td className="px-6 py-4">{account.PHONE_NUMBER_ID}</td>
                      <td
                        className={`px-6 py-4 font-medium ${
                          account.status === "active"
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {account.status}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                        <button
                          onClick={() => fetchSingleAccount(account.id)}
                          className="text-blue-400 border border-blue-400 hover:bg-blue-400 hover:text-white px-3 py-1 font-medium"
                        >
                          View
                        </button>
                      
                        <button
                          onClick={() => handleRecharge(account._id, account.id)}
                          className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white px-3 py-1 font-medium"
                        >
                          Recharge
                        </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         
                        <button
                          onClick={() => handleTemplate(account._id, account.id)}
                          className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white px-3 py-1 font-medium"
                        >
                         <GrView  />
                        </button>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Pagination
            currentPage={currentPage}
            totalItems={filteredAccounts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Popup for creating new account */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white relative p-6 rounded-lg w-full max-w-xl max-h-[70vh] overflow-y-scroll hide-scrollbar m-6">
              <div
                className="absolute cursor-pointer top-4 right-4 text-xl text-primary"
                onClick={() => setShowPopup(false)}
              >
                <MdOutlineCancel />
              </div>
              <h2 className="text-lg font-bold text-primary my-4">
                Create WhatsApp Account
              </h2>
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  {newAccount.name && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Name
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Name"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>

                {/* WhatsApp Business Account ID */}
                <div className="relative">
                  {newAccount.WHATSAPP_BUSINESS_ACCOUNT_ID && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      WhatsApp Business Account ID
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="WhatsApp Business Account ID"
                    value={newAccount.WHATSAPP_BUSINESS_ACCOUNT_ID}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        WHATSAPP_BUSINESS_ACCOUNT_ID: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>

                {/* Phone Number */}
                <div className="relative">
                  {newAccount.PHONE_NUMBER && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Phone Number
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={newAccount.PHONE_NUMBER}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        PHONE_NUMBER: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>

                {/* Phone Number ID */}
                <div className="relative">
                  {newAccount.PHONE_NUMBER_ID && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Phone Number ID
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Phone Number ID"
                    value={newAccount.PHONE_NUMBER_ID}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        PHONE_NUMBER_ID: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>
                {/* Phone Number ID */}
                <div className="relative">
                  {newAccount.meta_api_access_token && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Whatsapp API Token
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Whatsapp API Token"
                    value={newAccount.meta_api_access_token}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        meta_api_access_token: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>
                {/* Client Webhook URL */}
                <div className="relative">
                  {newAccount.client_webhook_url && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Client Webhook URL
                    </label>
                  )}
                  <input
                    type="text"
                    placeholder="Client Webhook URL"
                    value={newAccount.client_webhook_url}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        client_webhook_url: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  />
                </div>

                {/* Status Select */}
                <div className="relative">
                  {newAccount.status && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Status
                    </label>
                  )}
                  <select
                    value={newAccount.status}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, status: e.target.value })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                {/* Status Select */}
                <div className="relative">
                  {newAccount.account_type && (
                    <label className="absolute -top-3 left-2 text-sm text-primary bg-white px-1">
                      Selet Web/Whatsapp BOT
                    </label>
                  )}
                  <select
                    value={newAccount.account_type}
                    onChange={(e) =>
                      setNewAccount({
                        ...newAccount,
                        account_type: e.target.value,
                      })
                    }
                    className="w-full border border-primary/50 px-2 py-2 rounded-sm text-primary"
                  >
                    <option value="">Select Status</option>
                    <option value="whatsapp_bot">WhatsApp</option>
                    <option value="web_bot">Web</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-light-secondary text-primary rounded-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={createAccount}
                  className="px-4 py-2 bg-primary hover:bg-light-primary text-white font-medium rounded-sm"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Popup for viewing account details */}
        {/* {showDetailsPopup && selectedAccount && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 ${
              showDetailsPopup ? "block" : "hidden"
            }`}
          >
            <div className="bg-white relative rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
              <button
                className="absolute right-4 top-4 text-primary hover:text-primary transition-colors p-1 z-20"
                onClick={() => setShowDetailsPopup(false)}
                aria-label="Close popup"
              >
                <MdOutlineCancel size={24} />
              </button>

              <div className="p-6 border-b border-primary/50 sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-primary">
                  Account Details
                </h2>
                <p className="text-sm text-primary mt-1">
                  View and manage your account information
                </p>
              </div>

              <div className="p-6 space-y-5">
                {[
                  { label: "Name", value: selectedAccount.name },
                  {
                    label: "Phone Number",
                    value: selectedAccount.PHONE_NUMBER,
                  },
                  {
                    label: "Business Account ID",
                    value: selectedAccount.WHATSAPP_BUSINESS_ACCOUNT_ID,
                  },
                  {
                    label: "Phone Number ID",
                    value: selectedAccount.PHONE_NUMBER_ID,
                  },
                  {
                    label: "Status",
                    value: selectedAccount.status,
                    isBadge: true,
                  },
                  {
                    label: "API Enable",
                    value: selectedAccount.api_enable ? "Yes" : "No",
                  },
                  {
                    label: "Flow Enable",
                    value: selectedAccount.flow_enable ? "Yes" : "No",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                  >
                    <span className="font-medium text-primary text-sm sm:text-right">
                      {item.label}:
                    </span>
                    <span
                      className={`sm:col-span-2 w-fit text-sm ${
                        item.isBadge
                          ? `inline-flex items-center px-3 py-1 rounded-full font-medium ${
                              item.value === "active"
                                ? "bg-success/10 text-success"
                                : "bg-error/10 text-error"
                            }`
                          : "text-primary"
                      }`}
                    >
                      {item.value}
                    </span>
                  </div>
                ))}

                {[
                  {
                    label: "Callback URL",
                    value: selectedAccount.Callback_URL,
                  },
                  {
                    label: "Client Webhook URL",
                    value: selectedAccount.client_webhook_url,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                  >
                    <span className="font-medium text-primary text-sm sm:text-right">
                      {item.label}:
                    </span>
                    <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
                      <a
                        href={item.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-light-primary hover:text-primary transition-colors break-all text-sm"
                      >
                        {truncateText(item.value, 40)}
                      </a>
                      <button
                        className="text-primary hover:text-primary transition-colors p-1"
                        onClick={() => copyToClipboard(item.value)}
                        aria-label="Copy URL"
                      >
                        <MdContentCopy size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {[
                  {
                    label: "Meta API Access Token",
                    value: selectedAccount.meta_api_access_token,
                  },
                  {
                    label: "Inficonnect API Key",
                    value: selectedAccount.inficonnect_api_key,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                  >
                    <span className="font-medium text-primary text-sm sm:text-right">
                      {item.label}:
                    </span>
                    <div className="sm:col-span-2 flex items-center gap-2 bg-light-secondary p-3 rounded-lg group">
                      <span
                        className="text-sm text-primary break-all flex-1 group-hover:text-primary transition-colors cursor-default"
                        title={item.value}
                      >
                        {truncateText(item.value, 30)}
                      </span>
                      <button
                        className="text-primary hover:text-primary transition-colors p-1"
                        onClick={() => copyToClipboard(item.value)}
                        aria-label="Copy token"
                      >
                        <MdContentCopy size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )} */}

        {showDetailsPopup && selectedAccount && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white relative rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-0">
              {/* Close Button */}

              {/* Header with Edit/Save/Cancel */}
              <div className="p-6 border-b border-primary/50 sticky top-0 bg-white z-10 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-primary">
                    Account Details
                  </h2>
                  <p className="text-sm text-primary mt-1">
                    {isEditing
                      ? "Edit account information"
                      : "View and manage your account"}
                  </p>
                </div>
                <button
                  className=" text-primary hover:text-primary transition-colors p-1"
                  onClick={() => {
                    setShowDetailsPopup(false);
                    setIsEditing(false); // Reset edit mode when closing
                  }}
                  aria-label="Close popup"
                >
                  <MdOutlineCancel size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {userData?.userType === "admin" && (
                  <div className="flex gap-3 justify-end w-full">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-primary bg-light-secondary rounded-sm hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={saving}
                          className="px-4 py-2 bg-primary hover:bg-light-primary text-white font-medium rounded-sm disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-accent hover:bg-accent/80 text-primary font-medium rounded-sm transition"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                )}
                {/* Editable Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    Name:
                  </span>
                  <div className="sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) =>
                          setEditData({ ...editData, name: e.target.value })
                        }
                        className="w-full border border-primary/50 px-3 py-2 rounded-sm text-primary focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <span className="text-sm text-primary">
                        {selectedAccount.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    API Enable:
                  </span>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    {isEditing ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={editData.api_enable}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              api_enable: e.target.checked,
                            })
                          }
                        />
                        <span className="text-sm text-primary">Enabled</span>
                      </label>
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          selectedAccount.api_enable
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {selectedAccount.api_enable ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    Flow Enable:
                  </span>
                  <div className="sm:col-span-2 flex items-center gap-3">
                    {isEditing ? (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={editData.flow_enable}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              flow_enable: e.target.checked,
                            })
                          }
                        />
                        <span className="text-sm text-primary">Enabled</span>
                      </label>
                    ) : (
                      <span
                        className={`text-sm font-medium ${
                          selectedAccount.flow_enable
                            ? "text-success"
                            : "text-error"
                        }`}
                      >
                        {selectedAccount.flow_enable ? "Yes" : "No"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    Client Webhook URL:
                  </span>
                  <div className="sm:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.client_webhook_url || ""}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            client_webhook_url: e.target.value,
                          })
                        }
                        placeholder="https://yourdomain.com/webhook"
                        className="w-full border border-primary/50 px-3 py-2 rounded-sm text-primary focus:outline-none focus:border-primary"
                      />
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <a
                          href={selectedAccount.client_webhook_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-light-primary hover:text-primary transition-colors break-all text-sm"
                        >
                          {selectedAccount.client_webhook_url
                            ? truncateText(
                                selectedAccount.client_webhook_url,
                                40
                              )
                            : "-"}
                        </a>
                        {selectedAccount.client_webhook_url && (
                          <button
                            onClick={() =>
                              copyToClipboard(
                                selectedAccount.client_webhook_url
                              )
                            }
                            className="text-primary p-1"
                          >
                            <MdContentCopy size={16} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Non-editable Fields (Read-only) */}
                {[
                  {
                    label: "Phone Number",
                    value: selectedAccount.PHONE_NUMBER,
                  },
                  {
                    label: "Business Account ID",
                    value: selectedAccount.WHATSAPP_BUSINESS_ACCOUNT_ID,
                  },
                  {
                    label: "Phone Number ID",
                    value: selectedAccount.PHONE_NUMBER_ID,
                  },
                  {
                    label: "Status",
                    value: selectedAccount.status,
                    isBadge: true,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                  >
                    <span className="font-medium text-primary text-sm sm:text-right">
                      {item.label}:
                    </span>
                    <span
                      className={`sm:col-span-2 text-sm ${
                        item.isBadge
                          ? `inline-flex items-center px-3 py-1 rounded-full font-medium ${
                              item.value === "active"
                                ? "bg-success/10 text-success"
                                : "bg-error/10 text-error"
                            }`
                          : "text-primary"
                      }`}
                    >
                      {item.value || "-"}
                    </span>
                  </div>
                ))}

                {/* URLs with Copy (Callback URL) */}
                {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    Callback URL:
                  </span>
                  <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
                    <a
                      href={selectedAccount.Callback_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-light-primary hover:text-primary transition-colors break-all text-sm"
                    >
                      {truncateText(selectedAccount.Callback_URL, 40)}
                    </a>
                    <button
                      onClick={() =>
                        copyToClipboard(selectedAccount.Callback_URL)
                      }
                      className="text-primary hover:text-primary p-1"
                    >
                      <MdContentCopy size={16} />
                    </button>
                  </div>
                </div> */}

                {/* Tokens (Hidden or Truncated) */}
                {/* {[
                  {
                    label: "Meta API Access Token",
                    value: selectedAccount.meta_api_access_token,
                  },
                  {
                    label: "Inficonnect API Key",
                    value: selectedAccount.inficonnect_api_key,
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center"
                  >
                    <span className="font-medium text-primary text-sm sm:text-right">
                      {item.label}:
                    </span>
                    <div className="sm:col-span-2 flex items-center gap-2 bg-light-secondary p-3 rounded-lg">
                      <span
                        className="text-sm text-primary break-all flex-1"
                        title={item.value}
                      >
                        {truncateText(item.value, 30)}
                      </span>
                      <button
                        onClick={() => copyToClipboard(item.value)}
                        className="text-primary p-1"
                      >
                        <MdContentCopy size={16} />
                      </button>
                    </div>
                  </div>
                ))} */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                  <span className="font-medium text-primary text-sm sm:text-right">
                    Whatsapp API Key :
                  </span>
                  <div className="sm:col-span-2 flex items-center gap-2 bg-light-secondary p-3 rounded-lg">
                    <span
                      className="text-sm text-primary break-all flex-1"
                      title={selectedAccount.inficonnect_api_key}
                    >
                      {truncateText(selectedAccount.inficonnect_api_key, 30)}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(selectedAccount.inficonnect_api_key)
                      }
                      className="text-primary p-1"
                    >
                      <MdContentCopy size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WhatsappAccounts;
