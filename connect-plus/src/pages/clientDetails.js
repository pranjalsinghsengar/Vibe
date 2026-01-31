// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../components/layout';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function ClientDetails() {
//     const { clientId } = useParams();
//     const token = getCookie("sctoken");
//     const [superadminInfo, setSuperadminInfo] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchAdminInfo = async () => {
//             try {
//                 const response = await axios.get(
//                     `${apiurl}/api/whatsapp/user/getadminInfo?id=${clientId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 setSuperadminInfo(response.data.Super_admin);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch admin info');
//                 setLoading(false);
//             }
//         };

//         fetchAdminInfo();
//     }, [clientId]);

//     if (loading) return <Layout><div>Loading...</div></Layout>;
//     if (error) return <Layout><div>{error}</div></Layout>;

//     return (
//         <Layout>
//             <div>
//                 <h2>Client Details</h2>
//                 {superadminInfo && (
//                     <div>
//                         <p><strong>Name:</strong> {superadminInfo.name}</p>
//                         <p><strong>Email:</strong> {superadminInfo.email}</p>
//                         <p><strong>Phone:</strong> {superadminInfo.phone}</p>
//                         <p><strong>Tenant:</strong> {superadminInfo.tenant.tenantName}</p>
//                         <p><strong>User Type:</strong> {superadminInfo.userType}</p>
//                         <p><strong>Status:</strong> {superadminInfo.status}</p>
//                         <p><strong>Wallet:</strong> {superadminInfo.wallet}</p>
//                         <h3>Address</h3>
//                         <p>{superadminInfo.address.name}</p>
//                         <p>{superadminInfo.address.line1}</p>
//                         {superadminInfo.address.line2 && <p>{superadminInfo.address.line2}</p>}
//                         <p>
//                             {superadminInfo.address.city}, {superadminInfo.address.province}{' '}
//                             {superadminInfo.address.zip}, {superadminInfo.address.country}
//                         </p>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// }

// export default ClientDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../components/layout';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function ClientDetails() {
//     const { clientId } = useParams();
//     const token = getCookie("sctoken");
//     const [superadminInfo, setSuperadminInfo] = useState(null);
//     const [adminList, setAdminList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [listLoading, setListLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [listError, setListError] = useState(null);

//     // Fetch superadmin details
//     useEffect(() => {
//         const fetchAdminInfo = async () => {
//             try {
//                 const response = await axios.get(
//                     `${apiurl}/api/whatsapp/user/getadminInfo?id=${clientId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 setSuperadminInfo(response.data.Super_admin);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch admin info');
//                 setLoading(false);
//             }
//         };

//         fetchAdminInfo();
//     }, [clientId]);

//     // Fetch admin list on button click
//     const fetchAdminList = async () => {
//         setListLoading(true);
//         setListError(null);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getadminlistofsuperadmin?id=${clientId}`,
//                 {
//                     headers: {
//                         Authorization:  `Bearer ${token}`,
//                     },
//                 }
//             );
//             setAdminList(response.data.admin);
//             setListLoading(false);
//         } catch (err) {
//             setListError('Failed to fetch admin list');
//             setListLoading(false);
//         }
//     };

//     if (loading) return <Layout><div>Loading...</div></Layout>;
//     if (error) return <Layout><div>{error}</div></Layout>;

//     return (
//         <Layout>
//             <div style={{ padding: '20px' }}>
//                 <h2>Client Details</h2>
//                 {superadminInfo && (
//                     <div>
//                         <p><strong>Name:</strong> {superadminInfo.name}</p>
//                         <p><strong>Email:</strong> {superadminInfo.email}</p>
//                         <p><strong>Phone:</strong> {superadminInfo.phone}</p>
//                         <p><strong>Tenant:</strong> {superadminInfo.tenant.tenantName}</p>
//                         <p><strong>User Type:</strong> {superadminInfo.userType}</p>
//                         <p><strong>Status:</strong> {superadminInfo.status}</p>
//                         <p><strong>Wallet:</strong> {superadminInfo.wallet}</p>
//                         <h3>Address</h3>
//                         <p>{superadminInfo.address.name}</p>
//                         <p>{superadminInfo.address.line1}</p>
//                         {superadminInfo.address.line2 && <p>{superadminInfo.address.line2}</p>}
//                         <p>
//                             {superadminInfo.address.city}, {superadminInfo.address.province}{' '}
//                             {superadminInfo.address.zip}, {superadminInfo.address.country}
//                         </p>
//                     </div>
//                 )}

//                 <button
//                     onClick={fetchAdminList}
//                     disabled={listLoading}
//                     style={{
//                         marginTop: '20px',
//                         padding: '10px 20px',
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: listLoading ? 'not-allowed' : 'pointer',
//                     }}
//                 >
//                     {listLoading ? 'Loading...' : 'Show Admin List'}
//                 </button>

//                 {listError && <p style={{ color: 'red', marginTop: '10px' }}>{listError}</p>}

//                 {adminList.length > 0 && (
//                     <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
//                         <h3>Admin List</h3>
//                         <table
//                             style={{
//                                 width: '100%',
//                                 borderCollapse: 'collapse',
//                                 backgroundColor: '#fff',
//                             }}
//                         >
//                             <thead>
//                                 <tr style={{ backgroundColor: '#f2f2f2' }}>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tenant</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {adminList.map((admin) => (
//                                     <tr key={admin.id}>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.name}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.email}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.phone || 'N/A'}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.tenant.tenantName}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.status}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// }

// export default ClientDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../components/layout';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function ClientDetails() {
//     const { clientId } = useParams();
//     const token = getCookie('sctoken');
//     const [superadminInfo, setSuperadminInfo] = useState(null);
//     const [adminList, setAdminList] = useState([]);
//     const [selectedAdmin, setSelectedAdmin] = useState(null);
//     const [userList, setUserList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [listLoading, setListLoading] = useState(false);
//     const [adminLoading, setAdminLoading] = useState(false);
//     const [userListLoading, setUserListLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [listError, setListError] = useState(null);
//     const [adminError, setAdminError] = useState(null);
//     const [userListError, setUserListError] = useState(null);

//     //     // Fetch superadmin details
//     useEffect(() => {
//         const fetchAdminInfo = async () => {
//             try {
//                 const response = await axios.get(
//                     `${apiurl}/api/whatsapp/user/getadminInfo?id=${clientId}`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 setSuperadminInfo(response.data.Super_admin);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch admin info');
//                 setLoading(false);
//             }
//         };

//         fetchAdminInfo();
//     }, [clientId]);

//     // Fetch admin list on button click
//     const fetchAdminList = async () => {
//         setListLoading(true);
//         setListError(null);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getadminlistofsuperadmin?id=${clientId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setAdminList(response.data.admin);
//             setListLoading(false);
//         } catch (err) {
//             setListError('Failed to fetch admin list');
//             setListLoading(false);
//         }
//     };

//     // Fetch selected admin details
//     const fetchAdminDetails = async (adminId) => {
//         setAdminLoading(true);
//         setAdminError(null);
//         setSelectedAdmin(null);
//         setUserList([]); // Reset user list when viewing a new admin
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getadminInfo?id=${adminId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setSelectedAdmin(response.data.Super_admin);
//             setAdminLoading(false);
//         } catch (err) {
//             setAdminError('Failed to fetch admin details');
//             setAdminLoading(false);
//         }
//     };

//     // Fetch user list for selected admin (placeholder API)
//     const fetchUserList = async (adminId) => {
//         setUserListLoading(true);
//         setUserListError(null);
//         try {
//             // Placeholder API - replace with actual user list API when provided
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getuserlistofadmin?id=${adminId}`,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             // Assuming response.data.users is the array of users
//             setUserList(response.data.users || []);
//             setUserListLoading(false);
//         } catch (err) {
//             setUserListError('Failed to fetch user list');
//             setUserListLoading(false);
//         }
//     };

//     if (loading) return <Layout><div>Loading...</div></Layout>;
//     if (error) return <Layout><div>{error}</div></Layout>;

//     return (
//         <Layout>
//             <div style={{ padding: '20px' }}>
//                 <h2>Client Details</h2>
//                 {superadminInfo && (
//                     <div>
//                         <p><strong>Name:</strong> {superadminInfo.name}</p>
//                         <p><strong>Email:</strong> {superadminInfo.email}</p>
//                         <p><strong>Phone:</strong> {superadminInfo.phone}</p>
//                         <p><strong>Tenant:</strong> {superadminInfo.tenant.tenantName}</p>
//                         <p><strong>User Type:</strong> {superadminInfo.userType}</p>
//                         <p><strong>Status:</strong> {superadminInfo.status}</p>
//                         <p><strong>Wallet:</strong> {superadminInfo.wallet}</p>
//                         <h3>Address</h3>
//                         <p>{superadminInfo.address.name}</p>
//                         <p>{superadminInfo.address.line1}</p>
//                         {superadminInfo.address.line2 && <p>{superadminInfo.address.line2}</p>}
//                         <p>
//                             {superadminInfo.address.city}, {superadminInfo.address.province}{' '}
//                             {superadminInfo.address.zip}, {superadminInfo.address.country}
//                         </p>
//                     </div>
//                 )}

//                 <button
//                     onClick={fetchAdminList}
//                     disabled={listLoading}
//                     style={{
//                         marginTop: '20px',
//                         padding: '10px 20px',
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         borderRadius: '5px',
//                         cursor: listLoading ? 'not-allowed' : 'pointer',
//                     }}
//                 >
//                     {listLoading ? 'Loading...' : 'Show Admin List'}
//                 </button>

//                 {listError && <p style={{ color: 'red', marginTop: '10px' }}>{listError}</p>}

//                 {adminList.length > 0 && (
//                     <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
//                         <h3>Admin List</h3>
//                         <table
//                             style={{
//                                 width: '100%',
//                                 borderCollapse: 'collapse',
//                                 backgroundColor: '#fff',
//                             }}
//                         >
//                             <thead>
//                                 <tr style={{ backgroundColor: '#f2f2f2' }}>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tenant</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
//                                     <th style={{ border: '1px solid #ddd', padding: '8px' }}>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {adminList.map((admin) => (
//                                     <tr key={admin.id}>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.name}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.email}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.phone || 'N/A'}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.tenant.tenantName}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             {admin.status}
//                                         </td>
//                                         <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                             <button
//                                                 onClick={() => fetchAdminDetails(admin.id)}
//                                                 style={{
//                                                     padding: '5px 10px',
//                                                     backgroundColor: '#28a745',
//                                                     color: 'white',
//                                                     border: 'none',
//                                                     borderRadius: '3px',
//                                                     cursor: 'pointer',
//                                                 }}
//                                             >
//                                                 View
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {adminLoading && <p>Loading admin details...</p>}
//                 {adminError && <p style={{ color: 'red', marginTop: '10px' }}>{adminError}</p>}

//                 {selectedAdmin && (
//                     <div style={{ marginTop: '20px' }}>
//                         <h3>Admin Details</h3>
//                         <div>
//                             <p><strong>Name:</strong> {selectedAdmin.name}</p>
//                             <p><strong>Email:</strong> {selectedAdmin.email}</p>
//                             <p><strong>Phone:</strong> {selectedAdmin.phone || 'N/A'}</p>
//                             <p><strong>Tenant:</strong> {selectedAdmin.tenant.tenantName}</p>
//                             <p><strong>User Type:</strong> {selectedAdmin.userType}</p>
//                             <p><strong>Status:</strong> {selectedAdmin.status}</p>
//                             <p><strong>Wallet:</strong> {selectedAdmin.wallet}</p>
//                             <h4>Address</h4>
//                             <p>{selectedAdmin.address.name}</p>
//                             <p>{selectedAdmin.address.line1}</p>
//                             {selectedAdmin.address.line2 && <p>{selectedAdmin.address.line2}</p>}
//                             <p>
//                                 {selectedAdmin.address.city}, {selectedAdmin.address.province}{' '}
//                                 {selectedAdmin.address.zip}, {selectedAdmin.address.country}
//                             </p>
//                         </div>

//                         <button
//                             onClick={() => fetchUserList(selectedAdmin.id)}
//                             disabled={userListLoading}
//                             style={{
//                                 marginTop: '20px',
//                                 padding: '10px 20px',
//                                 backgroundColor: '#007bff',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '5px',
//                                 cursor: userListLoading ? 'not-allowed' : 'pointer',
//                             }}
//                         >
//                             {userListLoading ? 'Loading...' : 'Show User List'}
//                         </button>

//                         {userListError && (
//                             <p style={{ color: 'red', marginTop: '10px' }}>{userListError}</p>
//                         )}

//                         {userList.length > 0 && (
//                             <div style={{ marginTop: '20px', maxHeight: '300px', overflowY: 'auto' }}>
//                                 <h4>User List</h4>
//                                 <table
//                                     style={{
//                                         width: '100%',
//                                         borderCollapse: 'collapse',
//                                         backgroundColor: '#fff',
//                                     }}
//                                 >
//                                     <thead>
//                                         <tr style={{ backgroundColor: '#f2f2f2' }}>
//                                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                 Name
//                                             </th>
//                                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                 Email
//                                             </th>
//                                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                 Phone
//                                             </th>
//                                             <th style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                 Status
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {userList.map((user) => (
//                                             <tr key={user.id}>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                     {user.name}
//                                                 </td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                     {user.email}
//                                                 </td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                     {user.phone || 'N/A'}
//                                                 </td>
//                                                 <td style={{ border: '1px solid #ddd', padding: '8px' }}>
//                                                     {user.status}
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// }

// export default ClientDetails;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from '../components/layout';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function ClientDetails() {
//     const { clientId } = useParams();
//     const token = getCookie('sctoken');
//     const [superadminInfo, setSuperadminInfo] = useState(null);
//     const [adminList, setAdminList] = useState([]);
//     const [selectedAdmin, setSelectedAdmin] = useState(null);
//     const [userList, setUserList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [listLoading, setListLoading] = useState(false);
//     const [adminLoading, setAdminLoading] = useState(false);
//     const [userListLoading, setUserListLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [listError, setListError] = useState(null);
//     const [adminError, setAdminError] = useState(null);
//     const [userListError, setUserListError] = useState(null);

//     // Fetch superadmin details
//     useEffect(() => {
//         const fetchSuperadminInfo = async () => {
//             try {
//                 const response = await axios.get(
//                     `${apiurl}/api/whatsapp/user/getadminInfo?id=${clientId}`,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );
//                 setSuperadminInfo(response.data.Super_admin);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to fetch admin info');
//                 setLoading(false);
//             }
//         };
//         fetchSuperadminInfo();
//     }, [clientId, token]);

//     // Fetch admin list
//     const fetchAdminList = async () => {
//         setListLoading(true);
//         setListError(null);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getadminlistofsuperadmin?id=${clientId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setAdminList(response.data.admin);
//             setListLoading(false);
//         } catch (err) {
//             setListError('Failed to fetch admin list');
//             setListLoading(false);
//         }
//     };

//     // Fetch selected admin details
//     const fetchAdminDetails = async (adminId) => {
//         setAdminLoading(true);
//         setAdminError(null);
//         setSelectedAdmin(null);
//         setUserList([]);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getadminInfo?id=${adminId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setSelectedAdmin(response.data.Super_admin);
//             setAdminLoading(false);
//         } catch (err) {
//             setAdminError('Failed to fetch admin details');
//             setAdminLoading(false);
//         }
//     };

//     // Fetch user list
//     const fetchUserList = async (adminId) => {
//         setUserListLoading(true);
//         setUserListError(null);
//         try {
//             const response = await axios.get(
//                 `${apiurl}/api/whatsapp/user/getuserlistofadmin?id=${adminId}`,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );
//             setUserList(response.data.users || []);
//             setUserListLoading(false);
//         } catch (err) {
//             setUserListError('Failed to fetch user list');
//             setUserListLoading(false);
//         }
//     };

//     if (loading) return <Layout><div className="text-center text-text-primary">Loading...</div></Layout>;
//     if (error) return <Layout><div className="text-center text-error">{error}</div></Layout>;

//     return (
//         <Layout>
//             <div className="max-w-7xl mx-auto p-6 bg-secondary min-h-screen">
//                 <h2 className="text-2xl font-bold text-primary mb-6">Client Details</h2>

//                 {superadminInfo && (
//                     <div className="bg-white shadow rounded-sm p-6 mb-6">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-text-primary"><strong>Name:</strong> {superadminInfo.name}</p>
//                                 <p className="text-text-primary"><strong>Email:</strong> {superadminInfo.email}</p>
//                                 <p className="text-text-primary"><strong>Phone:</strong> {superadminInfo.phone}</p>
//                                 <p className="text-text-primary"><strong>Tenant:</strong> {superadminInfo.tenant.tenantName}</p>
//                             </div>
//                             <div>
//                                 <p className="text-text-primary"><strong>User Type:</strong> {superadminInfo.userType}</p>
//                                 <p className="text-text-primary"><strong>Status:</strong> {superadminInfo.status}</p>
//                                 <p className="text-text-primary"><strong>Wallet:</strong> {superadminInfo.wallet}</p>
//                                 <div className="mt-2">
//                                     <p className="text-text-primary font-semibold">Address:</p>
//                                     <p className="text-text-secondary">{superadminInfo.address.name}</p>
//                                     <p className="text-text-secondary">{superadminInfo.address.line1}</p>
//                                     {superadminInfo.address.line2 && <p className="text-text-secondary">{superadminInfo.address.line2}</p>}
//                                     <p className="text-text-secondary">
//                                         {superadminInfo.address.city}, {superadminInfo.address.province} {superadminInfo.address.zip}, {superadminInfo.address.country}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <button
//                     onClick={fetchAdminList}
//                     disabled={listLoading}
//                     className={`w-full md:w-auto px-4 py-2 rounded-sm text-white font-medium transition-colors
//                         ${listLoading ? 'bg-primary cursor-not-allowed opacity-70' : 'bg-primary hover:bg-light-primary'}`}
//                 >
//                     {listLoading ? 'Loading...' : 'Show Admin List'}
//                 </button>

//                 {listError && <p className="text-error mt-4">{listError}</p>}

//                 {adminList.length > 0 && (
//                     <div className="mt-6 bg-white shadow rounded-sm overflow-hidden">
//                         <h3 className="text-lg font-semibold text-primary p-4">Admin List</h3>
//                         <div className="max-h-80 overflow-y-auto">
//                             <table className="w-full">
//                                 <thead className="bg-accent sticky top-0">
//                                     <tr>
//                                         {['Name', 'Email', 'Phone', 'Tenant', 'Status', 'Action'].map((header) => (
//                                             <th key={header} className="px-4 py-2 text-left text-text-primary font-medium border-b border-light-secondary">
//                                                 {header}
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {adminList.map((admin) => (
//                                         <tr key={admin.id}>
//                                             <td className="px-4 py-2 border-b border-light-secondary">{admin.name}</td>
//                                             <td className="px-4 py-2 border-b border-light-secondary">{admin.email}</td>
//                                             <td className="px-4 py-2 border-b border-light-secondary">{admin.phone || 'N/A'}</td>
//                                             <td className="px-4 py-2 border-b border-light-secondary">{admin.tenant.tenantName}</td>
//                                             <td className="px-4 py-2 border-b border-light-secondary">{admin.status}</td>
//                                             <td className="px-4 py-2 border-b border-light-secondary">
//                                                 <button
//                                                     onClick={() => fetchAdminDetails(admin.id)}
//                                                     className="px-3 py-1 text-primary hover:underline"
//                                                 >
//                                                     View
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}

//                 {adminLoading && <p className="text-text-primary mt-4">Loading admin details...</p>}
//                 {adminError && <p className="text-error mt-4">{adminError}</p>}

//                 {selectedAdmin && (
//                     <div className="mt-6 bg-white shadow rounded-sm p-6">
//                         <h3 className="text-lg font-semibold text-primary mb-4">Admin Details</h3>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-text-primary"><strong>Name:</strong> {selectedAdmin.name}</p>
//                                 <p className="text-text-primary"><strong>Email:</strong> {selectedAdmin.email}</p>
//                                 <p className="text-text-primary"><strong>Phone:</strong> {selectedAdmin.phone || 'N/A'}</p>
//                                 <p className="text-text-primary"><strong>Tenant:</strong> {selectedAdmin.tenant.tenantName}</p>
//                             </div>
//                             <div>
//                                 <p className="text-text-primary"><strong>User Type:</strong> {selectedAdmin.userType}</p>
//                                 <p className="text-text-primary"><strong>Status:</strong> {selectedAdmin.status}</p>
//                                 <p className="text-text-primary"><strong>Wallet:</strong> {selectedAdmin.wallet}</p>
//                                 <div className="mt-2">
//                                     <p className="text-text-primary font-semibold">Address:</p>
//                                     <p className="text-text-secondary">{selectedAdmin.address.name}</p>
//                                     <p className="text-text-secondary">{selectedAdmin.address.line1}</p>
//                                     {selectedAdmin.address.line2 && <p className="text-text-secondary">{selectedAdmin.address.line2}</p>}
//                                     <p className="text-text-secondary">
//                                         {selectedAdmin.address.city}, {selectedAdmin.address.province} {selectedAdmin.address.zip}, {selectedAdmin.address.country}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>

//                         <button
//                             onClick={() => fetchUserList(selectedAdmin.id)}
//                             disabled={userListLoading}
//                             className={`w-full md:w-auto px-4 py-2 mt-4 rounded-sm text-white font-medium transition-colors
//                                 ${userListLoading ? 'bg-primary cursor-not-allowed opacity-70' : 'bg-primary hover:bg-light-primary'}`}
//                         >
//                             {userListLoading ? 'Loading...' : 'Show User List'}
//                         </button>

//                         {userListError && <p className="text-error mt-4">{userListError}</p>}

//                         {userList.length > 0 && (
//                             <div className="mt-6">
//                                 <h4 className="text-md font-semibold text-primary mb-2">User List</h4>
//                                 <div className="max-h-80 overflow-y-auto">
//                                     <table className="w-full">
//                                         <thead className="bg-accent sticky top-0">
//                                             <tr>
//                                                 {['Name', 'Email', 'Phone', 'Status'].map((header) => (
//                                                     <th key={header} className="px-4 py-2 text-left text-text-primary font-medium border-b border-light-secondary">
//                                                         {header}
//                                                     </th>
//                                                 ))}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {userList.map((user) => (
//                                                 <tr key={user.id}>
//                                                     <td className="px-4 py-2 border-b border-light-secondary">{user.name}</td>
//                                                     <td className="px-4 py-2 border-b border-light-secondary">{user.email}</td>
//                                                     <td className="px-4 py-2 border-b border-light-secondary">{user.phone || 'N/A'}</td>
//                                                     <td className="px-4 py-2 border-b border-light-secondary">{user.status}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>
//         </Layout>
//     );
// }

// export default ClientDetails;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout, { Container } from "../components/layout";
import { apiurl } from "../config/config";
import { getCookie } from "../config/webStorage";
import BackHeader from "../components/backHeader";
import { IoArrowBack, IoChevronBackSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import SearchContainer from "../components/searchContainer";
import { toast } from "react-toastify";

function ClientDetails() {
  const { clientId } = useParams();
  const token = getCookie("sctoken");
  const [superadminInfo, setSuperadminInfo] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);
  const [userListLoading, setUserListLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listError, setListError] = useState(null);
  const [adminError, setAdminError] = useState(null);
  const [userListError, setUserListError] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  // Edit mode state
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [tempStatus, setTempStatus] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch superadmin details
  useEffect(() => {
    const fetchSuperadminInfo = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/api/whatsapp/user/getadminInfo?id=${clientId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSuperadminInfo(response.data.Super_admin);
        setTempStatus(response.data.Super_admin.status);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch admin info");
        setLoading(false);
      }
    };
    fetchSuperadminInfo();
  }, [clientId, token]);

  // Handle Save Status
  const handleSaveStatus = async () => {
    if (tempStatus === superadminInfo.status) {
      setIsEditingStatus(false);
      return; // No change
    }

    setSaving(true);
    try {
      await axios.put(
        // `http://localhost:5050/xpresschat/api/whatsapp/user/superadmin/update/${clientId}`, // Adjust endpoint as per your route
        `${apiurl}/api/whatsapp/user/superadmin/update/${clientId}`, // Adjust endpoint as per your route
        { status: tempStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setSuperadminInfo({ ...superadminInfo, status: tempStatus });
      setIsEditingStatus(false);
      toast.success("Status updated successfully!");
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setTempStatus(superadminInfo.status);
    setIsEditingStatus(false);
  };

  // Fetch admin list
  const fetchAdminList = async () => {
    setListLoading(true);
    setListError(null);
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/user/getadminlistofsuperadmin?id=${clientId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAdminList(response.data.admin);
      setListLoading(false);
    } catch (err) {
      setListError("Failed to fetch admin list");
      setListLoading(false);
    }
  };

  // Fetch selected admin details
  const fetchAdminDetails = async (adminId) => {
    setAdminLoading(true);
    setAdminError(null);
    setUserList([]);
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/user/getadminInfo?id=${adminId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedAdmin(response.data.Super_admin);
      setAdminLoading(false);
    } catch (err) {
      setAdminError("Failed to fetch admin details");
      setAdminLoading(false);
    }
  };

  // Fetch user list
  const fetchUserList = async (adminId) => {
    setUserListLoading(true);
    setUserListError(null);
    try {
      const response = await axios.get(
        `${apiurl}/api/whatsapp/user/getuserlistofadmin?id=${adminId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserList(response.data.users || []);
      setUserListLoading(false);
    } catch (err) {
      setUserListError("Failed to fetch user list");
      setUserListLoading(false);
    }
  };

  // Back button handler
  const handleBack = () => {
    setSelectedAdmin(null);
    setUserList([]);
    setAdminError(null);
    setUserListError(null);
  };

  if (loading)
    return (
      <Layout>
        <div className="text-center text-text-primary">Loading...</div>
      </Layout>
    );
  if (error)
    return (
      <Layout>
        <div className="text-center text-error">{error}</div>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <div className="border bg-white h-full w-full px-2 py-2 overflow-y-scroll custom-scrollbar">
          {/* Main Client Details View */}
          {!selectedAdmin && (
            <div className="p-2">
              <div className="mb-5">
                <BackHeader
                  title={
                    <span className="flex flex-col md:flex-row items-center">
                      Client Details
                    </span>
                  }
                  // rightSide={
                  //     <div className="flex gap-2 items-center">
                  //         <div className="block md:hidden">
                  //             <Link to="/clients/add">
                  //                 <ButtonContainer icon={<IoAddOutline />} />
                  //             </Link>
                  //         </div>
                  //         <div className="hidden md:block">
                  //             <Link to="/newClient">
                  //                 <ButtonContainer icon={<IoAddOutline />}>
                  //                     Add Client
                  //                 </ButtonContainer>
                  //             </Link>
                  //         </div>
                  //         <div className="hidden md:flex">
                  //             <SearchContainer
                  //                 value={searchInput}
                  //                 placeholder={"Search Clients..."}
                  //                 onChange={(e) => setSearchInput(e.target.value)}
                  //             />
                  //         </div>
                  //     </div>
                  // }
                  backButton={true}
                  link={"/clients"}
                />
              </div>

              {/* {superadminInfo && (
                                <div className="border border-light-primary rounded-2xl p-8 mb-8">
                              
                                    <div className="relative z-10">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <div className="space-y-5 text-left">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Name</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.name}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Email</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.email}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Phone</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.phone}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Tenant</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.tenant.tenantName}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-5 text-left">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">User Type</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.userType}</p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Status</span>
                                                    <p className="text-text-primary text-lg font-medium">
                                                        <span
                                                            className={`inline-flex items-center  py-1 rounded-full text-lg font-medium ${superadminInfo.status === 'active'
                                                                ? 'text-success'
                                                                : 'text-error'
                                                                }`}
                                                        >
                                                            {superadminInfo.status}
                                                        </span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Wallet</span>
                                                    <p className="text-text-primary text-lg font-medium">{superadminInfo.wallet}</p>
                                                </div>
                                                <div className="flex gap-4">
                                                    <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">Address</span>
                                                    <div className="rounded-lg">
                                                        <p className="text-text-secondary text-base">{superadminInfo.address.name}</p>
                                                        <p className="text-text-secondary text-base">{superadminInfo.address.line1}</p>
                                                        {superadminInfo.address.line2 && (
                                                            <p className="text-text-secondary text-base">{superadminInfo.address.line2}</p>
                                                        )}
                                                        <p className="text-text-secondary text-base">
                                                            {superadminInfo.address.city}, {superadminInfo.address.province}{' '}
                                                            {superadminInfo.address.zip}, {superadminInfo.address.country}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )} */}

              {superadminInfo && (
                <div className="border border-light-primary rounded-2xl p-8 mb-8 relative">
                  {/* Edit/Save/Cancel Buttons - Top Right */}
                  <div className="absolute top-6 right-6 flex gap-3 z-10">
                    {isEditingStatus ? (
                      <>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 text-primary bg-light-secondary rounded-sm hover:bg-gray-200 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveStatus}
                          disabled={saving}
                          className="px-4 py-2 bg-primary hover:bg-light-primary text-white font-medium rounded-sm disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save"}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditingStatus(true)}
                        className="px-4 py-2 bg-accent hover:bg-accent/80 text-primary font-medium rounded-sm transition"
                      >
                        Edit Status
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="space-y-5 text-left">
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Name
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Email
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Phone
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.phone}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Tenant
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.tenant.tenantName}
                        </p>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5 text-left">
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          User Type
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.userType}
                        </p>
                      </div>

                      {/* Status - Editable with Toggle */}
                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Status
                        </span>
                        <div className="flex items-center gap-4">
                          {isEditingStatus ? (
                            // <label className="relative inline-flex items-center cursor-pointer">
                            //     <input
                            //         type="checkbox"
                            //         checked={tempStatus === 'active'}
                            //         onChange={(e) => setTempStatus(e.target.checked ? 'active' : 'inactive')}
                            //         className="sr-only peer"
                            //     />
                            //     <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                            //     <span className="ms-3 text-lg font-medium text-primary">
                            //         {tempStatus === 'active' ? 'Active' : 'Inactive'}
                            //     </span>
                            // </label>
                            <label className="flex items-center gap-4 cursor-pointer select-none">
                              {/* Toggle */}
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={tempStatus === "active"}
                                  onChange={(e) =>
                                    setTempStatus(
                                      e.target.checked ? "active" : "inactive"
                                    )
                                  }
                                  className="sr-only peer"
                                />

                                <div
                                  className="
        w-12 h-6 rounded-full
        bg-gray-300
        peer-checked:bg-emerald-500
        transition-colors duration-300
        shadow-inner
      "
                                />

                                <div
                                  className="
        absolute top-1 left-1
        w-4 h-4 rounded-full
        bg-white
        shadow-md
        transition-all duration-300
        peer-checked:translate-x-6
      "
                                />
                              </div>

                              {/* Label */}
                              <span
                                className={`text-sm font-semibold transition-colors duration-300 ${
                                  tempStatus === "active"
                                    ? "text-emerald-600"
                                    : "text-gray-500"
                                }`}
                              >
                                {tempStatus === "active"
                                  ? "Active"
                                  : "Inactive"}
                              </span>
                            </label>
                          ) : (
                            <span
                              className={`inline-flex items-center py-1 rounded-full text-lg font-medium ${
                                superadminInfo.status === "active"
                                  ? "bg-success/10 text-success"
                                  : "bg-error/10 text-error"
                              }`}
                            >
                              {superadminInfo.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Wallet
                        </span>
                        <p className="text-text-primary text-lg font-medium">
                          {superadminInfo.wallet}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                          Address
                        </span>
                        <div className="rounded-lg">
                          <p className="text-text-secondary text-base">
                            {superadminInfo.address.name}
                          </p>
                          <p className="text-text-secondary text-base">
                            {superadminInfo.address.line1}
                          </p>
                          {superadminInfo.address.line2 && (
                            <p className="text-text-secondary text-base">
                              {superadminInfo.address.line2}
                            </p>
                          )}
                          <p className="text-text-secondary text-base">
                            {superadminInfo.address.city},{" "}
                            {superadminInfo.address.province}{" "}
                            {superadminInfo.address.zip},{" "}
                            {superadminInfo.address.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={fetchAdminList}
                  disabled={listLoading}
                  className={`w-full md:w-auto px-4 py-2 rounded-sm text-white font-medium transition-colors
                                ${
                                  listLoading
                                    ? "bg-primary cursor-not-allowed opacity-70"
                                    : "bg-primary hover:bg-light-primary"
                                }`}
                >
                  {listLoading ? "Loading..." : "Show Admin List"}
                </button>
              </div>

              {listError && <p className="text-error mt-4">{listError}</p>}

              {adminList.length > 0 && (
                <div className="mt-6 bg-white shadow rounded-sm overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between gap-2 md:items-center p-4">
                    <h3 className="text-lg font-semibold text-primary">
                      Admin List
                    </h3>
                    <div className="">
                      <SearchContainer
                        value={searchInput}
                        placeholder={"Search Admins..."}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-accent sticky top-0">
                        <tr>
                          {[
                            "Name",
                            "Email",
                            "Phone",
                            "Tenant",
                            "Status",
                            "Action",
                          ].map((header) => (
                            <th
                              key={header}
                              className="px-4 py-2 text-text-primary font-medium border-b border-light-secondary"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {adminList.map((admin) => (
                          <tr key={admin.id} className="">
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {admin.name}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {admin.email}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {admin.phone || "N/A"}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {admin.tenant.tenantName}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {admin.status}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              <button
                                onClick={() => fetchAdminDetails(admin.id)}
                                className="px-3 py-1 text-light-primary"
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Admin Details View */}
          {selectedAdmin && (
            <div className="p-2">
              <div className="flex items-center gap-5 mb-6">
                <button
                  onClick={handleBack}
                  className="px-1 py-1 text-xs border border-secondary hover:border-primary text-primary rounded-sm transition-colors flex items-center gap-2"
                >
                  <IoMdArrowRoundBack className="text-primary text-xs md:text-sm" />
                </button>
                <h2 className="text-2xl font-bold text-primary">
                  Admin Details of superadmin :- {superadminInfo?.name}
                </h2>
              </div>

              {adminLoading && (
                <p className="text-text-primary mt-4">
                  Loading admin details...
                </p>
              )}
              {adminError && <p className="text-error mt-4">{adminError}</p>}

              {!adminLoading && !adminError && (
                <div className="border border-light-primary rounded-2xl p-8 mb-8">
                  {/* Subtle overlay for better text contrast */}
                  {/* <div className="absolute inset-0 bg-white bg-opacity-80"></div> */}
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column */}
                      <div className="space-y-5 text-left">
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Name
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Email
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Phone
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.phone || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Tenant
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.tenant.tenantName}
                          </p>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-5 text-left">
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            User Type
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.userType}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Status
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            <span
                              className={`text-lg font-medium ${
                                selectedAdmin.status === "active"
                                  ? "text-success"
                                  : "text-error"
                              }`}
                            >
                              {selectedAdmin.status}
                            </span>
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Wallet
                          </span>
                          <p className="text-text-primary text-lg font-medium">
                            {selectedAdmin.wallet}
                          </p>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-light-primary font-semibold text-sm uppercase tracking-wide w-28">
                            Address
                          </span>
                          <div className="space-y-2">
                            <p className="text-text-secondary text-base">
                              {selectedAdmin.address.name}
                            </p>
                            <p className="text-text-secondary text-base">
                              {selectedAdmin.address.line1}
                            </p>
                            {selectedAdmin.address.line2 && (
                              <p className="text-text-secondary text-base">
                                {selectedAdmin.address.line2}
                              </p>
                            )}
                            <p className="text-text-secondary text-base">
                              {selectedAdmin.address.city},{" "}
                              {selectedAdmin.address.province}{" "}
                              {selectedAdmin.address.zip},{" "}
                              {selectedAdmin.address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex justify-end">
                <button
                  onClick={() => fetchUserList(selectedAdmin.id)}
                  disabled={userListLoading}
                  className={`w-full md:w-auto px-4 py-2 rounded-sm text-white font-medium transition-colors
                                        ${
                                          userListLoading
                                            ? "bg-primary cursor-not-allowed opacity-70"
                                            : "bg-primary hover:bg-light-primary"
                                        }`}
                >
                  {userListLoading ? "Loading..." : "Show User List"}
                </button>
              </div>

              {userListError && (
                <p className="text-error mt-4">{userListError}</p>
              )}

              {userList.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-primary mb-2">
                    User List
                  </h4>
                  <div className="max-h-80 overflow-y-auto">
                    <table className="w-full">
                      <thead className="bg-accent sticky top-0">
                        <tr>
                          {["Name", "Email", "Phone", "Status"].map(
                            (header) => (
                              <th
                                key={header}
                                className="px-4 py-2 text-left text-text-primary font-medium border-b border-light-secondary"
                              >
                                {header}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {userList.map((user) => (
                          <tr
                            key={user.id}
                            className="hover:bg-accent transition-colors"
                          >
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {user.name}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {user.email}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {user.phone || "N/A"}
                            </td>
                            <td className="px-4 py-2 border-b border-light-secondary">
                              {user.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default ClientDetails;
