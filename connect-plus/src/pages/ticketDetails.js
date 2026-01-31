import React, { useEffect, useState } from 'react'
import Layout, { Container } from '../components/layout'
import { apiurl } from "../config/config";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { InfiLoader } from '../components/loader';
import BackHeader from '../components/backHeader';
import { MdOutlineStore } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { LuCircleUserRound } from "react-icons/lu";




const TicketDetails = () => {

  const [ticketDetails, setTicketDetails] = useState("");
  const [loading, setLoading] = useState("")
  const { ticketId } = useParams(); // Extract the ID from the URL
  const {
    ticketID,
    user,
    email,
    description,
    store,
    vendor,
    subject,
    category,
    subcategory,
    status,
    priority,
    createdAt,
  } = ticketDetails;
  // const [ticketDetails, setTicketDetails] = useState({});
  console.log("ticketId", ticketId)
  console.log("ticketDetails", ticketDetails)


    const fetchTicketDetails = async () => {
      setLoading(true);
      // let payload = JSON.stringify({
      //   vendorObjId: vendorObjId,
      // });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiurl}/api/ticket/get/assignee`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userObjId: ticketId },
      };

    axios
      .request(config)
      .then((response) => {
        console.log("Customer Data:", response.data.data);
        // setAppData(response.data.data);
        // setLoading(false);
        // setUser(response?.data?.data)
        setTicketDetails({
          user: response?.data?.data[0]?.firstname + response?.data?.data[0]?.lastname || "",
          ticketID: response?.data?.data[0]?.id || "",
          email: response?.data?.data[0]?.email || "",
          description: response?.data?.data[0]?.description || "",
          store: response?.data?.data[0]?.store || "",
          vendor: response?.data?.data[0]?.vendor || "",
          subject: response?.data?.data[0]?.subject || "",
          category: response?.data?.data[0]?.category || "",
          subcategory: response?.data?.data[0]?.subcategory || "",
          status: response?.data?.data[0]?.status || "",
          priority: response?.data?.data[0]?.priority || "",
          createdAt: response?.data?.data[0]?.createdAt || "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTicketDetails();

  }, []);
  return (
    <Layout>
      <Container>
        {loading === true ?
          <InfiLoader maintext="Fetching Ticket Data..." />
          :
          <div className="p-6 relative bg-slate-100 border w-full h-full overflow-scroll hide-scrollbar text-start border-gray-200 rounded-xl">
            {/* <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Ticket Details</h2> */}
            <div className="mb-10 md:mb-0">
              <BackHeader
                backButton={true}
                link="/tickets"
                title="Ticket Details"
              />
            </div>
            {/* <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Ticket ID</h4>
                <p className="text-sm font-bold text-gray-700">{ticketID}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">User</h4>
                <p className="text-sm font-bold text-gray-700">{user}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Subject</h4>
                <p className="text-sm font-bold text-gray-700">{subject}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="text-sm font-bold text-gray-700">{email}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Store</h4>
                <p className="text-sm font-bold text-gray-700">{store}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Vendor</h4>
                <p className="text-sm font-bold text-gray-700">{vendor}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Category</h4>
                <p className="text-sm font-bold text-gray-700">{category}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Subcategory</h4>
                <p className="text-sm font-bold text-gray-700">{subcategory}</p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${status === "Pending"
                    ? "text-red-500 bg-red-100"
                    : "text-green-500 bg-green-100"
                    }`}
                >
                  {status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                <p
                  className={`px-3 py-1 rounded-full text-xs font-bold ${priority === "High"
                    ? "text-red-500 bg-red-100"
                    : priority === "Medium"
                      ? "text-yellow-500 bg-yellow-100"
                      : "text-green-500 bg-green-100"
                    }`}
                >
                  {priority}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                <p className="text-sm font-bold text-gray-700">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="pt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">
                  Description
                </h4>
                <p className="text-sm text-gray-700">{description}</p>
              </div>
            </div> */}

            <div className="max-w-screen-lg mx-auto relative bg-white rounded-xl  overflow-hidden absolute top-1/2 -translate-y-1/2 ">
              <div className="w-8 h-8 hidden md:flex rounded-full bg-slate-100 absolute md:-top-4 md:left-[23.5%]"></div>
              <div className="w-8 h-8  hidden md:flex rounded-full bg-slate-100 absolute md:-bottom-4 md:left-[23.5%]"></div>
              <div className="flex flex-col md:flex-row">
                {/* Left Section: Date */}
                <div className=" flex flex-col items-center justify-center w-full md:w-1/4 p-6">
                  <p className="text-sm font-medium text-gray-500">Ticket ID</p>
                  <p className="text-xl  md:text-2xl lg:text-3xl font-bold text-gray-700">{ticketID}</p>
                </div>

                {/* Right Section: Ticket Details */}
                <div className="flex-grow border-t-4 md:border-t-0 md:border-l-4 border-dashed border-slate-200 p-6">
                  <div className='flex justify-between'>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">{subject}</h2>
                      {/* <p className="text-sm text-gray-500 mb-4">{category} - {subcategory}</p> */}
                      <p className="text-sm text-gray-500 mb-4">{category}</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-700">{new Date(createdAt).getDate()}</p>
                      <p className="text-lg text-gray-500">{new Date(createdAt).toLocaleString('default', { month: 'short' })}</p>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex items-center mb-2">
                    <div className='text-xl mr-2 text-slate-400 '>
                      <IoMdTime />
                    </div>
                    {/* <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6 2a1 1 0 100 2h8a1 1 0 100-2H6zM4 6a2 2 0 00-2 2v7a4 4 0 004 4h8a4 4 0 004-4V8a2 2 0 00-2-2H4zm5 4a1 1 0 112 0v3a1 1 0 11-2 0v-3z" />
                    </svg> */}
                    <p className="text-sm text-gray-700">{new Date(createdAt).toLocaleDateString()} - {new Date(createdAt).toLocaleTimeString()}</p>
                  </div>

                  <div className="flex items-center mb-2">
                    <div className='text-xl mr-2 text-slate-400 '>
                      {/* <MdOutlineStore /> */}
                      <LuCircleUserRound/>

                    </div>

                    {/* <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4.293 9.293a1 1 0 011.414 0L10 13.586l4.293-4.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" />
                    </svg> */}
                    <p className="text-sm text-gray-700">{user} - {email}</p>
                  </div>

                  {/* Priority and Status */}
                  <div className="flex flex-col gap-4 md:flex-row items-start md:items-center justify-between mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${priority === "High"
                        ? "text-red-500 bg-red-100"
                        : priority === "Medium"
                          ? "text-yellow-500 bg-yellow-100"
                          : "text-green-500 bg-green-100"
                        }`}
                    >
                      Priority: {priority}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${status === "Pending"
                        ? "text-red-500 bg-red-100"
                        : "text-green-500 bg-green-100"
                        }`}
                    >
                      Status: {status}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-1">Description:</h4>
                    <p className="text-sm text-gray-700">{description}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }

      </Container>
    </Layout>
  )
}

export default TicketDetails