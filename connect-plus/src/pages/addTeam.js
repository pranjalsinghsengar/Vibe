import React, { useState } from "react";
import Layout, { Container } from "../components/layout";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BlackButton } from "../components/buttonContainer";
import axios from "axios";
import Input from "../components/inputContainer";
import { apiurl } from "../config/config";
import { ToastContainer, toast } from "react-toastify";
import { CountryAndStateData } from "../constants/constant";
import { useUser } from "../config/userProvider";


function AddTeam() {
  const {userData} = useUser();
  const navigate = useNavigate();
  const token = localStorage.getItem("sctoken");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [states, setStates] = useState([]);

// console.log("userData 21",userData);
// console.log("vendor",vendor);

let vendorObjId = "12345";
// let vendorObjId = vendor?._id;
// console.log("vendor 28",vendorObjId);

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
    stores: false,
    products: false,
    orders: false,
    settings: false,
    reports: false,
    users: false,
    analytics: false,
    userAddress: {
      address: "",
      city: "",
      province: "",
      zip: "",
      province_code: "",
      country: "",
      country_code: "",
    },
  });

  console.log("formdata",formdata);

  const validateForm = () => {
    if (!formdata.name.trim()) return "Name is required";
    if (!formdata.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email))
      return "Invalid email format";
    if (!formdata.phone.trim()) return "Phone number is required";
    if (!/^\d{10}$/.test(formdata.phone))
      return "Phone number must be 10 digits";
    if (!formdata.password.trim()) return "Password is required";
    if (formdata.password.length < 6)
      return "Password must be at least 6 characters";
    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle phone number validation
    if (name === "phone") {
      const isValidPhone = /^\d{0,10}$/.test(value);
      if (!isValidPhone) return;
    }

    // Handle zip code validation
    if (name === "zip") {
      const isValidZip = /^\d{0,6}$/.test(value);
      if (!isValidZip) return;
    }

    // Handle country selection
    if (name === "country") {
      const selectedCountry = CountryAndStateData[value];
      if (selectedCountry) {
        const { name: countryName, states } = selectedCountry;
        setStates(Object.entries(states)); // Update states dropdown dynamically
        setFormdata((prev) => ({
          ...prev,
          userAddress: {
            ...prev.userAddress,
            country: countryName, // Save the country name
            country_code: value, // Save the country code
            province: "", // Clear state name
            province_code: "", // Clear state code
          },
        }));
      } else {
        setStates([]); // Clear states if no valid country is selected
        setFormdata((prev) => ({
          ...prev,
          userAddress: {
            ...prev.userAddress,
            country: value,
            country_code: "", // Clear country code
            province: "", // Clear state name
            province_code: "", // Clear state code
          },
        }));
      }
      return; // Exit early after handling country change
    }

    if (name === "state") {
      const selectedState = states.find(([stateCode]) => stateCode === value);
      if (selectedState) {
        const [stateCode, stateName] = selectedState;
        setFormdata((prev) => ({
          ...prev,
          userAddress: {
            ...prev.userAddress,
          province: stateName, // Save the state name
          province_code: stateCode, // Save the state code
          }
        }));
      } else {
        setFormdata((prev) => ({
          ...prev,
          userAddress: {
            ...prev.userAddress,
          province: value,
          province_code: "", // Clear province_code
          }
        }));
      }
      return; // Exit early after handling state change
    }

    // Handle nested address fields
    if (name in formdata.userAddress) {
      setFormdata((prev) => ({
        ...prev,
        userAddress: { ...prev.userAddress, [name]: value },
      }));
    } else {
      setFormdata((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleChange = (key) => {
    setFormdata((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const CreateHandler = async () => {
    try {
      const validationError = validateForm();
      if (validationError) {
        setError(validationError);
        return;
      }

      setIsSubmitting(true);
      setError("");

      const requestData = {
        name: formdata.name,
        email: formdata.email,
        phone: formdata.phone,
        password: formdata.password,
        userType: formdata.role,
        vendorObjId: vendorObjId,
        permissions: {
          stores: formdata.stores,
          products: formdata.products,
          orders: formdata.orders,
          settings: formdata.settings,
          reports: formdata.reports,
          users: formdata.users,
          analytics: formdata.analytics,
        },
        userAddress: formdata.userAddress,
      };

      const response = await axios.post(
        `${apiurl}/admin/v1/user/create`,
        requestData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "User created successfully");
        navigate("/teams");
      } else {
        setError(response.data?.message || "Failed to create user");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "An error occurred while creating the user"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle switch component
  const Toggle = ({ name, checked, onChange }) => (
    <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
      <label className="mr-2 text-gray-700">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? "bg-gray-500" : "bg-gray-300"
          }`}
      >
        <div
          className={`bg-white w-3 h-3 lg:w-4 lg:h-4 rounded-full shadow-md transform transition-transform ${checked ? "translate-x-6" : ""
            }`}
        />
      </div>
    </div>
  );

  return (
    <Layout>
      <Container>
        <div className="flex flex-col py-2 px-2 w-full h-full overflow-auto hide-scrollbar">
          <div className="flex items-center gap-5 mb-6">
            <Link to="/teams">
              <div className="flex items-center justify-center border border-slate-300 rounded-md w-8 h-8 cursor-pointer hover:bg-gray-50">
                <IoMdArrowRoundBack className="text-secondary" />
              </div>
            </Link>
            <h2 className="text-lg md:text-2xl text-secondary font-bold">
              Add Team Member
            </h2>
          </div>

          <div className="flex flex-col gap-5 text-left">
            {/* User Information */}
            <section className="bg-white rounded-sm border p-6">
              <h3 className="text-slate-500 font-semibold text-lg mb-4">
                Basic Information
              </h3>
              <div className="space-y-4">
                <Input.normal
                  label="Name"
                  name="name"
                  value={formdata.name}
                  placeholder="Enter full name"
                  onChange={handleInputChange}
                  required
                />
                <Input.normal
                  label="Phone Number"
                  name="phone"
                  value={formdata.phone}
                  placeholder="Enter 10-digit phone number"
                  onChange={handleInputChange}
                  required
                />
                <Input.normal
                  label="Email"
                  name="email"
                  value={formdata.email}
                  placeholder="Enter email address"
                  onChange={handleInputChange}
                  required
                />
                <Input.normal
                  label="Password"
                  name="password"
                  type="password"
                  value={formdata.password}
                  placeholder="Enter password"
                  onChange={handleInputChange}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={formdata.role}
                    onChange={handleInputChange}
                    className="w-full border border-slate-200 focus:outline-none px-3 py-2 rounded-lg"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Address Information */}
            <section className="bg-white rounded-sm border p-6">
              <h3 className="text-slate-500 font-semibold text-lg mb-4">
                Address Information
              </h3>
              <div className="space-y-4">

                {/* <Input.normal
                  label="Country"
                  name="country"
                  value={formdata.userAddress.country}
                  placeholder="Enter country"
                  onChange={handleInputChange}
                /> */}
                <div className="mt-2 flex justify-between flex-col ">
                  <label className="block text-sm font-medium text-gray-500">
                    Select Country
                  </label>
                  <select
                    name="country"
                    value={formdata.userAddress.country_code}
                    onChange={handleInputChange}
                    className="p-2 border border-1 rounded-md border-slate-300 outline-none"
                  >
                    <option value="">Select Country</option>
                    {Object.entries(CountryAndStateData).map(([code, country]) => (
                      <option key={code} value={code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input.textArea
                  label="Street Address"
                  name="address"
                  rows="5"
                  value={formdata.userAddress.address}
                  placeholder="Enter street address"
                  onChange={handleInputChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* <Input.normal
                    label="Province/State"
                    name="province"
                    value={formdata.userAddress.province}
                    placeholder="Enter province/state"
                    onChange={handleInputChange}
                  /> */}
                  <div className="flex justify-between flex-col  w-full">
                    <label className="block text-sm font-medium text-gray-700">
                      Select State
                    </label>
                    <select
                      name="state"
                      value={formdata.userAddress.province_code}
                      onChange={handleInputChange}
                      className="p-2 border border-1 rounded-md border-slate-300 outline-none"
                    >
                      <option value="">Select State</option>
                      {states.map(([code, name]) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input.normal
                    label="City"
                    name="city"
                    value={formdata.userAddress.city}
                    placeholder="Enter city"
                    onChange={handleInputChange}
                  />

                  <Input.normal
                    label="ZIP/Postal Code"
                    name="zip"
                    value={formdata.userAddress.zip}
                    placeholder="Enter ZIP code"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Permissions */}
            {formdata.role !== "user" && (
              <section className="bg-white rounded-sm border p-6">
                <h3 className="text-slate-500 font-semibold text-lg mb-4">
                  Permissions
                </h3>
                <div className="space-y-2">
                  {[
                    "stores",
                    "products",
                    "orders",
                    "settings",
                    "reports",
                    "users",
                    "analytics",
                  ].map((permission) => (
                    <Toggle
                      key={permission}
                      name={permission}
                      checked={formdata[permission]}
                      onChange={() => handleToggleChange(permission)}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-center mt-4 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}

          <div className="text-center mt-6">
            <BlackButton
              title={isSubmitting ? "Creating..." : "Create Team Member"}
              handleSubmit={CreateHandler}
              disabled={isSubmitting}
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default AddTeam;
