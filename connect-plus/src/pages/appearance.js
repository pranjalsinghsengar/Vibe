// import React, { useState, useEffect } from 'react';
// import Layout from '../components/layout';

// function Appearance() {
//     const defaultColors = {
//         '--primary-color': '#2D3748',
//         '--secondary-color': 'oklch(97% 0.001 106.424)',
//         '--light-primary-color': '#4299E1',
//         '--light-secondary-color': '#ffffff',
//         '--accent-color': '#BEE3F8',
//         '--error-color': '#E53E3E',
//         '--success-color': '#38A169',
//         '--primary-text-color': '#111827',
//         '--secondary-text-color': '#6B7280',
//         '--white': '#FFFFFF'
//     };

//     const [colors, setColors] = useState(defaultColors);
//     const [message, setMessage] = useState('');

//     // Fetch initial colors from API
//     useEffect(() => {
//         const fetchInitialColors = async () => {
//             try {
//                 const response = await fetch('/api/get-colors', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     }
//                 });

//                 if (response.ok) {
//                     const apiColors = await response.json();
//                     const updatedColors = { ...defaultColors, ...apiColors };
//                     setColors(updatedColors);
//                     applyColors(updatedColors);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch colors:', error);
//                 applyColors(defaultColors);
//             }
//         };

//         fetchInitialColors();
//     }, []);

//     // Apply colors to CSS variables
//     const applyColors = (colorsToApply) => {
//         Object.entries(colorsToApply).forEach(([key, value]) => {
//             document.documentElement.style.setProperty(key, value);
//         });
//     };

//     // Handle color changes
//     const handleColorChange = (variable, value) => {
//         const updatedColors = { ...colors, [variable]: value };
//         setColors(updatedColors);
//         document.documentElement.style.setProperty(variable, value);
//     };

//     // Save colors to API
//     const saveColors = async () => {
//         try {
//             const response = await fetch('/api/save-colors', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(colors)
//             });

//             if (response.ok) {
//                 setMessage('Colors saved successfully!');
//             } else {
//                 throw new Error('Failed to save');
//             }
//         } catch (error) {
//             setMessage('Error saving colors');
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     return (
//         <Layout>
//         <div className="min-h-screen bg-[var(--secondary-color)] p-8">
//             <div className="max-w-2xl mx-auto">
//                 <h1 className="text-3xl font-bold text-[var(--primary-text-color)] mb-6">
//                     Appearance Settings
//                 </h1>

//                 <div className="grid gap-6">
//                     {Object.entries(colors).map(([variable, value]) => (
//                         <div key={variable} className="flex items-center gap-4">
//                             <label className="w-48 text-[var(--primary-text-color)] capitalize">
//                                 {variable.replace('--', '').replace('-', ' ')}
//                             </label>
//                             <input
//                                 type="color"
//                                 value={value.startsWith('oklch') ? '#FFFFFF' : value}
//                                 onChange={(e) => handleColorChange(variable, e.target.value)}
//                                 className="w-12 h-12 rounded cursor-pointer"
//                             />
//                             <input
//                                 type="text"
//                                 value={value}
//                                 onChange={(e) => handleColorChange(variable, e.target.value)}
//                                 className="flex-1 p-2 rounded border border-[var(--light-secondary-color)] text-[var(--primary-text-color)]"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <button
//                     onClick={saveColors}
//                     className="mt-6 px-6 py-2 bg-[var(--light-primary-color)] text-[var(--white)] rounded hover:bg-[var(--primary-color)] transition-colors"
//                 >
//                     Save Colors
//                 </button>

//                 {message && (
//                     <p className={`mt-4 font-bold ${
//                         message.includes('Error') 
//                             ? 'text-[var(--error-color)]' 
//                             : 'text-[var(--success-color)]'
//                     }`}>
//                         {message}
//                     </p>
//                 )}
//             </div>
//         </div>
//         </Layout>
//     );
// }

// export default Appearance;



























// import React, { useState, useEffect } from 'react';
// import Layout from '../components/layout';

// function Appearance() {
//     const defaultColors = {
//         '--primary-color': '#2D3748',
//         '--secondary-color': 'oklch(97% 0.001 106.424)',
//         '--light-primary-color': '#4299E1',
//         '--light-secondary-color': '#ffffff',
//         '--accent-color': '#BEE3F8',
//         '--error-color': '#E53E3E',
//         '--success-color': '#38A169',
//         '--primary-text-color': '#111827',
//         '--secondary-text-color': '#6B7280',
//         '--white': '#FFFFFF'
//     };

//     const [colors, setColors] = useState(defaultColors);
//     const [message, setMessage] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [logoPreview, setLogoPreview] = useState('');

//     useEffect(() => {
//         const fetchInitialColors = async () => {
//             try {
//                 const response = await fetch('/api/get-colors', {
//                     method: 'GET',
//                     headers: { 'Content-Type': 'application/json' }
//                 });

//                 if (response.ok) {
//                     const apiColors = await response.json();
//                     const updatedColors = { ...defaultColors, ...apiColors };
//                     setColors(updatedColors);
//                     applyColors(updatedColors);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch colors:', error);
//                 applyColors(defaultColors);
//             }
//         };

//         fetchInitialColors();
//     }, []);

//     const applyColors = (colorsToApply) => {
//         Object.entries(colorsToApply).forEach(([key, value]) => {
//             document.documentElement.style.setProperty(key, value);
//         });
//     };

//     const handleColorChange = (variable, value) => {
//         const updatedColors = { ...colors, [variable]: value };
//         setColors(updatedColors);
//         document.documentElement.style.setProperty(variable, value);
//     };

//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setLogo(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setLogoPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const saveSettings = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('colors', JSON.stringify(colors));
//             if (logo) {
//                 formData.append('logo', logo);
//             }

//             const response = await fetch('/api/save-appearance', {
//                 method: 'POST',
//                 body: formData
//             });

//             if (response.ok) {
//                 setMessage('Settings saved successfully!');
//             } else {
//                 throw new Error('Failed to save');
//             }
//         } catch (error) {
//             setMessage('Error saving settings');
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-[var(--secondary-color)] py-8 px-4">
//                 <div className="w-full max-w-screen-xl mx-auto">
//                     {/* Header */}
//                     <div className="bg-[var(--white)] rounded-t-lg border-b border-[var(--light-secondary-color)] p-6">
//                         <h1 className="text-2xl font-semibold text-[var(--primary-text-color)]">
//                             Appearance Settings
//                         </h1>
//                         <p className="text-[var(--secondary-text-color)] mt-1">
//                             Customize your application's look and feel
//                         </p>
//                     </div>

//                     {/* Main Content */}
//                     <div className="bg-[var(--white)] p-6">
//                         {/* Colors Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//                             {Object.entries(colors).map(([variable, value]) => (
//                                 <div key={variable} className="flex items-center gap-4 bg-[var(--light-secondary-color)] p-4 rounded-lg shadow-sm">
//                                     <label className="w-40 text-[var(--primary-text-color)] font-medium truncate">
//                                         {variable.replace('--', '').replace('-', ' ')}
//                                     </label>
//                                     <input
//                                         type="color"
//                                         value={value.startsWith('oklch') ? '#FFFFFF' : value}
//                                         onChange={(e) => handleColorChange(variable, e.target.value)}
//                                         className="w-10 h-10 rounded cursor-pointer border border-[var(--secondary-text-color)]/20"
//                                     />
//                                     <input
//                                         type="text"
//                                         value={value}
//                                         onChange={(e) => handleColorChange(variable, e.target.value)}
//                                         className="flex-1 p-2 rounded border border-[var(--light-secondary-color)] text-[var(--primary-text-color)] focus:ring-1 focus:ring-[var(--light-primary-color)] focus:border-[var(--light-primary-color)] outline-none"
//                                     />
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Logo Section */}
//                         <div className="bg-[var(--light-secondary-color)] p-6 rounded-lg shadow-sm mb-8">
//                             <h2 className="text-lg font-medium text-[var(--primary-text-color)] mb-4">
//                                 Application Logo
//                             </h2>
//                             <div className="flex items-center gap-6">
//                                 <label className="flex-1">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleLogoChange}
//                                         className="block w-full text-sm text-[var(--secondary-text-color)] file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-medium  hover:file:bg-[var(--light-primary-color)] file:text-[var(--white)] file:bg-[var(--primary-color)] cursor-pointer"
//                                     />
//                                 </label>
//                                 {logoPreview && (
//                                     <div className="flex-shrink-0">
//                                         <img
//                                             src={logoPreview}
//                                             alt="Logo Preview"
//                                             className="w-20 h-20 object-contain rounded border border-[var(--light-secondary-color)]"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 {message && (
//                                     <p className={`text-sm font-medium ${message.includes('Error')
//                                             ? 'text-[var(--error-color)]'
//                                             : 'text-[var(--success-color)]'
//                                         }`}>
//                                         {message}
//                                     </p>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={saveSettings}
//                                 className="px-6 py-2 hover:bg-[var(--light-primary-color)] text-[var(--white)] rounded-sm bg-[var(--primary-color)] transition-all duration-200 font-medium"
//                             >
//                                 Save Settings
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Appearance;





































// import React, { useState, useEffect } from 'react';
// import Layout from '../components/layout';
// import axios from 'axios';
// import { getCookie } from '../config/webStorage';
// import { apiurl } from '../config/config';
// import { toast } from 'react-toastify';

// function Appearance() {
//     const token = getCookie("sctoken");

//     const defaultColors = {
//         'primary-color': '#2D3748',
//         'secondary-color': 'oklch(97% 0.001 106.424)',
//         'light-primary-color': '#4299E1',
//         'light-secondary-color': '#ffffff',
//         'accent-color': '#BEE3F8',
//         'error-color': '#E53E3E',
//         'success-color': '#38A169',
//         'primary-text-color': '#111827',
//         'secondary-text-color': '#6B7280',
//         'white': '#FFFFFF'
//     };

//     const [colors, setColors] = useState(defaultColors);
//     const [message, setMessage] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [logoPreview, setLogoPreview] = useState('');
//     const [logoUrl, setLogoUrl] = useState('');

//     useEffect(() => {
//         const fetchInitialTheme = async () => {
//             try {
//                 const response = await axios.get(`${apiurl}/api/whatsapp/user/addtheme`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });

//                 if (response.status === 200) {
//                     const { ui_theme_colour, logo } = response.data;
//                     const updatedColors = { ...defaultColors, ...ui_theme_colour };
//                     setColors(updatedColors);
//                     setLogoUrl(logo || '');
//                     applyColors(updatedColors);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch theme:', error);
//                 applyColors(defaultColors);
//             }
//         };

//         fetchInitialTheme();
//     }, []);

//     const applyColors = (colorsToApply) => {
//         Object.entries(colorsToApply).forEach(([key, value]) => {
//             document.documentElement.style.setProperty(`--${key}`, value);
//         });
//     };

//     const handleColorChange = (variable, value) => {
//         const updatedColors = { ...colors, [variable]: value };
//         setColors(updatedColors);
//         document.documentElement.style.setProperty(`--${variable}`, value);
//     };

//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setLogo(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setLogoPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const saveSettings = async () => {
//         try {
//             const payload = {
//                 logo: logoUrl || (logo ? 'https://storage.cloud.google.com/ens-ondc/logo%20(1).png' : ''),
//                 ui_theme_colour: colors
//             };

//             const response = await axios.post(
//                 `${apiurl}/api/whatsapp/user/addtheme`,
//                 payload,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );
//             if (response.status === 200) {
//                 toast.success('Settings saved successfully!');
//                 // if (logo) {
//                 //     setLogoUrl('https://storage.cloud.google.com/ens-ondc/logo%20(1).png'); // Simulate uploaded URL
//                 //     setLogo(null);
//                 // }
//             }else{
//                 toast.error(response?.data?.message ||'Failed to save settings');
//             }
//         } catch (error) {
//             setMessage('Error saving settings');
//             console.error('API error:', error);
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="w-full max-w-7xl mx-auto">
//                     {/* Header */}
//                     <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//                         <h1 className="text-3xl font-bold text-text-primary">
//                             Appearance Settings
//                         </h1>
//                         <p className="mt-2 text-text-secondary">
//                             Customize your application's colors and logo
//                         </p>
//                     </div>

//                     {/* Main Content */}
//                     <div className="bg-white rounded-lg shadow-lg p-8">
//                         {/* Colors Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Theme Colors
//                             </h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {Object.entries(colors).map(([variable, value]) => (
//                                     <div key={variable} className="flex items-center gap-4 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                         <label className="w-40 text-text-primary font-medium truncate capitalize">
//                                             {variable.replace('-', ' ')}
//                                         </label>
//                                         <input
//                                             type="color"
//                                             value={value.startsWith('oklch') ? '#FFFFFF' : value}
//                                             onChange={(e) => handleColorChange(variable, e.target.value)}
//                                             className="w-10 h-10 rounded cursor-pointer border border-text-secondary/20"
//                                         />
//                                         <input
//                                             type="text"
//                                             value={value}
//                                             onChange={(e) => handleColorChange(variable, e.target.value)}
//                                             className="flex-1 p-3 rounded-md border border-light-secondary text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
//                                             placeholder="Enter color value"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Logo Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Application Logo
//                             </h2>
//                             <div className="flex items-center gap-6 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                 <label className="flex-1">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleLogoChange}
//                                         className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-primary file:text-white hover:file:bg-primary cursor-pointer"
//                                     />
//                                 </label>
//                                 {(logoPreview || logoUrl) && (
//                                     <div className="flex-shrink-0">
//                                         <img
//                                             src={logoPreview || logoUrl}
//                                             alt="Logo Preview"
//                                             className="w-24 h-24 object-contain rounded-md border border-light-secondary"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="flex items-center justify-between border-t border-light-secondary pt-6">
//                             <div>
//                                 {message && (
//                                     <p className={`text-sm font-medium ${
//                                         message.includes('Error') ? 'text-error' : 'text-success'
//                                     }`}>
//                                         {message}
//                                     </p>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={saveSettings}
//                                 className="px-8 py-3 bg-light-primary text-white rounded-md hover:bg-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg"
//                             >
//                                 Save Settings
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Appearance;















// import React, { useState, useContext } from 'react';
// import Layout from '../components/layout';
// import axios from 'axios';
// import { ThemeContext } from '../config/themeContext';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';

// function Appearance() {
//     const token = getCookie("sctoken")
//     const { colors, setColors, logoUrl, setLogoUrl, applyColors } = useContext(ThemeContext);
//     const [message, setMessage] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [logoPreview, setLogoPreview] = useState('');

//     const handleColorChange = (variable, value) => {
//         const updatedColors = { ...colors, [variable]: value };
//         setColors(updatedColors);
//         document.documentElement.style.setProperty(`--${variable}`, value);
//     };

//     const handleLogoChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             setLogo(file);
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setLogoPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const saveSettings = async () => {
//         try {
//             const payload = {
//                 logo: logoUrl || (logo ? 'https://storage.cloud.google.com/ens-ondc/logo%20(1).png' : ''),
//                 ui_theme_colour: colors
//             };

//             const response = await axios.post(
//                 `${apiurl}/api/whatsapp/user/addtheme`,
//                 payload,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 }
//             );

//             if (response.status === 200) {
//                 setMessage('Settings saved successfully!');
//                 if (logo) {
//                     setLogoUrl('https://storage.cloud.google.com/ens-ondc/logo%20(1).png'); // Simulate uploaded URL
//                     setLogo(null);
//                     setLogoPreview('');
//                 }
//             }
//         } catch (error) {
//             setMessage('Error saving settings');
//             console.error('API error:', error);
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="w-full max-w-7xl mx-auto">
//                     {/* Header */}
//                     <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//                         <h1 className="text-3xl font-bold text-text-primary">
//                             Appearance Settings
//                         </h1>
//                         <p className="mt-2 text-text-secondary">
//                             Customize your application's colors and logo
//                         </p>
//                     </div>

//                     {/* Main Content */}
//                     <div className="bg-white rounded-lg shadow-lg p-8">
//                         {/* Colors Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Theme Colors
//                             </h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {Object.entries(colors).map(([variable, value]) => (
//                                     <div key={variable} className="flex items-center gap-4 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                         <label className="w-40 text-text-primary font-medium truncate capitalize">
//                                             {variable.replace('-', ' ')}
//                                         </label>
//                                         <input
//                                             type="color"
//                                             value={value.startsWith('oklch') ? '#FFFFFF' : value}
//                                             onChange={(e) => handleColorChange(variable, e.target.value)}
//                                             className="w-10 h-10 rounded flex flex-shrink-0 cursor-pointer border border-text-secondary/20"
//                                         />
//                                         <input
//                                             type="text"
//                                             value={value}
//                                             onChange={(e) => handleColorChange(variable, e.target.value)}
//                                             className="flex-1 p-3 rounded-md border border-light-secondary text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
//                                             placeholder="Enter color value"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Logo Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Application Logo
//                             </h2>
//                             <div className="flex items-center gap-6 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                 <label className="flex-1">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleLogoChange}
//                                         className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-primary file:text-white hover:file:bg-primary cursor-pointer"
//                                     />
//                                 </label>
//                                 {(logoPreview || logoUrl) && (
//                                     <div className="flex-shrink-0">
//                                         <img
//                                             src={logoPreview || logoUrl}
//                                             alt="Logo Preview"
//                                             className="w-24 h-24 object-contain rounded-md border border-light-secondary"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="flex items-center justify-between border-t border-light-secondary pt-6">
//                             <div>
//                                 {message && (
//                                     <p className={`text-sm font-medium ${
//                                         message.includes('Error') ? 'text-error' : 'text-success'
//                                     }`}>
//                                         {message}
//                                     </p>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={saveSettings}
//                                 className="px-8 py-3 bg-light-primary text-white rounded-md hover:bg-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg"
//                             >
//                                 Save Settings
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Appearance;

















































// import React, { useState, useContext } from 'react';
// import Layout from '../components/layout';
// import axios from 'axios';
// import { ThemeContext } from '../config/themeContext';
// import { apiurl } from '../config/config';
// import { getCookie } from '../config/webStorage';
// import { toast } from 'react-toastify'; // Assuming you use react-toastify for notifications

// function Appearance() {
//     const token = getCookie("sctoken");
//     const { colors, setColors, logoUrl, setLogoUrl, applyColors } = useContext(ThemeContext);
//     const [message, setMessage] = useState('');
//     const [logo, setLogo] = useState(null);
//     const [logoPreview, setLogoPreview] = useState('');

//     // Handle logo file selection and upload
//     const handleLogoChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) {
//             setMessage('Please select a file!');
//             setTimeout(() => setMessage(''), 3000);
//             return;
//         }

//         setLogo(file);
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setLogoPreview(reader.result);
//         };
//         reader.readAsDataURL(file);

//         // Upload the logo immediately
//         const formData = new FormData();
//         formData.append('files', file);

//         try {
//             const apiEndpoint = apiurl; // Adjust if you have a specific function like NodebaseUrlDefiner
//             const response = await axios.post(
//                 `${apiEndpoint}/api/whatsapp/content/imageupload`,
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.data?.success) {
//                 setLogoUrl(response.data.urls[0]); // Store the uploaded URL
//                 setMessage('Logo uploaded successfully!');
//             } else {
//                 setMessage('Logo upload failed!');
//             }
//         } catch (error) {
//             setMessage('Error uploading logo');
//             console.error('Upload error:', error);
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     // Save settings with the uploaded logo URL
//     const saveSettings = async () => {
//         try {
//             const payload = {
//                 logo: logoUrl || '',
//                 ui_theme_colour: colors,
//             };

//             const response = await axios.post(
//                 `${apiurl}/api/whatsapp/user/addtheme`,
//                 payload,
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (response.status === 200) {
//                 setMessage('Settings saved successfully!');
//                 setLogo(null);
//                 setLogoPreview('');
//             }
//         } catch (error) {
//             setMessage('Error saving settings');
//             console.error('API error:', error);
//         }

//         setTimeout(() => setMessage(''), 3000);
//     };

//     return (
//         <Layout>
//             <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
//                 <div className="w-full max-w-7xl mx-auto">
//                     {/* Header */}
//                     <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
//                         <h1 className="text-3xl font-bold text-text-primary">
//                             Appearance Settings
//                         </h1>
//                         <p className="mt-2 text-text-secondary">
//                             Customize your application's colors and logo
//                         </p>
//                     </div>

//                     {/* Main Content */}
//                     <div className="bg-white rounded-lg shadow-lg p-8">
//                         {/* Colors Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Theme Colors
//                             </h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {Object.entries(colors).map(([variable, value]) => (
//                                     <div key={variable} className="flex items-center gap-4 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                         <label className="w-40 text-text-primary font-medium truncate capitalize">
//                                             {variable.replace('-', ' ')}
//                                         </label>
//                                         <input
//                                             type="color"
//                                             value={value.startsWith('oklch') ? '#FFFFFF' : value}
//                                             onChange={(e) => {
//                                                 const updatedColors = { ...colors, [variable]: e.target.value };
//                                                 setColors(updatedColors);
//                                                 document.documentElement.style.setProperty(`--${variable}`, e.target.value);
//                                             }}
//                                             className="w-10 h-10 rounded flex flex-shrink-0 cursor-pointer border border-text-secondary/20"
//                                         />
//                                         <input
//                                             type="text"
//                                             value={value}
//                                             onChange={(e) => {
//                                                 const updatedColors = { ...colors, [variable]: e.target.value };
//                                                 setColors(updatedColors);
//                                                 document.documentElement.style.setProperty(`--${variable}`, e.target.value);
//                                             }}
//                                             className="flex-1 p-3 rounded-md border border-light-secondary text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
//                                             placeholder="Enter color value"
//                                         />
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Logo Section */}
//                         <div className="mb-8">
//                             <h2 className="text-xl font-semibold text-text-primary mb-6">
//                                 Application Logo
//                             </h2>
//                             <div className="flex items-center gap-6 p-4 rounded-lg bg-light-secondary shadow-sm">
//                                 <label className="flex-1">
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={handleLogoChange}
//                                         className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-primary file:text-white hover:file:bg-primary cursor-pointer"
//                                     />
//                                 </label>
//                                 {(logoUrl !== null) && (
//                                     <div className="flex-shrink-0">
//                                         <img
//                                             src={ logoUrl}
//                                             alt="Logo Preview"
//                                             className="w-24 h-24 object-contain rounded-md border border-light-secondary"
//                                         />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Footer */}
//                         <div className="flex items-center justify-between border-t border-light-secondary pt-6">
//                             <div>
//                                 {message && (
//                                     <p className={`text-sm font-medium ${
//                                         message.includes('Error') ? 'text-error' : 'text-success'
//                                     }`}>
//                                         {message}
//                                     </p>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={saveSettings}
//                                 className="px-8 py-3 bg-light-primary text-white rounded-md hover:bg-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg"
//                             >
//                                 Save Settings
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Layout>
//     );
// }

// export default Appearance;













// In Appearance.js
import React, { useState, useContext } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { ThemeContext } from '../config/themeContext';
import { apiurl } from '../config/config';
import { getCookie } from '../config/webStorage';
import { toast } from 'react-toastify';

function Appearance() {
    const token = getCookie('sctoken');
    const { colors, setColors, logoUrl, setLogoUrl, applyColors, applyTheme, predefinedThemes, selectedTheme, setSelectedTheme } = useContext(ThemeContext);
    const [message, setMessage] = useState('');
    const [logo, setLogo] = useState(null);
    const [logoPreview, setLogoPreview] = useState('');

        // Handle logo file selection and upload
    const handleLogoChange = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            setMessage('Please select a file!');
            setTimeout(() => setMessage(''), 3000);
            return;
        }

        setLogo(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setLogoPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Upload the logo immediately
        const formData = new FormData();
        formData.append('files', file);

        try {
            const apiEndpoint = apiurl; // Adjust if you have a specific function like NodebaseUrlDefiner
            const response = await axios.post(
                `${apiEndpoint}/api/whatsapp/content/imageupload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data?.success) {
                setLogoUrl(response.data.urls[0]); // Store the uploaded URL
                setMessage('Logo uploaded successfully!');
            } else {
                setMessage('Logo upload failed!');
            }
        } catch (error) {
            setMessage('Error uploading logo');
            console.error('Upload error:', error);
        }

        setTimeout(() => setMessage(''), 3000);
    };

    // Save settings with the uploaded logo URL
    const saveSettings = async () => {
        try {
            const payload = {
                logo: logoUrl || '',
                ui_theme_colour: colors,
            };

            const response = await axios.post(
                `${apiurl}/api/whatsapp/user/addtheme`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setMessage('Settings saved successfully!');
                setLogo(null);
                setLogoPreview('');
            }
        } catch (error) {
            setMessage('Error saving settings');
            console.error('API error:', error);
        }

        setTimeout(() => setMessage(''), 3000);
    };

    // Handle theme selection from dropdown
    const handleThemeChange = (e) => {
        const themeName = e.target.value;
        applyTheme(themeName);
    };

    return (
        <Layout>
            <div className="min-h-screen bg-secondary py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                        <h1 className="text-3xl font-bold text-text-primary">
                            Appearance Settings
                        </h1>
                        <p className="mt-2 text-text-secondary">
                            Customize your application's colors and logo
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        {/* Theme Selection */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-text-primary mb-4">
                                Select Predefined Theme
                            </h2>
                            <select
                                value={selectedTheme}
                                onChange={handleThemeChange}
                                className="w-full max-w-xs p-3 rounded-md border border-light-primary text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                            >
                                <option value="Custom">Custom</option>
                                {Object.keys(predefinedThemes).map((themeName) => (
                                    <option key={themeName} value={themeName}>
                                        {themeName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Colors Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-text-primary mb-6">
                                Theme Colors
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(colors).map(([variable, value]) => (
                                    <div key={variable} className="flex items-center gap-4 p-4 rounded-lg bg-light-secondary shadow-sm">
                                        <label className="w-40 text-text-primary font-medium truncate capitalize">
                                            {variable.replace('-', ' ')}
                                        </label>
                                        <input
                                            type="color"
                                            value={value.startsWith('oklch') ? '#FFFFFF' : value}
                                            onChange={(e) => {
                                                const updatedColors = { ...colors, [variable]: e.target.value };
                                                setColors(updatedColors);
                                                applyColors(updatedColors);
                                                setSelectedTheme('Custom'); // Switch to Custom when manually editing
                                            }}
                                            className="w-10 h-10 rounded flex flex-shrink-0 cursor-pointer border border-text-secondary/20"
                                        />
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => {
                                                const updatedColors = { ...colors, [variable]: e.target.value };
                                                setColors(updatedColors);
                                                applyColors(updatedColors);
                                                setSelectedTheme('Custom'); // Switch to Custom when manually editing
                                            }}
                                            className="flex-1 p-3 rounded-md border border-light-secondary text-text-primary focus:ring-2 focus:ring-light-primary focus:border-light-primary outline-none transition-colors duration-200"
                                            placeholder="Enter color value"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Logo Section */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-text-primary mb-6">
                                Application Logo
                            </h2>
                            <div className="flex items-center gap-6 p-4 rounded-lg bg-light-secondary shadow-sm">
                                <label className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="block w-full text-sm text-text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-light-primary file:text-white hover:file:bg-primary cursor-pointer"
                                    />
                                </label>
                                {logoUrl && (
                                    <div className="flex-shrink-0">
                                        <img
                                            src={logoUrl}
                                            alt="Logo Preview"
                                            className="w-24 h-24 object-contain rounded-md border border-light-secondary"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between border-t border-light-secondary pt-6">
                            <div>
                                {message && (
                                    <p className={`text-sm font-medium ${
                                        message.includes('Error') ? 'text-error' : 'text-success'
                                    }`}>
                                        {message}
                                    </p>
                                )}
                            </div>
                            <button
                                onClick={saveSettings}
                                className="px-8 py-3 bg-light-primary text-white rounded-md hover:bg-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                            >
                                Save Settings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Appearance;