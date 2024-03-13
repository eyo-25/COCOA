/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: { raw: "(max-width: 1024px)" },
        mini: { raw: "(max-width: 768px)" },
        mobile: { raw: "(max-width: 450px)" },
      },
      colors: {
        green: "#00FFA3",
        red: "#FF3464",
        gray: {
          100: "#E8E8E8",
          200: "#B2B2B2",
          300: "#757575",
          400: "#626262",
          500: "#4C4C4C",
          600: "#2D2D2D",
          650: "#252525",
          700: "#1C1C1C",
          800: "#111111",
        },
      },
    },
  },
  plugins: [],
};
