/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx}",
    "./src/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./pages/**/*.{html,js,jsx}",
  ],
  theme: {
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      'xxl': '1536px',
    },
    fontFamily: {
      
    },
    extend: {},
    container: {
    },
  },
  plugins: [],
}

