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

function Customers() {
    const token = getCookie("sctoken");
    const [customers, setCustomers] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Pagination states
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState({ totalItems: 0 });

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${apiurl}/api/whatsapp/user/getadminlist`,
                {
                    limit: itemsPerPage,
                    page: currentPage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.sucess) {
                setCustomers(response.data.data);
                setPaginationData({ totalItems: response.data.data.length }); // Adjust based on API response
            } else {
                toast.error(response?.data?.message || "Failed to fetch Customer list");
            }
        } catch (error) {
            console.error("Error fetching customers:", error);
            toast.error("Error fetching data, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const filterData = customers && customers.filter(
        (Customer) =>
            Customer?.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            Customer?.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
            Customer?.phone?.toLowerCase().includes(searchInput.toLowerCase())
    );

    useEffect(() => {
        fetchCustomers();
    }, [currentPage, itemsPerPage]);

    const handleViewCustomer = (id) => {
        navigate(`/Customer/${id}`);
    };

    return (
        <Layout>
            <Container>
                {loading ? (
                    <InfiLoader maintext="Fetching Customers Data..." />
                ) : (
                    <div className="border bg-white h-full w-full px-2 py-2">
                        <div className="relative flex flex-col gap-2 w-full overflow-hidden rounded-lg sm:rounded-xl px-2 h-full p-2">
                            <BackHeader
                                title={
                                    <span className="flex flex-col md:flex-row items-center">
                                        Customers
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
                                        <div className="block md:hidden">
                                            <Link to="/customers/add">
                                                <ButtonContainer icon={<IoAddOutline />} />
                                            </Link>
                                        </div>
                                        <div className="hidden md:block">
                                            <Link to="/newCustomer">
                                                <ButtonContainer icon={<IoAddOutline />}>
                                                    Add Customer
                                                </ButtonContainer>
                                            </Link>
                                        </div>
                                        <div className="hidden md:flex">
                                            <SearchContainer
                                                value={searchInput}
                                                placeholder={"Search Customers..."}
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
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Phone
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Tenant
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filterData.map((Customer, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? "odd:bg-white" : "even:bg-gray-50"
                                                        } border-b`}
                                                >
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                                                    >
                                                        {Customer.name}
                                                    </th>
                                                    <td className="px-6 py-4">{Customer.email}</td>
                                                    <td className="px-6 py-4">{Customer.phone || "N/A"} </td>
                                                    <td className="px-6 py-4">{Customer.tenant.tenantName || "N/A"}</td>
                                                    <td
                                                        className="pl-4 sm:pl-6 py-4 text-blue-500 cursor-pointer"
                                                        onClick={() => handleViewCustomer(Customer.id)}
                                                    >
                                                        View
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <DataNotFound.page label="Customers" />
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

export default Customers;