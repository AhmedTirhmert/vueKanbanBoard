/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  safelist: ['xl:grid-cols-3', 'xl:grid-cols-4'],
  theme: {
    fontFamily: {
      jost: ['jost']
    },
    extend: {}
  },
  plugins: []
}
