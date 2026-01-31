import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../config/userProvider";
import { apiurl } from "../config/config";
import { InfiLoader } from "../components/loader";
import { toast } from "react-toastify";
import axios from "axios";

const Plans = () => {
  const { accountId } = useParams();
  const { account } = useParams();
  const { userData, token } = useUser();
  const [plans, setPlans] = useState([]);
  const [selectedPlanRange, setSelectedPlanRange] = useState({
    minAmount: null,
    maxAmount: null,
  });
  const [selectedPlan, setSelectedPlan] = useState(null); // Full selected plan
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [amount, setAmount] = useState(""); // Amount entered by admin
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  // Payment result popup
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // "success" or "failed"
  const [paymentMessage, setPaymentMessage] = useState("");
  const [countdown, setCountdown] = useState(20);

  const [formData, setFormData] = useState({
    name: "",
    minAmount: "",
    maxAmount: "",
    multiplier: "",
    isExpirable: false,
    startDate: "", // Added startDate
    endDate: "", // Added endDate
  });
  console.log("selectedPlanRange", selectedPlanRange);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: "",
    paymentReference: "",
    transaction_id: "",
    planId: "",
    reciept_url: "",
  });
  const [bankData, setBankData] = useState("");
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [error, setError] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const fileInputRef = useRef(null);

  console.log("bankData", bankData);
  const navigate = useNavigate();

  // Fetch plans based on userType
  const fetchPlans = async () => {
    setFetchLoading(true);
    try {
      const endpoint =
        userData?.userType === "superadmin"
          ? `${apiurl}/api/whatsapp/wallet/planlistbysuperadmin`
          : `${apiurl}/api/whatsapp/wallet/planlistbyadmin`;

      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlans(response.data.data || []);
    } catch (err) {
      setError("Failed to fetch plans");
      toast.error("Failed to fetch plans");
    } finally {
      setFetchLoading(false);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, [userData?.userType, token]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => console.log("Razorpay script loaded");
    script.onerror = () => toast.error("Failed to load payment gateway");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle plan creation form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle payment form input changes
  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle receipt file selection and upload
  const handleReceiptChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file!");
      return;
    }

    if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
      toast.error("Please upload an image (JPEG/PNG) or PDF file!");
      return;
    }

    setReceiptFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptPreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("files", file);

    setUploadLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/content/imageupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setPaymentFormData((prev) => {
          const updated = { ...prev, reciept_url: response.data.urls[0] };
          console.log("Updated paymentFormData:", updated);
          return updated;
        });
        toast.success(
          response.data.message || "Receipt uploaded successfully!"
        );
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setError(response.data.message || "Failed to upload receipt");
        toast.error(response.data.message || "Failed to upload receipt");
        setReceiptFile(null);
        setReceiptPreview(null);
      }
    } catch (err) {
      setError("Error uploading receipt");
      toast.error("Error uploading receipt");
      setReceiptFile(null);
      setReceiptPreview(null);
    } finally {
      setUploadLoading(false);
    }
  };

  // Remove uploaded receipt
  const handleRemoveReceipt = () => {
    setReceiptFile(null);
    setReceiptPreview(null);
    setPaymentFormData((prev) => ({
      ...prev,
      reciept_url: "",
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle plan selection for admin and superadmin
  // const handlePlanSelect = (planId) => {
  //   setSelectedPlanId(planId);
  // };

  const handlePlanSelect = (plan) => {
    setSelectedPlanId(plan._id);
    setSelectedPlan(plan);
    setAmount(""); // Reset amount
  };

  //   // Handle amount input
  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setAmount(value);
    }
  };

  // Main Payment Function with Razorpay
  const handleCreatePayment = async () => {
    const numAmount = Number(amount);

    if (!selectedPlan) {
      toast.error("Please select a plan.");
      return;
    }

    if (!amount || numAmount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (
      numAmount < selectedPlan.minAmount ||
      numAmount > selectedPlan.maxAmount
    ) {
      toast.error(
        `Amount must be between ₹${selectedPlan.minAmount} and ₹${selectedPlan.maxAmount}`
      );
      return;
    }

    setPaymentLoading(true);

    try {
      // Step 1: Create order on your backend
      const orderResponse = await axios.post(
        `${apiurl}/api/whatsapp/payment/makepayment`,
        { amount: numAmount.toString(),account_id : account ,purpose :"WALLET_TOPUP" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!orderResponse.data.success) {
        throw new Error(orderResponse.data.message || "Order creation failed");
      }

      const order = orderResponse.data.data;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: order.key, // e.g., rzp_test_...
        amount: order.amount, // in paise
        currency: "INR",
        name: "Your Company Name", // Change to your brand
        description: `Wallet Recharge - ${selectedPlan.name}`,
        image: "/logo.png", // Optional: add your logo in public folder
        order_id: order.id,
        receipt: order.receipt,

        handler: async function (response) {
          // Payment successful → verify on backend
          try {
            const verifyResponse = await axios.post(
              `${apiurl}/api/whatsapp/payment/verify`, // ← YOU MUST CREATE THIS ENDPOINT
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: numAmount,
                planId: selectedPlan._id,
                accountId: accountId || null,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (verifyResponse.data.success) {
              toast.success(
                "Payment successful! Your wallet has been recharged."
              );
              showPaymentResult("success", "Payment Successful! Wallet recharged.");
              setSelectedPlan(null);
              setSelectedPlanId(null);
              setAmount("");
              // Optional: navigate to wallet page
              // navigate("/wallet");
            } else {
              toast.error("Payment verification failed. Contact support.");
              showPaymentResult("failed", "Payment failed. Please try again.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Payment verification failed.");
            showPaymentResult("failed", "Verification failed. Contact support.");
          }
        },

        prefill: {
          name: userData?.name || "",
          email: userData?.email || "",
          contact: userData?.phone?.replace("+91", "") || "",
        },

        theme: {
          color: "#6366f1", // Indigo – change to your brand color
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
            showPaymentResult("failed", "Payment cancelled.");
            setPaymentLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        toast.error(`Payment failed: ${response.error.description}`);
        showPaymentResult("failed", "Payment failed.");
        setPaymentLoading(false);
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Show success/failure popup
  const showPaymentResult = (status, message) => {
    setPaymentStatus(status);
    setPaymentMessage(message);
    setShowResultPopup(true);
    setCountdown(20);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const closeResultPopup = () => {
    setShowResultPopup(false);
    navigate("/dashboard");
  };

  // Handle plan creation form submission (superadmin)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreateLoading(true);

    // Validate startDate and endDate if isExpirable is true
    if (formData.isExpirable) {
      if (!formData.startDate || !formData.endDate) {
        toast.error("Please select both start and end dates.");
        setCreateLoading(false);
        return;
      }
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (end <= start) {
        toast.error("End date must be after start date.");
        setCreateLoading(false);
        return;
      }
    }

    // Prepare payload
    const payload = {
      name: formData.name,
      minAmount: Number(formData.minAmount),
      maxAmount: Number(formData.maxAmount),
      multiplier: Number(formData.multiplier),
      isExpirable: formData.isExpirable,
      ...(formData.isExpirable && {
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      }),
    };

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/wallet/plan`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // setIsModalOpen(false);
        // const plansResponse = await axios.get(`${apiurl}/api/whatsapp/wallet/planlistbysuperadmin`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // setPlans(plansResponse.data.data || []);
        setFormData({
          name: "",
          minAmount: "",
          maxAmount: "",
          multiplier: "",
          isExpirable: false,
          startDate: "", // Reset startDate
          endDate: "", // Reset endDate
        });
        toast.success("Plan created successfully!");
        setIsModalOpen(false);
        fetchPlans();
      } else {
        setError("Failed to create plan");
        toast.error("Failed to create plan");
      }
    } catch (err) {
      setError("Error creating plan");
      toast.error("Error creating plan");
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle payment form submission (admin)
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting paymentFormData:", paymentFormData);

    if (
      paymentFormData.amount < selectedPlanRange.minAmount ||
      paymentFormData.amount > selectedPlanRange.maxAmount
    ) {
      toast.error(
        `The amount should be between ${selectedPlanRange.minAmount} and ${selectedPlanRange.maxAmount}`
      );
      return;
    }

    if (!paymentFormData.reciept_url) {
      toast.error("Please upload a receipt!");
      return;
    }
    setPaymentLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/wallet/recharge`,
        { ...paymentFormData, planId: selectedPlanId, accountId: accountId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowPaymentPage(false);
        setSelectedPlanId(null);
        setPaymentFormData({
          amount: "",
          paymentReference: "",
          transaction_id: "",
          planId: "",
          reciept_url: "",
        });
        setReceiptFile(null);
        setReceiptPreview(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setError(null);
        toast.success("Payment submitted successfully!");
      } else {
        setError("Failed to submit payment");
        toast.error("Failed to submit payment");
      }
    } catch (err) {
      setError("Error submitting payment");
      toast.error("Error submitting payment");
    } finally {
      setPaymentLoading(false);
    }
  };

  // Handle plan deletion (superadmin)
  const handleDeletePlan = async () => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(
        `${apiurl}/api/whatsapp/wallet/planbysuperadmin/${planToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Plan deleted successfully!");
        const plansResponse = await axios.get(
          `${apiurl}/api/whatsapp/wallet/planlistbysuperadmin`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPlans(plansResponse.data.data || []);
        setSelectedPlanId(null);
        setIsDeleteConfirmOpen(false);
        setPlanToDelete(null);
      } else {
        setError("Failed to delete plan");
        toast.error("Failed to delete plan");
      }
    } catch (err) {
      setError("Error deleting plan");
      toast.error("Error deleting plan");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Open delete confirmation popup
  const openDeleteConfirm = (planId) => {
    setPlanToDelete(planId);
    setIsDeleteConfirmOpen(true);
  };

  // Navigate to payment page
  const handleNext = (plan) => {
    setSelectedPlanRange({
      minAmount: plan.minAmount,
      maxAmount: plan.maxAmount,
    });
    setShowPaymentPage(true);
  };

  // Navigate back to plans list
  const handleBack = () => {
    setShowPaymentPage(false);
    setSelectedPlanId(null);
    setReceiptFile(null);
    setReceiptPreview(null);
    setPaymentFormData({
      amount: "",
      paymentReference: "",
      transaction_id: "",
      planId: "",
      reciept_url: "",
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleBackToWhatsappAccounts = () => {
    navigate("/whatsapp-accounts");
  };

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/user/banking_detialsbyadmin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setBankData(response.data.data);
        } else {
          throw new Error("API request was not successful");
        }
      } catch (err) {
        setError("Failed to fetch bank details");
        console.error(err);
      } finally {
        // setLoading(false);
      }
    };

    if (userData?.userType === "admin") {
      fetchBankDetails();
    }
  }, []);

  return (
    <Layout>
      {fetchLoading ? (
        <InfiLoader maintext="Fetching Plans..." />
      ) : (
        <div className="bg-white p-6">
          {!showPaymentPage ? (
            <>
              <div
                className={`flex ${
                  userData?.userType === "admin"
                    ? "justify-between flex-row text-start"
                    : "justify-center flex-col max-w-5xl"
                }  items-center gap-4 mb-6 w-full mx-auto`}
              >
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-primary">
                    Choose your Plan
                  </h2>
                  <p>
                    Choose from a range of wallet recharge plans tailored to
                    your needs. Each plan offers flexible amount ranges,
                    multipliers, and options to suit your usage, whether you're
                    managing transactions or overseeing operations.
                  </p>
                  {userData?.userType === "superadmin" && (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      disabled={createLoading}
                      className="bg-secondary text-primary px-5 py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-bold border border-primary hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createLoading ? "Creating..." : "Create New"}
                    </button>
                  )}
                </div>

                {userData?.userType === "admin" && (
                  <button
                    onClick={handleBackToWhatsappAccounts}
                    className="px-6 py-2 text-base text-text-secondary border border-gray-300 rounded-md hover:bg-gray-100 hover:text-primary transition-all duration-200 font-medium flex items-center gap-2"
                  >
                    <span>←</span> Back
                  </button>
                )}
              </div>

              {error && <p className="text-error text-lg mb-4">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.length > 0 ? (
                  plans.map((plan) => (
                    <div
                      key={plan._id}
                      className={` bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden
                        ${
                          selectedPlanId === plan._id
                            ? userData?.userType === "superadmin"
                              ? "border-2 border-red-500 bg-red-100"
                              : userData?.userType === "admin"
                              ? "border-2 border-light-primary bg-light-primary bg-opacity-10"
                              : "border-accent"
                            : "border border-accent"
                        }`}
                      onClick={() =>
                        (userData?.userType === "admin" ||
                          userData?.userType === "superadmin") &&
                        handlePlanSelect(plan)
                      }
                    >
                      <div className="text-primary p-4 rounded-t-xl">
                        <h3 className="text-xl font-bold capitalize">
                          {plan.name}
                        </h3>
                      </div>

                      <div className="p-6">
                        <div className="text-center mb-4">
                          <p className="text-2xl font-bold text-text-primary">
                            {plan.minAmount.toLocaleString()} rs. -{" "}
                            {plan.maxAmount.toLocaleString()} rs.
                          </p>
                          <p className="text-sm text-text-secondary">
                            Amount Range
                          </p>
                        </div>

                        <ul className="space-y-3 text-text-secondary">
                          <li className="flex items-center">
                            <span className="text-light-primary mr-2">✦</span>
                            <span>
                              <span className="font-medium text-text-primary">
                                Multiplier:
                              </span>{" "}
                              {plan.multiplier}x
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-light-primary mr-2">✦</span>
                            <span>
                              <span className="font-medium text-text-primary">
                                Status:
                              </span>{" "}
                              <span
                                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                  plan.status
                                    ? "bg-opacity-20 text-success"
                                    : "bg-opacity-20 text-error"
                                }`}
                              >
                                {plan.status ? "Active" : "Inactive"}
                              </span>
                            </span>
                          </li>
                          <li className="flex items-center">
                            <span className="text-light-primary mr-2">✦</span>
                            <span>
                              <span className="font-medium text-text-primary">
                                Expirable:
                              </span>{" "}
                              {plan.isExpirable ? "Yes" : "No"}
                            </span>
                          </li>
                          {plan?.isExpirable && (
                            <>
                              <li className="flex items-center">
                                <span className="text-light-primary mr-2">
                                  ✦
                                </span>
                                <span>
                                  <span className="font-medium text-text-primary">
                                    Start date:
                                  </span>{" "}
                                  {new Date(
                                    plan.startDate
                                  ).toLocaleDateString()}
                                </span>
                              </li>
                              <li className="flex items-center">
                                <span className="text-light-primary mr-2">
                                  ✦
                                </span>
                                <span>
                                  <span className="font-medium text-text-primary">
                                    Expiry date:
                                  </span>{" "}
                                  {new Date(
                                    plan.expireDate
                                  ).toLocaleDateString()}
                                </span>
                              </li>
                            </>
                          )}
                        </ul>

                        {/* ADMIN ACTION */}
                        {/* {userData?.userType === "admin" &&
                          selectedPlanId === plan._id && (
                            <div className="mt-6 flex justify-center">
                              <button
                                onClick={() => handleNext(plan)}
                                className="w-full bg-light-primary text-white px-5 py-2 rounded-lg hover:bg-primary transition-colors duration-200 shadow-md"
                              >
                                Next
                              </button>
                            </div>
                          )} */}
                        {userData?.userType === "admin" &&
                          selectedPlanId === plan._id && (
                            <div className="mt-10 space-y-5">
                              <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                onClick={(e) => e.stopPropagation()}
                                placeholder={`Enter amount (${plan.minAmount} - ${plan.maxAmount})`}
                                className="w-full px-5 py-4 text-xl border-2 border-light-primary rounded-xl focus:outline-none focus:ring-4 focus:ring-light-primary/30"
                              />

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCreatePayment();
                                }}
                                disabled={paymentLoading || !amount}
                                className="w-full py-5 bg-primary hover:bg-indigo-700 text-white font-bold text-xl rounded-xl shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition"
                              >
                                {paymentLoading
                                  ? "Processing..."
                                  : "Create Payment"}
                              </button>
                            </div>
                          )}

                        {/* SUPERADMIN ACTION */}
                        {userData?.userType === "superadmin" &&
                          selectedPlanId === plan._id && (
                            <div className="mt-6 flex justify-center">
                              <button
                                onClick={() => openDeleteConfirm(plan._id)}
                                disabled={deleteLoading}
                                className="w-full bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {deleteLoading && selectedPlanId === plan._id
                                  ? "Deleting..."
                                  : "Delete"}
                              </button>
                            </div>
                          )}
                      </div>

                      {(userData?.userType === "admin" ||
                        userData?.userType === "superadmin") &&
                        selectedPlanId === plan._id && (
                          <div className="absolute top-4 right-4">
                            <span className="text-light-primary">✔</span>
                          </div>
                        )}
                    </div>
                  ))
                ) : (
                  <p className="text-text-secondary col-span-full text-center">
                    No plans available
                  </p>
                )}
              </div>

              {/* Payment Result Popup */}
              {showResultPopup && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
                    {paymentStatus === "success" ? (
                      <>
                        <div className="w-32 h-32 bg-green-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                          <span className="text-6xl text-success">✓</span>
                        </div>
                        <h2 className="text-4xl font-bold text-success mb-6">
                          Payment Successful!
                        </h2>
                        <p className="text-xl text-text-primary mb-8">
                          {paymentMessage}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-32 h-32 bg-red-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                          <span className="text-6xl text-error">✕</span>
                        </div>
                        <h2 className="text-4xl font-bold text-error mb-6">
                          Payment Failed
                        </h2>
                        <p className="text-xl text-text-secondary mb-8">
                          {paymentMessage}
                        </p>
                      </>
                    )}

                    <p className="text-lg text-text-secondary mb-8">
                      Redirecting in{" "}
                      <strong className="text-primary">{countdown}</strong>{" "}
                      seconds...
                    </p>

                    <button
                      onClick={closeResultPopup}
                      className="px-12 py-5 bg-primary text-white font-bold text-xl rounded-2xl hover:bg-indigo-700"
                    >
                      Go to Dashboard Now
                    </button>
                  </div>
                </div>
              )}

              {isDeleteConfirmOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl w-11/12 max-w-md shadow-xl border-2 border-gray-200">
                    <h3 className="text-xl font-semibold text-primary mb-4">
                      Confirm Deletion
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Are you sure you want to delete this plan? This action
                      cannot be undone.
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => {
                          setIsDeleteConfirmOpen(false);
                          setPlanToDelete(null);
                        }}
                        className="px-5 py-2 text-text-secondary border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-primary transition-colors font-medium"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleDeletePlan}
                        disabled={deleteLoading}
                        className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                      >
                        {deleteLoading ? "Deleting..." : "Delete Plan"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Create Plan Modal */}
              {isModalOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-gradient-to-br from-white to-gray-50 p-10 rounded-2xl w-11/12 max-w-2xl shadow-xl border-2 border-gray-200 transform transition-transform duration-300 scale-100">
                    <h3 className="text-2xl font-semibold text-primary border-b-2 border-gray-300 pb-3 mb-8">
                      Create New Plan
                    </h3>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <label className="block text-base font-semibold mb-2 text-text-primary">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                          required
                        />
                      </div>
                      <div className="mb-6 flex flex-row gap-4">
                        <div className="flex-1">
                          <label className="block text-base font-semibold mb-2 text-text-primary">
                            Min Amount
                          </label>
                          <input
                            type="number"
                            name="minAmount"
                            value={formData.minAmount}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-base font-semibold mb-2 text-text-primary">
                            Max Amount
                          </label>
                          <input
                            type="number"
                            name="maxAmount"
                            value={formData.maxAmount}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="block text-base font-semibold mb-2 text-text-primary">
                          Multiplier
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="multiplier"
                          value={formData.multiplier}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label className="flex items-center text-text-primary">
                          <input
                            type="checkbox"
                            name="isExpirable"
                            checked={formData.isExpirable}
                            onChange={handleInputChange}
                            className="h-5 w-5 mr-2 text-light-primary focus:ring-light-primary focus:ring-opacity-50 rounded checked:bg-light-primary"
                          />
                          <span className="text-base font-medium">
                            Is Expirable
                          </span>
                        </label>
                      </div>
                      {formData.isExpirable && (
                        <div className="mb-6">
                          <div className="flex flex-row gap-4">
                            <div className="flex-1">
                              <label className="block text-base font-semibold mb-2 text-text-primary">
                                Start Date
                              </label>
                              <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                                required
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-base font-semibold mb-2 text-text-primary">
                                End Date
                              </label>
                              <input
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-colors shadow-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-end gap-4">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="px-5 py-2 text-text-secondary border border-gray-300 rounded-xl hover:bg-gray-100 hover:text-primary transition-colors font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={createLoading}
                          className="bg-secondary text-primary px-5 py-2 rounded-xl border border-primary hover:bg-primary hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
                        >
                          {createLoading ? "Creating..." : "Create Plan"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white w-full">
              <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-3xl font-semibold text-primary">
                  Payment Details
                </h2>
                <button
                  onClick={handleBack}
                  className="px-6 py-2 text-base text-text-secondary border border-gray-300 rounded-md hover:bg-gray-100 hover:text-primary transition-all duration-200 font-medium flex items-center gap-2"
                >
                  <span>←</span> Back
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* <div className="md:border-r md:border-gray-100 md:pr-10">
                  <h3 className="text-2xl font-semibold text-text-primary mb-8 border-b border-gray-200 pb-3">Account Information</h3>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">Bank Name:</span>{' '}
                    <span className="font-medium">Bank of Baroda</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">Account Number:</span>{' '}
                    <span className="font-medium">1430089546729</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">IFSC Code:</span>{' '}
                    <span className="font-medium">BARB0USHFWI</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-8">
                    <span className="font-semibold text-text-primary">Account Holder:</span>{' '}
                    <span className="font-medium">Avinash Kumar Singh.</span>
                  </p>
                  <h3 className="text-2xl font-semibold text-text-primary mb-4 border-b border-gray-200 pb-3">Scan to Pay</h3>
                  <div className="bg-white p-4 rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-md">
                    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-text-secondary text-lg">
                      <img
                        src="/paymentQR.png"
                        alt="QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>

                </div> */}
                <div className="md:border-r md:border-gray-100 md:pr-10">
                  <h3 className="text-2xl font-semibold text-text-primary mb-8 border-b border-gray-200 pb-3">
                    Account Information
                  </h3>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">
                      Bank Name:
                    </span>{" "}
                    <span className="font-medium">{bankData.BankName}</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">
                      Account Number:
                    </span>{" "}
                    <span className="font-medium">{bankData?.accountNo}</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-4">
                    <span className="font-semibold text-text-primary">
                      IFSC Code:
                    </span>{" "}
                    <span className="font-medium">{bankData.IFSCCode}</span>
                  </p>
                  <p className="text-lg text-text-secondary mb-8">
                    <span className="font-semibold text-text-primary">
                      Account Holder:
                    </span>{" "}
                    <span className="font-medium">
                      {bankData.accountHolderName}
                    </span>
                  </p>
                  <h3 className="text-2xl font-semibold text-text-primary mb-4 border-b border-gray-200 pb-3">
                    Scan to Pay
                  </h3>
                  <div className="bg-white p-4 rounded-xl flex items-center justify-center border-2 border-gray-200 shadow-md">
                    <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-text-secondary text-lg">
                      {bankData.QRCode ? (
                        <img
                          src={bankData.QRCode}
                          alt="QR Code"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <span>QR Code Not Available</span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-text-primary mb-8 border-b border-gray-200 pb-3">
                    Submit Payment Details
                  </h3>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-8">
                      <label className="block text-lg font-semibold mb-2 text-text-primary">
                        Amount
                      </label>
                      <input
                        type="number"
                        name="amount"
                        placeholder={`Please fill the amount between ${selectedPlanRange.minAmount} - ${selectedPlanRange.maxAmount}`}
                        value={paymentFormData.amount}
                        onChange={handlePaymentInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none focus:scale-[1.01] transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-8">
                      <label className="block text-lg font-semibold mb-2 text-text-primary">
                        Payment Reference
                      </label>
                      <input
                        type="text"
                        name="paymentReference"
                        value={paymentFormData.paymentReference}
                        onChange={handlePaymentInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none focus:scale-[1.01] transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-8">
                      <label className="block text-lg font-semibold mb-2 text-text-primary">
                        Transaction ID
                      </label>
                      <input
                        type="text"
                        name="transaction_id"
                        value={paymentFormData.transaction_id}
                        onChange={handlePaymentInputChange}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none focus:scale-[1.01] transition-all duration-200 shadow-sm"
                        required
                      />
                    </div>
                    <div className="mb-8">
                      <label className="block text-lg font-semibold mb-2 text-text-primary">
                        Receipt File (JPEG, PNG, PDF)
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,application/pdf"
                        onChange={handleReceiptChange}
                        ref={fileInputRef}
                        disabled={uploadLoading}
                        className="w-full bg-gray-50 border-dashed border-2 border-gray-300 rounded-xl px-4 py-3 text-text-primary focus:border-light-primary focus:ring-2 focus:ring-light-primary focus:ring-opacity-50 focus:outline-none transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {receiptFile && (
                        <div className="mt-3 flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                          {receiptFile.type === "application/pdf" ? (
                            <p className="text-lg text-text-secondary font-medium">
                              Uploaded: {receiptFile.name}
                            </p>
                          ) : (
                            <img
                              src={receiptPreview}
                              alt="Receipt Preview"
                              className="w-32 h-32 object-cover rounded-xl"
                            />
                          )}
                          <button
                            type="button"
                            onClick={handleRemoveReceipt}
                            disabled={uploadLoading}
                            className="text-error font-medium hover:underline text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                      {uploadLoading && (
                        <p className="mt-2 text-sm text-text-secondary">
                          Uploading...
                        </p>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={paymentLoading || uploadLoading}
                        className="bg-secondary text-primary px-8 py-2 rounded-md border border-primary hover:bg-primary hover:text-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
                      >
                        {paymentLoading ? "Submitting..." : "Submit Payment"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default Plans;
