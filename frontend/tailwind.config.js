/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        'primary-bg': '#F5EFEF',
        heading: '#8D7B7C',
        foreground: '#626363',
        'border-color': '#313131',
        accent: '#EBC2C4',
        'muted-foreground': 'rgba(141, 123, 124, 0.6)',
        'dark-text': '#3D3A38',
      },
      fontFamily: {
        sans: ['"Josefin Sans"', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
