// import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Layout from "../components/layout";
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';
// import { toast } from 'react-toastify';
// import { MdSend, MdAdd, MdClose, MdWarning, MdDownload } from 'react-icons/md';
// import * as XLSX from 'xlsx';
// import { RiDeleteBin5Line } from "react-icons/ri";

// function TemplateManagement() {
//   const { accountId } = useParams();
//   const token = getCookie('sctoken');

//   const [templates, setTemplates] = useState([]);
//   const [infiConnectApiKey, setInfiConnectApiKey] = useState(null);
//     const [meta_api_access_token, setmeta_api_access_token] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [newTemplate, setNewTemplate] = useState({
//     name: '',
//     language: 'en_US',
//     category: 'UTILITY',
//     parameter_format: 'POSITIONAL',
//     bodyText: '',
//     header: null,
//     footerText: '',
//     buttons: [],
//     ctaButtons: [],
//     bodyVariables: [],
//     headerVariables: [],
//   });

//   const [showSendModal, setShowSendModal] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState(null);
//   const [recipients, setRecipients] = useState([]);
//   const [currentNumberInput, setCurrentNumberInput] = useState('');
//   const [currentNameInput, setCurrentNameInput] = useState('');
//   const numberInputRef = useRef(null);
//   const [sendParameters, setSendParameters] = useState({});
//   const [uploadStatus, setUploadStatus] = useState('');

//   const fetchTemplatesAndKey = async () => {
//     if (!accountId) return;
//     setLoading(true);
//     setError(null);
//     try {
//       const listRes = await axios.post(
//         `${apiurl}/api/whatsapp/template/get`,
//         { id: accountId },
//         { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//       );
//       const templatesData = listRes.data?.data?.data || listRes.data?.data || [];
//       setTemplates(Array.isArray(templatesData) ? templatesData : []);

//       if (templatesData.length > 0) {
//         const firstId = templatesData[0].id;
//         const detailRes = await axios.post(
//           `${apiurl}/api/whatsapp/template/get/${firstId}`,
//           { id: accountId },
//           { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//         );
//         setInfiConnectApiKey(detailRes.data?.inficonnect_api_key || null);
//         setmeta_api_access_token(detailRes.data?.meta_api_access_token || null)
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load templates or API key');
//       toast.error('Could not fetch templates');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTemplatesAndKey();
//   }, [accountId, token]);

//   const addBodyVariable = () => {
//     setNewTemplate(prev => ({
//       ...prev,
//       bodyVariables: [...prev.bodyVariables, { position: prev.bodyVariables.length + 1, example: '' }],
//     }));
//   };

//   const removeBodyVariable = (index) => {
//     setNewTemplate(prev => ({
//       ...prev,
//       bodyVariables: prev.bodyVariables.filter((_, i) => i !== index),
//     }));
//   };

//   const updateBodyVariable = (index, field, value) => {
//     setNewTemplate(prev => {
//       const vars = [...prev.bodyVariables];
//       vars[index][field] = value;
//       return { ...prev, bodyVariables: vars };
//     });
//   };

//   const addHeaderVariable = () => {
//     setNewTemplate(prev => ({
//       ...prev,
//       headerVariables: [...prev.headerVariables, { position: prev.headerVariables.length + 1, example: '' }],
//     }));
//   };

//   const removeHeaderVariable = (index) => {
//     setNewTemplate(prev => ({
//       ...prev,
//       headerVariables: prev.headerVariables.filter((_, i) => i !== index),
//     }));
//   };

//   const updateHeaderVariable = (index, field, value) => {
//     setNewTemplate(prev => {
//       const vars = [...prev.headerVariables];
//       vars[index][field] = value;
//       return { ...prev, headerVariables: vars };
//     });
//   };

//   const downloadSample = (template) => {
//     if (!template) {
//       toast.error('No template selected');
//       return;
//     }

//     const allParams = new Set();

//     const extractParams = (text) => {
//       if (!text) return;
//       const matches = text.match(/{{([^{}]+)}}/g) || [];
//       matches.forEach(m => {
//         const param = m.replace(/{{|}}/g, '').trim();
//         allParams.add(param);
//       });
//     };

//     template.components?.forEach(comp => {
//       if (comp.type === 'HEADER' && comp.format === 'TEXT' && comp.text) {
//         extractParams(comp.text);
//       }
//       if (comp.type === 'BODY' && comp.text) {
//         extractParams(comp.text);
//       }
//     });

//     const paramsList = Array.from(allParams);
//     if (paramsList.length === 0) {
//       toast.warn('No parameters found in this template');
//       return;
//     }

//     const headerRow = ['Mobile Number', 'Name', ...paramsList];
//     const sampleRow = ['919876543210', 'John Doe'];

//     let exampleMap = {};

//     template.components?.forEach(comp => {
//       if (comp.type === 'BODY' && comp.example) {
//         if (comp.example.body_text_named_params) {
//           comp.example.body_text_named_params.forEach(p => {
//             exampleMap[p.param_name] = p.example;
//           });
//         } else if (comp.example.body_text?.[0]) {
//           comp.example.body_text[0].forEach((val, idx) => {
//             exampleMap[`${idx + 1}`] = val;
//           });
//         }
//       }
//       if (comp.type === 'HEADER' && comp.example?.header_text?.[0]) {
//         exampleMap['1'] = comp.example.header_text[0];
//       }
//     });

//     paramsList.forEach(param => {
//       sampleRow.push(exampleMap[param] || '');
//     });

//     const ws = XLSX.utils.aoa_to_sheet([headerRow, sampleRow]);
//     ws['!cols'] = headerRow.map((_, i) => ({ wch: i === 0 ? 20 : 25 }));

//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'Recipients & Parameters');
//     XLSX.writeFile(wb, `sample_${template.name || 'template'}.xlsx`);

//     toast.success(`Downloaded sample with ${paramsList.length} parameters`);
//   };

//   const createTemplate = async () => {
//     if (!newTemplate.name.trim() || !newTemplate.bodyText.trim()) {
//       toast.error('Template Name and Body Text are required');
//       return;
//     }

//     const nameFormatted = newTemplate.name.trim().toLowerCase().replace(/\s+/g, '_');

//     const components = [];

//     if (newTemplate.header) {
//       let headerComp = { type: 'HEADER' };

//       if (newTemplate.header.type === 'text') {
//         headerComp.format = 'TEXT';
//         headerComp.text = newTemplate.header.text || '';

//         const headerExamples = newTemplate.headerVariables.map(v => v.example.trim()).filter(Boolean);
//         if (headerExamples.length > 0) {
//           if (newTemplate.parameter_format === 'NAMED') {
//             headerComp.example = {
//               header_text_named_params: newTemplate.headerVariables
//                 .filter(v => v.example.trim())
//                 .map((v, i) => ({ param_name: `header_var_${i+1}`, example: v.example.trim() })),
//             };
//           } else {
//             headerComp.example = { header_text: headerExamples };
//           }
//         }
//       } else if (['image', 'video', 'document'].includes(newTemplate.header.type)) {
//         headerComp.format = newTemplate.header.type.toUpperCase();
//         if (!newTemplate.header.url) {
//           toast.error(`Sample URL required for ${newTemplate.header.type} header`);
//           return;
//         }
//         headerComp.example = {
//           [newTemplate.header.type]: [{ link: newTemplate.header.url.trim() }],
//         };
//       } else if (newTemplate.header.type === 'location') {
//         headerComp.format = 'LOCATION';
//         headerComp.example = {
//           header_location: [{
//             latitude: parseFloat(newTemplate.header.latitude) || 0,
//             longitude: parseFloat(newTemplate.header.longitude) || 0,
//           }],
//         };
//       }
//       components.push(headerComp);
//     }

//     const bodyComp = {
//       type: 'BODY',
//       text: newTemplate.bodyText.trim(),
//     };

//     const bodyExamples = newTemplate.bodyVariables.map(v => v.example.trim()).filter(Boolean);
//     if (bodyExamples.length > 0) {
//       if (newTemplate.parameter_format === 'NAMED') {
//         bodyComp.example = {
//           body_text_named_params: newTemplate.bodyVariables
//             .filter(v => v.example.trim())
//             .map((v, i) => ({ param_name: `body_var_${i+1}`, example: v.example.trim() })),
//         };
//       } else {
//         bodyComp.example = { body_text: [bodyExamples] };
//       }
//     }
//     components.push(bodyComp);

//     if (newTemplate.footerText?.trim()) {
//       components.push({
//         type: 'FOOTER',
//         text: newTemplate.footerText.trim(),
//       });
//     }

//     const buttons = [];
//     if (buttons.length > 0) {
//       components.push({ type: 'BUTTONS', buttons });
//     }

//     const payload = {
//       id: accountId,
//       template: {
//         name: nameFormatted,
//         language: newTemplate.language,
//         category: newTemplate.category,
//         components,
//       },
//     };

//     try {
//       await axios.post(`${apiurl}/api/whatsapp/template/create`, payload, {
//         headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
//       });
//       toast.success('Template created successfully!');
//       setShowCreateForm(false);
//       setNewTemplate({
//         name: '',
//         language: 'en_US',
//         category: 'UTILITY',
//         parameter_format: 'POSITIONAL',
//         bodyText: '',
//         header: null,
//         headerVariables: [],
//         footerText: '',
//         buttons: [],
//         ctaButtons: [],
//         bodyVariables: [],
//       });
//       fetchTemplatesAndKey();
//     } catch (err) {
//       console.error("Create template error:", err.response?.data || err);
//       const errData = err.response?.data?.data?.error;
//       toast.error(
//         <div>
//           <div style={{ fontWeight: 600 }}>❌ {errData?.error_user_title || 'Creation failed'}</div>
//           <div style={{ marginTop: 4 }}>{errData?.error_user_msg || err.message}</div>
//           {errData?.message && (
//             <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>
//               Code: {errData.message}
//             </div>
//           )}
//         </div>
//       );
//     }
//   };

//   const deleteTemplate = async (tpl) => {
//     if (!window.confirm(`Delete template "${tpl.name}"?`)) return;

//     try {
//       await axios.post(
//         `${apiurl}/api/whatsapp/template/delete/${tpl.id}`,
//         { id: accountId, name: tpl.name },
//         { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//       );
//       toast.success('Template deleted');
//       fetchTemplatesAndKey();
//     } catch (err) {
//       toast.error(
//         <div>
//           <div style={{ fontWeight: 600 }}>❌ {err.response?.data?.data?.error?.error_user_title || 'Delete failed'}</div>
//           <div style={{ marginTop: 4 }}>{err.response?.data?.data?.error?.error_user_msg || err.message}</div>
//         </div>
//       );
//     }
//   };

//   const normalizeNumber = (input) => input.trim().replace(/\s+/g, '').replace(/^\+/, '');

//   const addRecipient = () => {
//     const cleanedNumber = normalizeNumber(currentNumberInput);
//     if (!cleanedNumber) return;
//     if (!/^\d{10,15}$/.test(cleanedNumber)) {
//       toast.error('Invalid number — use 10–15 digits');
//       return;
//     }
//     if (recipients.some(r => r.number === cleanedNumber)) {
//       toast.warn('Number already added');
//       setCurrentNumberInput('');
//       setCurrentNameInput('');
//       return;
//     }
//     const name = currentNameInput.trim();
//     setRecipients(prev => [...prev, { number: cleanedNumber, name }]);
//     setCurrentNumberInput('');
//     setCurrentNameInput('');
//     numberInputRef.current?.focus();
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' || e.key === ',') {
//       e.preventDefault();
//       addRecipient();
//     }
//   };

//   const removeRecipient = (number) => {
//     setRecipients(prev => prev.filter(r => r.number !== number));
//   };

//   const handleExcelUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setUploadStatus('Processing...');
//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         const workbook = XLSX.read(evt.target.result, { type: 'array' });
//         const sheetName = workbook.SheetNames[0];
//         const worksheet = workbook.Sheets[sheetName];
//         const rows = XLSX.utils.sheet_to_json(worksheet, {
//           header: 1,
//           defval: '',
//           blankrows: false,
//         }).slice(1);
//         const added = [];
//         rows.forEach(row => {
//           const rawNumber = String(row[0] || '').trim();
//           const cleanedNumber = normalizeNumber(rawNumber);
//           const name = String(row[1] || '').trim();
//           if (cleanedNumber && /^\d{10,15}$/.test(cleanedNumber) && !recipients.some(r => r.number === cleanedNumber)) {
//             added.push({ number: cleanedNumber, name });
//           }
//         });
//         if (added.length > 0) {
//           setRecipients(prev => [...prev, ...added]);
//           setUploadStatus(`Added ${added.length} valid recipient(s)`);
//           toast.success(`Imported ${added.length} recipients`);
//         } else {
//           setUploadStatus('No valid or new recipients found');
//           toast.warn('No valid or new recipients in file');
//         }
//       } catch (err) {
//         console.error(err);
//         setUploadStatus('Failed to read file');
//         toast.error('Invalid Excel file');
//       }
//     };
//     reader.readAsArrayBuffer(file);
//     e.target.value = '';
//   };

//   const openSendModal = (template) => {
//     setSelectedTemplate(template);

//     const initialParams = {};

//     template.components?.forEach((comp, compIndex) => {
//       if (comp.type === 'HEADER' && comp.format === 'TEXT' && comp.text) {
//         const matches = comp.text.match(/{{([^{}]+)}}/g) || [];
//         matches.forEach((match, i) => {
//           const rawKey = match.replace(/{{|}}/g, '').trim();
//           const uniqueKey = `header_${rawKey}`;
//           initialParams[uniqueKey] = comp.example?.header_text?.[i] || '';
//         });
//       }

//       if (comp.type === 'BODY' && comp.text) {
//         const matches = comp.text.match(/{{([^{}]+)}}/g) || [];
//         matches.forEach((match, i) => {
//           const rawKey = match.replace(/{{|}}/g, '').trim();
//           const uniqueKey = `body_${rawKey}`;
//           if (comp.example?.body_text?.[0]?.[i]) {
//             initialParams[uniqueKey] = comp.example.body_text[0][i];
//           } else if (comp.example?.body_text_named_params) {
//             const named = comp.example.body_text_named_params.find(p => p.param_name === rawKey);
//             if (named) initialParams[uniqueKey] = named.example;
//           }
//         });
//       }
//     });

//     setSendParameters(initialParams);
//     setRecipients([]);
//     setCurrentNumberInput('');
//     setCurrentNameInput('');
//     setUploadStatus('');
//     setShowSendModal(true);
//   };

//   const renderEditableText = (text = '', section = 'body', compIndex = 0) => {
//     if (!text) return <span className="text-gray-400">No content</span>;

//     const parts = text.split(/({{[^{}]+}})/g);

//     return parts.map((part, i) => {
//       if (!part.match(/{{[^{}]+}}/)) return <span key={i}>{part}</span>;

//       const rawVarName = part.replace(/{{|}}/g, '').trim();
//       const uniqueKey = `${section}_${rawVarName}`;

//       const currentValue =
//         sendParameters[uniqueKey] ??
//         (section === 'header'
//           ? selectedTemplate.components?.[compIndex]?.example?.header_text?.[0] || ''
//           : selectedTemplate.components?.[compIndex]?.example?.body_text?.[0]?.[i] || '');

//       return (
//         <input
//           key={i}
//           type="text"
//           value={currentValue}
//           onChange={(e) =>
//             setSendParameters((prev) => ({
//               ...prev,
//               [uniqueKey]: e.target.value,
//             }))
//           }
//           className="inline-block min-w-[140px] mx-1.5 px-3 py-1.5 bg-yellow-50 border border-yellow-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
//           placeholder={`Value for ${rawVarName}`}
//           title={`Section: ${section.toUpperCase()} • Param: ${rawVarName}`}
//         />
//       );
//     });
//   };

//   // Send to Multiple - Fixed: Correctly separate header & body parameters
//   // Send to Multiple - Fixed: Strict separation of header & body parameters
// const sendToMultiple = async () => {
//   if (recipients.length === 0) {
//     toast.error('Add at least one recipient');
//     return;
//   }
//   if (!infiConnectApiKey) {
//     toast.error('API key not loaded');
//     return;
//   }

//   let success = 0;
//   const failed = [];

//   for (const recipient of recipients) {
//     // 1. Collect all parameters with their original prefixed keys
//     const paramsBySection = {
//       header: {},
//       body: {}
//     };

//     Object.entries(sendParameters).forEach(([key, value]) => {
//       if (key.startsWith('header_')) {
//         const paramName = key.replace('header_', '');
//         paramsBySection.header[paramName] = value?.trim() || '';
//       } else if (key.startsWith('body_')) {
//         const paramName = key.replace('body_', '');
//         paramsBySection.body[paramName] = value?.trim() || '';
//       }
//     });

//     // 2. Build components array
//     const components = [];

//     // HEADER
//     const headerParams = Object.entries(paramsBySection.header)
//       .filter(([_, text]) => text)
//       .map(([param_name, text]) => ({
//         type: 'text',
//         parameter_name: param_name,
//         text
//       }));

//     if (headerParams.length > 0) {
//       components.push({
//         type: 'header',
//         parameters: headerParams
//       });
//     }

//     // BODY
//     const bodyParams = Object.entries(paramsBySection.body)
//       .filter(([_, text]) => text)
//       .map(([param_name, text]) => ({
//         type: 'text',
//         parameter_name: param_name,
//         text
//       }));

//     if (bodyParams.length > 0) {
//       components.push({
//         type: 'body',
//         parameters: bodyParams
//       });
//     }

//     // FOOTER (no parameters in this template)
//     components.push({
//       type: 'footer',
//       parameters: []
//     });

//     // Final payload
//     const payload = {
//       mobile_number: recipient.number,
//       template_name: selectedTemplate.name,
//       language_code: selectedTemplate.language || 'en_US',
//       components
//     };

//     try {
//       await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
//         headers: {
//           accept: '*/*',
//           api_key: infiConnectApiKey,
//           'Content-Type': 'application/json',
//         },
//       });
//       success++;
//     } catch (err) {
//       failed.push(recipient.number);
//       console.error('Send error for', recipient.number, ':', err.response?.data || err);
//       toast.error(
//         <div>
//           <div style={{ fontWeight: 600 }}>❌ {err.response?.data?.data?.error?.message || 'Failed to send'}</div>
//           <div style={{ marginTop: 4 }}>{err.response?.data?.data?.error?.error_data?.details || ''}</div>
//         </div>
//       );
//     }
//   }

//   if (success > 0) toast.success(`Sent to ${success} recipient(s)`);
//   if (failed.length) toast.error(`Failed: ${failed.join(', ')}`);
//   setShowSendModal(false);
// };

//   return (
//     <Layout>
//       <div className="p-6 max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">WhatsApp Templates (Account: {accountId})</h1>
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             <MdAdd /> Create Template
//           </button>
//         </div>

//         {loading && <p className="text-center py-10 text-gray-600">Loading...</p>}
//         {error && <p className="text-red-600 text-center py-8">{error}</p>}
//         {!loading && !error && templates.length === 0 && (
//           <p className="text-center py-10 text-gray-500">No templates found.</p>
//         )}
//         {!infiConnectApiKey && templates.length > 0 && !loading && (
//           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
//             <div className="flex items-center">
//               <MdWarning className="text-yellow-600 mr-3 text-xl" />
//               <p className="text-yellow-700">Warning: API key not loaded — sending may fail.</p>
//             </div>
//           </div>
//         )}

//         {templates.length > 0 && (
//           <div className="overflow-x-auto bg-white shadow rounded-lg border">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Name</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Language</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">ID</th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Action</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {templates.map(tpl => (
//                   <tr key={tpl.id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap font-medium">{tpl.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">{tpl.language}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-gray-600">{tpl.category}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                         tpl.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
//                       }`}>
//                         {tpl.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{tpl.id}</td>
//                     <td className="px-6 py-4 whitespace-nowrap flex flex-row gap-4">
//                       <button
//                         onClick={() => tpl.status === "APPROVED" && openSendModal(tpl)}
//                         className={`inline-flex items-center px-3 py-1.5 ${
//                           tpl.status === "APPROVED"
//                             ? "bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer"
//                             : "bg-gray-100 text-gray-700 cursor-not-allowed"
//                         } rounded`}
//                         disabled={tpl.status !== "APPROVED"}
//                       >
//                         <MdSend className="mr-1.5" size={16} /> Send
//                       </button>
//                       <button
//                         onClick={() => deleteTemplate(tpl)}
//                         className={`inline-flex items-center px-3 py-1.5 ${
//                           tpl.status === "APPROVED"
//                             ? "bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer"
//                             : "bg-gray-100 text-gray-700 cursor-not-allowed"
//                         } rounded`}
//                         disabled={tpl.status !== "APPROVED"}
//                       >
//                         <RiDeleteBin5Line className="mr-1.5" size={16} /> Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Create Modal */}
//         {showCreateForm && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
//               <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
//                 <h2 className="text-2xl font-bold text-gray-800">Create WhatsApp Template</h2>
//                 <button onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-gray-800">
//                   <MdClose size={28} />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Template Name *</label>
//                   <input
//                     type="text"
//                     value={newTemplate.name}
//                     onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
//                     placeholder="e.g. welcome_message or order_update"
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Language Code</label>
//                   <select
//                     value={newTemplate.language}
//                     onChange={e => setNewTemplate({ ...newTemplate, language: e.target.value })}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="en_US">English (US) - en_US</option>
//                     <option value="hi_IN">Hindi - hi_IN</option>
//                     <option value="en_GB">English (UK) - en_GB</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                   <select
//                     value={newTemplate.category}
//                     onChange={e => setNewTemplate({ ...newTemplate, category: e.target.value })}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="UTILITY">Utility</option>
//                     <option value="MARKETING">Marketing</option>
//                     <option value="AUTHENTICATION">Authentication</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Parameter Format</label>
//                   <div className="flex gap-6 mt-2">
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="parameter_format"
//                         value="POSITIONAL"
//                         checked={newTemplate.parameter_format === 'POSITIONAL'}
//                         onChange={() => setNewTemplate(prev => ({
//                           ...prev,
//                           parameter_format: 'POSITIONAL',
//                           bodyVariables: prev.bodyVariables.map(v => ({ ...v, param_name: '' })),
//                           headerVariables: prev.headerVariables.map(v => ({ ...v, param_name: '' }))
//                         }))}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       Positional <code className="text-sm bg-gray-100 px-1 rounded">{'{{1}}'}</code>, <code className="text-sm bg-gray-100 px-1 rounded">{'{{2}}'}</code>
//                     </label>
//                     <label className="flex items-center gap-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="parameter_format"
//                         value="NAMED"
//                         checked={newTemplate.parameter_format === 'NAMED'}
//                         onChange={() => setNewTemplate(prev => ({ ...prev, parameter_format: 'NAMED' }))}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       Named <code className="text-sm bg-gray-100 px-1 rounded">{'{{customer_name}}'}</code>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Header Text (optional)</label>
//                   <div className="relative">
//                     <textarea
//                       value={newTemplate.header?.text || ''}
//                       onChange={e => setNewTemplate(prev => ({
//                         ...prev,
//                         header: { ...(prev.header || { type: 'text' }), text: e.target.value }
//                       }))}
//                       rows={2}
//                       placeholder="e.g. Hi {{1}}, welcome back!"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"
//                     />
//                     <button
//                       type="button"
//                       onClick={addHeaderVariable}
//                       className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm"
//                     >
//                       <MdAdd size={14} /> Add variable
//                     </button>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Message Body *</label>
//                   <div className="relative">
//                     <textarea
//                       value={newTemplate.bodyText}
//                       onChange={e => setNewTemplate({ ...newTemplate, bodyText: e.target.value })}
//                       rows={5}
//                       placeholder="Hello {{1}}! Your order {{2}} is confirmed."
//                       className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px]"
//                     />
//                     <button
//                       type="button"
//                       onClick={addBodyVariable}
//                       className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm"
//                     >
//                       <MdAdd size={14} /> Add variable
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Use <code>{newTemplate.parameter_format === 'NAMED' ? '{{customer_name}}' : '{{1}}'}</code> for dynamic fields
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Footer (optional - no variables)</label>
//                   <input
//                     type="text"
//                     value={newTemplate.footerText || ''}
//                     onChange={e => setNewTemplate({ ...newTemplate, footerText: e.target.value })}
//                     placeholder="e.g. Thanks for choosing us! This is an automated message."
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                     maxLength={60}
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     Max 60 characters
//                   </p>
//                 </div>

//                 <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Sample Values for Variables</h3>

//                   {newTemplate.header?.type === 'text' && newTemplate.headerVariables.length > 0 && (
//                     <div className="mb-6">
//                       <h4 className="text-base font-medium text-gray-700 mb-3">Header Variables</h4>
//                       {newTemplate.headerVariables.map((v, idx) => (
//                         <div key={idx} className="flex items-center gap-4 mb-3">
//                           <div className="w-24 text-center font-mono text-sm bg-gray-100 px-3 py-2 rounded">
//                             {'{{' + (idx + 1) + '}}'}
//                           </div>
//                           <input
//                             value={v.example}
//                             onChange={e => updateHeaderVariable(idx, 'example', e.target.value)}
//                             placeholder={`Sample for {{${idx + 1}}}`}
//                             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                           />
//                           <button onClick={() => removeHeaderVariable(idx)} className="text-red-600 hover:text-red-800">
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {newTemplate.bodyVariables.length > 0 && (
//                     <div>
//                       <h4 className="text-base font-medium text-gray-700 mb-3">Body Variables</h4>
//                       {newTemplate.bodyVariables.map((v, idx) => (
//                         <div key={idx} className="flex items-center gap-4 mb-3">
//                           <div className="w-24 text-center font-mono text-sm bg-gray-100 px-3 py-2 rounded">
//                             {'{{' + (idx + 1) + '}}'}
//                           </div>
//                           <input
//                             value={v.example}
//                             onChange={e => updateBodyVariable(idx, 'example', e.target.value)}
//                             placeholder={`Sample for {{${idx + 1}}}`}
//                             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
//                           />
//                           <button onClick={() => removeBodyVariable(idx)} className="text-red-600 hover:text-red-800">
//                             ×
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}

//                   {newTemplate.headerVariables.length === 0 && newTemplate.bodyVariables.length === 0 && (
//                     <p className="text-gray-500 text-center py-6">
//                       Add variables using "+ Add variable" buttons above
//                     </p>
//                   )}
//                 </div>

//                 <div className="flex justify-end gap-4 pt-6 border-t">
//                   <button
//                     onClick={() => setShowCreateForm(false)}
//                     className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={createTemplate}
//                     className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                   >
//                     Create Template
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Send Modal */}
//         {showSendModal && selectedTemplate && (
//           <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
//               <div className="p-6 border-b flex justify-between sticky top-0 bg-white z-10">
//                 <h2 className="text-2xl font-bold">
//                   Send: <span className="text-blue-600">{selectedTemplate.name}</span>
//                 </h2>
//                 <button onClick={() => setShowSendModal(false)}>
//                   <MdClose size={28} />
//                 </button>
//               </div>

//               <div className="p-6 space-y-6">
//                 {/* Template Preview */}
//                 <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Message Preview (edit values)</h3>

//                   {selectedTemplate.components?.map((comp, idx) => {
//                     if (comp.type === 'HEADER' && comp.format === 'TEXT') {
//                       return (
//                         <div key={idx} className="mb-6">
//                           <h4 className="text-sm font-medium text-gray-600 mb-2">Header</h4>
//                           <div className="p-4 bg-white border rounded-lg min-h-[60px] flex items-center flex-wrap gap-2">
//                             {renderEditableText(comp.text, 'header', idx)}
//                           </div>
//                         </div>
//                       );
//                     }

//                     if (comp.type === 'BODY') {
//                       return (
//                         <div key={idx} className="mb-6">
//                           <h4 className="text-sm font-medium text-gray-600 mb-2">Body</h4>
//                           <div className="p-4 bg-white border rounded-lg whitespace-pre-wrap min-h-[140px] flex flex-col gap-3">
//                             {renderEditableText(comp.text, 'body', idx)}
//                           </div>
//                         </div>
//                       );
//                     }

//                     if (comp.type === 'FOOTER') {
//                       return (
//                         <div key={idx} className="mb-6">
//                           <h4 className="text-sm font-medium text-gray-600 mb-2">Footer</h4>
//                           <div className="p-3 bg-gray-100 border rounded-lg text-sm italic text-gray-700">
//                             {comp.text}
//                           </div>
//                         </div>
//                       );
//                     }

//                     return null;
//                   })}
//                 </div>

//                 {/* Upload Excel */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                     Upload Excel with Recipients (.xlsx)
//                   </label>
//                   <div className="flex items-center gap-4 mb-2">
//                     <button
//                       onClick={() => downloadSample(selectedTemplate)}
//                       className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
//                     >
//                       <MdDownload size={18} /> Download Sample
//                     </button>
//                     <input
//                       type="file"
//                       accept=".xlsx,.xls"
//                       onChange={handleExcelUpload}
//                       className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                     />
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">
//                     Format: Column A = Mobile Number, Column B = Name, then parameters. Skips header row.
//                   </p>
//                   {uploadStatus && <p className="text-sm text-gray-600 mt-1.5">{uploadStatus}</p>}
//                 </div>

//                 {/* Manual Recipients */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1.5">
//                     Add Recipient Manually
//                   </label>
//                   <div className="border border-gray-300 rounded-lg p-3 min-h-[120px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-green-500 bg-gray-50">
//                     {recipients.map(r => (
//                       <div
//                         key={r.number}
//                         className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
//                       >
//                         {r.name ? `${r.name} (+${r.number})` : `+${r.number}`}
//                         <button
//                           type="button"
//                           onClick={() => removeRecipient(r.number)}
//                           className="text-green-700 hover:text-red-600"
//                           title="Remove"
//                         >
//                           <MdClose size={16} />
//                         </button>
//                       </div>
//                     ))}
//                     <div className="flex gap-2 flex-1 min-w-[300px]">
//                       <input
//                         ref={numberInputRef}
//                         type="tel"
//                         value={currentNumberInput}
//                         onChange={e => setCurrentNumberInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         onBlur={addRecipient}
//                         placeholder="Number (e.g. 919876543210)"
//                         className="flex-1 outline-none px-2 py-1.5 text-sm bg-transparent"
//                       />
//                       <input
//                         type="text"
//                         value={currentNameInput}
//                         onChange={e => setCurrentNameInput(e.target.value)}
//                         onKeyDown={handleKeyDown}
//                         onBlur={addRecipient}
//                         placeholder="Name (optional)"
//                         className="flex-1 outline-none px-2 py-1.5 text-sm bg-transparent"
//                       />
//                     </div>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1.5">
//                     Enter number + name (optional) → press Enter or blur to add • × to remove
//                   </p>
//                   {recipients.length > 0 && (
//                     <p className="text-xs text-gray-600 mt-1 font-medium">
//                       {recipients.length} recipient{recipients.length !== 1 ? 's' : ''} added
//                     </p>
//                   )}
//                 </div>

//                 {/* Parameters List */}
//                 {Object.keys(sendParameters).length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800 mb-3">Template Parameters</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       {Object.entries(sendParameters).map(([key, val]) => (
//                         <div key={key} className="flex flex-col">
//                           <label className="text-sm font-medium text-gray-700 mb-1">{key}</label>
//                           <input
//                             type="text"
//                             value={val}
//                             onChange={e => setSendParameters(prev => ({ ...prev, [key]: e.target.value }))}
//                             className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex justify-end gap-4 pt-6 border-t">
//                   <button
//                     onClick={() => setShowSendModal(false)}
//                     className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={sendToMultiple}
//                     disabled={!infiConnectApiKey || recipients.length === 0}
//                     className={`px-6 py-2.5 text-white rounded-lg transition flex items-center gap-2 ${
//                       infiConnectApiKey && recipients.length > 0
//                         ? 'bg-green-600 hover:bg-green-700'
//                         : 'bg-gray-400 cursor-not-allowed'
//                     }`}
//                   >
//                     <MdSend /> Send to All
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// }

// export default TemplateManagement;
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/layout";
import { apiurl } from "../config/config";
import { getCookie } from "../config/webStorage";
import { toast } from "react-toastify";
import { MdSend, MdAdd, MdClose, MdWarning, MdDownload, MdEdit } from "react-icons/md";
import * as XLSX from "xlsx";
import { RiDeleteBin5Line } from "react-icons/ri";

function TemplateManagement() {
  const { accountId } = useParams();
  const token = getCookie("sctoken");
  const [templates, setTemplates] = useState([]);
  const [infiConnectApiKey, setInfiConnectApiKey] = useState(null);
  const [meta_api_access_token, setmeta_api_access_token] = useState(null);
  const [sampleDocumentPreview, setSampleDocumentPreview] = useState(null);
  const [PHONE_NUMBER_ID, setPHONE_NUMBER_ID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // ← Naya state for edit mode
  const [editingTemplateId, setEditingTemplateId] = useState(null); // ← Naya state for current editing template ID

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    language: "en_US",
    category: "UTILITY",
    parameter_format: "POSITIONAL",
    bodyText: "",
    header: null,
    footerText: "",
    buttons: [],
    ctaButtons: [],
    bodyVariables: [],
    headerVariables: [],
  });

  console.log("sampleDocumentPreview", sampleDocumentPreview);

  const [showSendModal, setShowSendModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [currentNumberInput, setCurrentNumberInput] = useState("");
  const [currentNameInput, setCurrentNameInput] = useState("");
  const numberInputRef = useRef(null);
  const [sendParameters, setSendParameters] = useState({});
  const [uploadStatus, setUploadStatus] = useState("");

  // ── NEW STATES for document upload in send modal ──
  const [documentFile, setDocumentFile] = useState(null);
  const [documentPreviewName, setDocumentPreviewName] = useState("");
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [uploadedMediaId, setUploadedMediaId] = useState(null);

  // Add this function — upload document to WhatsApp Cloud API
  const uploadDocumentToWhatsApp = async (file) => {
    if (!file) return null;
    if (!meta_api_access_token) {
      toast.error("Meta access token not available");
      return null;
    }
    if (!PHONE_NUMBER_ID) {
      toast.error("Phone Number ID not found. Cannot upload media.");
      return null;
    }
    setUploadingDocument(true);
    const formData = new FormData();
    formData.append("messaging_product", "whatsapp");
    formData.append("file", file);
    try {
      const res = await axios.post(
        `https://graph.facebook.com/v12.0/${PHONE_NUMBER_ID}/media`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${meta_api_access_token}`,
          },
        },
      );
      const mediaId = res.data?.id;
      if (!mediaId) throw new Error("No media ID returned");
      toast.success(`Document uploaded! Media ID: ${mediaId}`);
      return mediaId;
    } catch (err) {
      console.error("Media upload failed:", err.response?.data || err);
      const msg = err.response?.data?.error?.message || "Upload failed";
      toast.error(`Document upload failed: ${msg}`);
      return null;
    } finally {
      setUploadingDocument(false);
    }
  };

  const fetchTemplatesAndKey = async () => {
    if (!accountId) return;
    setLoading(true);
    setError(null);
    try {
      const listRes = await axios.post(
        `${apiurl}/api/whatsapp/template/get`,
        { id: accountId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      const templatesData =
        listRes.data?.data?.data || listRes.data?.data || [];
      setTemplates(Array.isArray(templatesData) ? templatesData : []);
      if (templatesData.length > 0) {
        const firstId = templatesData[0].id;
        const detailRes = await axios.post(
          `${apiurl}/api/whatsapp/template/get/${firstId}`,
          { id: accountId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        console.log("detailRes", detailRes?.data?.data?.components[0]?.example?.header_handle);
        setInfiConnectApiKey(detailRes.data?.inficonnect_api_key || null);
        setmeta_api_access_token(detailRes.data?.meta_api_access_token || null);
        setPHONE_NUMBER_ID(detailRes.data?.PHONE_NUMBER_ID || null);
        setSampleDocumentPreview(detailRes?.data?.data?.components[0]?.example?.header_handle?.[0]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load templates or API key");
      toast.error("Could not fetch templates");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplatesAndKey();
  }, [accountId, token]);

  const addBodyVariable = () => {
    setNewTemplate((prev) => ({
      ...prev,
      bodyVariables: [
        ...prev.bodyVariables,
        { position: prev.bodyVariables.length + 1, example: "" },
      ],
    }));
  };

  const removeBodyVariable = (index) => {
    setNewTemplate((prev) => ({
      ...prev,
      bodyVariables: prev.bodyVariables.filter((_, i) => i !== index),
    }));
  };

  const updateBodyVariable = (index, field, value) => {
    setNewTemplate((prev) => {
      const vars = [...prev.bodyVariables];
      vars[index][field] = value;
      return { ...prev, bodyVariables: vars };
    });
  };

  const addHeaderVariable = () => {
    setNewTemplate((prev) => ({
      ...prev,
      headerVariables: [
        ...prev.headerVariables,
        { position: prev.headerVariables.length + 1, example: "" },
      ],
    }));
  };

  const removeHeaderVariable = (index) => {
    setNewTemplate((prev) => ({
      ...prev,
      headerVariables: prev.headerVariables.filter((_, i) => i !== index),
    }));
  };

  const updateHeaderVariable = (index, field, value) => {
    setNewTemplate((prev) => {
      const vars = [...prev.headerVariables];
      vars[index][field] = value;
      return { ...prev, headerVariables: vars };
    });
  };

  const downloadSample = (template) => {
    if (!template) {
      toast.error("No template selected");
      return;
    }
    const allParams = new Set();
    const extractParams = (text) => {
      if (!text) return;
      const matches = text.match(/{{([^{}]+)}}/g) || [];
      matches.forEach((m) => {
        const param = m.replace(/{{|}}/g, "").trim();
        allParams.add(param);
      });
    };
    template.components?.forEach((comp) => {
      if (comp.type === "HEADER" && comp.format === "TEXT" && comp.text) {
        extractParams(comp.text);
      }
      if (comp.type === "BODY" && comp.text) {
        extractParams(comp.text);
      }
    });
    const paramsList = Array.from(allParams);
    if (paramsList.length === 0) {
      toast.warn("No parameters found in this template");
      return;
    }
    const headerRow = ["Mobile Number", "Name", ...paramsList];
    const sampleRow = ["919876543210", "John Doe"];
    let exampleMap = {};
    template.components?.forEach((comp) => {
      if (comp.type === "BODY" && comp.example) {
        if (comp.example.body_text_named_params) {
          comp.example.body_text_named_params.forEach((p) => {
            exampleMap[p.param_name] = p.example;
          });
        } else if (comp.example.body_text?.[0]) {
          comp.example.body_text[0].forEach((val, idx) => {
            exampleMap[`${idx + 1}`] = val;
          });
        }
      }
      if (comp.type === "HEADER" && comp.example?.header_text?.[0]) {
        exampleMap["1"] = comp.example.header_text[0];
      }
    });
    paramsList.forEach((param) => {
      sampleRow.push(exampleMap[param] || "");
    });
    const ws = XLSX.utils.aoa_to_sheet([headerRow, sampleRow]);
    ws["!cols"] = headerRow.map((_, i) => ({ wch: i === 0 ? 20 : 25 }));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Recipients & Parameters");
    XLSX.writeFile(wb, `sample_${template.name || "template"}.xlsx`);
    toast.success(`Downloaded sample with ${paramsList.length} parameters`);
  };

  const saveTemplate = async () => {
    if (!newTemplate.name.trim() || !newTemplate.bodyText.trim()) {
      toast.error("Template Name and Body Text are required");
      return;
    }

    const nameFormatted = newTemplate.name.trim().toLowerCase().replace(/\s+/g, "_");

    const components = [];

    // Header
    if (newTemplate.header) {
      let headerComp = { type: "HEADER" };
      if (newTemplate.header.type === "text") {
        headerComp.format = "TEXT";
        headerComp.text = newTemplate.header.text || "";
        const headerExamples = newTemplate.headerVariables
          .map((v) => v.example.trim())
          .filter(Boolean);
        if (headerExamples.length > 0) {
          if (newTemplate.parameter_format === "NAMED") {
            headerComp.example = {
              header_text_named_params: newTemplate.headerVariables
                .filter((v) => v.example.trim())
                .map((v, i) => ({
                  param_name: `header_var_${i + 1}`,
                  example: v.example.trim(),
                })),
            };
          } else {
            headerComp.example = { header_text: headerExamples };
          }
        }
      } else if (["image", "video", "document"].includes(newTemplate.header.type)) {
        headerComp.format = newTemplate.header.type.toUpperCase();
        if (!newTemplate.header.url) {
          toast.error(`Sample URL required for ${newTemplate.header.type} header`);
          return;
        }
        headerComp.example = {
          [newTemplate.header.type]: [{ link: newTemplate.header.url.trim() }],
        };
      } else if (newTemplate.header.type === "location") {
        headerComp.format = "LOCATION";
        headerComp.example = {
          header_location: [
            {
              latitude: parseFloat(newTemplate.header.latitude) || 0,
              longitude: parseFloat(newTemplate.header.longitude) || 0,
            },
          ],
        };
      }
      components.push(headerComp);
    }

    // Body
    const bodyComp = {
      type: "BODY",
      text: newTemplate.bodyText.trim(),
    };
    const bodyExamples = newTemplate.bodyVariables
      .map((v) => v.example.trim())
      .filter(Boolean);
    if (bodyExamples.length > 0) {
      if (newTemplate.parameter_format === "NAMED") {
        bodyComp.example = {
          body_text_named_params: newTemplate.bodyVariables
            .filter((v) => v.example.trim())
            .map((v, i) => ({
              param_name: `body_var_${i + 1}`,
              example: v.example.trim(),
            })),
        };
      } else {
        bodyComp.example = { body_text: [bodyExamples] };
      }
    }
    components.push(bodyComp);

    // Footer
    if (newTemplate.footerText?.trim()) {
      components.push({
        type: "FOOTER",
        text: newTemplate.footerText.trim(),
      });
    }

    const buttons = [];
    if (buttons.length > 0) {
      components.push({ type: "BUTTONS", buttons });
    }

    const payload = {
      id: accountId,
      template: {
        name: nameFormatted,
        language: newTemplate.language,
        category: newTemplate.category,
        components,
      },
    };

    const endpoint = isEditMode
      ? `${apiurl}/api/whatsapp/template/update/${editingTemplateId}`
      : `${apiurl}/api/whatsapp/template/create`;

    try {
      await axios.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success(isEditMode ? "Template updated successfully!" : "Template created successfully!");
      setShowCreateForm(false);
      setIsEditMode(false);
      setEditingTemplateId(null);

      setNewTemplate({
        name: "",
        language: "en_US",
        category: "UTILITY",
        parameter_format: "POSITIONAL",
        bodyText: "",
        header: null,
        headerVariables: [],
        footerText: "",
        buttons: [],
        ctaButtons: [],
        bodyVariables: [],
      });

      fetchTemplatesAndKey();
    } catch (err) {
      console.error("Template save error:", err.response?.data || err);
      const errData = err.response?.data?.data?.error;
      toast.error(
        <div>
          <div style={{ fontWeight: 600 }}>
            ❌ {errData?.error_user_title || (isEditMode ? "Update failed" : "Creation failed")}
          </div>
          <div style={{ marginTop: 4 }}>{errData?.error_user_msg || err.message}</div>
          {errData?.message && (
            <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6 }}>
              Code: {errData.message}
            </div>
          )}
        </div>
      );
    }
  };

  // New function to open edit modal
  const openEditModal = async (tpl) => {
    try {
      const detailRes = await axios.post(
        `${apiurl}/api/whatsapp/template/get/${tpl.id}`,
        { id: accountId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const fullTpl = detailRes.data?.data || tpl;

      const headerComp = fullTpl.components?.find((c) => c.type === "HEADER");
      const bodyComp = fullTpl.components?.find((c) => c.type === "BODY");
      const footerComp = fullTpl.components?.find((c) => c.type === "FOOTER");

      const header = headerComp ? { type: "text", text: headerComp.text || "" } : null;
      const bodyText = bodyComp?.text || "";
      const footerText = footerComp?.text || "";

      const hVars = headerComp?.example?.header_text?.map((ex, i) => ({
        position: i + 1,
        example: ex,
      })) || [];

      const bVars = bodyComp?.example?.body_text?.[0]?.map((ex, i) => ({
        position: i + 1,
        example: ex,
      })) || [];

      setNewTemplate({
        name: fullTpl.name,
        language: fullTpl.language,
        category: fullTpl.category,
        parameter_format: fullTpl.parameter_format || "POSITIONAL",
        bodyText,
        header,
        footerText,
        buttons: [],
        ctaButtons: [],
        bodyVariables: bVars,
        headerVariables: hVars,
      });

      setIsEditMode(true);
      setEditingTemplateId(tpl.id);
      setShowCreateForm(true);
    } catch (err) {
      console.error("Failed to load template for edit:", err);
      toast.error("Could not load template details for editing");
    }
  };

  const deleteTemplate = async (tpl) => {
    if (!window.confirm(`Delete template "${tpl.name}"?`)) return;
    try {
      await axios.post(
        `${apiurl}/api/whatsapp/template/delete/${tpl.id}`,
        { id: accountId, name: tpl.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      toast.success("Template deleted");
      fetchTemplatesAndKey();
    } catch (err) {
      toast.error(
        <div>
          <div style={{ fontWeight: 600 }}>
            ❌ {err.response?.data?.data?.error?.error_user_title || "Delete failed"}
          </div>
          <div style={{ marginTop: 4 }}>
            {err.response?.data?.data?.error?.error_user_msg || err.message}
          </div>
        </div>
      );
    }
  };

  const normalizeNumber = (input) => input.trim().replace(/\s+/g, "").replace(/^\+/, "");

  const addRecipient = () => {
    const cleanedNumber = normalizeNumber(currentNumberInput);
    if (!cleanedNumber) return;
    if (!/^\d{10,15}$/.test(cleanedNumber)) {
      toast.error("Invalid number — use 10–15 digits");
      return;
    }
    if (recipients.some((r) => r.number === cleanedNumber)) {
      toast.warn("Number already added");
      setCurrentNumberInput("");
      setCurrentNameInput("");
      return;
    }
    const name = currentNameInput.trim();
    setRecipients((prev) => [...prev, { number: cleanedNumber, name }]);
    setCurrentNumberInput("");
    setCurrentNameInput("");
    numberInputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addRecipient();
    }
  };

  const removeRecipient = (number) => {
    setRecipients((prev) => prev.filter((r) => r.number !== number));
  };

  const handleExcelUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus("Processing...");
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils
          .sheet_to_json(worksheet, {
            header: 1,
            defval: "",
            blankrows: false,
          })
          .slice(1);
        const added = [];
        rows.forEach((row) => {
          const rawNumber = String(row[0] || "").trim();
          const cleanedNumber = normalizeNumber(rawNumber);
          const name = String(row[1] || "").trim();
          if (
            cleanedNumber &&
            /^\d{10,15}$/.test(cleanedNumber) &&
            !recipients.some((r) => r.number === cleanedNumber)
          ) {
            added.push({ number: cleanedNumber, name });
          }
        });
        if (added.length > 0) {
          setRecipients((prev) => [...prev, ...added]);
          setUploadStatus(`Added ${added.length} valid recipient(s)`);
          toast.success(`Imported ${added.length} recipients`);
        } else {
          setUploadStatus("No valid or new recipients found");
          toast.warn("No valid or new recipients in file");
        }
      } catch (err) {
        console.error(err);
        setUploadStatus("Failed to read file");
        toast.error("Invalid Excel file");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  const openSendModal = (template) => {
    setSelectedTemplate(template);
    const initialParams = {};
    template.components?.forEach((comp, compIndex) => {
      if (comp.type === "HEADER" && comp.format === "TEXT" && comp.text) {
        const matches = comp.text.match(/{{([^{}]+)}}/g) || [];
        matches.forEach((match, i) => {
          const rawKey = match.replace(/{{|}}/g, "").trim();
          const uniqueKey = `header_${rawKey}`;
          initialParams[uniqueKey] = comp.example?.header_text?.[i] || "";
        });
      }
      if (comp.type === "BODY" && comp.text) {
        const matches = comp.text.match(/{{([^{}]+)}}/g) || [];
        matches.forEach((match, i) => {
          const rawKey = match.replace(/{{|}}/g, "").trim();
          const uniqueKey = `body_${rawKey}`;
          if (comp.example?.body_text?.[0]?.[i]) {
            initialParams[uniqueKey] = comp.example.body_text[0][i];
          } else if (comp.example?.body_text_named_params) {
            const named = comp.example.body_text_named_params.find(
              (p) => p.param_name === rawKey,
            );
            if (named) initialParams[uniqueKey] = named.example;
          }
        });
      }
    });
    setSendParameters(initialParams);
    setRecipients([]);
    setCurrentNumberInput("");
    setCurrentNameInput("");
    setUploadStatus("");
    setShowSendModal(true);
    // Reset document
    setDocumentFile(null);
    setDocumentPreviewName("");
    setUploadedMediaId(null);
  };

  const handleDocumentChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      toast.error("Only PDF, DOC, DOCX allowed for document header");
      return;
    }
    setDocumentFile(file);
    setDocumentPreviewName(file.name);
    setUploadedMediaId(null);
  };

  const renderEditableText = (text = "", section = "body", compIndex = 0) => {
    if (!text) return <span className="text-gray-400">No content</span>;
    const parts = text.split(/({{[^{}]+}})/g);
    return parts.map((part, i) => {
      if (!part.match(/{{[^{}]+}}/)) return <span key={i}>{part}</span>;
      const rawVarName = part.replace(/{{|}}/g, "").trim();
      const uniqueKey = `${section}_${rawVarName}`;
      const currentValue =
        sendParameters[uniqueKey] ??
        (section === "header"
          ? selectedTemplate.components?.[compIndex]?.example?.header_text?.[0] || ""
          : selectedTemplate.components?.[compIndex]?.example?.body_text?.[0]?.[i] || "");
      return (
        <input
          key={i}
          type="text"
          value={currentValue}
          onChange={(e) =>
            setSendParameters((prev) => ({
              ...prev,
              [uniqueKey]: e.target.value,
            }))
          }
          className="inline-block min-w-[140px] mx-1.5 px-3 py-1.5 bg-yellow-50 border border-yellow-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition"
          placeholder={`Value for ${rawVarName}`}
          title={`Section: ${section.toUpperCase()} • Param: ${rawVarName}`}
        />
      );
    });
  };

  const sendToMultiple = async () => {
    if (recipients.length === 0) {
      toast.error("Add at least one recipient");
      return;
    }
    if (!infiConnectApiKey) {
      toast.error("API key not loaded");
      return;
    }

    const hasDocumentHeader = selectedTemplate.components?.some(
      (c) => c.type === "HEADER" && c.format === "DOCUMENT",
    );

    let finalMediaId = uploadedMediaId;
    if (hasDocumentHeader) {
      if (!documentFile) {
        toast.error("This template requires a document header. Please upload a file.");
        return;
      }
      if (!finalMediaId) {
        finalMediaId = await uploadDocumentToWhatsApp(documentFile);
        if (!finalMediaId) return;
        setUploadedMediaId(finalMediaId);
      }
    }

    let success = 0;
    const failed = [];
    for (const recipient of recipients) {
      const paramsBySection = {
        header: {},
        body: {},
      };

      Object.entries(sendParameters).forEach(([key, value]) => {
        if (key.startsWith("header_")) {
          const paramName = key.replace("header_", "");
          paramsBySection.header[paramName] = value?.trim() || "";
        } else if (key.startsWith("body_")) {
          const paramName = key.replace("body_", "");
          paramsBySection.body[paramName] = value?.trim() || "";
        }
      });

      const components = [];

      let headerComponent = null;
      if (hasDocumentHeader) {
        headerComponent = {
          type: "header",
          parameters: [
            {
              type: "document",
              document: {
                id: finalMediaId,
              },
            },
          ],
        };
      } else {
        const headerParams = Object.entries(paramsBySection.header)
          .filter(([, text]) => text)
          .map(([param_name, text]) => ({
            type: "text",
            parameter_name: param_name,
            text,
          }));
        if (headerParams.length > 0) {
          headerComponent = {
            type: "header",
            parameters: headerParams,
          };
        }
      }
      if (headerComponent) components.push(headerComponent);

      const bodyParams = Object.entries(paramsBySection.body)
        .filter(([, text]) => text)
        .map(([param_name, text]) => ({
          type: "text",
          parameter_name: param_name,
          text,
        }));
      if (bodyParams.length > 0) {
        components.push({
          type: "body",
          parameters: bodyParams,
        });
      }

      components.push({
        type: "footer",
        parameters: [],
      });

      const payload = {
        "id":selectedTemplate.id,
        mobile_number: recipient.number,
        template_name: selectedTemplate.name,
        language_code: selectedTemplate.language || "en_US",
        components,
      };

      try {
        await axios.post(`${apiurl}/api/whatsapp/message/template`, payload, {
          headers: {
            accept: "*/*",
            api_key: infiConnectApiKey,
            "Content-Type": "application/json",
          },
        });
        success++;
      } catch (err) {
        failed.push(recipient.number);
        console.error(err);
        toast.error(
          `Failed for ${recipient.number}: ${err.response?.data?.error?.message || "Unknown error"}`
        );
      }
    }

    if (success > 0) toast.success(`Sent successfully to ${success} recipient(s)`);
    if (failed.length) toast.error(`Failed for: ${failed.join(", ")}`);
    setShowSendModal(false);
  };

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            WhatsApp Templates (Account: {accountId})
          </h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <MdAdd /> Create Template
          </button>
        </div>

        {loading && (
          <p className="text-center py-10 text-gray-600">Loading...</p>
        )}
        {error && <p className="text-red-600 text-center py-8">{error}</p>}
        {!loading && !error && templates.length === 0 && (
          <p className="text-center py-10 text-gray-500">No templates found.</p>
        )}
        {!infiConnectApiKey && templates.length > 0 && !loading && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-center">
              <MdWarning className="text-yellow-600 mr-3 text-xl" />
              <p className="text-yellow-700">
                Warning: API key not loaded — sending may fail.
              </p>
            </div>
          </div>
        )}

        {templates.length > 0 && (
          <div className="overflow-x-auto bg-white shadow rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {templates.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {tpl.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {tpl.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {tpl.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tpl.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {tpl.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      {tpl.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex flex-row gap-4">
                      <button
                        onClick={() =>
                          tpl.status === "APPROVED" && openSendModal(tpl)
                        }
                        className={`inline-flex items-center px-3 py-1.5 ${
                          tpl.status === "APPROVED"
                            ? "bg-blue-50 hover:bg-blue-100 text-blue-700 cursor-pointer"
                            : "bg-gray-100 text-gray-700 cursor-not-allowed"
                        } rounded`}
                        disabled={tpl.status !== "APPROVED"}
                      >
                        <MdSend className="mr-1.5" size={16} /> Send
                      </button>
                      <button
                        onClick={() => openEditModal(tpl)}
                        className="inline-flex items-center px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-700 rounded"
                      >
                        <MdEdit className="mr-1.5" size={16} /> Edit
                      </button>
                      <button
                        onClick={() => deleteTemplate(tpl)}
                        className={`inline-flex items-center px-3 py-1.5 ${
                          tpl.status === "APPROVED"
                            ? "bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer"
                            : "bg-gray-100 text-gray-700 cursor-not-allowed"
                        } rounded`}
                        disabled={tpl.status !== "APPROVED"}
                      >
                        <RiDeleteBin5Line className="mr-1.5" size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Create Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-800">
                 {isEditMode?"Edit WhatsApp Template":"Create WhatsApp Template"}
                </h2>
                <button
                  onClick={() =>{ setShowCreateForm(false)
                  setIsEditMode(false)
                  setEditingTemplateId(null)}}
                  className="text-gray-500 hover:text-gray-800"
                >
                  <MdClose size={28} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Template Name *
                  </label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, name: e.target.value })
                    }
                    placeholder="e.g. welcome_message or order_update"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language Code
                  </label>
                  <select
                    value={newTemplate.language}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        language: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en_US">English (US) - en_US</option>
                    <option value="hi_IN">Hindi - hi_IN</option>
                    <option value="en_GB">English (UK) - en_GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        category: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="UTILITY">Utility</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="AUTHENTICATION">Authentication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Parameter Format
                  </label>
                  <div className="flex gap-6 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="parameter_format"
                        value="POSITIONAL"
                        checked={newTemplate.parameter_format === "POSITIONAL"}
                        onChange={() =>
                          setNewTemplate((prev) => ({
                            ...prev,
                            parameter_format: "POSITIONAL",
                            bodyVariables: prev.bodyVariables.map((v) => ({
                              ...v,
                              param_name: "",
                            })),
                            headerVariables: prev.headerVariables.map((v) => ({
                              ...v,
                              param_name: "",
                            })),
                          }))
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      Positional{" "}
                      <code className="text-sm bg-gray-100 px-1 rounded">
                        {"{{1}}"}
                      </code>
                      ,{" "}
                      <code className="text-sm bg-gray-100 px-1 rounded">
                        {"{{2}}"}
                      </code>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="parameter_format"
                        value="NAMED"
                        checked={newTemplate.parameter_format === "NAMED"}
                        onChange={() =>
                          setNewTemplate((prev) => ({
                            ...prev,
                            parameter_format: "NAMED",
                          }))
                        }
                        className="w-4 h-4 text-blue-600"
                      />
                      Named{" "}
                      <code className="text-sm bg-gray-100 px-1 rounded">
                        {"{{customer_name}}"}
                      </code>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Header Text (optional)
                  </label>
                  <div className="relative">
                    <textarea
                      value={newTemplate.header?.text || ""}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          header: {
                            ...(prev.header || { type: "text" }),
                            text: e.target.value,
                          },
                        }))
                      }
                      rows={2}
                      placeholder="e.g. Hi {{1}}, welcome back!"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button
                      type="button"
                      onClick={addHeaderVariable}
                      className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm"
                    >
                      <MdAdd size={14} /> Add variable
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message Body *
                  </label>
                  <div className="relative">
                    <textarea
                      value={newTemplate.bodyText}
                      onChange={(e) =>
                        setNewTemplate({
                          ...newTemplate,
                          bodyText: e.target.value,
                        })
                      }
                      rows={5}
                      placeholder="Hello {{1}}! Your order {{2}} is confirmed."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 resize-y min-h-[120px]"
                    />
                    <button
                      type="button"
                      onClick={addBodyVariable}
                      className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 bg-white px-2 py-1 rounded shadow-sm"
                    >
                      <MdAdd size={14} /> Add variable
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Use{" "}
                    <code>
                      {newTemplate.parameter_format === "NAMED"
                        ? "{{customer_name}}"
                        : "{{1}}"}
                    </code>{" "}
                    for dynamic fields
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Footer (optional - no variables)
                  </label>
                  <input
                    type="text"
                    value={newTemplate.footerText || ""}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        footerText: e.target.value,
                      })
                    }
                    placeholder="e.g. Thanks for choosing us! This is an automated message."
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                    maxLength={60}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Max 60 characters
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Sample Values for Variables
                  </h3>

                  {newTemplate.header?.type === "text" &&
                    newTemplate.headerVariables.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-base font-medium text-gray-700 mb-3">
                          Header Variables
                        </h4>
                        {newTemplate.headerVariables.map((v, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-4 mb-3"
                          >
                            <div className="w-24 text-center font-mono text-sm bg-gray-100 px-3 py-2 rounded">
                              {"{{" + (idx + 1) + "}}"}
                            </div>
                            <input
                              value={v.example}
                              onChange={(e) =>
                                updateHeaderVariable(
                                  idx,
                                  "example",
                                  e.target.value,
                                )
                              }
                              placeholder={`Sample for {{${idx + 1}}}`}
                              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              onClick={() => removeHeaderVariable(idx)}
                              className="text-red-600 hover:text-red-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                  {newTemplate.bodyVariables.length > 0 && (
                    <div>
                      <h4 className="text-base font-medium text-gray-700 mb-3">
                        Body Variables
                      </h4>
                      {newTemplate.bodyVariables.map((v, idx) => (
                        <div key={idx} className="flex items-center gap-4 mb-3">
                          <div className="w-24 text-center font-mono text-sm bg-gray-100 px-3 py-2 rounded">
                            {"{{" + (idx + 1) + "}}"}
                          </div>
                          <input
                            value={v.example}
                            onChange={(e) =>
                              updateBodyVariable(idx, "example", e.target.value)
                            }
                            placeholder={`Sample for {{${idx + 1}}}`}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => removeBodyVariable(idx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {newTemplate.headerVariables.length === 0 &&
                    newTemplate.bodyVariables.length === 0 && (
                      <p className="text-gray-500 text-center py-6">
                        Add variables using "+ Add variable" buttons above
                      </p>
                    )}
                </div>

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    onClick={() => {setShowCreateForm(false)
                    isEditMode(false)
                    setEditingTemplateId(null)}}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveTemplate}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                   {isEditMode?"Update Template":"Create Template"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Send Modal */}
        {showSendModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className="p-6 border-b flex justify-between sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold">
                  Send:{" "}
                  <span className="text-blue-600">{selectedTemplate.name}</span>
                </h2>
                <button onClick={() => setShowSendModal(false)}>
                  <MdClose size={28} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Template Preview */}
                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Message Preview (edit values)
                  </h3>

                  {selectedTemplate?.components?.some(
                    (c) => c.type === "HEADER" && c.format === "DOCUMENT",
                  ) && (
                    <div className="mt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Document for Header{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      {/* <img alt="Sample file" src={sampleDocumentPreview} /> */}
                      <a
                        href={sampleDocumentPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-50 inline-block cursor-pointer text-blue-600 underline pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Open PDF in new tab
                      </a>

                      <div className="flex items-center gap-4">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleDocumentChange}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          disabled={uploadingDocument}
                        />
                        {uploadingDocument && (
                          <span className="text-blue-600">Uploading...</span>
                        )}
                      </div>

                      {documentPreviewName && (
                        <div className="mt-2 text-sm text-gray-600 flex items-center gap-2">
                          <span>
                            Selected: <strong>{documentPreviewName}</strong>
                          </span>
                          {uploadedMediaId && (
                            <span className="text-green-600 font-medium">
                              (Uploaded – ID: {uploadedMediaId})
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setDocumentFile(null);
                              setDocumentPreviewName("");
                              setUploadedMediaId(null);
                            }}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTemplate.components?.map((comp, idx) => {
                    if (comp.type === "HEADER" && comp.format === "TEXT") {
                      return (
                        <div key={idx} className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Header
                          </h4>
                          <div className="p-4 bg-white border rounded-lg min-h-[60px] flex items-center flex-wrap gap-2">
                            {renderEditableText(comp.text, "header", idx)}
                          </div>
                        </div>
                      );
                    }

                    if (comp.type === "BODY") {
                      return (
                        <div key={idx} className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Body
                          </h4>
                          <div className="p-4 bg-white border rounded-lg whitespace-pre-wrap min-h-[140px] flex flex-col gap-3">
                            {renderEditableText(comp.text, "body", idx)}
                          </div>
                        </div>
                      );
                    }

                    if (comp.type === "FOOTER") {
                      return (
                        <div key={idx} className="mb-6">
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Footer
                          </h4>
                          <div className="p-3 bg-gray-100 border rounded-lg text-sm italic text-gray-700">
                            {comp.text}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>

                {/* Upload Excel */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Upload Excel with Recipients (.xlsx)
                  </label>
                  <div className="flex items-center gap-4 mb-2">
                    <button
                      onClick={() => downloadSample(selectedTemplate)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                    >
                      <MdDownload size={18} /> Download Sample
                    </button>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleExcelUpload}
                      className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Format: Column A = Mobile Number, Column B = Name, then
                    parameters. Skips header row.
                  </p>
                  {uploadStatus && (
                    <p className="text-sm text-gray-600 mt-1.5">
                      {uploadStatus}
                    </p>
                  )}
                </div>

                {/* Manual Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Add Recipient Manually
                  </label>
                  <div className="border border-gray-300 rounded-lg p-3 min-h-[120px] flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-green-500 bg-gray-50">
                    {recipients.map((r) => (
                      <div
                        key={r.number}
                        className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
                      >
                        {r.name ? `${r.name} (+${r.number})` : `+${r.number}`}
                        <button
                          type="button"
                          onClick={() => removeRecipient(r.number)}
                          className="text-green-700 hover:text-red-600"
                          title="Remove"
                        >
                          <MdClose size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="flex gap-2 flex-1 min-w-[300px]">
                      <input
                        ref={numberInputRef}
                        type="tel"
                        value={currentNumberInput}
                        onChange={(e) => setCurrentNumberInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={addRecipient}
                        placeholder="Number (e.g. 919876543210)"
                        className="flex-1 outline-none px-2 py-1.5 text-sm bg-transparent"
                      />
                      <input
                        type="text"
                        value={currentNameInput}
                        onChange={(e) => setCurrentNameInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onBlur={addRecipient}
                        placeholder="Name (optional)"
                        className="flex-1 outline-none px-2 py-1.5 text-sm bg-transparent"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1.5">
                    Enter number + name (optional) → press Enter or blur to add
                    • × to remove
                  </p>
                  {recipients.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1 font-medium">
                      {recipients.length} recipient
                      {recipients.length !== 1 ? "s" : ""} added
                    </p>
                  )}
                </div>

                {/* Parameters List */}
                {Object.keys(sendParameters).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Template Parameters
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(sendParameters).map(([key, val]) => (
                        <div key={key} className="flex flex-col">
                          <label className="text-sm font-medium text-gray-700 mb-1">
                            {key}
                          </label>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) =>
                              setSendParameters((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                              }))
                            }
                            className="border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    onClick={() => setShowSendModal(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendToMultiple}
                    disabled={!infiConnectApiKey || recipients.length === 0}
                    className={`px-6 py-2.5 text-white rounded-lg transition flex items-center gap-2 ${
                      infiConnectApiKey && recipients.length > 0
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <MdSend /> Send to All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TemplateManagement;
