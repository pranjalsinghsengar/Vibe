import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout, { Container } from "../components/layout";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { apiurl } from "../config/config";
import { useUser } from "../config/userProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DynamicLoader } from "../components/loader";
import BackHeader from "../components/backHeader";
import Input from "../components/inputContainer";
import { BlackButton } from "../components/buttonContainer";
import { ToastContainer, toast } from "react-toastify";


function TeamEdit() {
  const { userData } = useUser();
  const { userObjId } = useParams();
  const vendorObjId = userData?.vendorDetails?.vendorObjId;
  const navigate = useNavigate();

  const [showDeleteMemberPopup, setShowDeleteMemberPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editTeamLoading, setEditTeamLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    address: "",
    city: "",
    province: "",
    zip: "",
    province_code: "",
    country_code: "",
    stores: false,
    products: false,
    orders: false,
    settings: false,
    reports: false,
    users: false,
    analytics: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };
  console.log(formdata);

  const handleToggleChange = (key) => {
    setFormdata((prevFormData) => ({
      ...prevFormData,
      [key]: !prevFormData[key],
    }));
  };

  const fetchUserData = async (vendorObjId) => {
    setLoading(true);
    let payload = JSON.stringify({
      vendorObjId: vendorObjId,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiurl}/admin/v1/user/get/${userObjId}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: payload,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Customer Data:", response.data.data);
        // setAppData(response.data.data);
        // setLoading(false);
        // setUser(response?.data?.data)
        setFormdata({
          name: response?.data?.data?.name || "",
          email: response?.data?.data?.email || "",
          phone: response?.data?.data?.phone || "",
          role: response?.data?.data?.userType || "",
          stores: response?.data?.data?.permissions?.stores || false,
          products: response?.data?.data?.permissions?.products || false,
          orders: response?.data?.data?.permissions?.orders || false,
          settings: response?.data?.data?.permissions?.settings || false,
          reports: response?.data?.data?.permissions?.reports || false,
          users: response?.data?.data?.permissions?.users || false,
          analytics: response?.data?.data?.permissions?.analytics || false,
          address: response?.data?.data?.addressDetails?.address || false,
          city: response?.data?.data?.addressDetails?.city || false,
          province: response?.data?.data?.addressDetails?.province || false,
          zip: response?.data?.data?.addressDetails?.zip || false,
          province_code: response?.data?.data?.addressDetails?.province_code || false,
          country_code: response?.data?.data?.addressDetails?.country_code || false,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleBack = () => {
    navigate(`/teams/${userObjId}`);
  };

  useEffect(() => {
    if (userData?.vendorDetails?.vendorObjId) {
      fetchUserData(userData.vendorDetails.vendorObjId);
    }
  }, []);

  // Custom toggle switch component
  const Toggle = ({ name, checked, onChange }) => (
    <div className="flex justify-between">
      <label className="mr-2 text-lg">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${checked ? "bg-gray-500" : "bg-gray-300"
          }`}
      >
        <div
          className={`bg-white w-3 h-3 lg:w-4 lg:h-4 rounded-full shadow-md transform ${checked ? "translate-x-6" : ""
            } transition-transform`}
        />
      </div>
    </div>
  );

  const dataToSend = {
    name: formdata.name,
    email: formdata.email,
    phone: formdata.phone,
    password: formdata.password,
    storeName: formdata.storeName,
    storeEmail: formdata.storeEmail,
    StorePhone: formdata.StorePhone,
    storeAddress: formdata.storeAddress,
    storeCode: formdata.storeCode,
    vendorObjId: vendorObjId,
    vendorId: "10001",
    userType: formdata.role,
    addressDetails: {
      address: formdata.address,
      city: formdata.city,
      province: formdata.province,
      zip: formdata.zip,
      country: formdata.country_code,
      phone: formdata.phone,
      name: formdata.name,
      province_code: formdata.province_code,
      country_code: formdata.country_code,
    },
    permissions: {
      stores: formdata.stores,
      products: formdata.products,
      orders: formdata.orders,
      settings: formdata.settings,
      reports: formdata.reports,
      users: formdata.users,
      analytics: formdata.analytics,
    },

  };

  const handleSubmit = async () => {
    setEditTeamLoading(true);

    try {
      const response = await axios.post(
        `${apiurl}/admin/v1/user/update/${userObjId}`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.success === true) {
        setEditTeamLoading(false);
        toast.success(response?.data?.message || "User Updated Successfully");
        navigate("/teams");
      } else {
        setEditTeamLoading(false);
        toast.error("Details not Updated, Please Try Again Later");
      }
    } catch (error) {
      setEditTeamLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <Layout>
      <Container>
        {loading === true ? (
          <DynamicLoader maintext="wait" subtext="Fetching Team Details" />
        ) : (
          <div className="flex flex-wrap justify-between w-full h-full">
            <div className="flex flex-col  py-2 md:py-4 px-2  w-[100%] h-[100%] overflow-auto hide-scrollbar text-start">
              <BackHeader
                title="Edit Details"
                backButton={true}
                link={`/teams/${userObjId}`}
              />

              <div className="flex flex-col md:flex-row justify-between w-full mt-10 md:mt-0">
                <div className="md:w-1/2 md:p-14 md:border-r text-sm md:text-base">
                  <p className="text-slate-500 font-semibold text-sm md:text-lg">
                    Information:
                  </p>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="w-full">
                      {/* <label className='text-sm text-slate-500'>Name :</label> */}
                      <Input.normal
                        label="Name :"
                        name="name"
                        value={formdata.name}
                        placeholder="Enter Name"
                        className=" w-full border border-slate-200 focus:outline-none px-4 py-2 my-2"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <Input.normal
                        label="Phone :"
                        name="phone"
                        value={formdata.phone}
                        placeholder="Enter Phone No."
                        className="w-full border border-slate-200 focus:outline-none px-4 py-2 my-2"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <Input.normal
                        label="Email :"
                        name="email"
                        value={formdata.email}
                        placeholder="Enter Email"
                        className="w-full border border-slate-200 focus:outline-none px-4 py-2 my-2"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="w-full">
                      <label className="font-medium text-xs md:text-sm pl-3 text-slate-500">
                        Role :
                      </label>
                      <select
                        name="role"
                        value={formdata.role}
                        className="w-full border border-slate-300 focus:outline-none px-4 py-2 my-2"
                        defaultValue=""
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select Role
                        </option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/2  md:p-14 rounded text-sm md:text-lg">
                  <p className="text-slate-500 py-2 font-semibold">
                    Permissions:
                  </p>

                  <div className="flex flex-col p-6 gap-5">
                    <div className="w-full">
                      <Toggle
                        name="stores"
                        checked={formdata.stores}
                        onChange={() => handleToggleChange("stores")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="products"
                        checked={formdata.products}
                        onChange={() => handleToggleChange("products")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="orders"
                        checked={formdata.orders}
                        onChange={() => handleToggleChange("orders")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="settings"
                        checked={formdata.settings}
                        onChange={() => handleToggleChange("settings")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="reports"
                        checked={formdata.reports}
                        onChange={() => handleToggleChange("reports")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="users"
                        checked={formdata.users}
                        onChange={() => handleToggleChange("users")}
                      />
                    </div>
                    <div className="w-full">
                      <Toggle
                        name="analytics"
                        checked={formdata.analytics}
                        onChange={() => handleToggleChange("analytics")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full mt-5 md:mt-10 rounded-sm border bg-white p-3 md:p-5 border-r text-sm md:text-base">
                <p className="text-slate-500 font-semibold text-sm md:text-lg">
                  Store Address:
                </p>
                <div className="md:p-5 p-3 flex flex-col gap-3">
                  <div className="mt-2 flex  justify-between flex-col md:flex-row gap-3 md:gap-5">
                    <Input.normal
                      label="Enter City"
                      name="city"
                      value={formdata.city}
                      placeholder="Enter City"
                      onChange={handleInputChange}
                    />
                    <Input.normal
                      label="Enter Province"
                      name="province"
                      value={formdata.province}
                      placeholder="Enter Province"
                      onChange={handleInputChange}
                    />
                    <Input.normal
                      label="Enter ZIP"
                      name="zip"
                      value={formdata.zip}
                      placeholder="Enter ZIP"
                      onChange={handleInputChange}
                    />
                  </div>
                  <Input.textArea
                    label="Enter Address"
                    name="address"
                    rows="5"
                    value={formdata.address}
                    placeholder="Enter Address"
                    onChange={handleInputChange}
                  />
                  <div className="mt-2 flex  justify-between flex-col md:flex-row gap-3 md:gap-5">
                    {/* <Input.normal
                        label="Enter Country"
                        name="country"
                        value={formdata.country}
                        placeholder="Enter Country"
                        onChange={handleInputChange}
                      /> */}
                    <Input.normal
                      label="Enter Province Code"
                      name="province_code"
                      value={formdata.province_code}
                      placeholder="Enter Province Code"
                      onChange={handleInputChange}
                    />
                    <Input.normal
                      label="Enter Country Code"
                      name="country_code"
                      value={formdata.country_code}
                      placeholder="Enter Country Code"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="text-center mt-8">
                <BlackButton title="Save" handleSubmit={handleSubmit} loading={editTeamLoading} loadingTitle={"Saving ..."}/>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default TeamEdit;
