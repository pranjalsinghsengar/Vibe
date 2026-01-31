// import React, { createContext, useState, useEffect } from 'react';
// import { apiurl } from './config';
// import { useUser } from './userProvider';

// export const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//     const { userData, token } = useUser();

//     const defaultColors = {
//         // 'primary-color': '#2D3748',
//         'primary-color': 'rgb(24 24 27)',
//         'secondary-color': 'oklch(97% 0.001 106.424)',
//         'light-primary-color': '#4299E1',
//         // 'light-primary-color': 'rgb(161 161 170)',
//         'light-secondary-color': '#ffffff',
//         'accent-color': '#BEE3F8',
//         'error-color': '#E53E3E',
//         'success-color': '#38A169',
//         'primary-text-color': '#111827',
//         'secondary-text-color': '#6B7280',
//         'white': '#FFFFFF'
//     };

//     const [colors, setColors] = useState(defaultColors);
//     const [logoUrl, setLogoUrl] = useState('');

//     console.log("logoUrl", logoUrl)

//     const fetchInitialTheme = async () => {
//         try {
//             const response = await fetch(`${apiurl}/api/whatsapp/configuration/theme_data`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 const { ui_theme_colour, logo } = data.tenant; // Extract from tenant
//                 const updatedColors = { ...defaultColors, ...ui_theme_colour };
//                 setColors(updatedColors);
//                 setLogoUrl(logo || '');
//                 applyColors(updatedColors);
//             }
//         } catch (error) {
//             console.error('Failed to fetch theme:', error);
//             applyColors(defaultColors);
//         }
//     };

//     useEffect(() => {
//         if (userData) {
//             if (userData?.userType !== "masteradmin") {
//                 fetchInitialTheme();
//             }
//         }
//     }, [userData]);

//     const applyColors = (colorsToApply) => {
//         Object.entries(colorsToApply).forEach(([key, value]) => {
//             document.documentElement.style.setProperty(`--${key}`, value);
//         });
//     };

//     return (
//         <ThemeContext.Provider value={{ colors, setColors, logoUrl, setLogoUrl, applyColors }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };














import React, { createContext, useState, useEffect } from 'react';
import { apiurl } from './config';
import { useUser } from './userProvider';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const { userData, token } = useUser();

    const defaultColors = {
        'primary-color': 'rgb(24 24 27)',
        'secondary-color': 'oklch(97% 0.001 106.424)',
        'light-primary-color': '#4299E1',
        'light-secondary-color': '#ffffff',
        'accent-color': '#BEE3F8',
        'error-color': '#E53E3E',
        'success-color': '#38A169',
        'primary-text-color': '#111827',
        'secondary-text-color': '#6B7280',
        'white': '#FFFFFF'
    };

    const predefinedThemes = {
        'Ocean Breeze': {
            'primary-color': '#2C7A7B',
            'secondary-color': '#F7FAFC',
            'light-primary-color': '#4FD1C5',
            'light-secondary-color': '#E6FFFA',
            'accent-color': '#F687B3',
            'error-color': '#E53E3E',
            'success-color': '#38A169',
            'primary-text-color': '#1A202C',
            'secondary-text-color': '#718096',
            'white': '#FFFFFF'
        },
        'Sunset Glow': {
            'primary-color': '#C05621',
            'secondary-color': '#FFFAF0',
            'light-primary-color': '#ED8936',
            'light-secondary-color': '#FEEBC8',
            'accent-color': '#F6E05E',
            'error-color': '#E53E3E',
            'success-color': '#38A169',
            'primary-text-color': '#2D3748',
            'secondary-text-color': '#718096',
            'white': '#FFFFFF'
        },
        'Forest Retreat': {
            'primary-color': '#2F855A',
            'secondary-color': '#F7FAFC',
            'light-primary-color': '#68D391',
            'light-secondary-color': '#E6FFFA',
            'accent-color': '#B7791F',
            'error-color': '#E53E3E',
            'success-color': '#38A169',
            'primary-text-color': '#3C2F2F',
            'secondary-text-color': '#718096',
            'white': '#FFFFFF'
        },
        'Midnight Sky': {
            'primary-color': '#1A365D',
            // 'secondary-color': '#2D3748',
            'secondary-color': '#F7FAFC',
            'light-primary-color': '#63B3ED',
            // 'light-secondary-color': '#4A5568',
            'light-secondary-color': '#ffffff',
            'accent-color': '#3182CE',
            'error-color': '#E53E3E',
            'success-color': '#38A169',
            'primary-text-color': '#E2E8F0',
            'secondary-text-color': '#A0AEC0',
            'white': '#FFFFFF'
        },
        'Lavender Dream': {
            'primary-color': '#6B46C1',
            'secondary-color': '#FAF5FF',
            'light-primary-color': '#9F7AEA',
            'light-secondary-color': '#E9D8FD',
            'accent-color': '#F687B3',
            'error-color': '#E53E3E',
            'success-color': '#38A169',
            'primary-text-color': '#2D3748',
            'secondary-text-color': '#718096',
            'white': '#FFFFFF'
        }
    };

    const [colors, setColors] = useState(defaultColors);
    const [logoUrl, setLogoUrl] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('Custom');

    const fetchInitialTheme = async () => {
        try {
            const response = await fetch(`${apiurl}/api/whatsapp/configuration/theme_data`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const data = await response.json();
                const { ui_theme_colour, logo } = data.tenant;
                const updatedColors = { ...defaultColors, ...ui_theme_colour };
                setColors(updatedColors);
                setLogoUrl(logo || '');
                applyColors(updatedColors);
                setSelectedTheme('Custom');
            }
        } catch (error) {
            console.error('Failed to fetch theme:', error);
            applyColors(defaultColors);
        }
    };

    useEffect(() => {
        if (userData && userData?.userType !== 'masteradmin') {
            fetchInitialTheme();
        }
    }, [userData]);

    const applyColors = (colorsToApply) => {
        Object.entries(colorsToApply).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });
    };

    const applyTheme = (themeName) => {
        if (themeName === 'Custom') {
            setColors(defaultColors);
            applyColors(defaultColors);
            setSelectedTheme('Custom');
        } else {
            const themeColors = predefinedThemes[themeName];
            setColors(themeColors);
            applyColors(themeColors);
            setSelectedTheme(themeName);
        }
    };

    return (
        <ThemeContext.Provider value={{ colors, setColors, logoUrl, setLogoUrl, applyColors, applyTheme, predefinedThemes, selectedTheme, setSelectedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};