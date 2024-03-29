/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Open Sans',
      secondary: 'Lato',
      ubuntu: 'Ubuntu',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      colors: {
        primary: '#212353',
        secondary: '#4B5D68',
        accent: {
          primary: '#9C69E2',
          primary_hover: '#9059DB',
          secondary: '#F063B8',
          secondary_hover: '#E350A9',
          tertiary: '#68C9BA',
        }
      }
    }
  },
  plugins: [],
}

