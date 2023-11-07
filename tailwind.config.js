/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,hbs}"],
  theme: {    
    extend: {
      screens:{
        'md': '769px',
        'lg': '1025px',
      },      
      keyframes:{
        'animatedgradient': {
          '0%': {'background-position':'0 50%;'},
          '50%': {'background-position':'100% 50%;'},
	        '100%': {'background-position':'0% 50%;'},
        }
      }
    },
  },
  plugins: [],
}

