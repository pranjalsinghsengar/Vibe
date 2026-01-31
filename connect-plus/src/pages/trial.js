/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { FaChevronDown, FaChevronUp, FaWhatsapp, FaPlus } from "react-icons/fa";
import { FaHome, FaBars, FaTimes, FaRobot, FaBrain, FaChartLine, FaUser } from "react-icons/fa";
import WhatappChat from "../components/WhatsAppchat";
import RegisterWhatsApp from "../components/registerWhatapp";
import DeliveryReport from "../components/devileryReport";
import FundsAccount from "../components/fundsAccount";
import LiveTracking from "../components/BusinessManagerUI";
import { useNavigate, NavLink } from "react-router-dom";
import Layout from '../components/layout'

const FAQSection = ({ faqItems }) => {
  const [openId, setOpenId] = useState(null);
  const toggleAccordion = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="w-full mt-10">
      {faqItems.map((item) => (
        <div key={item.id} className="border-b last:border-0">
          <button
            onClick={() => toggleAccordion(item.id)}
            className="w-full text-left py-4 px-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition"
          >
            <span className="font-medium text-lg text-gray-800">{item.id}. {item.title}</span>
            <span className="text-sm text-gray-500">
              {openId === item.id ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </button>
          {openId === item.id && (
            <div className="p-4 text-gray-600 text-lg">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
};

function Trial() {
  const [activeTab, setActiveTab] = useState("business");
  const [isOpen, setIsOpen] = useState(false);

  const faqItems = [
    { id: 1, title: "Send your first message", content: <WhatappChat /> },
    { id: 2, title: "Check delivery report", content: <DeliveryReport /> },
    { id: 3, title: "Register your WhatsApp sender", content: <RegisterWhatsApp /> },
    { id: 4, title: "Add funds to your account", content: <FundsAccount /> },
    { id: 5, title: "Get ready to start sending live traffic", content: <LiveTracking /> },
  ];

  return (
    <div className="w-full bg-gray-100">
    {/* Navbar */}
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0">
              <NavLink to="/" className="hover:text-orange-500 flex items-center gap-2">
                  <img className="h-8" src="/logo.png" alt="VibeConnect Logo" />
              </NavLink>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to="/login" className="hover:text-primary flex items-center gap-2">
                <FaUser /> Login
              </NavLink>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-900 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>

    {/* Tabs */}
    <div className="px-4 w-full">
      <div className="max-w-7xl mx-auto flex w-full px-4 sm:px-6 lg:px-8">
      {/* bg-primary border border-b-2 hover:text-primary px-4 py-2 shadow-lg text-primary transition */}
        <button
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "business"
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("business")}
        >
          Business User
        </button>
        <button
          className={`px-4 py-2 text-lg font-semibold ${activeTab === "developer"
            ? "border-b-2 border-primary text-primary"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("developer")}
        >
          Developer
        </button>
      </div>
    </div>

    {/* Page Content (with top padding to offset sticky navbar + tabs) */}
    <div className="pt-32 px-6">
      <div className="w-full">
        {activeTab === "business" && (
          <div className="p-6 flex flex-col items-center justify-center min-h-screen px-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight text-center">
              Welcome to WhatsApp Guide
            </h1>
            <p className="mt-2 text-lg text-gray-600 text-center">
              We’re glad to see you again. Continue where you left off or try another communication channel.
            </p>
            <div className="flex justify-center space-x-6 py-6">
              <button className="hover:bg-secondary rounded-xl hover:text-primary border border-secondary text-secondary px-6 py-3 text-lg font-medium bg-primary  flex items-center space-x-3  shadow-lg transition">
                <FaWhatsapp className="text-xl" />
                <span>WhatsApp</span>
              </button>
              <button className="flex items-center space-x-3 px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-400 transition">
                <FaPlus className="text-lg" />
                <span>Add channel</span>
              </button>
            </div>
            <div className="w-full max-w-5xl bg-white mt-10 p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold justify-center text-gray-800 flex items-center gap-3">
                <FaWhatsapp className="text-primary" /> Get Started with WhatsApp
              </h2>
              <ul className="mt-4 text-primary space-y-2 text-lg">
                <li>You are currently in a free trial.</li>
                <li>You can use Infobip’s test sender (<b>447860099299</b>).</li>
                <li>You can engage in <b>100 free WhatsApp conversations</b>.</li>
                <li>You can send messages to verified numbers only.</li>
              </ul>

              {/* FAQ Section */}
              <FAQSection faqItems={faqItems} />
            </div>
          </div>
        )}

        {activeTab === "developer" && (
          <div className="p-6 text-center min-h-screen">
            <h2 className="text-2xl font-semibold text-gray-700">Developer Section</h2>
            <p className="text-lg text-gray-500">Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  </div>
  );

}

export default Trial;
