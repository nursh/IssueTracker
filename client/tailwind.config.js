const { colors } = require('tailwindcss/defaultTheme');


module.exports = {
  theme: {
    extend: {
      colors: {
        gray: {
          ...colors.gray,
          "100": "#F7F7F7"
        }
      }
    }
  },
  variants: {},
  plugins: []
};
