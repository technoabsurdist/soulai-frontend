/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'txt': '2px 2px 2px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
