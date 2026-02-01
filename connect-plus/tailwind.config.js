/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        'light-primary': 'var(--light-primary-color)',
        'light-secondary': 'var(--light-secondary-color)',
        'text-primary': 'var(--primary-text-color)',
        'text-secondary': 'var(--secondary-text-color)',
        white: 'var(--white)',
        accent: 'var(--accent-color)',
        error: 'var(--error-color)',
        success: 'var(--success-color)'
      },  
      rules: {
        "@typescript-eslint/no-unused-vars": "off",
         "no-unused-vars": "off"
      },
    },
  },
  plugins: [],
}

