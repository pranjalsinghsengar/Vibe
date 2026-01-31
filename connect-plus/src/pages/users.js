// import React from 'react'
// import Layout from '../components/layout'

// function Users() {
//     return (
//         <Layout>
//             <div>Users</div>
//         </Layout>
//     )
// }

// export default Users





import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { InfiLoader } from "../components/loader";
import { IoAddOutline } from "react-icons/io5";
import SearchContainer from "../components/searchContainer";
import ButtonContainer from "../components/buttonContainer";
import BackHeader from "../components/backHeader";
import Pagination from "../components/pagination";
import { toast } from "react-toastify";
import DataNotFound from "../components/dataNotFound";
import { apiurl } from "../config/config";
import { getCookie } from "../config/webStorage";

function Users() {
    const token = getCookie("sctoken");
    const [users, setUsers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    console.log("users",users)

    // Pagination states
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({ totalItems: 0 });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${apiurl}/api/whatsapp/user/getAllCustomerListofadmin?limit=${itemsPerPage}&page=${currentPage}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.sucess) {
                setUsers(response.data.data);
                setPaginationData({ totalItems: response.data.data.length }); // Adjust based on API response
            } else {
                toast.error(response?.data?.message || "Failed to fetch user list");
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Error fetching data, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filterData = users && users.filter(
        (user) =>
            user?.user_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user?._id?.toLowerCase().includes(searchInput.toLowerCase()) ||
            user?.bot_type?.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        fetchUsers();
    }, [currentPage, itemsPerPage]);

    const handleViewCustomer = (id) => {
        navigate(`/user/${id}`);
    };

    return (
        <Layout>
            <Container>
                {loading ? (
                    <InfiLoader maintext="Fetching Users Data..." />
                ) : (
                    <div className="border bg-white h-full w-full px-2 py-2">
                        <div className="relative flex flex-col gap-2 w-full overflow-hidden rounded-lg sm:rounded-xl px-2 h-full p-2">
                            <BackHeader
                                title={
                                    <span className="flex flex-col md:flex-row items-center">
                                        Users
                                        <span className="hidden lg:flex">
                                            {" "}
                                            - {paginationData?.totalItems}
                                        </span>
                                        <select
                                            value={itemsPerPage}
                                            className="text-xs rounded border px-2 mx-2"
                                            onChange={(e) => setItemsPerPage(e.target.value)}
                                        >
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                    </span>
                                }
                                rightSide={
                                    <div className="flex gap-2 items-center">
                                        {/* <div className="block md:hidden">
                                            <Link to="/users/add">
                                                <ButtonContainer icon={<IoAddOutline />} />
                                            </Link>
                                        </div>
                                        <div className="hidden md:block">
                                            <Link to="/newCustomer">
                                                <ButtonContainer icon={<IoAddOutline />}>
                                                    Add user
                                                </ButtonContainer>
                                            </Link>
                                        </div> */}
                                        <div className="hidden md:flex">
                                            <SearchContainer
                                                value={searchInput}
                                                placeholder={"Search Users..."}
                                                onChange={(e) => setSearchInput(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                }
                            />
                            <div className="relative overflow-y-auto h-full sm:rounded-lg">
                                {filterData.length > 0 ? (
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 max-h-96">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                                            <tr>
                                                <th scope="col" className="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Phone
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Bot Type
                                                </th>
                                                {/* <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterData.map((user, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? "odd:bg-white" : "even:bg-gray-50"
                                                        } border-b`}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {user.user_name}
                                                    </th>
                                                    {/* <td className="px-6 py-4">{user?.user_name || "N/A"}</td> */}
                                                    <td className="px-6 py-4">{user?._id || "N/A"} </td>
                                                    <td className="px-6 py-4">{user?.bot_type}</td>
                                                    {/* <td
                                                        className="pl-4 sm:pl-6 py-4 text-blue-500 cursor-pointer"
                                                        onClick={() => handleViewCustomer(user.id)}
                                                    >
                                                        View
                                                    </td> */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <DataNotFound.page label="Users" />
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

export default Users;