/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#292929',
        secondary:'#0097F3',
        background:'#F4F4F4',
        alert:'#C70039',
        lightgrey:'#F0F0F0',
        button:'#FDA321'
      },
      fontFamily:{
        body:['Josefin Sans']
      }
    },
  },
  plugins: [],
}
