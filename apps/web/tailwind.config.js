const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/*.{js,ts,jsx,tsx}')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#274BF2',
      },
    },
  },
  plugins: [],
};
