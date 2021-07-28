module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {},
    extend: {
      animation: {
        shak: 'shak .4s infinite'
      },
      keyframes: {
        shak: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' }
        }
      },
      boxShadow: {
        footer: '0 0 10px 0 hsl(0deg 6% 58% / 60%)'
      },
      height: {
        header: 'var(--mall-header-height)',
        footer: 'var(--mall-footer-height)'
      },
      margin: {
        header: 'var(--mall-header-height)',
        footer: 'var(--mall-footer-height)',
        '2header': 'var(--mall-2footer-height)'
      },
      inset: {
        footer: 'var(--mall-footer-height)'
      },
      width: {
        34: '8.5rem'
      },
      lineHeight: {
        header: 'var(--mall-header-height)'
      },
      scale: {
        25: '.25'
      },
      padding: {
        full: '100%'
      },
      borderRadius: {
        '1/2': '50%'
      },
      fontSize: {
        mm: ['0.5rem', { lineHeight: '0.75rem' }]
      },
      minHeight: {
        36: '9rem',
        80: '20rem'
      },
      zIndex: {
        full: '9999'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
