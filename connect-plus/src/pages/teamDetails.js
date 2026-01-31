import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout, { Container } from "../components/layout";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { apiurl } from "../config/config";
import { useUser } from "../config/userProvider";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DynamicLoader } from "../components/loader";
import BackHeader from "../components/backHeader";
import Input from "../components/inputContainer";
import { BlackButton } from "../components/buttonContainer";
import Card from "../components/card";
import { toast } from "react-toastify";

function TeamDetails() {
  const { userData } = useUser();
  const { userObjId } = useParams(); // Extract the ID from the URL
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteTeamLoading, setDeleteTeamLoading] = useState(false);
  const [userType, setUserType] = useState("");
  const [user, setUser] = useState([]);

  // console.log("userData", userData?.userType);

  const deletePopup = () => {
    setShowDeleteMemberPopup(!showDeleteMemberPopup);
  };
  const handleDelete = () => {
    setShowDeleteMemberPopup(false);
  };
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [showDeleteMemberPopup, setShowDeleteMemberPopup] = useState(false);
  const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState("");

  // const [formdata, setFormdata] = useState({
  //     name: '',
  //     email: '',
  //     phone: '',
  //     role: '',
  //     stores: false,
  //     products: false,
  //     orders: false,
  //     settings: false,
  //     reports: false,
  //     users: false,
  //     analytics: false,
  // });
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    stores: false,
    products: false,
    orders: false,
    settings: false,
    reports: false,
    users: false,
    analytics: false,
  });

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
        console.log("Team Data:", response);
        // setAppData(response.data.data);
        // setLoading(false);
        // setUser(response?.data?.data)
        setUserDetails({
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
        setUserType(response?.data?.data?.userType);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (userData?.vendorDetails?.vendorObjId) {
      fetchUserData(userData.vendorDetails.vendorObjId);
    }
  }, []);
  const handleBack = () => {
    navigate("/teams");
  };

  // Custom toggle switch component
  const Toggle = ({ name, checked, onChange }) => (
    <div className="flex justify-between">
      <label className="mr-2 text-lg">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <div
        onClick={onChange}
        className={`w-12 h-6 flex items-center rounded-full p-1 ${checked ? "bg-gray-500" : "bg-gray-300"
          }`}
      >
        <div
          className={`bg-white w-3 h-3 lg:w-4 lg:h-4 rounded-full shadow-md transform ${checked ? "translate-x-6" : ""
            } transition-transform`}
        />
      </div>
    </div>
  );

  const DeleteHandler = () => {
    setDeleteTeamLoading(true);
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${apiurl}/admin/v1/user/delete/${userObjId}`,
      headers: {
        "Content-Type": "application/json",
      }
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          toast.success(response.data.message ? response.data.message : "User deleted successfully");
          // WantToDelete(false);
          // fetchCustomerData(vendorObjId);
          setDeleteTeamLoading(false);
          handleDeleteConfirmationPopup();
          navigate("/teams");
          // setDeleteCustomerIds([]);
        } else {
          toast.error(response.data.message ? response.data.message : "Failed to delete user");
          setDeleteTeamLoading(false);
        }
      })
      .catch((error) => {
        setDeleteTeamLoading(false);
        toast.error("Failed to delete user, Please try again later.");
        console.log(error);
      });
  };
  const editTeamDetails = (e) => {
    e.preventDefault();
    // Logic to update store details via API or state
    // console.log('Updated Store Details:', storeDetails);
    navigate(`/teams/${userObjId}/edit`);
  };
  const handleDeleteConfirmationPopup = () => {
    setDeleteConfirmationPopup(!deleteConfirmationPopup);
  }

  console.log("userDetails", userDetails);
  return (
    <Layout>
      <Container>
        {loading === true ? (
          <DynamicLoader maintext="wait" subtext="Fetching Team Details" />
        ) : (
          <>
            <div className="flex flex-wrap justify-between w-full h-full">
              {deleteConfirmationPopup && (
                <Card.confirmation
                  message="Are you sure you want to delete this team member?"
                  onConfirm={() => DeleteHandler()}
                  onClose={handleDeleteConfirmationPopup}
                  loading={deleteTeamLoading}
                  loadingTitle="Deleting..."

                />
              )}
              <div className="flex flex-col py-2 px-2 w-[100%] h-[100%] text-start overflow-scroll hide-scrollbar">
                <BackHeader
                  backButton={true}
                  link="/teams"
                  title="Details"
                  rightSide={
                    <div className="flex gap-5">
                      {userType !== "superadmin" && <BlackButton title="Delete" handleSubmit={handleDeleteConfirmationPopup} backgroundColor="rgb(239 68 68)" />
                      }
                      <button
                        className="bg-slate-500 text-white text-sm md:text-base px-2 py-1 md:px-4 md:py-2 rounded-sm"
                        onClick={editTeamDetails}
                      >
                        Edit Details
                      </button>
                    </div>
                  }
                />
                <div className="flex flex-col md:flex-row justify-between w-full mt-10 md:mt-0  ">
                  {/* Left side */}
                  <div className="md:w-1/2 md:p-20 border-r text-sm md:text-base">
                    <p className="text-slate-500 font-semibold text-sm md:text-lg">
                      Information:
                    </p>
                    {/* <div className='flex gap-4'> */}
                    <div className="mt-5">
                      {/* <div className='md:flex gap-4'> */}
                      <div className="w-full">
                        <p className="text-sm text-slate-500">Name :</p>
                        <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                          {userDetails.name || "N/A"}
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-sm text-slate-500">Phone :</p>
                        <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                          {userDetails.phone || "N/A"}
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                    {/* <div className='md:flex gap-4'> */}
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Email :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.email || "N/A"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Role :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.role || "Select Role"}
                      </div>
                    </div>
                    {/* <div className="w-full">
                      <p className="text-sm text-slate-500">Address :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.address || "Select Address"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">City :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.city || "Select City"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Province :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.province || "Select Province"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Zip code :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.zip || "Select Zip Code"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Province Code :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.province_code || "Select Province Code"}
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-sm text-slate-500">Country Code :</p>
                      <div className="w-full border bg-white border-slate-200 focus:outline-none px-4 py-2 my-2 rounded-sm">
                        {userDetails.country_code || "Select Country Code "}
                      </div>
                    </div> */}
                  </div>

                  {/* </div> */}
                  {/* Right Side */}

                  <div className="md:w-1/2  md:p-20 rounded text-sm md:text-lg">
                    <p className="text-slate-500 py-2 font-semibold">
                      Permissions:
                    </p>
                    <div className="flex flex-col gap-5">
                      {/* <div className='flex gap-4'> */}
                      <div className="w-full">
                        <Toggle name="stores" checked={userDetails.stores} />
                      </div>
                      <div className="w-full">
                        <Toggle
                          name="products"
                          checked={userDetails.products}
                        />
                      </div>
                      {/* </div>
                    <div className='flex gap-4'> */}
                      <div className="w-full">
                        <Toggle name="orders" checked={userDetails.orders} />
                      </div>
                      <div className="w-full">
                        <Toggle
                          name="settings"
                          checked={userDetails.settings}
                        />
                      </div>
                      {/* </div>
                    <div className='flex gap-4'> */}
                      <div className="w-full ">
                        <Toggle name="reports" checked={userDetails.reports} />
                      </div>
                      <div className="w-full ">
                        <Toggle name="users" checked={userDetails.users} />
                      </div>
                      {/* </div>
                    <div className='flex gap-4'> */}
                      <div className="w-full">
                        <Toggle
                          name="analytics"
                          checked={userDetails.analytics}
                        />
                      </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
                <div className="w-full mt-5 md:mt-10 rounded-sm border bg-white p-3 md:p-5 border-r text-sm md:text-base">
                  <p className="text-slate-500 font-semibold text-sm md:text-lg">
                    Address:
                  </p>
                  <div className="md:p-5 p-3 flex flex-col gap-3">
                    <div className="mt-2 flex  justify-between flex-col md:flex-row gap-3 md:gap-5">
                      <Input.normal
                        label="Enter City"
                        name="city"
                        value={userDetails.city}
                        placeholder="Enter City"
                        disabled

                      />
                      <Input.normal
                        label="Enter Province"
                        name="province"
                        value={userDetails.province}
                        placeholder="Enter Province"
                        disabled

                      />
                      <Input.normal
                        label="Enter ZIP"
                        name="zip"
                        value={userDetails.zip}
                        placeholder="Enter ZIP"
                        disabled

                      />
                    </div>
                    <Input.textArea
                      label="Enter Address"
                      name="address"
                      rows="5"
                      value={userDetails.address}
                      placeholder="Enter Address"
                      disabled

                    />
                    <div className="mt-2 flex  justify-between flex-col md:flex-row gap-3 md:gap-5">
                      {/* <Input.normal
                          label="Enter Country"
                          name="country"
                          value={userDetails.country}
                          placeholder="Enter Country"
                        /> */}
                      <Input.normal
                        label="Enter Province Code"
                        name="province_code"
                        value={userDetails.province_code}
                        placeholder="Enter Province Code"
                        disabled
                      />
                      <Input.normal
                        label="Enter Country Code"
                        name="country_code"
                        value={userDetails.country_code}
                        placeholder="Enter Country Code"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}

export default TeamDetails;
