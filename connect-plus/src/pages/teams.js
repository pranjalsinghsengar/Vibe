import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";
import { apiurl } from "../config/config";
import { useUser } from "../config/userProvider";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { DynamicLoader, InfiLoader } from "../components/loader";
import { IoMdAddCircle } from "react-icons/io";
import SearchContainer from "../components/searchContainer";
import ButtonContainer from "../components/buttonContainer";
import { IoAddOutline } from "react-icons/io5";
import BackHeader from "../components/backHeader";
import Pagination from "../components/pagination";
import Card from "../components/card";
import { toast } from "react-toastify";
import DataNotFound from "../components/dataNotFound";
import { Checkbox } from "../components/checkbox";


function Teams() {
  // const [isOpen, setIsOpen] = useState(false);
  const { userData } = useUser();
  let vendorObjId = userData?.vendorDetails?.vendorObjId;
  // console.log("userData", userData);

  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteTeamsLoading, setDeleteTeamsLoading] = useState(false);

  const navigate = useNavigate();

  console.log(users);

  const deletePopup = () => {
    setShowDeleteMemberPopup(!showDeleteMemberPopup);
  };
  const handleDelete = () => {
    setShowDeleteMemberPopup(false);
  };
  const [showDeleteMemberPopup, setShowDeleteMemberPopup] = useState(false);
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    stores: true,
    products: true,
    orders: true,
    settings: true,
    reports: true,
    users: true,
    analytics: true,
  });
  // =================== PAGINATION =================
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState("");
  const [deleteTeamIds, setDeleteTeamIds] = useState([]);
  const [isDeleted, WantToDelete] = useState(false);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // =======================================================

  const handleAddMember = () => {
    navigate(`/teams/add`);
  };
  const handleEditMember = (id) => {
    navigate(`/teams/${id}`);
  };

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

  const fetchUserData = async () => {
    setLoading(true);
    // let data = JSON.stringify({
    //   vendorObjId: vendorObjId,
    //   page: currentPage,
    //   limit: JSON.parse(itemsPerPage),
    // });
    let data = JSON.stringify({
      ...(userData?.userType === "admin"
        ? { storeObjId: userData?.storeDetails?.storeObjId, vendorObjId: vendorObjId }
        : { vendorObjId: vendorObjId }),
      page: currentPage,
      limit: JSON.parse(itemsPerPage),
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: `${apiurl}/admin/v1/user/get`,
      url: userData?.userType === "admin"
        ? `${apiurl}/admin/v1/user/get/store`
        : `${apiurl}/admin/v1/user/get`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log("Customer Data:", response.data.data);
        // setAppData(response.data.data);
        // setLoading(false);
        setUsers(response?.data?.data);
        setLoading(false);
        setPaginationData(response?.data?.pagination);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const filterdata = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchInput.toLowerCase())
  );

  const AllCheckedHandler = () => {
    if (filterdata.length !== deleteTeamIds.length) {
      filterdata.forEach((item) =>
        setDeleteTeamIds((prev) => [...prev, item._id])
      );
    } else {
      setDeleteTeamIds([]);
    }
  };

  const CheckedHandler = (id) => {
    const contain = deleteTeamIds.includes(id);
    console.log("containcontain", contain, id);
    if (contain) {
      setDeleteTeamIds(deleteTeamIds.filter((i) => i !== id));
    } else {
      setDeleteTeamIds((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [currentPage, itemsPerPage]);

  const DeleteHandler = () => {
    setDeleteTeamsLoading(true);
    let data = JSON.stringify({
      userObjIds: deleteTeamIds,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${apiurl}/admin/v1/user/delete`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.success) {
          toast.success(response?.data?.message ? response?.data?.message : "User deleted successfully");
          WantToDelete(false);
          fetchUserData(vendorObjId);
          setDeleteTeamsLoading(false);
          setDeleteTeamIds([]);
        } else {
          toast.error(response?.data?.message ? response?.data?.message : "Failed to delete user");
          setDeleteTeamsLoading(false);
        }
      })
      .catch((error) => {
        setDeleteTeamsLoading(false);
        toast.error("ailed to delete user, Please try again later.");
        console.log(error);
      });
  };
  console.log("deleteTeamIds", deleteTeamIds)
  return (
    <Layout>
      {isDeleted && (
        <Card.confirmation
          message="Are you sure?"
          onConfirm={() => DeleteHandler()}
          onClose={() => WantToDelete(false)}
          loading={deleteTeamsLoading}
          loadingTitle="Deleting..."
        />
      )}
      <Container>
        {loading === true ? (
          <InfiLoader maintext="Fetching Teams Data.." />
        ) : (
          <div className="border bg-white h-full w-full px-2 py-2">
            <div className=" relative flex flex-col gap-2 w-full overflow-hidden rounded-lg sm:rounded-xl px-2 h-full p-2">
              <BackHeader
                title={
                  <span className="flex flex-col md:flex-row items-center">
                    Our Team
                    <span className="hidden lg:flex">
                      {" "}
                      - {paginationData?.totalItems}
                    </span>
                    <select
                      value={itemsPerPage}
                      className="text-xs rounded text-black border px-2 mx-2"
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="250">250</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                    </select>
                  </span>
                }
                rightSide={
                  <div className="flex gap-2 items-center ">
                    <div>
                      {deleteTeamIds.length > 0 &&
                        userData?.userType === "superadmin" && (
                          <button
                            onClick={() => WantToDelete(true)}
                            className="bg-red-50 text-xs hover:bg-[#c00218] border border-red-300 text-[#c00218] hover:text-white rounded-lg py-1.5 md:py-2 px-3 "
                          >
                            Delete
                          </button>
                        )}
                    </div>
                    <div className="block md:hidden">
                      <Link to="/teams/add">
                        <ButtonContainer
                          icon={<IoAddOutline />}
                        ></ButtonContainer>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      {userData?.userType !== "admin" ? <Link to="/teams/add">
                        <ButtonContainer icon={<IoAddOutline />}>
                          Create
                        </ButtonContainer>
                      </Link> : null}
                    </div>
                    <div className="hidden md:flex">
                      <SearchContainer
                        value={searchInput}
                        placeholder={"Search Team..."}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                }
              />
              <div className="relative overflow-y-auto h-full sm:rounded-lg">
                {filterdata && filterdata.length > 0 ? (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 max-h-96">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                      <tr>
                        <th scope="col" class="p-4">
                          <Checkbox checked={filterdata.length === deleteTeamIds.length} onChange={AllCheckedHandler} />
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Phone No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          User Type
                        </th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filterdata &&
                        filterdata.length > 0 &&
                        filterdata.map((user, index) => (
                          <tr
                            key={index}
                            className={`${index % 2 === 0
                              ? "odd:bg-white"
                              : "even:bg-gray-50"
                              } border-b `}
                          >
                            <td class="w-4 p-4">
                              <Checkbox checked={deleteTeamIds.includes(user._id)} onClick={() => CheckedHandler(user._id)} disabled={user?.userType === "superadmin"} />
                            </td>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                            >
                              {user.name}
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.phone}</td>
                            <td className="px-6 py-4">{user.userType}</td>
                            <td
                              className="pl-4 sm:pl-6 py-4 text-blue-500 cursor-pointer"
                              onClick={() => handleEditMember(user._id)}
                            >
                              view
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <DataNotFound.page label="Team" />
                )}
              </div>
              <Pagination
                currentPage={currentPage}
                totalItems={paginationData?.totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
}

export default Teams;


