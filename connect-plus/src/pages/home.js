// import React, { useRef, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { GrIntegration } from "react-icons/gr";
// import { TbSettingsAutomation } from "react-icons/tb";
// import { MdOutlineAnalytics } from "react-icons/md";
// import { PiFlowArrow } from "react-icons/pi";
// import { TbApiApp } from "react-icons/tb";



// function Home() {

//     const navigate = useNavigate();
//     const pricingRef = useRef(null);
//     const featuresRef = useRef(null);
//     const solutionsRef = useRef(null);



//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [dropdownOpen, setDropdownOpen] = useState({
//         products: false,
//         features: false,
//         developers: false,
//     });

//     const handleTryForFree = () => {
//         navigate("/trial");
//     };

//     const handleContactExpert = () => {
//         alert('Opening contact form to reach an expert!');
//     };

//     const toggleDropdown = (menu) => {
//         setDropdownOpen((prev) => {
//             const newState = {
//                 products: false,
//                 features: false,
//                 developers: false,
//             };
//             newState[menu] = !prev[menu];
//             return newState;
//         });
//     };

//     const scrollToPricing = () => {
//         pricingRef.current.scrollIntoView({ behavior: 'smooth' });
//     };
//     const scrollToFeatures = () => {
//         featuresRef.current.scrollIntoView({ behavior: 'smooth' });
//     };
//     const scrollToSolutions = () => solutionsRef.current.scrollIntoView({ behavior: 'smooth' });

//     return (
//         <div className="min-h-screen bg-gray-50 font-sans">
//             {/* Navigation Bar */}
//             <nav className="bg-white shadow-sm sticky top-0">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between h-16">
//                         <div className="flex items-center justify-between w-full">
//                             <div className="flex-shrink-0">
//                                 <img
//                                     className="h-8"
//                                     src="/logo.png"
//                                     alt="Connectplus Logo"
//                                 />
//                             </div>
//                             <div className="hidden md:ml-6 md:flex md:space-x-1 lg:space-x-8">
//                                 <div className={`${dropdownOpen.products ? 'bg-gray-100' : ''} relative`}>
//                                     <button
//                                         onClick={() => toggleDropdown('products')}
//                                         className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
//                                     >
//                                         Products
//                                         <svg
//                                             className={`ml-1 h-4 w-4 transform ${dropdownOpen.products ? 'rotate-180' : ''}`}
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M19 9l-7 7-7-7"
//                                             />
//                                         </svg>
//                                     </button>
//                                     {dropdownOpen.products && (
//                                         <div className="absolute z-10 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                                             <div className="py-1">
//                                                 <Link to="/whatsapp-api">
//                                                     <div className="block px-4 flex gap-5 items-center text-left py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                         WhatsApp API
//                                                         <TbApiApp />
//                                                     </div>
//                                                 </Link>
//                                                 <Link to="/bot-flow">
//                                                     <div className="block px-4 flex gap-5 items-center text-left py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                         WhatsApp Bot Flow <PiFlowArrow />
//                                                     </div>
//                                                 </Link>
//                                                 {/* <Link to="/">
//                                                     <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                         Chat Automation
//                                                     </div>
//                                                 </Link> */}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div>

//                                     <button onClick={scrollToSolutions} className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center focus:outline-none">
//                                         Solutions
//                                     </button>
//                                 </div>
//                                 <div>
//                                     <button
//                                         onClick={scrollToFeatures}
//                                         className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
//                                     >
//                                         Features
//                                     </button>
//                                 </div>
//                                 {/* <div className={`${dropdownOpen.developers ? 'bg-gray-100' : ''} relative`}>
//                                     <button
//                                         onClick={() => toggleDropdown('developers')}
//                                         className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
//                                     >
//                                         Developers
//                                         <svg
//                                             className={`ml-1 h-4 w-4 transform ${dropdownOpen.developers ? 'rotate-180' : ''}`}
//                                             fill="none"
//                                             stroke="currentColor"
//                                             viewBox="0 0 24 24"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 strokeWidth="2"
//                                                 d="M19 9l-7 7-7-7"
//                                             />
//                                         </svg>
//                                     </button>
//                                     {dropdownOpen.developers && (
//                                         <div className="absolute z-10 mt-2 w-64 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5">
//                                             <div className="py-1">
//                                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                     API Documentation
//                                                 </a>
//                                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                     SDKs & Libraries
//                                                 </a>
//                                                 <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                                     Webhooks
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div> */}
//                                 <div>
//                                     <button
//                                         onClick={scrollToPricing}
//                                         className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
//                                     >
//                                         Pricing
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="hidden md:flex items-center space-x-4">
//                                 <Link to="/dashboard">
//                                     <button
//                                         className="bg-primary hover:bg-secondary text-primary hover:text-primary  px-4 py-2 rounded-sm text-sm font-medium "
//                                     >
//                                         Dashboard
//                                     </button>
//                                 </Link>
//                                 <a href="https://www.fixlabs.ai/contact" target="_blank" className="text-gray-500 hover:text-gray-900 text-sm font-medium">
//                                     Contact
//                                 </a>
//                             </div>
//                         </div>

//                         <div className="md:hidden flex items-center">
//                             <button
//                                 onClick={() => setIsMenuOpen(!isMenuOpen)}
//                                 className="text-gray-500 hover:text-gray-900 focus:outline-none"
//                             >
//                                 <svg
//                                     className="h-6 w-6"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="2"
//                                         d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
//                                     />
//                                 </svg>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//                 {isMenuOpen && (
//                     <div className="md:hidden">
//                         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                             <div>
//                                 <button
//                                     onClick={() => toggleDropdown('products')}
//                                     className="w-full text-left text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium flex items-center justify-between focus:outline-none"
//                                 >
//                                     Products
//                                     <svg
//                                         className={`ml-1 h-4 w-4 transform ${dropdownOpen.products ? 'rotate-180' : ''}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M19 9l-7 7-7-7"
//                                         />
//                                     </svg>
//                                 </button>
//                                 {dropdownOpen.products && (
//                                     <div className="pl-4 space-y-1">
//                                         <Link to="/whatsapp-api">
//                                             <div className="block px-3 py-2 flex gap-5 items-center text-sm text-gray-700 hover:bg-gray-100">
//                                                 WhatsApp API
//                                                 <TbApiApp />
//                                             </div>
//                                         </Link>
//                                         <Link to="/bot-flow">
//                                             <div className="block px-3 py-2 flex gap-5 items-center text-sm text-gray-700 hover:bg-gray-100">
//                                                 WhatsApp Bot Flow
//                                                 <PiFlowArrow />
//                                             </div>
//                                         </Link>
//                                         {/* <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                             Chat Automation
//                                         </a> */}
//                                     </div>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={scrollToSolutions}
//                                 className="w-full text-left text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium focus:outline-none"
//                             >
//                                 Solutions
//                             </button>
//                             <button
//                                 onClick={scrollToFeatures}
//                                 className="w-full text-left text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium focus:outline-none"
//                             >
//                                 Features
//                             </button>
//                             {/* <div>
//                                 <button
//                                     onClick={() => toggleDropdown('developers')}
//                                     className="w-full text-left text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium flex items-center justify-between focus:outline-none"
//                                 >
//                                     Developers
//                                     <svg
//                                         className={`ml-1 h-4 w-4 transform ${dropdownOpen.developers ? 'rotate-180' : ''}`}
//                                         fill="none"
//                                         stroke="currentColor"
//                                         viewBox="0 0 24 24"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             strokeWidth="2"
//                                             d="M19 9l-7 7-7-7"
//                                         />
//                                     </svg>
//                                 </button>
//                                 {dropdownOpen.developers && (
//                                     <div className="pl-4 space-y-1">
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                             API Documentation
//                                         </a>
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                             SDKs & Libraries
//                                         </a>
//                                         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                             Webhooks
//                                         </a>
//                                     </div>
//                                 )}
//                             </div> */}
//                             <button
//                                 onClick={scrollToPricing}
//                                 className="w-full text-left text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium focus:outline-none"
//                             >
//                                 Pricing
//                             </button>
//                             <button
//                                 onClick={handleTryForFree}
//                                 className="w-full text-left bg-primary hover:bg-secondary text-primary hover:text-primary border border-secondary px-3 py-2 rounded-sm text-base font-medium"
//                             >
//                                 Try for free
//                             </button>
//                             <a href="https://www.fixlabs.ai/contact" target="_blank" className="block text-gray-500 hover:text-gray-900 px-3 py-2 text-base font-medium">
//                                 Contact
//                             </a>
//                         </div>
//                     </div>
//                 )}
//             </nav>

//             {/* Hero Section */}
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//                 <div className="text-center">
//                     <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
//                         Reach more customers wherever they are, whatever they’re on
//                     </h1>
//                     <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-500 max-w-3xl mx-auto">
//                         Engage them on every channel, in every scenario – from our platform or yours
//                     </p>
//                     <div className="mt-8 flex justify-center space-x-4">
//                         <button
//                             onClick={handleTryForFree}
//                             className="hover:bg-secondary hover:text-primary border border-secondary text-primary px-6 py-3 rounded-sm text-lg font-medium bg-primary"
//                         >
//                             Try for free →
//                         </button>
//                         <Link to="/signup">
//                             <button className="hover:bg-secondary hover:text-primary border border-secondary text-primary px-6 py-3 rounded-sm text-lg font-medium bg-primary">
//                                 Sign up →
//                             </button>
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* Solutions Section */}
//             <div ref={solutionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-secondary">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Solutions</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                         <div className="bg-primary/10 p-8 rounded-xl hover:bg-primary/20 transition-colors duration-300">
//                             <h3 className="text-xl font-semibold text-primary mb-4">Customer Support</h3>
//                             <p className="text-primary/80">Automate support with intelligent chatbots and multi-channel integration.</p>
//                         </div>
//                         <div className="bg-primary/10 p-8 rounded-xl hover:bg-primary/20 transition-colors duration-300">
//                             <h3 className="text-xl font-semibold text-primary mb-4">E-commerce</h3>
//                             <p className="text-primary/80">Streamline sales with automated flows and personalized messaging.</p>
//                         </div>
//                         <div className="bg-primary/10 p-8 rounded-xl hover:bg-primary/20 transition-colors duration-300">
//                             <h3 className="text-xl font-semibold text-primary mb-4">Lead Generation</h3>
//                             <p className="text-primary/80">Capture and nurture leads with smart automation tools.</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Features Section */}
//             <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-gray-100">
//                 <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Powerful Features</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                         <div className="text-primary mb-4 text-4xl flex justify-center">
//                             <GrIntegration />
//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">Seamless Integration</h3>
//                         <p className="text-gray-600">Easily connect with your existing tools and platforms with our robust API and pre-built integrations, streamlining your workflow effortlessly.</p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                         <div className="text-primary mb-4 text-4xl flex justify-center">
//                             <TbSettingsAutomation />

//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Automation</h3>
//                         <p className="text-gray-600">Leverage AI-driven automation to handle routine tasks, allowing your team to focus on what matters most—building customer relationships.</p>
//                     </div>
//                     <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//                         <div className="text-primary mb-4 text-4xl flex justify-center">
//                             <MdOutlineAnalytics />

//                         </div>
//                         <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Analytics</h3>
//                         <p className="text-gray-600">Gain deep insights with real-time analytics dashboards, helping you optimize campaigns and improve customer engagement on the fly.</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Pricing Section */}
//             <div ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
//                 <h2 className="text-3xl font-bold text-primary mb-8 text-center">Credit-Based Pricing Model</h2>
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
//                         <thead>
//                             <tr className="bg-gray-100">
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Plan</th>
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Credits Included</th>
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Text Message Cost</th>
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Image Message Cost</th>
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Chat Flow Execution Cost</th>
//                                 <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 border-b">Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">Basic</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">1,000 Credits</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">1 Credit/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">2 Credits/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">3 Credits/flow execution</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">$10</td>
//                             </tr>
//                             <tr>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">Standard</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">5,000 Credits</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">1 Credit/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">2 Credits/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">3 Credits/flow execution</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">$45</td>
//                             </tr>
//                             <tr>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">Premium</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">15,000 Credits</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">1 Credit/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">2 Credits/msg</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">3 Credits/flow execution</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700 border-b">$120</td>
//                             </tr>
//                             <tr>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Enterprise</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Custom</td>
//                                 <td className="px-6 py-4 text-sm text-gray-700">Custom Pricing</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Home







































import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { GrIntegration } from "react-icons/gr";
import { TbSettingsAutomation } from "react-icons/tb";
import { MdOutlineAnalytics } from "react-icons/md";
import { PiFlowArrow } from "react-icons/pi";
import { TbApiApp } from "react-icons/tb";

function Home() {
    const navigate = useNavigate();
    const pricingRef = useRef(null);
    const featuresRef = useRef(null);
    const solutionsRef = useRef(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        products: false,
        features: false,
        developers: false,
    });

    const handleTryForFree = () => {
        navigate("/trial");
    };

    const handleContactExpert = () => {
        alert('Opening contact form to reach an expert!');
    };

    const toggleDropdown = (menu) => {
        setDropdownOpen((prev) => {
            const newState = {
                products: false,
                features: false,
                developers: false,
            };
            newState[menu] = !prev[menu];
            return newState;
        });
    };

    const scrollToPricing = () => {
        pricingRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToFeatures = () => {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSolutions = () => solutionsRef.current.scrollIntoView({ behavior: 'smooth' });

    return (
        <div className="min-h-screen bg-light-secondary font-sans">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center justify-between w-full">
                            <Link to="/">
                                <div className="flex-shrink-0">
                                    <img
                                     className="h-12 w-auto"
                                        src='/logo.png' alt="Logo"
                                    />
                                </div>
                            </Link>
                            <div className="hidden md:ml-6 md:flex md:space-x-1 lg:space-x-8">
                                <div className={`${dropdownOpen.products ? 'bg-secondary' : ''} relative`}>
                                    <button
                                        onClick={() => toggleDropdown('products')}
                                        className="text-primary hover:text-primary px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
                                    >
                                        Products
                                        <svg
                                            className={`ml-1 h-4 w-4 transform ${dropdownOpen.products ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {dropdownOpen.products && (
                                        <div className="absolute z-10 mt-2 w-56 rounded-sm shadow-lg bg-white ring-1 ring-primary ring-opacity-5">
                                            <div className="py-1">
                                                <Link to="/whatsapp-api">
                                                    <div className="block px-4 flex gap-5 items-center text-left py-2 text-sm text-primary hover:bg-secondary">
                                                        WhatsApp API
                                                        <TbApiApp className="text-light-primary" />
                                                    </div>
                                                </Link>
                                                <Link to="/bot-flow">
                                                    <div className="block px-4 flex gap-5 items-center text-left py-2 text-sm text-primary hover:bg-secondary">
                                                        WhatsApp Bot Flow
                                                        <PiFlowArrow className="text-light-primary" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <button onClick={scrollToSolutions} className="text-primary hover:text-primary px-3 py-2 text-sm font-medium flex items-center focus:outline-none">
                                        Solutions
                                    </button>
                                </div>
                                <div>
                                    <button
                                        onClick={scrollToFeatures}
                                        className="text-primary hover:text-primary px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
                                    >
                                        Features
                                    </button>
                                </div>
                                {/* <div>
                                    <button
                                        onClick={scrollToPricing}
                                        className="text-primary hover:text-primary px-3 py-2 text-sm font-medium flex items-center focus:outline-none"
                                    >
                                        Pricing
                                    </button>
                                </div> */}
                            </div>
                            <div className="hidden md:flex items-center space-x-4">
                                <Link to="/dashboard">
                                    <button
                                        className="bg-primary hover:bg-light-primary text-white px-4 py-2 rounded-sm text-sm font-medium"
                                    >
                                        Dashboard
                                    </button>
                                </Link>
                                <a href="https://www.fixlabs.ai/contact" target="_blank" className="text-primary hover:text-primary text-sm font-medium">
                                    Contact
                                </a>
                            </div>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-primary hover:text-primary focus:outline-none"
                            >
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
                                        d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <div>
                                <button
                                    onClick={() => toggleDropdown('products')}
                                    className="w-full text-left text-primary hover:text-primary px-3 py-2 text-base font-medium flex items-center justify-between focus:outline-none"
                                >
                                    Products
                                    <svg
                                        className={`ml-1 h-4 w-4 transform ${dropdownOpen.products ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                {dropdownOpen.products && (
                                    <div className="pl-4 space-y-1">
                                        <Link to="/whatsapp-api">
                                            <div className="block px-3 py-2 flex gap-5 items-center text-sm text-primary hover:bg-accent">
                                                WhatsApp API
                                                <TbApiApp className="text-light-primary" />
                                            </div>
                                        </Link>
                                        <Link to="/bot-flow">
                                            <div className="block px-3 py-2 flex gap-5 items-center text-sm text-primary hover:bg-accent">
                                                WhatsApp Bot Flow
                                                <PiFlowArrow className="text-light-primary" />
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={scrollToSolutions}
                                className="w-full text-left text-primary hover:text-primary px-3 py-2 text-base font-medium focus:outline-none"
                            >
                                Solutions
                            </button>
                            <button
                                onClick={scrollToFeatures}
                                className="w-full text-left text-primary hover:text-primary px-3 py-2 text-base font-medium focus:outline-none"
                            >
                                Features
                            </button>
                            <button
                                onClick={scrollToPricing}
                                className="w-full text-left text-primary hover:text-primary px-3 py-2 text-base font-medium focus:outline-none"
                            >
                                Pricing
                            </button>
                            <div className='flex w-full gap-2'>
                                <div className='flex-1'>
                                    <button
                                        onClick={handleTryForFree}
                                        className="w-full text-left bg-primary hover:bg-light-primary text-white px-3 py-2 rounded-sm text-base font-medium "
                                    >
                                        Try for free
                                    </button>
                                </div>
                                <div className='flex-1'>
                                    <Link to="/dashboard">
                                        <button
                                            className="w-full text-left bg-primary hover:bg-light-primary text-white px-3 py-2 rounded-sm text-base font-medium"
                                        >
                                            Dashboard
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <a href="https://www.fixlabs.ai/contact" target="_blank" className="block border border-primary text-primary hover:text-primary px-3 py-2 text-base font-medium">
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                        Reach more customers wherever they are, whatever they’re on
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-primary max-w-3xl mx-auto">
                        Engage them on every channel, in every scenario – from our platform or yours
                    </p>
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={handleTryForFree}
                            className="bg-primary hover:bg-light-primary text-white px-6 py-3 rounded-sm text-lg font-medium"
                        >
                            Try for free →
                        </button>
                        <Link to="/signup">
                            <button className="bg-primary hover:bg-light-primary text-white px-6 py-3 rounded-sm text-lg font-medium">
                                Sign up →
                            </button>
                        </Link>
                        <Link to="/login">
                            <button className="bg-primary hover:bg-light-primary text-white px-6 py-3 rounded-sm text-lg font-medium">
                                Log in →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Solutions Section */}
            <div ref={solutionsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-secondary">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Solutions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl hover:bg-light-secondary transition-colors duration-300">
                            <h3 className="text-xl font-semibold text-primary mb-4">Customer Support</h3>
                            <p className="text-primary">Automate support with intelligent chatbots and multi-channel integration.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl hover:bg-light-secondary transition-colors duration-300">
                            <h3 className="text-xl font-semibold text-primary mb-4">E-commerce</h3>
                            <p className="text-primary">Streamline sales with automated flows and personalized messaging.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl hover:bg-light-secondary transition-colors duration-300">
                            <h3 className="text-xl font-semibold text-primary mb-4">Lead Generation</h3>
                            <p className="text-primary">Capture and nurture leads with smart automation tools.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div ref={featuresRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 bg-secondary">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Powerful Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-light-primary mb-4 text-4xl flex justify-center">
                            <GrIntegration />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Seamless Integration</h3>
                        <p className="text-primary">Easily connect with your existing tools and platforms with our robust API and pre-built integrations, streamlining your workflow effortlessly.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-light-primary mb-4 text-4xl flex justify-center">
                            <TbSettingsAutomation />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Smart Automation</h3>
                        <p className="text-primary">Leverage AI-driven automation to handle routine tasks, allowing your team to focus on what matters most—building customer relationships.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="text-light-primary mb-4 text-4xl flex justify-center">
                            <MdOutlineAnalytics />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2">Real-Time Analytics</h3>
                        <p className="text-primary">Gain deep insights with real-time analytics dashboards, helping you optimize campaigns and improve customer engagement on the fly.</p>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            {/* <div ref={pricingRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <h2 className="text-3xl font-bold text-primary mb-8 text-center">Credit-Based Pricing Model</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-light-secondary rounded-lg shadow-sm">
                        <thead>
                            <tr className="bg-secondary">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Plan</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Credits Included</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Text Message Cost</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Image Message Cost</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Chat Flow Execution Cost</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-primary border-b border-light-secondary">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">Basic</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">1,000 Credits</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">1 Credit/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">2 Credits/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">3 Credits/flow execution</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">$10</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">Standard</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">5,000 Credits</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">1 Credit/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">2 Credits/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">3 Credits/flow execution</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">$45</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">Premium</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">15,000 Credits</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">1 Credit/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">2 Credits/msg</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">3 Credits/flow execution</td>
                                <td className="px-6 py-4 text-sm text-primary border-b border-light-secondary">$120</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-sm text-primary">Enterprise</td>
                                <td className="px-6 py-4 text-sm text-primary">Custom</td>
                                <td className="px-6 py-4 text-sm text-primary">Custom</td>
                                <td className="px-6 py-4 text-sm text-primary">Custom</td>
                                <td className="px-6 py-4 text-sm text-primary">Custom</td>
                                <td className="px-6 py-4 text-sm text-primary">Custom Pricing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div> */}
        </div>
    )
}

export default Home