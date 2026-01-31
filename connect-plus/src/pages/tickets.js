import React, { useEffect, useState } from "react";
import Layout, { Container } from "../components/layout";
import { useUser } from "../config/userProvider";
import { apiurl } from "../config/config";
import { DynamicLoader, InfiLoader } from "../components/loader";
import axios from "axios";
import { GiTicket } from "react-icons/gi";
import { AiTwotoneEdit } from "react-icons/ai";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
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


const Tickets = () => {

  const navigate = useNavigate();

  const {
    userData,
  } = useUser();

  // console.log("USERDATA IS :", userData)
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [timeFilter, setTimeFilter] = useState("All"); // Default to "All"


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

  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");


  const handleEditMember = (id) => {
    navigate(`/teams/${id}`);
  };

  const tenantObjId = userData?.tenant?.tenantObjId;
  console.log("tenantObjId", tenantObjId)

  const fetchTicketData = async (email) => {
    setLoading(true); // Start loading
    setError(null); // Reset error

    try {
      const response = await axios.post(
        `${apiurl}/api/ticket/get`,
        // `https://api-inficonnect.fixall.ai/admin/v1/ticket/get`,
        { tenantObjId },
        // { tenantObjId : "679b185b41cf020591089fb2" },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );



      if (response?.status === 200) {
        setTicketData(response?.data?.tickets); // Set the fetched ticket data
        setPaginationData(response?.data?.pagination);
      } else {
        console.error('Failed to fetch ticket data:', response.status);
        setError('Failed to fetch ticket data. Please try again.');
      }
    } catch (err) {
      console.error('Error fetching ticket data:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  // const filterdata = ticketData.filter(
  //   (ticket) =>
  //     ticket?.id?.toLowerCase().includes(searchInput.toLowerCase())
  //   // || ticket?.phone?.toLowerCase().includes(searchInput.toLowerCase())
  // );

  const filterdata =
    ticketData &&
    ticketData.filter((ticket) => {
      const matchesSearch = ticket?.id.toLowerCase().includes(searchInput.toLowerCase());

      const matchesStatus = statusFilter === "All" || ticket.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesPriority = priorityFilter === "All" || ticket.priority.toLowerCase() === priorityFilter.toLowerCase();

      // Date filtering logic
      const ticketDate = new Date(ticket.assignee.timestamp); // Using assignee.timestamp here
      const today = new Date();

      // Calculate the date range based on the selected filter
      let dateRange = 0;
      if (timeFilter === "10days") dateRange = 10;
      else if (timeFilter === "30days") dateRange = 30;
      else if (timeFilter === "3months") dateRange = 90;

      // Check if the ticket is within the selected time range
      const matchesTime =
        timeFilter === "All" || (dateRange && (today - ticketDate) / (1000 * 60 * 60 * 24) <= dateRange);

      return matchesSearch && matchesStatus && matchesPriority && matchesTime;
    });

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
    // if (userData?.email) {
    fetchTicketData(); // Call the function with the email
    // }
  }, [currentPage, itemsPerPage]); // Re-run only if the email changes


  const handleTicketDetails = (id) => {
    navigate(`/tickets/ticketdetails/${id}`);
  };
  const handleTicketManage = (id) => {
    navigate(`/tickets/ticketmanage/${id}`);
  };

  return (
    <Layout>
      <Container>
        {/* {loading === true ?
          <InfiLoader maintext="Fetching Ticket Data..." />
          :
          <section className="py-2 md:p-4  bg-gray-50 w-full h-full overflow-scroll hide-scrollbar text-start">
            <div className="mb-8">
              <BackHeader
                // backButton={true}
                // link="/support"
                title="Tickets"
              />
            </div>

            {ticketData && ticketData.length === 0 ?
              <div className="flex flex-col items-center justify-center h-full w-full rounded-sm bg-gray-50">
                <div className="flex flex-col items-center bg-white border border-gray-200 rounded-sm shadow-md p-8 max-w-sm">
                  <img
                    src="/noTickets.png"
                    alt="No Tickets"
                    className="w-36 h-36 mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">No Tickets Found</h2>
                  <p className="text-gray-600 text-center">
                    It seems you haven't any complaints yet.
                  </p>

                </div>
              </div>
              :

              <div className="grid grid-cols-1 gap-4 px-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 ">
                {ticketData &&
                  ticketData.map((ticket) => (
                    <div
                      key={ticket._id}
                      className="p-4 bg-white border border-primary rounded-sm shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex justify-end items-center gap-5">
                      <p
                        className="text-sm flex justify-end cursor-pointer"
                        onClick={() => handleTicketDetails(ticket?.assignee?.userObjId)}
                      >
                        <span className="px-3 py-1 rounded-md text-sm font-medium text-secondary bg-primary">
                          Details
                        </span>
                      </p>
                      <p
                        className="text-sm flex justify-end cursor-pointer"
                        onClick={() => handleTicketManage(ticket?.assignee?.userObjId)}
                      >
                        <span className="px-3 py-1 rounded-md text-sm font-medium text-secondary bg-primary">
                          Manage
                        </span>
                      </p>
                      </div>

                      
                      
                      <div className="flex items-center my-2">
                        <div className="p-2 bg-primary rounded-md mr-3">
                          <GiTicket className="text-secondary text-xl"/>

                        </div>
                        <p className="text-base font-bold text-black">{ticket.subject}</p>
                      </div>
                      <hr/>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="col-span-2">
                          <h4 className="text-gray-500 text-sm">User</h4>
                          <p className="text-black text-sm font-bold">{ticket.firstname}{" "}{ticket.lastname}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">Submitted</h4>
                          <p className="text-black text-sm font-bold">
                            {new Date(ticket.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">Priority</h4>
                          <p className="text-black text-sm font-bold">{ticket.priority}</p>
                        </div>
                        <div>
                          <h4 className="text-gray-500 text-sm">Ticket ID</h4>
                          <p className="text-black text-sm font-bold">{ticket.id}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            }


          </section>} */}
        {loading === true ? (
          <InfiLoader maintext="Fetching Teams Data.." />
        ) : (
          <div className="border bg-white h-full w-full px-2 py-2">
            <div className=" relative flex flex-col gap-2 w-full overflow-hidden rounded-sm sm:rounded-xl px-2 h-full p-2">
              <BackHeader
                title={
                  <span className="flex flex-col md:flex-row items-center">
                    Tickets
                    <span className="hidden lg:flex">
                      {" "}
                      - {paginationData?.totalTickets}
                    </span>
                    <select
                      value={itemsPerPage}
                      className="text-xs rounded-sm text-black border px-2 py-1 mx-2"
                      onChange={(e) => setItemsPerPage(e.target.value)}
                    >
                      <option value="50">50</option>
                      <option value="100">100</option>
                      <option value="250">250</option>
                      <option value="500">500</option>
                      <option value="1000">1000</option>
                    </select>
                    <div className="hidden lg:flex gap-2 flex-row items-center">
                      <label className="text-xs">Status :</label>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className=" border px-2 py-1 rounded-sm text-xs outline-none"
                      >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value=" InProgress"> In Progress</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                    <div className="hidden lg:flex gap-2 flex-row items-center mx-2">
                      <label className="text-xs">Priority :</label>

                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className=" border px-2 py-1 rounded-sm text-xs outline-none"
                      >
                        <option value="All">All</option>
                        <option value=" High">High</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                      </select>
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                      <label className="text-xs">Time :</label>
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className="border px-2 py-1 rounded-sm text-xs outline-none"
                      >
                        <option value="All">All</option>
                        <option value="10days">Within 10 Days</option>
                        <option value="30days">Within 30 Days</option>
                        <option value="3months">Within 3 Months</option>
                      </select>
                    </div>
                  </span>
                }
                rightSide={
                  <div className="flex gap-2 items-center ">
                    <div>
                      {deleteTeamIds.length > 0 &&
                        userData?.userType === "superadmin" && (
                          <button
                            onClick={() => WantToDelete(true)}
                            className="bg-red-50 text-xs hover:bg-[#c00218] border border-red-300 text-[#c00218] hover:text-white rounded-sm py-1.5 md:py-2 px-3 "
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
                    {/* <div className="hidden md:block">
                      {userData?.userType !== "admin" ? <Link to="/teams/add">
                        <ButtonContainer icon={<IoAddOutline />}>
                          Create
                        </ButtonContainer>
                      </Link> : null}
                    </div> */}
                    <div className="hidden md:flex">
                      <SearchContainer
                        value={searchInput}
                        placeholder={"Search Tickets..."}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                }
              />
              <div className="relative overflow-y-auto h-full sm:rounded-sm">
                {filterdata && filterdata.length > 0 ? (
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 max-h-96">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                      <tr>
                        <th scope="col" class="p-4">
                          <Checkbox checked={filterdata.length === deleteTeamIds.length} onChange={AllCheckedHandler} />
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ticket id
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Subject
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Submitted
                        </th>

                        <th scope="col" className="px-6 py-3">
                          Priority
                        </th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Assigned Agent</th>
                        <th>Manage Ticket</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filterdata &&
                        filterdata.length > 0 &&
                        filterdata.map((ticket, index) => (
                          <tr
                            key={index}
                            className={`${index % 2 === 0
                              ? "odd:bg-white"
                              : "even:bg-gray-50"
                              } border-b `}
                          >
                            <td class="w-4 p-4">
                              <Checkbox checked={deleteTeamIds.includes(ticket._id)} onClick={() => CheckedHandler(ticket._id)} disabled={ticket?.userType === "superadmin"} />
                            </td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{ticket.id}</th>
                            <td
                              className="px-6 py-4 "
                            >
                              {ticket.firstname}{" "}{ticket.lastname}
                            </td>
                            <td className="px-6 py-4">{ticket.subject}</td>
                            <td className="px-6 py-4">{ticket.email}</td>
                            <td className="px-6 py-4"> {new Date(ticket.createdAt).toLocaleDateString()}</td>
                            <td className={`px-6 py-4 font-medium ${ticket.priority === "High" ? "text-red-500" : ticket.priority === "Medium" ? "text-yellow-500" : ticket.priority === "Low" ? "text-green-500" : "text-gray-500"}`}>{ticket.priority}</td>
                            {/* <td className="px-6 py-4">{ticket.status}</td> */}
                            <td
                              className={`px-6 py-4 font-medium ${ticket.status === "Pending"
                                ? "text-yellow-500"
                                : ticket.status === "InProgress"
                                  ? "text-blue-500"
                                  : ticket.status === "Resolved"
                                    ? "text-green-500"
                                    : "text-gray-500"
                                }`}
                            >
                              {ticket.status}
                            </td>

                            <td className="px-6 py-4">{ticket?.assignee?.userName}</td>

                            <td
                              className="pl-4 sm:pl-6 py-4 text-blue-500 cursor-pointer"
                              onClick={() => handleTicketManage(ticket?.assignee?.userObjId)}
                            >
                              Manage
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
                totalItems={paginationData?.totalTickets}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </Container>
    </Layout>
  );
};

export default Tickets;
