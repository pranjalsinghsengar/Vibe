// import React from 'react'
// import Layout from '../components/layout'
// import { Line } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
// import { Pie } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";

// function Analytics() {

//     const data = {
//         churnRate: {
//             labels: ["JAN", "FEB", "MAR", "APR"],
//             datasets: [
//                 {
//                     label: "Churn Rate",
//                     data: [2.5, 2.2, 2.8, 2.0],
//                     borderColor: "#c7852a",
//                     backgroundColor: "rgba(199, 133, 42, 0.2)",
//                     borderWidth: 2,
//                 },
//             ],
//         },
//         engagement: {
//             labels: ["Website Visits", "App Usage", "Support Tickets"],
//             datasets: [
//                 {
//                     label: "Engagement Metrics",
//                     data: [15000, 12000, 500],
//                     backgroundColor: "#c7852a",
                    
//                 },
//             ],
//         },
//         retentionRate: {
//             labels: ["Loans", "Investments", "Credit Cards", "Savings"],
//             datasets: [
//                 {
//                     label: "Retention Rate",
//                     data: [92, 85, 88, 90],
//                     backgroundColor: ["#c7852a", "#b4741f", "#a46315", "#8a5210"],
//                 },
//             ],
//         },
//     };
//     const barOptions = {
//         indexAxis: 'y',
//       };

//     return (
//         <Layout>
//             <div className="p-6 bg-[#F9F5F1] h-full flex flex-col items-center overflow-scroll hide-scrollbar">
//                 <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-[#b4741f] mb-6">Customer Retention Report</h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
//                     {/* Churn Rate Over Time */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary">
//                         <h2 className="text-[#b4741f] font-bold">CHURN RATE OVER TIME</h2>
//                         <Line data={data.churnRate} />
//                     </div>

                    
//                     {/* Customer Engagement Metrics */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary">
//                         <h2 className="text-[#b4741f] font-bold">CUSTOMER ENGAGEMENT METRICS</h2>
//                         <Bar data={data.engagement} />
//                     </div>

//                     {/* Retention Rate by Product/Service */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary flex flex-col justify-evenly items-center">
//                         <h2 className="text-[#b4741f] font-bold">RETENTION RATE BY PRODUCT/SERVICE</h2>
//                         <Pie data={data.retentionRate}  className="max-h-96 max-w-96"/>
//                     </div>
//                     {/* Retention Rate by Product/Service */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary flex flex-col justify-evenly items-center">
//                         <h2 className="text-[#b4741f] font-bold">RETENTION RATE BY PRODUCT/SERVICE</h2>
//                         <Doughnut data={data.retentionRate}  className="max-h-96 max-w-96"/>
//                     </div>
//                     {/* Customer Engagement Metrics */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary md:col-span-2 ">
//                         <h2 className="text-[#b4741f] font-bold">CUSTOMER ENGAGEMENT METRICS</h2>
//                         <Bar data={data.engagement} options={barOptions}/>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default Analytics



















// import React from 'react'
// import Layout from '../components/layout'
// import { Line } from "react-chartjs-2";
// import { Bar } from "react-chartjs-2";
// import { Pie } from "react-chartjs-2";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";

// function Analytics() {
//     const data = {
//         churnRate: {
//             labels: ["JAN", "FEB", "MAR", "APR"],
//             datasets: [
//                 {
//                     label: "Churn Rate",
//                     data: [2.5, 2.2, 2.8, 2.0],
//                     borderColor: "#3B82F6", // Matches --light-primary-color
//                     backgroundColor: "rgba(59, 130, 246, 0.2)", // Light primary with opacity
//                     borderWidth: 2,
//                 },
//             ],
//         },
//         engagement: {
//             labels: ["Website Visits", "App Usage", "Support Tickets"],
//             datasets: [
//                 {
//                     label: "Engagement Metrics",
//                     data: [15000, 12000, 500],
//                     backgroundColor: "#9CA3AF", // Matches --secondary-color
//                     borderColor: "#1E3A8A", // Matches --primary-color
//                     borderWidth: 1,
//                 },
//             ],
//         },
//         retentionRate: {
//             labels: ["Loans", "Investments", "Credit Cards", "Savings"],
//             datasets: [
//                 {
//                     label: "Retention Rate",
//                     data: [92, 85, 88, 90],
//                     backgroundColor: [
//                         "#1E3A8A", // Matches --primary-color
//                         "#2563EB", // Darker shade of light-primary
//                         "#3B82F6", // Matches --light-primary-color
//                         "#60A5FA", // Lighter shade of light-primary
//                     ],
//                     borderColor: "#D1D5DB", // Matches --light-secondary-color
//                     borderWidth: 1,
//                 },
//             ],
//         },
//     };

//     const barOptions = {
//         indexAxis: 'y',
//     };

//     return (
//         <Layout>
//             <div className="p-6 bg-light-secondary h-full flex flex-col items-center">
//                 <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-primary mb-6">Customer Retention Report</h1>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
//                     {/* Churn Rate Over Time */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary">
//                         <h2 className="text-primary font-bold">CHURN RATE OVER TIME</h2>
//                         <Line data={data.churnRate} />
//                     </div>

//                     {/* Customer Engagement Metrics */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary">
//                         <h2 className="text-primary font-bold">CUSTOMER ENGAGEMENT METRICS</h2>
//                         <Bar data={data.engagement} />
//                     </div>

//                     {/* Retention Rate by Product/Service (Pie) */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary flex flex-col justify-evenly items-center">
//                         <h2 className="text-primary font-bold">RETENTION RATE BY PRODUCT/SERVICE</h2>
//                         <Pie data={data.retentionRate} className="max-h-96 max-w-96" />
//                     </div>

//                     {/* Retention Rate by Product/Service (Doughnut) */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary flex flex-col justify-evenly items-center">
//                         <h2 className="text-primary font-bold">RETENTION RATE BY PRODUCT/SERVICE</h2>
//                         <Doughnut data={data.retentionRate} className="max-h-96 max-w-96" />
//                     </div>

//                     {/* Customer Engagement Metrics (Horizontal Bar) */}
//                     <div className="bg-white p-4 shadow rounded-xl border border-primary md:col-span-2">
//                         <h2 className="text-primary font-bold">CUSTOMER ENGAGEMENT METRICS</h2>
//                         <Bar data={data.engagement} options={barOptions} />
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default Analytics





































import React, { useState } from 'react';
import Layout from '../components/layout';
import { Bar, Doughnut, Radar, Scatter, PolarArea, Bubble } from "react-chartjs-2";
import "chart.js/auto";

function Analytics() {
    const [selectedApp, setSelectedApp] = useState('whatsapp');
    const [startDate, setStartDate] = useState('2025-04-01');
    const [endDate, setEndDate] = useState('2025-04-08');

    // Static data for all ten analytics metrics
    const botCustomerCareData = {
        labels: ['Resolved by Bot', 'Escalated to Agent', 'Unresolved'],
        datasets: [
            {
                data: selectedApp === 'whatsapp' ? [70, 20, 10] :
                      selectedApp === 'telegram' ? [65, 25, 10] :
                      selectedApp === 'infobip' ? [68, 22, 10] :
                      [66, 23, 11], // Wati
                backgroundColor: ['#1A5276', '#48BBF9', '#F87171'],
            },
        ],
    };

    const marketingPromotionData = {
        labels: ['Clicks', 'Conversions', 'Bounces'],
        datasets: [
            {
                label: 'Campaign Performance',
                data: selectedApp === 'whatsapp' ? [500, 150, 100] :
                      selectedApp === 'telegram' ? [450, 130, 120] :
                      selectedApp === 'infobip' ? [480, 140, 110] :
                      [460, 135, 115], // Wati
                backgroundColor: '#48BBF9',
            },
        ],
    };

    const conversationalCommerceData = {
        datasets: [
            {
                label: 'Order Value vs Time',
                data: selectedApp === 'whatsapp' ? [
                    { x: 1, y: 50 }, { x: 2, y: 75 }, { x: 3, y: 100 }, { x: 4, y: 60 }, { x: 5, y: 120 }
                ] : selectedApp === 'telegram' ? [
                    { x: 1, y: 45 }, { x: 2, y: 65 }, { x: 3, y: 90 }, { x: 4, y: 55 }, { x: 5, y: 110 }
                ] : selectedApp === 'infobip' ? [
                    { x: 1, y: 48 }, { x: 2, y: 70 }, { x: 3, y: 95 }, { x: 4, y: 58 }, { x: 5, y: 115 }
                ] : [
                    { x: 1, y: 46 }, { x: 2, y: 68 }, { x: 3, y: 92 }, { x: 4, y: 57 }, { x: 5, y: 112 }
                ], // Wati
                backgroundColor: '#1A5276',
                borderColor: '#48BBF9',
                pointRadius: 5,
            },
        ],
    };

    const botFeatureUsageData = {
        labels: ['Customer Care', 'Marketing', 'Commerce', 'Analytics'],
        datasets: [
            {
                label: 'Bot Feature Usage',
                data: selectedApp === 'whatsapp' ? [85, 75, 65, 60] :
                      selectedApp === 'telegram' ? [80, 70, 60, 55] :
                      selectedApp === 'infobip' ? [82, 72, 63, 58] :
                      [83, 73, 62, 57], // Wati
                backgroundColor: 'rgba(72, 187, 249, 0.6)',
                borderColor: '#48BBF9',
                borderWidth: 2,
            },
        ],
    };

    const botEngagementData = {
        labels: ['Quick Replies', 'Menu Selections', 'Free Text', 'Abandoned'],
        datasets: [
            {
                data: selectedApp === 'whatsapp' ? [40, 30, 20, 10] :
                      selectedApp === 'telegram' ? [35, 25, 25, 15] :
                      selectedApp === 'infobip' ? [38, 28, 22, 12] :
                      [36, 27, 23, 14], // Wati
                backgroundColor: ['#1A5276', '#48BBF9', '#A9A9A9', '#F87171'],
            },
        ],
    };

    const costEfficiencyData = {
        datasets: [
            {
                label: 'Cost vs Conversations',
                data: selectedApp === 'whatsapp' ? [
                    { x: 100, y: 0.05, r: 10 }, { x: 200, y: 0.04, r: 15 }, { x: 300, y: 0.03, r: 20 }
                ] : selectedApp === 'telegram' ? [
                    { x: 90, y: 0.06, r: 10 }, { x: 180, y: 0.05, r: 15 }, { x: 270, y: 0.04, r: 20 }
                ] : selectedApp === 'infobip' ? [
                    { x: 95, y: 0.055, r: 10 }, { x: 190, y: 0.045, r: 15 }, { x: 285, y: 0.035, r: 20 }
                ] : [
                    { x: 92, y: 0.057, r: 10 }, { x: 184, y: 0.047, r: 15 }, { x: 276, y: 0.037, r: 20 }
                ], // Wati
                backgroundColor: '#48BBF9',
            },
        ],
    };

    const userDemographicsData = {
        labels: ['18-25', '26-35', '36-45', '46-55', '56+'],
        datasets: [
            {
                label: 'User Age Distribution',
                data: selectedApp === 'whatsapp' ? [25, 35, 20, 15, 5] :
                      selectedApp === 'telegram' ? [20, 30, 25, 15, 10] :
                      selectedApp === 'infobip' ? [22, 33, 22, 13, 10] :
                      [23, 32, 23, 14, 8], // Wati
                backgroundColor: 'rgba(26, 82, 118, 0.7)',
                borderColor: '#1A5276',
                borderWidth: 2,
            },
        ],
    };

    const campaignROIData = {
        labels: ['Campaign 1', 'Campaign 2', 'Campaign 3'],
        datasets: [
            {
                label: 'ROI (%)',
                data: selectedApp === 'whatsapp' ? [120, 150, 90] :
                      selectedApp === 'telegram' ? [110, 130, 85] :
                      selectedApp === 'infobip' ? [115, 140, 88] :
                      [112, 135, 87], // Wati
                backgroundColor: '#48BBF9',
            },
        ],
    };

    const numberOfConversationsData = {
        labels: ['Bot-Initiated', 'User-Initiated', 'Follow-Ups'],
        datasets: [
            {
                label: 'Conversation Breakdown',
                data: selectedApp === 'whatsapp' ? [800, 1200, 400] :
                      selectedApp === 'telegram' ? [700, 1000, 350] :
                      selectedApp === 'infobip' ? [750, 1100, 380] :
                      [720, 1050, 360], // Wati
                backgroundColor: ['#1A5276', '#48BBF9', '#A9A9A9'],
            },
        ],
    };

    const walletPointsUsageData = {
        datasets: [
            {
                label: 'Points Spent vs Redeemed',
                data: selectedApp === 'whatsapp' ? [
                    { x: 100, y: 50, r: 10 }, { x: 200, y: 80, r: 15 }, { x: 300, y: 120, r: 20 }
                ] : selectedApp === 'telegram' ? [
                    { x: 90, y: 45, r: 10 }, { x: 180, y: 70, r: 15 }, { x: 270, y: 100, r: 20 }
                ] : selectedApp === 'infobip' ? [
                    { x: 95, y: 48, r: 10 }, { x: 190, y: 75, r: 15 }, { x: 285, y: 110, r: 20 }
                ] : [
                    { x: 92, y: 46, r: 10 }, { x: 184, y: 72, r: 15 }, { x: 276, y: 105, r: 20 }
                ], // Wati
                backgroundColor: '#1A5276',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } },
    };

    const scatterOptions = {
        ...chartOptions,
        scales: {
            x: { title: { display: true, text: 'Days (April 2025)' } },
            y: { title: { display: true, text: 'Order Value ($)' } },
        },
    };

    const bubbleOptions = {
        ...chartOptions,
        scales: {
            x: { title: { display: true, text: 'Conversations' } },
            y: { title: { display: true, text: 'Cost per Conversation ($)' } },
        },
    };

    const walletBubbleOptions = {
        ...chartOptions,
        scales: {
            x: { title: { display: true, text: 'Points Spent' } },
            y: { title: { display: true, text: 'Points Redeemed' } },
        },
    };

    const apps = [
        { value: 'whatsapp', label: 'WhatsApp' },
        { value: 'telegram', label: 'Telegram' },
        { value: 'infobip', label: 'Infobip' },
        { value: 'wati', label: 'Wati' },
    ];

    return (
        <Layout>
            <div className="p-6 bg-light-secondary min-h-screen">
                <h1 className="text-2xl font-semibold text-primary mb-6">Comprehensive Bot Analytics</h1>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1">
                        <label className="text-primary font-medium mb-2 block">Select Application</label>
                        <select
                            value={selectedApp}
                            onChange={(e) => setSelectedApp(e.target.value)}
                            className="w-full p-2 border border-primary rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-light-primary"
                        >
                            {apps.map((app) => (
                                <option key={app.value} value={app.value}>
                                    {app.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1">
                        <label className="text-primary font-medium mb-2 block">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2 border border-primary rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-light-primary"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-primary font-medium mb-2 block">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="w-full p-2 border border-primary rounded-md text-primary focus:outline-none focus:ring-2 focus:ring-light-primary"
                        />
                    </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Bot Customer Care Performance */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Bot Customer Care Performance</h2>
                        <div className="h-64">
                            <Doughnut data={botCustomerCareData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Marketing Promotion Effectiveness */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Marketing Promotion Effectiveness</h2>
                        <div className="h-64">
                            <Bar data={marketingPromotionData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Conversational Commerce Trends */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Conversational Commerce Trends</h2>
                        <div className="h-64">
                            <Scatter data={conversationalCommerceData} options={scatterOptions} />
                        </div>
                    </div>

                    {/* Bot Feature Usage */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Bot Feature Usage</h2>
                        <div className="h-64">
                            <Radar data={botFeatureUsageData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Bot Engagement Patterns */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Bot Engagement Patterns</h2>
                        <div className="h-64">
                            <PolarArea data={botEngagementData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Cost Efficiency */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Cost Efficiency</h2>
                        <div className="h-64">
                            <Bubble data={costEfficiencyData} options={bubbleOptions} />
                        </div>
                    </div>

                    {/* User Demographics */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">User Demographics</h2>
                        <div className="h-64">
                            <Radar data={userDemographicsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Campaign ROI */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Campaign ROI</h2>
                        <div className="h-64">
                            <Bar data={campaignROIData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Number of Conversations */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Number of Conversations</h2>
                        <div className="h-64">
                            <Doughnut data={numberOfConversationsData} options={chartOptions} />
                        </div>
                    </div>

                    {/* Wallet Points Usage */}
                    <div className="bg-white p-4 rounded-xl shadow-md h-auto">
                        <h2 className="text-xl font-semibold text-primary mb-4">Wallet Points Usage</h2>
                        <div className="h-64">
                            <Bubble data={walletPointsUsageData} options={walletBubbleOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Analytics;



