/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunset: {
          primary: '#FF6B6B',    // Coral
          secondary: '#4ECDC4',  // Turquoise
          accent: '#FFE66D',     // Yellow
          dark: '#2C2C2C',      // Dark background
          light: '#FFFFFF',     // White text
        }
      },
    },
  },
  plugins: [],
}