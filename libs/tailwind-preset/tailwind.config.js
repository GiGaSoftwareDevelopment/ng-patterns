const { colors } = require('../packages/material/tailwind/src/tailwind.config');

/**
 * See https://github.com/tailwindlabs/tailwindcss/issues/1232#issuecomment-1111937404
 * to convert rem to px
 */
module.exports = {
  theme: {
    extend: {
      spacing: {
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem'
      },
      colors: {
        ...colors
      }
    }
  },
  plugins: []
};
