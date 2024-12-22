/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('./src/assets/img/img-1.jpg')",
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      colors:{
        violet: '#00184F'
      }
    },
  },
  plugins: [
    
  ],
}