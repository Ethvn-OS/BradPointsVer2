/** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {
        fontFamily: {
          sans: ['Instrument Sans', 'sans-serif'],
        },
        colors: {
          'bp-red': '#A62C2C',
        },
       },
     },
     plugins: [],
   }