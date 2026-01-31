// import React, { useEffect, useState } from 'react';
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
// } from 'chart.js';
// import { Line, Pie, Bar, Doughnut } from 'react-chartjs-2';
// import { VscCommentUnresolved } from 'react-icons/vsc'; // Visual Studio Code icons
// import { TbArrowBounce, TbBrandSpeedtest, TbCalendarDue } from 'react-icons/tb'; // Tabler Icons
// import { CgCalendarDue, CgLoadbar } from 'react-icons/cg'; // Css.gg icons
// import { FaArrowUp, FaCrown, FaEnvelope, FaRegEnvelopeOpen, FaRegFrown, FaRegSmile, FaTelegram, FaWallet, FaWhatsapp } from 'react-icons/fa'; // Font Awesome icons
// import { MdOutlinePendingActions, MdAssignmentLate, MdOutlineSupportAgent, MdOutlineShoppingBag, MdOutlineTimelapse } from 'react-icons/md'; // Material Design icons
// import Layout from '../components/layout';
// import { FiUsers } from 'react-icons/fi';
// import { HiOutlineMegaphone } from 'react-icons/hi2';
// import { RiCoupon3Line } from 'react-icons/ri';
// import { BiCommentCheck, BiCommentX, BiConversation, BiDislike, BiLike, BiSupport } from 'react-icons/bi';
// import { IoIosSpeedometer, IoMdSend } from 'react-icons/io';
// import { BsCart3, BsCurrencyDollar } from 'react-icons/bs';
// import { AiOutlineShoppingCart } from 'react-icons/ai';
// import { GiConversation, GiTakeMyMoney } from 'react-icons/gi';
// import { RiBounceRateLine } from "react-icons/ri"; // Bounce rate
// import { PiFlowArrow, PiWhatsappLogoLight } from 'react-icons/pi';
// import { AgCharts } from "ag-charts-react";
// import { topology } from "../config/topology";
// import { useUser } from "../config/userProvider";
// import "ag-charts-enterprise";
// import axios from 'axios';
// import { apiurl } from '../config/config';
// import { Link } from 'react-router-dom';

// ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// const KPICard = ({ icon: Icon, title, value }) => (
//     <div className="bg-white p-5 rounded-sm shadow-md border border-[#48BBF9]/20">
//         <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//                 <div className="bg-primary/10 p-2 rounded-full text-primary border border-primary">
//                     <Icon size={24} />
//                 </div>
//                 <div className="text-base text-primary font-medium">{title}</div>
//             </div>
//         </div>
//         <div className="flex items-center justify-between mt-6">
//             <p className="text-xl text-primary font-semibold">{value}</p>
//         </div>
//     </div>
// );

// const KPICardwithPercentage = ({ icon: Icon, title, count, percentage }) => {
//     // Convert percentage string (e.g., "23.53%") to number
//     const percentageValue = parseFloat(percentage);

//     // Data for donut chart
//     const chartData = {
//         datasets: [
//             {
//                 data: [percentageValue, 100 - percentageValue],
//                 backgroundColor: ['#48BBF9', '#E5E7EB'],
//                 borderWidth: 0,
//             },
//         ],
//     };

//     // Chart options for donut
//     const chartOptions = {
//         cutout: '70%', // Makes it a donut chart
//         plugins: {
//             tooltip: { enabled: false }, // Disable tooltips for simplicity
//         },
//         maintainAspectRatio: false,
//     };

//     return (
//         <div className="bg-white p-5 rounded-sm shadow-md border border-[#48BBF9]/20">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     <div className="bg-primary/10 p-2 rounded-full text-primary border border-primary">
//                         <Icon size={24} />
//                     </div>
//                     <div className="text-base text-primary font-medium">{title}</div>
//                 </div>
//             </div>
//             <div className="flex items-center justify-between mt-6">
//                 <div>
//                     <p className="text-xl text-primary font-semibold">{count}</p>
//                     <p className="text-sm text-primary/70">{percentage}</p>
//                 </div>
//                 <div className="w-16 h-16">
//                     <Doughnut data={chartData} options={chartOptions} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const TabContent = ({ app }) => (
//     <div className="p-6 flex-1">
//         <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-primary">{app.name}</h2>
//             <button className="bg-primary hover:bg-[#48BBF9] text-white px-4 py-2 rounded-sm transition">
//                 Install Now
//             </button>
//         </div>
//         <p className="text-primary mb-4 text-left">{app.description}</p>
//         <div className="bg-white rounded-sm p-4 shadow-md border border-[#48BBF9]/20 text-left">
//             <h3 className="text-lg font-semibold text-primary mb-2">Pricing</h3>
//             <p className="text-xl text-primary font-bold">{app.price}</p>
//             <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Integrations</h3>
//             <div className="flex gap-2 flex-wrap">
//                 {app.integrations.map((integration, index) => (
//                     <span key={index} className="bg-[#48BBF9]/20 text-primary px-2 py-1 rounded-sm text-sm">
//                         {integration}
//                     </span>
//                 ))}
//             </div>
//             <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Key Features</h3>
//             <ul className="list-disc pl-5 text-primary">
//                 {app.features.map((feature, index) => (
//                     <li key={index}>{feature}</li>
//                 ))}
//             </ul>
//             <h3 className="text-lg font-semibold text-primary mt-4 mb-2">Additional Details</h3>
//             <p className="text-primary">Popularity: {app.popularity} of businesses recommend</p>
//             <p className="text-primary">Support: 24/7 Customer Support</p>
//             <p className="text-primary">Setup: Quick 5-minute installation</p>
//         </div>
//     </div>
// );

// function Dashboard() {
//     // const [date, setDate] = useState('');
//     const [date, setDate] = useState(() => {
//         return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
//       });
//     const [activeTab, setActiveTab] = useState('whatsapp');
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true); // optional
//     const [error, setError] = useState(null);     // optional
//     const { userData, token } = useUser();

//     console.log("userData", userData)

//     const fetchData = async (selectedDate) => {
//         try {
//             const response = await axios.get(`${apiurl}/api/whatsapp/dashboard/alldata`,
//                 {
//                     params : { date: selectedDate} , // Only send if date selected
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 }
//             );
//             setDashboardData(response?.data?.data);
//         } catch (err) {
//             console.error('Error fetching dashboard data:', err);
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchData(date);
//     }, [date]);

//     const handleDateChange = (e) => {
//         const selectedDate = e.target.value;
//         setDate(selectedDate);
//         // fetchData(selectedDate);
//     };

//     const data = [
//         { name: "Albania", value: 83.7 },
//         { name: "Algeria", value: 99.7 },
//         { name: "Andorra", value: 100 },
//         { name: "Angola", value: 50 },
//         { name: "Antigua and Barbuda", value: 100 },
//         { name: "Argentina", value: 99.9 },
//         { name: "Armenia", value: 98.4 },
//         { name: "Australia", value: 100 },
//         { name: "Austria", value: 100 },
//         { name: "Azerbaijan", value: 98.3 },
//         { name: "Bahamas", value: 100 },
//         { name: "Bahrain", value: 100 },
//         { name: "Bangladesh", value: 26.5 },
//         { name: "Barbados", value: 100 },
//         { name: "Belarus", value: 99.6 },
//         { name: "Belgium", value: 100 },
//         { name: "Belize", value: 83 },
//         { name: "Benin", value: 4.6 },
//         { name: "Bhutan", value: 87 },
//         { name: "Bolivia", value: 88.3 },
//         { name: "Bosnia and Herzegovina", value: 41.65 },
//         { name: "Botswana", value: 65.7 },
//         { name: "Brazil", value: 96.5 },
//         { name: "Brunei", value: 100 },
//         { name: "Burkina Faso", value: 11.7 },
//         { name: "Burundi", value: 0.2 },
//         { name: "Cape Verde", value: 81.8 },
//         { name: "Cambodia", value: 44.5 },
//         { name: "Cameroon", value: 22.8 },
//         { name: "Canada", value: 100 },
//         { name: "Central African Republic", value: 0.900000000000001 },
//         { name: "Chad", value: 8 },
//         { name: "Chile", value: 100 },
//         { name: "China", value: 83.2 },
//         { name: "Colombia", value: 93.3 },
//         { name: "Comoros", value: 11.3 },
//         { name: "Democratic Republic of The Congo", value: 4.3 },
//         { name: "Congo", value: 35.6 },
//         { name: "Costa Rica", value: 95.9 },
//         { name: "Ivory Coast", value: 31.7 },
//         { name: "Croatia", value: 100 },
//         { name: "Cuba", value: 94.3 },
//         { name: "Cyprus", value: 100 },
//         { name: "Czechia", value: 100 },
//         { name: "Denmark", value: 100 },
//         { name: "Djibouti", value: 9.6 },
//         { name: "Dominica", value: 89.4 },
//         { name: "Dominican Republic", value: 91.5 },
//         { name: "Ecuador", value: 94.7 },
//         { name: "Egypt", value: 99.9 },
//         { name: "El Salvador", value: 92.7 },
//         { name: "Equatorial Guinea", value: 24.1 },
//         { name: "Eritrea", value: 11.5 },
//         { name: "Estonia", value: 100 },
//         { name: "Eswatini", value: 58.1 },
//         { name: "Ethiopia", value: 7.5 },
//         { name: "Fiji", value: 51.4 },
//         { name: "Finland", value: 100 },
//         { name: "France", value: 100 },
//         { name: "Gabon", value: 89.7 },
//         { name: "Gambia", value: 1.7 },
//         { name: "Georgia", value: 90.6 },
//         { name: "Germany", value: 100 },
//         { name: "Ghana", value: 30.3 },
//         { name: "Greece", value: 100 },
//         { name: "Grenada", value: 88.3 },
//         { name: "Guatemala", value: 48.1 },
//         { name: "Guinea", value: 1 },
//         { name: "Guinea-Bissau", value: 1 },
//         { name: "Guyana", value: 82 },
//         { name: "Haiti", value: 4.3 },
//         { name: "Honduras", value: 49.5 },
//         { name: "Hungary", value: 100 },
//         { name: "Iceland", value: 100 },
//         { name: "India", value: 71.1 },
//         { name: "Indonesia", value: 86.9 },
//         { name: "Iran", value: 96.4 },
//         { name: "Iraq", value: 99.3 },
//         { name: "Ireland", value: 100 },
//         { name: "Israel", value: 100 },
//         { name: "Italy", value: 100 },
//         { name: "Jamaica", value: 82.5 },
//         { name: "Japan", value: 100 },
//         { name: "Jordan", value: 99.9 },
//         { name: "Kazakhstan", value: 93.9 },
//         { name: "Kenya", value: 23.9 },
//         { name: "Kiribati", value: 12.4 },
//         { name: "North Korea", value: 12.5 },
//         { name: "South Korea", value: 100 },
//         { name: "Kuwait", value: 100 },
//         { name: "Kyrgyzstan", value: 78.2 },
//         { name: "Laos", value: 9.3 },
//         { name: "Latvia", value: 100 },
//         { name: "Lesotho", value: 41.1 },
//         { name: "Liberia", value: 0.4 },
//         { name: "Lithuania", value: 100 },
//         { name: "Luxembourg", value: 100 },
//         { name: "Madagascar", value: 1.4 },
//         { name: "Malawi", value: 1.6 },
//         { name: "Malaysia", value: 93.8 },
//         { name: "Maldives", value: 99.5 },
//         { name: "Mali", value: 0.900000000000001 },
//         { name: "Malta", value: 100 },
//         { name: "Marshall Islands", value: 66.7 },
//         { name: "Mauritania", value: 48.3 },
//         { name: "Mauritius", value: 98.9 },
//         { name: "Mexico", value: 84.6 },
//         { name: "Micronesia", value: 13.3 },
//         { name: "Moldova", value: 97.6 },
//         { name: "Monaco", value: 100 },
//         { name: "Mongolia", value: 53 },
//         { name: "Montenegro", value: 62 },
//         { name: "Morocco", value: 98.2 },
//         { name: "Mozambique", value: 5.4 },
//         { name: "Namibia", value: 47.3 },
//         { name: "Nauru", value: 100 },
//         { name: "Nepal", value: 35.2 },
//         { name: "Netherlands", value: 100 },
//         { name: "New Zealand", value: 100 },
//         { name: "Nicaragua", value: 57.4 },
//         { name: "Niger", value: 3 },
//         { name: "Nigeria", value: 16.8 },
//         { name: "North Macedonia", value: 79.2 },
//         { name: "Norway", value: 100 },
//         { name: "Oman", value: 100 },
//         { name: "Pakistan", value: 50.7 },
//         { name: "Palau", value: 43 },
//         { name: "Panama", value: 100 },
//         { name: "Papua New Guinea", value: 9.7 },
//         { name: "Paraguay", value: 69.8 },
//         { name: "Peru", value: 85.5 },
//         { name: "Philippines", value: 48 },
//         { name: "Poland", value: 100 },
//         { name: "Portugal", value: 100 },
//         { name: "Qatar", value: 100 },
//         { name: "Romania", value: 100 },
//         { name: "Russian Federation", value: 72.9 },
//         { name: "Rwanda", value: 5.4 },
//         { name: "Samoa", value: 37.2 },
//         { name: "San Marino", value: 100 },
//         { name: "Saudi Arabia", value: 100 },
//         { name: "Senegal", value: 29.4 },
//         { name: "Serbia", value: 80.6 },
//         { name: "Seychelles", value: 100 },
//         { name: "Sierra Leone", value: 0.800000000000001 },
//         { name: "Singapore", value: 100 },
//         { name: "Slovakia", value: 100 },
//         { name: "Slovenia", value: 100 },
//         { name: "Solomon Islands", value: 8.9 },
//         { name: "Somalia", value: 3.8 },
//         { name: "South Africa", value: 88.4 },
//         { name: "South Sudan", value: 0 },
//         { name: "Spain", value: 100 },
//         { name: "Sri Lanka", value: 32.6 },
//         { name: "Sudan", value: 62.8 },
//         { name: "Suriname", value: 94.8 },
//         { name: "Sweden", value: 100 },
//         { name: "Switzerland", value: 100 },
//         { name: "Syria", value: 96.3 },
//         { name: "Tajikistan", value: 85.5 },
//         { name: "Thailand", value: 85.1 },
//         { name: "Timor-Leste", value: 15.2 },
//         { name: "Togo", value: 11.4 },
//         { name: "Tonga", value: 86.8 },
//         { name: "Trinidad and Tobago", value: 100 },
//         { name: "Tunisia", value: 99.9 },
//         { name: "Türkiye", value: 95.4 },
//         { name: "Turkmenistan", value: 99.9 },
//         { name: "Tuvalu", value: 74.6 },
//         { name: "Uganda", value: 0.700000000000001 },
//         { name: "Ukraine", value: 95.2 },
//         { name: "United Arab Emirates", value: 100 },
//         { name: "United Kingdom", value: 100 },
//         { name: "United States", value: 100 },
//         { name: "Uruguay", value: 100 },
//         { name: "Uzbekistan", value: 82.8 },
//         { name: "Vanuatu", value: 6.9 },
//         { name: "Venezuela", value: 95.5 },
//         { name: "Vietnam", value: 96.1 },
//         { name: "Yemen", value: 61.3 },
//         { name: "Zambia", value: 10.2 },
//         { name: "Zimbabwe", value: 30.3 },
//     ];

//     const [options, setOptions] = useState({
//         data,
//         topology,
//         series: [
//             {
//                 type: "map-shape-background",
//             },
//             {
//                 type: "map-shape",
//                 title: "Access to Clean Fuels",
//                 idKey: "name",
//                 colorKey: "value",
//                 colorName: "% of population",
//             },
//         ],
//         gradientLegend: {
//             enabled: true,
//             position: "right",
//             gradient: {
//                 preferredLength: 200,
//                 thickness: 2,
//             },
//             scale: {
//                 label: {
//                     fontSize: 10,
//                     formatter: (p) => p.value + "%",
//                 },
//             },
//         },
//     });

//     const appData = {
//         whatsapp: {
//             name: 'WhatsApp',
//             description: 'Business messaging via WhatsApp API',
//             price: '$49/month',
//             integrations: ['CRM', 'Helpdesk', 'Analytics'],
//             features: ['Bulk Messaging', 'Chatbots', 'Analytics'],
//             popularity: '95%',
//         },
//         telegram: {
//             name: 'Telegram',
//             description: 'Secure messaging platform integration',
//             price: '$39/month',
//             integrations: ['Bot Framework', 'Analytics'],
//             features: ['Encrypted Chats', 'Groups', 'Channels'],
//             popularity: '85%',
//         },
//         infobip: {
//             name: 'Infobip',
//             description: 'Omnichannel communication platform',
//             price: '$59/month',
//             integrations: ['CRM', 'Marketing Tools'],
//             features: ['SMS', 'Voice', 'Email'],
//             popularity: '90%',
//         },
//         wati: {
//             name: 'Wati',
//             description: 'WhatsApp team inbox solution',
//             price: '$45/month',
//             integrations: ['CRM', 'E-commerce'],
//             features: ['Team Chat', 'Automation', 'Templates'],
//             popularity: '88%',
//         },
//     };

//     const lineChartData = {
//         labels: ['Apr 1', 'Apr 2', 'Apr 3', 'Apr 4', 'Apr 5', 'Apr 6', 'Apr 7', 'Apr 8'],
//         datasets: [
//             {
//                 label: 'Conversations',
//                 data: [150, 170, 200, 180, 220, 230, 240, 245],
//                 borderColor: '#48BBF9',
//                 backgroundColor: 'rgba(72, 187, 249, 0.5)',
//             },
//         ],
//     };

//     const pieChartData = {
//         labels: ['Website', 'Mobile', 'WhatsApp'],
//         datasets: [
//             {
//                 data: [60, 25, 15],
//                 backgroundColor: ['#48BBF9', '#1A5276', '#A9A9A9'],
//             },
//         ],
//     };

//     // const barChartData = {
//     //     labels: ['Order Status', 'Password Reset', 'Billing'],
//     //     datasets: [
//     //         {
//     //             label: 'Query Count',
//     //             data: [400, 300, 150],
//     //             backgroundColor: '#1A5276',
//     //         },
//     //     ],
//     // };

//     const barChartData = {
//         labels: dashboardData?.Top_Query.map(item => item._id),
//         datasets: [
//             {
//                 label: 'Query Count',
//                 data: dashboardData?.Top_Query.map(item => item.count),
//                 backgroundColor: '#A5B4FC',
//                 // backgroundColor: dashboardData?.Top_Query.map((_, index) =>
//                 //     ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#1abc9c', '#e67e22', '#f39c12'][index % 7]
//                 // ),
//                 // borderRadius: 4,
//             },
//         ],
//     };

//     const chartOptions = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: { legend: { position: 'top' } },
//     };

//     const unhandledQueries = [
//         { query: 'Refund Process', count: 45 },
//         { query: 'Store Hours', count: 30 },
//         { query: 'Payment Issues', count: 20 },
//     ];

//     const UserCard = () => (
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-accent flex flex-col md:flex-row gap-6 items-stretch mb-6">

//             {/* Left Side - Compact User Info */}
//             <div className="flex-1 bg-secondary p-5 rounded-xl flex flex-col md:flex-row items-center gap-5">
//                 {/* Logo and Badge */}
//                 <div className="relative shrink-0">
//                     {/* <img
//                         src="https://stellar-signs.com/wp-content/uploads/2021/08/Depositphotos_13687440_s-2019.jpg"
//                         alt="Company Logo"
//                         className="w-16 h-16 rounded-full border-2 border-light-primary object-cover"
//                     /> */}
//                     <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
//                         {userData?.name.charAt(0).toUpperCase()}
//                     </div>
//                     <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1.5">
//                         <FaCrown className="text-xs" />
//                     </div>
//                 </div>

//                 {/* User Details - Now in a tighter layout */}
//                 <div className="text-center md:text-left space-y-1">
//                     <h3 className="text-lg font-bold text-primary">{userData?.name}</h3>
//                     <p className="text-secondary-text text-sm flex items-center gap-1 justify-center md:justify-start">
//                         <FaEnvelope className="text-light-primary" /> {userData?.email}
//                     </p>
//                     {/* <div className="flex items-center gap-2 justify-center md:justify-start">
//                         <span className="text-light-primary font-medium text-sm">Premium Plan</span>
//                         <div className="w-1 h-1 bg-secondary-text rounded-full"></div>
//                         <div className="flex gap-2">
//                             <FaWhatsapp className="text-success text-base" />
//                             <FaTelegram className="text-light-primary text-base" />
//                         </div>
//                     </div> */}
//                 </div>
//             </div>

//             {/* Right Side - Wallet Card */}
//             <div className="flex-1">
//                 <div className="relative h-full">
//                     {/* Wallet Card */}
//                     <div className="bg-gradient-to-br from-primary to-light-primary p-5 rounded-xl shadow-lg text-white h-full flex flex-col justify-between">
//                         {/* Glossy overlay */}
//                         <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-xl"></div>

//                         {/* Top Row */}
//                         <div className="flex justify-between items-start z-10">
//                             <div className="bg-accent/40 w-10 h-8 rounded-sm flex items-center justify-center">
//                                 <div className="bg-accent/80 w-6 h-5 rounded-sm"></div>
//                             </div>
//                             <FaWallet className="text-white/30 text-2xl" />
//                         </div>

//                         {/* Middle Balance */}
//                         <div className="z-10 mb-5">
//                             <p className="text-xs opacity-80 mb-1">Available Balance</p>
//                             <p className="text-3xl font-bold tracking-tight">{userData?.wallet}</p>
//                             {/* <p className="text-sm font-light mt-1">Loyalty Points</p> */}
//                         </div>

//                         {/* Bottom Row */}
//                         <div className="flex justify-between items-center text-xs border-t border-white/20 pt-3 z-10">
//                             {/* <span>Acme Corp</span> */}
//                             <span>{userData?.tenant?.tenantName}</span>
//                             {/* <span>●●●● ●●●●</span> */}
//                             <Link to="/plans">
//                                 <button className="bg-white text-primary hover:bg-secondary font-semibold px-5 py-2 rounded-full shadow-lg transition-all flex items-center gap-1">
//                                     <FaArrowUp className="text-xs" /> Upgrade
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>

//                     {/* Floating Button */}
//                     {/* <button className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-primary hover:bg-secondary font-semibold px-5 py-2 rounded-full shadow-lg transition-all flex items-center gap-1">
//                         <FaArrowUp className="text-xs" /> Upgrade
//                     </button> */}
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <Layout>
//             <div className="min-h-screen  p-6">
//                 {/* New User Card */}
//                 {userData?.userType === "admin" && <UserCard />}

//                 <div className="bg-white p-6 flex justify-between items-center rounded-lg shadow-md border border-blue-200 mb-6">
//                     <label className="block font-medium">Select Date:</label>
//                     <input
//                         type="date"
//                         value={date}
//                         onChange={handleDateChange}
//                         className="border rounded px-3 py-2 text-xs"
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
//                     {/* KPI 1 */}
//                     <KPICard
//                         icon={FiUsers}
//                         title="No. of customers"
//                         value={dashboardData?.User}
//                     />
//                     <KPICard
//                         icon={PiWhatsappLogoLight}
//                         title="Whatsapp Accounts"
//                         value={dashboardData?.Whatsapp_Account}
//                     />

//                     <KPICard
//                         icon={GiConversation}
//                         title="Total Conversations"
//                         value={dashboardData?.conversations?.total}
//                     />

//                     {/* KPI 2 */}
//                     <KPICard
//                         icon={IoIosSpeedometer}
//                         title="Average response time"
//                         // value={`${dashboardData?.Average_response_time} sec.`}
//                         value={`${Number(dashboardData?.Average_response_time).toFixed(1)} sec.`}
//                     />
//                     <KPICard
//                         icon={TbBrandSpeedtest}
//                         title="Average Conversation time"
//                         // value={`${dashboardData?.Average_response_time} sec.`}
//                         value={`${Number(dashboardData?.conversations?.average_conversation_time).toFixed(1)} min.`}
//                     />

//                     <KPICardwithPercentage
//                         icon={BiCommentX}
//                         title="Abandoned Conversations"
//                         count={dashboardData?.conversations?.abandonedCount?.count}
//                         percentage={dashboardData?.conversations?.abandonedCount?.percentage}
//                     />
//                     <KPICardwithPercentage
//                         icon={BiLike}
//                         title="Thumbs Up"
//                         count={dashboardData?.conversations?.thumbsUpCount?.count}
//                         percentage={dashboardData?.conversations?.thumbsUpCount?.percentage}
//                     />
//                     <KPICardwithPercentage
//                         icon={BiDislike}
//                         title="Thumbs Down"
//                         count={dashboardData?.conversations?.thumbsDownCount?.count}
//                         percentage={dashboardData?.conversations?.thumbsDownCount?.percentage}
//                     />
//                     <KPICardwithPercentage
//                         icon={BiCommentCheck}
//                         title="Feedback Given"
//                         count={dashboardData?.conversations?.feedbackGivenCount?.count}
//                         percentage={dashboardData?.conversations?.feedbackGivenCount?.percentage}
//                     />
//                     <KPICardwithPercentage
//                         icon={BiSupport}
//                         title="Escalated to Human"
//                         count={dashboardData?.conversations?.escalatedToHumanCount?.count}
//                         percentage={dashboardData?.conversations?.escalatedToHumanCount?.percentage}
//                     />

//                     {/* <KPICard
//                         icon={PiFlowArrow}
//                         title="No. of flows"
//                         value="4"
//                     />
//                     <KPICard
//                         icon={TbArrowBounce}
//                         title="Bounce rate"
//                         value="18%"
//                     />
//                     <KPICard
//                         icon={MdOutlineTimelapse}
//                         title="Avg conversation duration"
//                         value="3m 42s"
//                     />
//                     <KPICard
//                         icon={BiConversation}
//                         title="No. of conversations"
//                         value="2,156"
//                     /> */}
//                 </div>

//                 <div className="bg-white p-4 rounded-sm shadow-md mb-6">
//                     <h2 className="text-xl font-semibold text-primary mb-4">Top Queries</h2>
//                     <div className="h-64">
//                         <Bar data={barChartData} options={chartOptions} />
//                     </div>
//                 </div>
//                 {/* <div className='p-6 rounded-xl shadow-sm border border-accent mb-6'>
//                     <AgCharts options={options} />
//                 </div> */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                     <div className="bg-white p-4 rounded-sm shadow-md h-80">
//                         <h2 className="text-xl font-semibold text-primary mb-4">Conversation Trends</h2>
//                         <div className="h-64">
//                             <Line data={lineChartData} options={chartOptions} />
//                         </div>
//                     </div>
//                     <div className="bg-white p-4 rounded-sm shadow-md h-80">
//                         <h2 className="text-xl font-semibold text-primary mb-4">Channel Breakdown</h2>
//                         <div className="h-64">
//                             <Pie data={pieChartData} options={chartOptions} />
//                         </div>
//                     </div>
//                 </div>
//                 {userData?.userType === "admin" &&
//                     <div className="flex flex-col md:flex-row gap-6 mb-6">
//                         <div className="md:w-1/4 bg-white rounded-sm shadow-md p-4 border border-[#48BBF9]/20">
//                             {Object.keys(appData).map((tab) => (
//                                 <button
//                                     key={tab}
//                                     className={`w-full text-left px-4 py-2 mb-2 rounded-sm transition ${activeTab === tab
//                                         ? 'bg-primary text-white'
//                                         : 'text-primary hover:bg-[#48BBF9] hover:text-white'
//                                         }`}
//                                     onClick={() => setActiveTab(tab)}
//                                 >
//                                     {appData[tab].name}
//                                 </button>
//                             ))}
//                         </div>
//                         <TabContent app={appData[activeTab]} />
//                     </div>}

//             </div>
//         </Layout>
//     );
// }

// export default Dashboard;

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { VscCommentUnresolved } from "react-icons/vsc";
import { TbArrowBounce, TbBrandSpeedtest, TbCalendarDue } from "react-icons/tb";
import { CgCalendarDue, CgLoadbar } from "react-icons/cg";
import {
  FaArrowUp,
  FaCrown,
  FaEnvelope,
  FaRegEnvelopeOpen,
  FaRegFrown,
  FaRegSmile,
  FaTelegram,
  FaWallet,
  FaWhatsapp,
} from "react-icons/fa";
import {
  MdOutlinePendingActions,
  MdAssignmentLate,
  MdOutlineSupportAgent,
  MdOutlineShoppingBag,
  MdOutlineTimelapse,
} from "react-icons/md";
import Layout from "../components/layout";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMegaphone } from "react-icons/hi2";
import { RiCoupon3Line } from "react-icons/ri";
import {
  BiCommentCheck,
  BiCommentX,
  BiConversation,
  BiDislike,
  BiLike,
  BiSupport,
} from "react-icons/bi";
import { IoIosSpeedometer, IoMdSend } from "react-icons/io";
import { BsCart3, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiConversation, GiTakeMyMoney } from "react-icons/gi";
import { RiBounceRateLine } from "react-icons/ri";
import { PiFlowArrow, PiWhatsappLogoLight } from "react-icons/pi";
import { AgCharts } from "ag-charts-react";
import { topology } from "../config/topology";
import { useUser } from "../config/userProvider";
import "ag-charts-enterprise";
import axios from "axios";
import { apiurl } from "../config/config";
import { Link } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const KPICard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-5 rounded-sm shadow-md border border-light-primary">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-2 rounded-full text-primary border border-primary">
          <Icon size={24} />
        </div>
        <div className="text-base text-primary font-medium">{title}</div>
      </div>
    </div>
    <div className="flex items-center justify-between mt-6">
      <p className="text-xl text-primary font-semibold">{value}</p>
    </div>
  </div>
);

const KPICardwithPercentage = ({ icon: Icon, title, count, percentage }) => {
  const percentageValue = parseFloat(percentage);
  const chartData = {
    datasets: [
      {
        data: [percentageValue, 100 - percentageValue],
        // backgroundColor: ['#48BBF9', '#E5E7EB'],
        backgroundColor: ["#48BBF9", "#E5E7EB"],
        borderWidth: 0,
      },
    ],
  };
  const chartOptions = {
    cutout: "70%",
    plugins: {
      tooltip: { enabled: false },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white p-5 rounded-sm shadow-md border border-light-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-full text-primary border border-primary">
            <Icon size={24} />
          </div>
          <div className="text-base text-primary font-medium">{title}</div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-xl text-primary font-semibold">{count}</p>
          <p className="text-sm text-primary">{percentage}</p>
        </div>
        <div className="w-16 h-16">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

const TabContent = ({ app }) => (
  <div className="p-6 flex-1">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-primary">{app.name}</h2>
      <button className="bg-primary hover:bg-[#48BBF9] text-white px-4 py-2 rounded-sm transition">
        Install Now
      </button>
    </div>
    <p className="text-primary mb-4 text-left">{app.description}</p>
    <div className="bg-white rounded-sm p-4 shadow-md border border-[#48BBF9]/20 text-left">
      <h3 className="text-lg font-semibold text-primary mb-2">Pricing</h3>
      <p className="text-xl text-primary font-bold">{app.price}</p>
      <h3 className="text-lg font-semibold text-primary mt-4 mb-2">
        Integrations
      </h3>
      <div className="flex gap-2 flex-wrap">
        {app.integrations.map((integration, index) => (
          <span
            key={index}
            className="bg-[#48BBF9]/20 text-primary px-2 py-1 rounded-sm text-sm"
          >
            {integration}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-semibold text-primary mt-4 mb-2">
        Key Features
      </h3>
      <ul className="list-disc pl-5 text-primary">
        {app.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold text-primary mt-4 mb-2">
        Additional Details
      </h3>
      <p className="text-primary">
        Popularity: {app.popularity} of businesses recommend
      </p>
      <p className="text-primary">Support: 24/7 Customer Support</p>
      <p className="text-primary">Setup: Quick 5-minute installation</p>
    </div>
  </div>
);

function Dashboard() {
  const [filterType, setFilterType] = useState("today");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userData, token } = useUser();
  const [activeTab, setActiveTab] = useState("whatsapp");

  const [pricingData, setPricingData] = useState(null);
  const [pricingLoading, setPricingLoading] = useState(true);
  const [pricingError, setPricingError] = useState("");

  const calculateDates = (type) => {
    const today = new Date();
    let start, end;

    switch (type) {
      case "today":
        start = new Date(today);
        end = new Date(today);
        break;
      case "yesterday":
        start = new Date(today);
        start.setDate(today.getDate() - 1);
        end = new Date(today);
        end.setDate(today.getDate() - 1);
        break;
      case "lastWeek":
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = new Date(today);
        break;
      case "lastMonth":
        start = new Date(today);
        start.setMonth(today.getMonth() - 1);
        end = new Date(today);
        break;
      case "custom":
        start = new Date(startDate);
        end = new Date(endDate);
        break;
      default:
        start = today;
        end = today;
    }

    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  };

  const fetchData = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${apiurl}/api/whatsapp/dashboard/alldata`,
        {
          params: {
            startDate,
            endDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDashboardData(response?.data?.data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const { startDate, endDate } = calculateDates(filterType);
    setStartDate(startDate);
    setEndDate(endDate);
    fetchData(startDate, endDate);
  }, [filterType]);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilterType(selectedFilter);
    setShowCustomDatePicker(selectedFilter === "custom");
    if (selectedFilter !== "custom") {
      const { startDate, endDate } = calculateDates(selectedFilter);
      setStartDate(startDate);
      setEndDate(endDate);
      fetchData(startDate, endDate);
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    if (newStartDate && endDate && newStartDate <= endDate) {
      fetchData(newStartDate, endDate);
    }
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    if (startDate && newEndDate && startDate <= newEndDate) {
      fetchData(startDate, newEndDate);
    }
  };

  const appData = {
    whatsapp: {
      name: "WhatsApp",
      description: "Business messaging via WhatsApp API",
      price: "$49/month",
      integrations: ["CRM", "Helpdesk", "Analytics"],
      features: ["Bulk Messaging", "Chatbots", "Analytics"],
      popularity: "95%",
    },
    telegram: {
      name: "Telegram",
      description: "Secure messaging platform integration",
      price: "$39/month",
      integrations: ["Bot Framework", "Analytics"],
      features: ["Encrypted Chats", "Groups", "Channels"],
      popularity: "85%",
    },
    infobip: {
      name: "Infobip",
      description: "Omnichannel communication platform",
      price: "$59/month",
      integrations: ["CRM", "Marketing Tools"],
      features: ["SMS", "Voice", "Email"],
      popularity: "90%",
    },
    wati: {
      name: "Wati",
      description: "WhatsApp team inbox solution",
      price: "$45/month",
      integrations: ["CRM", "E-commerce"],
      features: ["Team Chat", "Automation", "Templates"],
      popularity: "88%",
    },
  };

  const lineChartData = {
    labels: [
      "Apr 1",
      "Apr 2",
      "Apr 3",
      "Apr 4",
      "Apr 5",
      "Apr 6",
      "Apr 7",
      "Apr 8",
    ],
    datasets: [
      {
        label: "Conversations",
        data: [150, 170, 200, 180, 220, 230, 240, 245],
        borderColor: "#48BBF9",
        backgroundColor: "rgba(72, 187, 249, 0.5)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Website", "Mobile", "WhatsApp"],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: ["#48BBF9", "#1A5276", "#A9A9A9"],
      },
    ],
  };

  const barChartData = {
    labels: dashboardData?.Top_Query.map((item) => item._id) || [],
    datasets: [
      {
        label: "Query Count",
        data: dashboardData?.Top_Query.map((item) => item.count) || [],
        backgroundColor: "#A5B4FC",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
  };

  const unhandledQueries = [
    { query: "Refund Process", count: 45 },
    { query: "Store Hours", count: 30 },
    { query: "Payment Issues", count: 20 },
  ];

  const UserCard = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-light-primary flex flex-col md:flex-row gap-6 items-stretch mb-6">
      <div className="flex-1 bg-secondary p-5 rounded-xl flex flex-col md:flex-row items-center gap-5">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-full bg-light-primary flex items-center justify-center text-primary text-2xl font-bold shadow-inner">
            {userData?.name.charAt(0).toUpperCase()}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-success text-white rounded-full p-1.5">
            <FaCrown className="text-xs" />
          </div>
        </div>
        <div className="text-center md:text-left space-y-1">
          <h3 className="text-lg font-bold text-primary">{userData?.name}</h3>
          <p className="text-secondary-text text-sm flex items-center gap-1 justify-center md:justify-start">
            <FaEnvelope className="text-light-primary" /> {userData?.email}
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative h-full">
          <div className="bg-gradient-to-br from-primary to-light-primary p-5 rounded-xl shadow-lg text-white h-full flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-xl"></div>
            <div className="flex justify-between items-start z-10">
              <div className="bg-accent/40 w-10 h-8 rounded-sm flex items-center justify-center">
                <div className="bg-accent/80 w-6 h-5 rounded-sm"></div>
              </div>
              <FaWallet className="text-white/30 text-2xl" />
            </div>
            <div className="z-10 mb-5">
              <p className="text-xs opacity-80 mb-1">Available Balance</p>
              <p className="text-3xl font-bold tracking-tight">
                {userData?.wallet}
              </p>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-white/20 pt-3 z-10">
              <span>{userData?.tenant?.tenantName}</span>
              <Link to="/plans">
                <button className="bg-white text-primary hover:bg-secondary font-semibold px-5 py-2 rounded-full shadow-lg transition-all flex items-center gap-1">
                  <FaArrowUp className="text-xs" /> Upgrade
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const dailyMetricsChartData = {
  //     labels: dashboardData?.dashboardMatrics?.map(item => item.date.slice(8, 10)) || [],
  //     datasets: [
  //         {
  //             label: 'Conversations',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.total_conversations) || [],
  //             backgroundColor: '#c99bb5',
  //             borderColor: '#c99bb5',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Escalated to Human',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.escalated_to_human) || [],
  //             backgroundColor: '#4CAF50',
  //             borderColor: '#4CAF50',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Thumbs Up',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.thumbs_up) || [],
  //             backgroundColor: '#FF9800',
  //             borderColor: '#FF9800',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Thumbs Down',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.thumbs_down) || [],
  //             backgroundColor: '#F44336',
  //             borderColor: '#F44336',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Ticket Created',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.ticket) || [],
  //             backgroundColor: '#2196F3',
  //             borderColor: '#2196F3',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Abandoned',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.abandoned) || [],
  //             backgroundColor: '#9E9E9E',
  //             borderColor: '#9E9E9E',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Average Conversation Time',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.average_conversation_time) || [],
  //             backgroundColor: '#af7ac5',
  //             borderColor: '#af7ac5',
  //             yAxisID: 'y-counts',
  //         },
  //         {
  //             label: 'Average Response Time',
  //             data: dashboardData?.dashboardMatrics?.map(item => item.average_response_time) || [],
  //             backgroundColor: '#f7dc6f',
  //             borderColor: '#f7dc6f',
  //             yAxisID: 'y-counts',
  //         },
  //         // {
  //         //     label: 'Total Cost (INR)',
  //         //     data: dashboardData?.dashboardMatrics?.map(item => (item.total_conversations * 0.05 * 83).toFixed(2)) || [],
  //         //     backgroundColor: '#A5B4FC',
  //         //     borderColor: '#A5B4FC',
  //         //     yAxisID: 'y-cost',
  //         // },
  //     ],
  // };

  // const dailyMetricsChartOptions = {
  //     responsive: true,
  //     maintainAspectRatio: false,
  //     plugins: {
  //         legend: { position: 'top' },
  //         title: {
  //             display: true,
  //             text: `Daily Metrics Trends (${startDate} to ${endDate})`,
  //         },
  //         tooltip: {
  //             callbacks: {
  //                 label: function (context) {
  //                     let label = context.dataset.label || '';
  //                     if (label) {
  //                         label += ': ';
  //                     }
  //                     if (context.parsed.y !== null) {
  //                         label += context.parsed.y;
  //                         if (context.dataset.yAxisID === 'y-cost') {
  //                             label += ' INR';
  //                         }
  //                     }
  //                     return label;
  //                 },
  //             },
  //         },
  //     },
  //     scales: {
  //         x: {
  //             title: { display: true, text: 'Day of Month' },
  //             stacked: true,
  //         },
  //         'y-counts': {
  //             type: 'linear',
  //             position: 'left',
  //             title: { display: true, text: 'Conversations' },
  //             grid: { display: false },
  //             min: 0,
  //             stacked: true,
  //         },
  //         'y-cost': {
  //             type: 'linear',
  //             position: 'right',
  //             title: { display: true, text: 'Total Cost (INR)' },
  //             grid: { display: false },
  //             min: 0,
  //             stacked: true,
  //         },
  //     },
  //     elements: {
  //         bar: {
  //             borderRadius: 4, // Rounded bars for better aesthetics
  //         },
  //     },
  // };
  const dailyMetricsChartData = {
    labels:
      dashboardData?.dashboardMatrics?.map((item) => item.date.slice(8, 10)) ||
      [],
    datasets: [
      {
        type: "line",
        label: "Escalated to Human",
        data:
          dashboardData?.dashboardMatrics?.map(
            (item) => item.escalated_to_human
          ) || [],
        backgroundColor: "#4CAF50",
        borderColor: "#4CAF50",
        yAxisID: "y-conversations",
      },
      {
        type: "line",
        label: "Thumbs Up",
        data:
          dashboardData?.dashboardMatrics?.map((item) => item.thumbs_up) || [],
        backgroundColor: "#FF9800",
        borderColor: "#FF9800",
        yAxisID: "y-conversations",
      },
      {
        type: "line",
        label: "Thumbs Down",
        data:
          dashboardData?.dashboardMatrics?.map((item) => item.thumbs_down) ||
          [],
        backgroundColor: "#F44336",
        borderColor: "#F44336",
        yAxisID: "y-conversations",
      },
      {
        type: "line",
        label: "Ticket Created",
        data: dashboardData?.dashboardMatrics?.map((item) => item.ticket) || [],
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
        yAxisID: "y-conversations",
      },
      {
        type: "line",
        label: "Abandoned",
        data:
          dashboardData?.dashboardMatrics?.map((item) => item.abandoned) || [],
        backgroundColor: "#9E9E9E",
        borderColor: "#9E9E9E",
        yAxisID: "y-conversations",
      },
      // {
      //     type: 'line',
      //     label: 'Average Conversation Time',
      //     data: dashboardData?.dashboardMatrics?.map(item => item.average_conversation_time) || [],
      //     backgroundColor: '#af7ac5',
      //     borderColor: '#af7ac5',
      //     yAxisID: 'y-conversations',
      // },
      {
        type: "line",
        label: "Average Response Time",
        data:
          dashboardData?.dashboardMatrics?.map(
            (item) => item.average_response_time
          ) || [],
        backgroundColor: "#f7dc6f",
        borderColor: "#f7dc6f",
        yAxisID: "y-conversations",
      },
      {
        type: "bar",
        label: "Conversations",
        data:
          dashboardData?.dashboardMatrics?.map(
            (item) => item.total_conversations
          ) || [],
        backgroundColor: "#c99bb5",
        borderColor: "#c99bb5",
        yAxisID: "y-conversations",
      },
      // {
      //     label: 'Total Cost (INR)',
      //     data: dashboardData?.dashboardMatrics?.map(item => (item.total_conversations * 0.05 * 83).toFixed(2)) || [],
      //     backgroundColor: '#A5B4FC',
      //     borderColor: '#A5B4FC',
      //     yAxisID: 'y-cost',
      // },
    ],
  };

  const dailyMetricsChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Daily Metrics Trends (${startDate} to ${endDate})`,
      },
      // tooltip: {
      //     callbacks: {
      //         label: function (context) {
      //             let label = context.dataset.label || '';
      //             if (label) {
      //                 label += ': ';
      //             }
      //             if (context.parsed.y !== null) {
      //                 label += context.parsed.y;
      //                 if (context.dataset.yAxisID === 'y-cost') {
      //                     label += ' INR';
      //                 }
      //             }
      //             return label;
      //         },
      //     },
      // },
    },
    scales: {
      x: {
        title: { display: true, text: "Day of Month" },
      },
      // 'y-cost': {
      //     type: 'linear',
      //     position: 'left',
      //     title: { display: true, text: 'Total Cost (INR)' },
      //     grid: { display: false },
      // },
      "y-conversations": {
        type: "linear",
        position: "left",
        title: { display: true, text: "Conversations" },
        grid: { display: false },
      },
    },
  };

  // Fetch pricing only if user is admin
  useEffect(() => {
    if (userData?.userType !== "admin") {
      setPricingLoading(false);
      return;
    }

    const fetchAdminPricing = async () => {
      setPricingLoading(true);
      setPricingError("");

      try {
        const response = await axios.post(
          `${apiurl}/api/whatsapp/charges/listbyadmin`,
          {
            tenantId: userData?.tenant?.tenantId, // Use dynamic tenantId if available
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.sucess && Array.isArray(response.data.data)) {
          // Map data into object for easy access
          const prices = {
            marketing: null,
            authentication: null,
            utility: null,
            service: null,
          };

          response.data.data.forEach((item) => {
            const type = item.type.toLowerCase();
            if (type === "marketing") prices.marketing = item.price;
            else if (type === "authentication")
              prices.authentication = item.price;
            else if (type === "utility") prices.utility = item.price;
            else if (type === "service") prices.service = item.price;
          });

          setPricingData(prices);
        } else {
          setPricingError("No pricing data found.");
        }
      } catch (err) {
        console.error("Failed to fetch admin pricing:", err);
        setPricingError("Failed to load pricing. Please try again later.");
      } finally {
        setPricingLoading(false);
      }
    };

    fetchAdminPricing();
  }, [userData, token]);

  return (
    <Layout>
      <div className="min-h-screen p-6">
        {userData?.userType === "admin" && <UserCard />}
        <div className="bg-white p-6 flex flex-col sm:flex-row justify-between items-center rounded-lg shadow-md border border-light-primary mb-6 gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto text-primary">
            <label className="block font-medium ">Select Date Range:</label>
            <select
              value={filterType}
              onChange={handleFilterChange}
              className="border rounded px-3 py-2 text-xs w-full sm:w-auto"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {showCustomDatePicker && (
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  max={endDate}
                  className="border rounded px-3 py-2 text-xs w-full sm:w-40"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  min={startDate}
                  className="border rounded px-3 py-2 text-xs w-full sm:w-40"
                />
              </div>
            </div>
          )}
        </div>
        {userData?.userType === "admin" && (
          <div className="bg-white rounded-lg shadow-md border border-light-primary p-8 mb-5">
            <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
              WhatsApp Message Pricing
              {pricingLoading && (
                <span className="text-sm font-normal text-text-secondary">
                  (Loading...)
                </span>
              )}
            </h2>

            {pricingError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {pricingError}
              </div>
            )}

            {!pricingLoading && !pricingError && pricingData && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Marketing */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200">
                  <div className="text-sm font-medium text-blue-700 uppercase tracking-wide mb-2">
                    Marketing
                  </div>
                  <div className="text-3xl font-bold text-blue-900">
                    ₹
                    {pricingData.marketing !== null
                      ? pricingData.marketing.toFixed(2)
                      : "—"}
                  </div>
                  <div className="text-xs text-blue-600 mt-1">per message</div>
                </div>

                {/* Authentication */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
                  <div className="text-sm font-medium text-green-700 uppercase tracking-wide mb-2">
                    Authentication
                  </div>
                  <div className="text-3xl font-bold text-green-900">
                    ₹
                    {pricingData.authentication !== null
                      ? pricingData.authentication.toFixed(2)
                      : "—"}
                  </div>
                  <div className="text-xs text-green-600 mt-1">per message</div>
                </div>

                {/* Utility */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200">
                  <div className="text-sm font-medium text-purple-700 uppercase tracking-wide mb-2">
                    Utility
                  </div>
                  <div className="text-3xl font-bold text-purple-900">
                    ₹
                    {pricingData.utility !== null
                      ? pricingData.utility.toFixed(2)
                      : "—"}
                  </div>
                  <div className="text-xs text-purple-600 mt-1">
                    Reminders & Updates
                  </div>
                </div>

                {/* Service */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200">
                  <div className="text-sm font-medium text-orange-700 uppercase tracking-wide mb-2">
                    Service
                  </div>
                  <div className="text-3xl font-bold text-orange-900">
                    ₹
                    {pricingData.service !== null
                      ? pricingData.service.toFixed(2)
                      : "—"}
                  </div>
                  <div className="text-xs text-orange-600 mt-1">
                    per message
                  </div>
                </div>
              </div>
            )}

            {/* <div className="mt-6 text-sm text-text-secondary text-center">
              Prices are in Indian Rupees (INR) • Updated as of today
            </div> */}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
          <KPICard
            icon={FiUsers}
            title="No. of customers"
            value={dashboardData?.User}
          />
          <KPICard
            icon={PiWhatsappLogoLight}
            title="Whatsapp Accounts"
            value={dashboardData?.Whatsapp_Account}
          />
          <KPICard
            icon={GiConversation}
            title="Total Conversations"
            value={dashboardData?.conversations?.total}
          />
          <KPICard
            icon={IoIosSpeedometer}
            title="Average response time"
            value={`${Number(dashboardData?.Average_response_time).toFixed(
              1
            )} sec.`}
          />
          <KPICard
            icon={TbBrandSpeedtest}
            title="Average Conversation time"
            value={`${Number(
              dashboardData?.conversations?.average_conversation_time
            ).toFixed(1)} min.`}
          />
          <KPICardwithPercentage
            icon={BiCommentX}
            title="Abandoned Conversations"
            count={dashboardData?.conversations?.abandonedCount?.count}
            percentage={
              dashboardData?.conversations?.abandonedCount?.percentage
            }
          />
          <KPICardwithPercentage
            icon={BiLike}
            title="Thumbs Up"
            count={dashboardData?.conversations?.thumbsUpCount?.count}
            percentage={dashboardData?.conversations?.thumbsUpCount?.percentage}
          />
          <KPICardwithPercentage
            icon={BiDislike}
            title="Thumbs Down"
            count={dashboardData?.conversations?.thumbsDownCount?.count}
            percentage={
              dashboardData?.conversations?.thumbsDownCount?.percentage
            }
          />
          <KPICardwithPercentage
            icon={BiCommentCheck}
            title="Feedback Given"
            count={dashboardData?.conversations?.feedbackGivenCount?.count}
            percentage={
              dashboardData?.conversations?.feedbackGivenCount?.percentage
            }
          />
          <KPICardwithPercentage
            icon={BiSupport}
            title="Escalated to Human"
            count={dashboardData?.conversations?.escalatedToHumanCount?.count}
            percentage={
              dashboardData?.conversations?.escalatedToHumanCount?.percentage
            }
          />
        </div>
        <div className="bg-white p-6 rounded-md border border-light-primary shadow-md border border-gray-100 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Daily Metrics Trends
          </h2>
          <div className="h-80">
            <Bar
              data={dailyMetricsChartData}
              options={dailyMetricsChartOptions}
            />
          </div>
        </div>
        {/* <div className="bg-white p-4 rounded-sm shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-primary mb-4">Top Queries</h2>
                    <div className="h-64">
                        <Bar data={barChartData} options={chartOptions} />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white p-4 rounded-sm shadow-md h-80">
                        <h2 className="text-xl font-semibold text-primary mb-4">Conversation Trends</h2>
                        <div className="h-64">
                            <Line data={lineChartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-sm shadow-md h-80">
                        <h2 className="text-xl font-semibold text-primary mb-4">Channel Breakdown</h2>
                        <div className="h-64">
                            <Pie data={pieChartData} options={chartOptions} />
                        </div>
                    </div>
                </div> */}
        {userData?.userType === "admin" && (
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="md:w-1/4 bg-white rounded-sm shadow-md p-4 border border-[#48BBF9]/20">
              {Object.keys(appData).map((tab) => (
                <button
                  key={tab}
                  className={`w-full text-left px-4 py-2 mb-2 rounded-sm transition ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-[#48BBF9] hover:text-white"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {appData[tab].name}
                </button>
              ))}
            </div>
            <TabContent app={appData[activeTab]} />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
