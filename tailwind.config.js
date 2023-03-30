module.exports = {
  content: [
    './src/**/*.{html,js,vue,jsx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '600px',
      md: '800px',
      lg: '1200px'
    },
    colors: {
      transparent: 'transparent',
      white: '#FFFFFF',
      black: {
        DEFAULT: '#000000'
      },
      green: {
        200: '#BBF0B6',
        300: '#B8E4C7',
        500: '#4EBC73'
      },
      gray: {
        100: '#8F929724',
        200: '#EAECED',
        300: '#D1D1D6',
        400: '#AEAEB2',
        500: '#8E8E93',
        700: '#636366',
        800: '#3A3A3C',
        900: '#0F0F0F'
      },
      red: {
        500: '#FF3347',
        700: '#DB2547'
      },
      blue: {
        200: '#B6E2F0',
        500: '#66BDFF',
        800: '#00246A'
      },
      orange: {
        500: '#FF9500'
      }
    },
    extend: {
      fontSize: {
        '2xs': ['0.688rem', { lineHeight: '0.813rem' }],
        xs: ['0.813rem', { lineHeight: '1.125rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.375rem' }],
        lg: ['1.125rem', { lineHeight: '1.5rem' }],
        xl: ['1.375rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.75rem', { lineHeight: '2.125rem' }],
        '3xl': ['2rem', { lineHeight: '2rem' }]
      },
      stroke: {
        current: 'currentColor'
      },
      spacing: {
        '1/7': '14.2857143%'
      }
    }
  }
};