/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../../packages/design/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'mobile': '320px',
      // => @media (min-width: 320px) { ... }

      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        'fit-1': 'repeat(auto-fit, minmax(1em, 1fr))',
        'fit-2': 'repeat(auto-fit, minmax(2em, 1fr))',
        'fit-3': 'repeat(auto-fit, minmax(3em, 1fr))',
        'fit-4': 'repeat(auto-fit, minmax(4em, 1fr))',
        'fit-5': 'repeat(auto-fit, minmax(5em, 1fr))',
        'fit-6': 'repeat(auto-fit, minmax(6em, 1fr))',
        'fit-7': 'repeat(auto-fit, minmax(7em, 1fr))',
        'fit-8': 'repeat(auto-fit, minmax(8em, 1fr))',
        'fit-9': 'repeat(auto-fit, minmax(9em, 1fr))',
        'fit-10': 'repeat(auto-fit, minmax(10em, 1fr))',
        'fit-11': 'repeat(auto-fit, minmax(11em, 1fr))',
        'fit-12': 'repeat(auto-fit, minmax(12em, 1fr))',
        'fit-13': 'repeat(auto-fit, minmax(13em, 1fr))',
        'fit-14': 'repeat(auto-fit, minmax(14em, 1fr))',
        'fit-15': 'repeat(auto-fit, minmax(15em, 1fr))',
        'fit-16': 'repeat(auto-fit, minmax(16em, 1fr))',
        'fit-17': 'repeat(auto-fit, minmax(17em, 1fr))',
        'fit-18': 'repeat(auto-fit, minmax(18em, 1fr))',
        'fit-19': 'repeat(auto-fit, minmax(19em, 1fr))',
        'fit-20': 'repeat(auto-fit, minmax(20em, 1fr))',
        'fit-21': 'repeat(auto-fit, minmax(21em, 1fr))',
        'fit-22': 'repeat(auto-fit, minmax(22em, 1fr))',
      },
    },
  },
  plugins: [require('nativewind/tailwind/css'), require('@tailwindcss/line-clamp')],
  important: 'html',
};
