/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],  // Correct placement of daisyUI as a plugin
  daisyui: {
    themes: ["light"], // Set to light theme
  },
}
