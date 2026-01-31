import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import React from 'react';
import Dashboard from './pages/dashboard';
import UserLogin from './pages/userLogin';
import NotFound from './pages/notFound';
import ProtectedRoute from './config/protectedRoute';
import Teams from './pages/teams';
import AddTeam from './pages/addTeam';
import TeamDetails from './pages/teamDetails';
import EditTeam from './pages/editTeam';
import Tickets from './pages/tickets';
import TicketList from './pages/ticketList';
import TicketDetails from './pages/ticketDetails';
import Analytics from './pages/analytics';
import Chats from "./pages/chats";
import TicketManage from "./pages/ticketManage";
import UniversalChats from "./pages/universalChats";
import CreateBot from "./pages/createBot";
import ChatbotFlow from "./pages/chatbotFlow";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Trial from "./pages/trial";
import WhatsappApi from "./pages/whatsappApi";
import WhatsappAccounts from "./pages/whatsappAccounts";
import Account from "./pages/account.js";
import Customers from "./pages/customers.js";
import Clients from "./pages/clients.js";
import Appearance from "./pages/appearance.js";
import Users from "./pages/users.js";
import NewClient from "./pages/newClient.js";
import NewCustomer from "./pages/newCustomer.js";
import { ThemeProvider } from "./config/themeContext.js";
import ClientDetails from "./pages/clientDetails.js";
import CustomerDetails from "./pages/customerDetails.js";
import Plans from "./pages/plans.js";
import ApprovalCenter from "./pages/approvalCenter.js";
import ApprovalCenterDetails from "./pages/approvalCenterDetails.js";
import MasterAdminAccount from "./pages/masterAdminAccount.js";
import SuperAdminAccount from "./pages/superAdminAccount.js";
import AdminAccount from "./pages/adminAccount.js";
import Pricing from "./pages/pricing.js";
import PaymentMethods from "./pages/paymentMethods.js";
import Template from "./pages/template.js"

function App() {
  // const location = useLocation();

  // Hide UniversalChats if the path is "/" (homepage) or "/chats"
  // const hideUniversalChats = location.pathname === "/" || location.pathname === "/chats";
  return (
    <React.Fragment>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <ThemeProvider>
        <BrowserRouter basename="/">
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<UserLogin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/teams" element={<ProtectedRoute element={<Teams />} />} />
              <Route path="/masteradmin-account" element={<ProtectedRoute element={<MasterAdminAccount />} />} />
              <Route path="/superadmin-account" element={<ProtectedRoute element={<SuperAdminAccount />} />} />
              <Route path="/admin-account" element={<ProtectedRoute element={<AdminAccount />} />} />
              <Route path="/clients" element={<ProtectedRoute element={<Clients />} />} />
              <Route path="/plans/:accountId/:account" element={<ProtectedRoute element={<Plans />} />} />
              <Route path="/plans" element={<ProtectedRoute element={<Plans />} />} />
              <Route path="/approval-center" element={<ProtectedRoute element={<ApprovalCenter />} />} />
              <Route path="/pricing" element={<ProtectedRoute element={<Pricing />} />} />
              <Route path="/payment-methods" element={<ProtectedRoute element={<PaymentMethods />} />} />
              <Route path="/approval-center/:transactionId" element={<ProtectedRoute element={<ApprovalCenterDetails />} />} />
              <Route
                path="/client/:clientId"
                element={<ProtectedRoute element={<ClientDetails />} />}
              />
              <Route path="/newClient" element={<ProtectedRoute element={<NewClient />} />} />
              <Route path="/newCustomer" element={<ProtectedRoute element={<NewCustomer />} />} />
              <Route path="/customers" element={<ProtectedRoute element={<Customers />} />} />
              <Route
                path="/customer/:customerId"
                element={<ProtectedRoute element={<CustomerDetails />} />}
              />
              <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
              <Route path="/appearance" element={<ProtectedRoute element={<Appearance />} />} />
              <Route
                path="/teams/add"
                element={<ProtectedRoute element={<AddTeam />} />}
              />
              <Route
                path="/teams/:userObjId"
                element={<ProtectedRoute element={<TeamDetails />} />}
              />
              <Route
                path="/teams/:userObjId/edit"
                element={<ProtectedRoute element={<EditTeam />} />}
              />
              <Route
                path="/tickets"
                element={<ProtectedRoute element={<Tickets />} />}
              />
              <Route
                path="/chats"
                element={<ProtectedRoute element={<Chats />} />}
              />
              <Route
                path="/tickets/ticketdetails/:ticketId"
                element={<ProtectedRoute element={<TicketDetails />} />}
              />
              <Route
                path="/tickets/ticketmanage/:ticketId"
                element={<ProtectedRoute element={<TicketManage />} />}
              />
              <Route
                path="/create-bot"
                element={<ProtectedRoute element={<CreateBot />} />}
              />
              <Route
                path="/bot-flow"
                element={<ProtectedRoute element={<ChatbotFlow />} />}
              />
              <Route
                path="/whatsapp-api"
                element={<ProtectedRoute element={<WhatsappApi />} />}
              />
              <Route
                path="/whatsapp-accounts"
                element={<ProtectedRoute element={<WhatsappAccounts />} />}
              />
              <Route
              path="/template/:accountId/:account"
              element={<ProtectedRoute element={<Template/>}/>}
              />
              <Route path="/analytics" element={<ProtectedRoute element={<Analytics />} />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
              <Route path="/trial" element={<Trial />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>


          {/* <UniversalChats/> */}
        </BrowserRouter>
      </ThemeProvider>

    </React.Fragment>
  );
}

export default App;
