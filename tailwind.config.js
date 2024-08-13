/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          darkblue: "#092948",
          aquablue:"#02ADE2",
          gray:"#6B707F",
        }
      }
    },
  },
  plugins: [],
}