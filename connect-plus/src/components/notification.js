import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../config/userProvider";
import axios from "axios";
import { apiurl } from "../config/config";
// import { BlinkLoader, LineLoader } from "./loader";
import { IoWarningOutline } from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";


const Notification = ({ notifications, onClose }) => {

  const [isClosing, setIsClosing] = useState(false);
  const { userData } = useUser();
  const [userType, setUserType] = useState(userData?.userType);
  const [loader, setLoader] = useState(false);
  // const [notifications, setNotifications] = useState(notifications);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  function formatTimeAgo(date) {
    const givenDate = new Date(date);
    const now = new Date();
    const diffInMs = now - givenDate; // Difference in milliseconds
    const diffInSeconds = Math.floor(diffInMs / 1000); // Convert to seconds
    const diffInMinutes = Math.floor(diffInSeconds / 60); // Convert to minutes
    const diffInHours = Math.floor(diffInMinutes / 60); // Convert to hours
    const diffInDays = Math.floor(diffInHours / 24); // Convert to days

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes === 1) {
      return "1 min ago";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    } else if (diffInHours === 1) {
      return "1 hour ago";
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays === 2) {
      return "2 days ago";
    } else {
      // Format date and time for older entries
      return givenDate.toLocaleString();
    }
  }

  // useEffect(() => {
  //   let data = JSON.stringify({
  //     // userObjId: "67401dbcb258c964b7567dc6",
  //     userObjId: userData?._id,
  //   });

  //   setLoader(true);
  //   let config = {
  //     method: "post",
  //     maxBodyLength: Infinity,
  //     url: `${apiurl}/admin/v1/notifications/user`,
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Authorization: token,
  //     },
  //     data: data,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       if (response.data.success === true) {
  //         setNotifications(response.data.data);
  //       }
  //       setLoader(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setLoader(false);
  //     });
  // }, []);

  const typeClasses = {
    info: "bg-blue-500 text-white",
    error: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-white",
    success: "bg-orange-500 text-white",
  };
  const personaltypeClasses = {
    info: "border-blue-500",
    error: "border-red-500",
    warning: "border-yellow-300",
    success: "border-green-500",
  };
  const notificationTextClassIcon = {
    info: "text-blue-500",
    error: "text-red-500 ",
    warning: "text-yellow-500",
    success: "text-green-500",
  };
  const notificationIcon = {
    warning: <IoWarningOutline />,
    error: <VscError />,
    info: <BsInfoCircle />,
    success: <IoIosCheckboxOutline />,
  };

  console.log("notifications", notifications);


  const handleNotificationClick = async (notificationObjId) => {
    console.log("notificationObjId", notificationObjId);
    try {
      const response = await axios.post(
        `${apiurl}/admin/v1/notifications/read`,
        {
          notificationObjId: notificationObjId,
          userObjId: userData?._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Notification marked as read:', response.data);
        // toast.success(response?.data?.message)
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };


  return (
    <>
      {/* <div
        className={`fixed z-50 bg-white shadow-xl lg:w-1/4 w-11/12 h-[95%] lg:h-screen p-4 lg:p-6 rounded-t-lg lg:rounded-l-3xl transition-transform duration-300 ease-in-out
      bottom-0 lg:top-0 lg:right-0 right-1/2 translate-x-full lg:translate-x-0 ${
        isClosing ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
      }`} */}
      <div
        className={`fixed z-50 bg-white shadow-xl w-[98%] md:w-[25%] h-full p-4 lg:p-6 rounded-t-lg lg:rounded-l-3xl transition-transform duration-300 ease-in-out 
      top-0 right-0 ${isClosing ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
      >
        <div className="flex justify-between items-center border-b pb-4">
          <p className="text-2xl font-semibold text-gray-800">Notifications</p>
          <button
            className="text-zinc-400 hover:text-black transition-colors duration-200"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        {/* {loader === true ? (
          <div className="flex justify-center items-center h-min-screen h-full">
            <svg
              version="1.1"
              id="L9"
              width="100px"
              height="100px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enableBackground="new 0 0 0 0"
              xmlSpace="preserve"
            >
              <path
                fill="#000"
                d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
              >
                <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  dur="1s"
                  from="0 50 50"
                  to="360 50 50"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        ) : (
          <div className="mt-6">
            {notifications.length > 0 ? (
              <div className="flex flex-col gap-4">
                {notifications &&
                  notifications.map((notification, index) => (
                    <>
                      {notification.type === "personal" ? (
                        <div
                          className={`p-4 mb-1 rounded-lg shadow hover:shadow-md hover:bg-gray-50 border-l-4 ${personaltypeClasses[notification?.category]
                            }`}
                          onClick={() => handleNotificationClick(notification?._id)}

                        >
                          <div className="flex items-center">
                            <div className="mr-4 w-8 h-8 rounded-full bg-white-200 border flex items-center justify-center">
                              <span
                                className={`text-xl ${notificationTextClassIcon[
                                  notification?.category
                                  ]
                                  }`}
                              >
                                {notificationIcon[notification?.category]}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-md font-semibold capitalize">
                                {notification?.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {notification?.content}
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className=" text-sm text-gray-500">
                            </div>
                            <div className=" text-sm text-gray-500">
                              {formatTimeAgo(notification?.createdAt)}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`p-4 mb-1 rounded-lg shadow hover:shadow-lg ${typeClasses[notification?.category]
                            }`}
                        >
                          <div className="flex items-center">
                            <div className="mr-4 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <span
                                className={`text-xl ${notificationTextClassIcon[
                                  notification?.category
                                  ]
                                  }`}
                              >
                                {notificationIcon[notification?.category]}
                              </span>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-md font-semibold capitalize">
                                {notification?.title}
                              </h3>
                              <p className="text-sm text-white-600">
                                {notification?.content}
                              </p>
                            </div>
                            <div className="ml-4 text-sm text-white-500">
                              {formatTimeAgo(notification?.createdAt)}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-min-screen h-full">
                Notification not found
              </div>
            )}
          </div>
        )} */}
      </div>
    </>
  );
};

export default Notification;