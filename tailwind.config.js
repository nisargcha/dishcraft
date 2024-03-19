
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../src/index.html"],
  theme: {
    colors:{
      'maize': { DEFAULT: '#fff07c', 100: '#4b4300', 200: '#978500', 300: '#e2c800', 
      400: '#ffe72f', 500: '#fff07c', 600: '#fff395', 700: '#fff6af', 800: '#fff9ca', 900: '#fffce4' },
      'fulvous': { DEFAULT: '#e8871e', 100: '#2f1b05', 200: '#5e350a', 300: '#8d500f', 400: '#bc6b14', 500: '#e8871e', 600: '#ec9e4a', 700: '#f1b677', 800: '#f6cea5', 900: '#fae7d2' }, 
      'dark_red': { DEFAULT: '#8c1c13', 100: '#1c0504', 200: '#380b08', 300: '#53100b', 400: '#6f160f', 500: '#8c1c13', 600: '#c9271b', 700: '#e65045', 800: '#ee8a83', 900: '#f7c5c1' }, 
      'black': { DEFAULT: '#050609', 100: '#010102', 200: '#020304', 300: '#030406', 
      400: '#040508', 500: '#050609', 600: '#29314a', 700: '#4c5b8a', 800: '#7f8eb9', 900: '#bfc6dc' }
    },
    extend: {

    },
  },
  plugins: [],
}

