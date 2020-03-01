const { colors } = require('tailwindcss/defaultTheme');


module.exports = {
  theme: {
    extend: {
      spacing: {
        '70': '20rem',
        '72': '34rem'
      },
      colors: {
        gray: {
          ...colors.gray,
          "100": "#F7F7F7"
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
};
