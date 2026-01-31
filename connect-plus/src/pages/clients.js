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

function Clients() {
  const token = getCookie("sctoken");
  const [clients, setClients] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Pagination states
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationData, setPaginationData] = useState({ totalItems: 0 });
  const [statusFilter, setStatusFilter] = useState("all");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/user/getsuperadminlist`,
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
        setClients(response.data.data);
        setPaginationData({ totalItems: response.data.data.length }); // Adjust based on API response
      } else {
        toast.error("Failed to fetch client list");
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Error fetching data, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  //   const filterData = clients.filter(
  //     (client) =>
  //       client.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       client.email.toLowerCase().includes(searchInput.toLowerCase()) ||
  //       client.phone.toLowerCase().includes(searchInput.toLowerCase())
  //   );
  const filterData = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchInput.toLowerCase()) ||
      client.email.toLowerCase().includes(searchInput.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchInput.toLowerCase());

    // 👇 THIS ensures "all" shows everything
    const matchesStatus =
      statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    fetchClients();
  }, [currentPage, itemsPerPage]);

  const handleViewClient = (id) => {
    navigate(`/client/${id}`);
  };

  return (
    <Layout>
      <Container>
        {loading ? (
          <InfiLoader maintext="Fetching Clients Data..." />
        ) : (
          <div className="border bg-white h-full w-full px-2 py-2">
            <div className="relative flex flex-col gap-2 w-full overflow-hidden rounded-lg sm:rounded-xl px-2 h-full p-2">
              <BackHeader
                title={
                  <span className="flex flex-col md:flex-row items-center">
                    Clients
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
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="flex items-center gap-1 bg-transparent hover:bg-secondary text-nowrap font-semibold text-primary text-xs md:text-sm lg:text-base py-1 px-2 md:py-2 md:px-4 border border-primary rounded"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="block md:hidden">
                      <Link to="/clients/add">
                        <ButtonContainer icon={<IoAddOutline />} />
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <Link to="/newClient">
                        <ButtonContainer icon={<IoAddOutline />}>
                          Add Client
                        </ButtonContainer>
                      </Link>
                    </div>
                    <div className="hidden md:flex">
                      <SearchContainer
                        value={searchInput}
                        placeholder={"Search Clients..."}
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
                      {filterData.map((client, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "odd:bg-white" : "even:bg-gray-50"
                          } border-b`}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {client.name}
                          </th>
                          <td className="px-6 py-4">{client.email}</td>
                          <td className="px-6 py-4">{client.phone}</td>
                          <td className="px-6 py-4">
                            {client.tenant.tenantName}
                          </td>
                          <td
                            className="pl-4 sm:pl-6 py-4 text-blue-500 cursor-pointer"
                            onClick={() => handleViewClient(client?.id)}
                          >
                            View
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <DataNotFound.page label="Clients" />
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

export default Clients;
