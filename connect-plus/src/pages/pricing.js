import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout, { Container } from "../components/layout";
import { apiurl } from "../config/config"; // Adjust if needed
import { getCookie } from "../config/webStorage";
import BackHeader from "../components/backHeader";
import { InfiLoader } from "../components/loader";
import DataNotFound from "../components/dataNotFound";

function Pricing() {
  const token = getCookie("sctoken");

  const [prices, setPrices] = useState({
    marketing: "",
    authentication: "",
    utility: "",
    service: "",
  });

  const [originalPrices, setOriginalPrices] = useState({}); // To detect changes
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch pricing list on mount
  useEffect(() => {
    const fetchPricing = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.post(
          `${apiurl}/api/whatsapp/charges/listbysuperadmin`,
          { tenantId: "0" },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.sucess && Array.isArray(response.data.data)) {
          const pricingMap = {
            marketting: "marketing", // Handle API typo
            authentication: "authentication",
            utility: "utility",
            service: "service",
          };

          const fetchedPrices = {
            marketing: "",
            authentication: "",
            utility: "",
            service: "",
          };

          response.data.data.forEach((item) => {
            const typeKey = pricingMap[item.type?.toLowerCase()];
            if (typeKey && item.price !== undefined) {
              fetchedPrices[typeKey] = item.price.toFixed(2); // Format to 2 decimals
            }
          });

          setPrices(fetchedPrices);
          setOriginalPrices(fetchedPrices);
        }
      } catch (err) {
        console.error("Failed to fetch pricing:", err);
        setError("Failed to load pricing data. You can still set new prices.");
      } finally {
        setLoading(false);
      }
    };

    fetchPricing();
  }, [token]);

  // Handle input change
  const handlePriceChange = (type, value) => {
    if (value === "" || (!isNaN(value) && Number(value) >= 0)) {
      setPrices((prev) => ({ ...prev, [type]: value }));
    }
  };

  // Save individual price
  const savePrice = async (type) => {
    const priceValue = parseFloat(prices[type]);
    if (isNaN(priceValue) || priceValue < 0) {
      setError("Please enter a valid price.");
      return;
    }

    setSaving((prev) => ({ ...prev, [type]: true }));
    setError("");
    setSuccessMessage("");

    try {
      await axios.post(
        `${apiurl}/api/whatsapp/charges/create`,
        {
          tenantId: "0",
          message_type: type,
          price: priceValue,
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

      setSuccessMessage(
        `${
          type.charAt(0).toUpperCase() + type.slice(1)
        } price updated successfully!`
      );
      setOriginalPrices((prev) => ({ ...prev, [type]: prices[type] }));
    } catch (err) {
      console.error(err);
      setError(`Failed to save ${type} price. Please try again.`);
    } finally {
      setSaving((prev) => ({ ...prev, [type]: false }));
    }
  };

  const pricingSections = [
    { key: "marketing", label: "Marketing Messages" },
    { key: "authentication", label: "Authentication Messages" },
    { key: "utility", label: "Utility: Reminders & Updates" },
    { key: "service", label: "Service Messages" },
  ];

  return (
    <Layout>
        {loading ? (
          <InfiLoader maintext="Loading Pricing Configuration..." />
        ) : (
          <div className="border bg-white h-full w-full px-2 py-2 overflow-y-scroll custom-scrollbar">
            <div className="p-4">
              <BackHeader
                title={
                  <span className="text-2xl font-bold text-primary">
                    WhatsApp Pricing Configuration
                  </span>
                }
                // backButton={true}
                // link="/dashboard"
              />

              {error && (
                <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text-primary mb-6">
                  Set Price per Message (INR)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
                  {pricingSections.map(({ key, label }) => (
                    <div
                      key={key}
                      className="border border-light-primary rounded-xl p-4 sm:p-5 lg:p-6
                 bg-gradient-to-br from-accent/10 to-white
                 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-semibold text-primary mb-4">
                        {label}
                      </h4>

                      {/* Price Input */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6">
                        <div className="relative w-full sm:w-auto">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-primary font-medium">
                            ₹
                          </span>
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={prices[key]}
                            onChange={(e) =>
                              handlePriceChange(key, e.target.value)
                            }
                            placeholder="0.00"
                            className="w-full sm:w-48 pl-8 pr-4 py-2.5 sm:py-3
                       border border-light-secondary rounded-lg
                       focus:outline-none focus:border-primary
                       focus:ring-2 focus:ring-light-primary
                       text-base sm:text-lg"
                          />
                        </div>

                        <span className="text-sm sm:text-base text-text-secondary">
                          INR per message
                        </span>
                      </div>

                      {/* Save Button */}
                      <button
                        onClick={() => savePrice(key)}
                        disabled={
                          saving[key] ||
                          prices[key] === originalPrices[key] ||
                          prices[key] === "" ||
                          isNaN(prices[key])
                        }
                        className={`w-full py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base
          transition-all
          ${
            saving[key] ||
            prices[key] === originalPrices[key] ||
            prices[key] === "" ||
            isNaN(prices[key])
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary hover:bg-light-primary text-white shadow-md hover:shadow-lg"
          }`}
                      >
                        {saving[key] ? "Saving..." : "Save Price"}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-center text-sm text-text-secondary">
                  <p>These prices apply to all WhatsApp conversations.</p>
                  <p className="mt-2">
                    Changes take effect immediately after saving.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </Layout>
  );
}

export default Pricing;
