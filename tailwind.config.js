module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          primary: 'var(--background-primary)',
          secondary: 'var(--background-secondary)'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
