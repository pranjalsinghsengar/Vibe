// import React, { useState } from 'react';
// import Layout from '../components/layout';
// import axios from 'axios';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function NewClient() {
//         const token = getCookie("sctoken");

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         tenantname: '',
//         phone: '',
//         password: '',
//         address: {
//             name: '',
//             line1: '',
//             line2: '',
//             city: '',
//             province: '',
//             zip: '',
//             country: '',
//             province_code: '',
//             country_code: ''
//         },
//         server_domain: 'https://api-xpresschat.fixall.ai',
//         status: 'active'
//     });
//     const [message, setMessage] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             address: {
//                 ...prev.address,
//                 [name]: value
//             }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setMessage('');

//         try {
//             const response = await axios.post(
//                 `${apiurl}/api/whatsapp/configuration/create`,
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 setMessage('Client configuration created successfully!');
//                 // Reset form
//                 setFormData({
//                     username: '',
//                     email: '',
//                     tenantname: '',
//                     phone: '',
//                     password: '',
//                     address: {
//                         name: '',
//                         line1: '',
//                         line2: '',
//                         city: '',
//                         province: '',
//                         zip: '',
//                         country: '',
//                         province_code: '',
//                         country_code: ''
//                     },
//                     server_domain: 'https://api-xpresschat.fixall.ai',
//                     status: 'active'
//                 });
//             }
//         } catch (error) {
//             setMessage('Error creating client configuration');
//             console.error('API error:', error);
//         } finally {
//             setIsLoading(false);
//             setTimeout(() => setMessage(''), 3000);
//         }
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-gray-100 py-8 px-4">
//                 <div className="max-w-4xl mx-auto">
//                     <div className="bg-white rounded-lg shadow-lg p-6">
//                         <h1 className="text-2xl font-semibold text-gray-800 mb-6">
//                             Create New Client
//                         </h1>

//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {/* Basic Information */}
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Username
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="username"
//                                         value={formData.username}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Email
//                                     </label>
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Tenant Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="tenantname"
//                                         value={formData.tenantname}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Phone
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="phone"
//                                         value={formData.phone}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Password
//                                     </label>
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                     />
//                                 </div>
//                             </div>

//                             {/* Address Information */}
//                             <div className="border-t pt-6">
//                                 <h2 className="text-lg font-medium text-gray-800 mb-4">
//                                     Address Details
//                                 </h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Contact Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={formData.address.name}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Address Line 1
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="line1"
//                                             value={formData.address.line1}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Address Line 2
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="line2"
//                                             value={formData.address.line2}
//                                             onChange={handleAddressChange}
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             City
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             value={formData.address.city}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Province
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="province"
//                                             value={formData.address.province}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Zip Code
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="zip"
//                                             value={formData.address.zip}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Country
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="country"
//                                             value={formData.address.country}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Province Code
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="province_code"
//                                             value={formData.address.province_code}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">
//                                             Country Code
//                                         </label>
//                                         <input
//                                             type="text"
//                                             name="country_code"
//                                             value={formData.address.country_code}
//                                             onChange={handleAddressChange}
//                                             required
//                                             className="w-full p-2 rounded border border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Submit Button */}
//                             <div className="flex justify-end">
//                                 <button
//                                     type="submit"
//                                     disabled={isLoading}
//                                     className={`px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all duration-200 ${
//                                         isLoading ? 'opacity-50 cursor-not-allowed' : ''
//                                     }`}
//                                 >
//                                     {isLoading ? 'Creating...' : 'Create Client'}
//                                 </button>
//                             </div>
//                         </form>

//                         {/* Message */}
//                         {message && (
//                             <p className={`mt-4 text-sm font-medium ${
//                                 message.includes('Error') ? 'text-red-600' : 'text-green-600'
//                             }`}>
//                                 {message}
//                             </p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default NewClient;








import React, { useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { apiurl } from '../config/config';
import { getCookie } from '../config/webStorage';

function NewClient() {
    const token = getCookie("sctoken");

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        tenantname: '',
        phone: '',
        password: '',
        frontend_domain: '',
        address: {
            name: '',
            line1: '',
            line2: '',
            city: '',
            province: '',
            zip: '',
            country: '',
            province_code: '',
            country_code: ''
        },
        server_domain: apiurl,
        status: 'active'
    });

    console.log("formData", formData)
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            address: {
                ...prev.address,
                [name]: value
            }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post(
                `${apiurl}/api/whatsapp/configuration/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token} `
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                setMessage('Client configuration created successfully!');
                setFormData({
                    username: '',
                    email: '',
                    tenantname: '',
                    phone: '',
                    password: '',
                    frontend_domain: '',
                    address: {
                        name: '',
                        line1: '',
                        line2: '',
                        city: '',
                        province: '',
                        zip: '',
                        country: '',
                        province_code: '',
                        country_code: ''
                    },
                    server_domain: apiurl,
                    status: 'active'
                });
            } else {
                setMessage( response?.data?.message || 'Error creating client configuration');
            }
        } catch (error) {
            setMessage('Error creating client configurationc');
            console.error('API error:', error);
        } finally {
            setIsLoading(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    {/* <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                        <h1 className="text-3xl font-bold text-text-primary">
                            Create New Client
                        </h1>
                        <p className="mt-2 text-text-secondary">
                            Set up a new client for WhatsApp integration with their details
                        </p>
                    </div> */}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg  p-8 text-left">
                        {/* Basic Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-text-primary mb-6">
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-text-primary mb-2">
                                        Username *
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter username"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                                        Email *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter email"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="tenantname" className="block text-sm font-medium text-text-primary mb-2">
                                        Tenant Name *
                                    </label>
                                    <input
                                        id="tenantname"
                                        type="text"
                                        name="tenantname"
                                        value={formData.tenantname}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter tenant name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-2">
                                        Phone *
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                                        Password *
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter password"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
                                        Frontend Domain *
                                    </label>
                                    <input
                                        id="frontend_domain"
                                        type="frontend_domain"
                                        name="frontend_domain"
                                        value={formData.frontend_domain}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter frontend domain"
                                    />
                                </div>
                                {/* <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-text-primary mb-2">
                                        Status *
                                    </label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full p-3 rounded-md border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                    >
                                        <option value="active">Active</option>
                                        <option value="suspended">Suspended</option>
                                        <option value="deleted">Deleted</option>
                                    </select>
                                </div> */}
                            </div>
                        </div>

                        {/* Address Information */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-text-primary mb-6">
                                Address Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="address-name" className="block text-sm font-medium text-text-primary mb-2">
                                        Contact Name *
                                    </label>
                                    <input
                                        id="address-name"
                                        type="text"
                                        name="name"
                                        value={formData.address.name}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter contact name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="line1" className="block text-sm font-medium text-text-primary mb-2">
                                        Address Line 1 *
                                    </label>
                                    <input
                                        id="line1"
                                        type="text"
                                        name="line1"
                                        value={formData.address.line1}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter address line 1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="line2" className="block text-sm font-medium text-text-primary mb-2">
                                        Address Line 2
                                    </label>
                                    <input
                                        id="line2"
                                        type="text"
                                        name="line2"
                                        value={formData.address.line2}
                                        onChange={handleAddressChange}
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter address line 2 (optional)"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-2">
                                        City *
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={formData.address.city}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter city"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="province" className="block text-sm font-medium text-text-primary mb-2">
                                        Province *
                                    </label>
                                    <input
                                        id="province"
                                        type="text"
                                        name="province"
                                        value={formData.address.province}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter province"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-sm font-medium text-text-primary mb-2">
                                        Zip Code *
                                    </label>
                                    <input
                                        id="zip"
                                        type="text"
                                        name="zip"
                                        value={formData.address.zip}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter zip code"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-text-primary mb-2">
                                        Country *
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="country"
                                        value={formData.address.country}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter country"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="province_code" className="block text-sm font-medium text-text-primary mb-2">
                                        Province Code *
                                    </label>
                                    <input
                                        id="province_code"
                                        type="text"
                                        name="province_code"
                                        value={formData.address.province_code}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter province code"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country_code" className="block text-sm font-medium text-text-primary mb-2">
                                        Country Code *
                                    </label>
                                    <input
                                        id="country_code"
                                        type="text"
                                        name="country_code"
                                        value={formData.address.country_code}
                                        onChange={handleAddressChange}
                                        required
                                        className="w-full p-3 rounded-sm border border-light-secondary bg-white text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                        placeholder="Enter country code"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-light-secondary pt-6">
                            <div>
                                {message && (
                                    <p className={`text-sm font-medium ${message.includes('Error') ? 'text-error' : 'text-success'
                                        }`}>
                                        {message}
                                    </p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`px-8 py-3 hover:bg-light-primary text-white rounded-sm bg-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isLoading ? 'Creating...' : 'Create Client'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default NewClient;