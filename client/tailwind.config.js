/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          
      },
    },
  },
  plugins: [require("daisyui")],

  theme: {
    extend: {
      colors: {
        "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          "--primary-muted": "65% 0.2 295",
        },
      },
    ],
  },
};
