/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern:
        /(bg|text)-(red|yellow|green)-(100|200|300|400|500|600|700|800|900)/,
    },
  ],
  plugins: [require("daisyui")],
};
