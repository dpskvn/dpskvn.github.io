module.exports = {
  content: [
    "./*.html", // Scan HTML files in the root
    "./**/*.html", // Scan HTML files in subdirectories if any
    // Add other file types or paths if needed, e.g., './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        surface: '#FAFAF8',
        'surface-hover': '#F3F1EC',
        line: '#E4E1DA',
        ink: '#15171B',
        muted: '#6B6F76',
        accent: '#C2410C',
      },
      keyframes: {
        slideDownFadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(-20px)' // Start slightly above
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        }
      },
      animation: {
        'slide-down-fade-in': 'slideDownFadeIn 0.8s ease-in-out forwards',
        'fade-in-main': 'fadeIn 0.5s ease-out 0.8s forwards',
        'fade-in-footer': 'fadeIn 0.5s ease-out 1.0s forwards',
      }
    },
  },
  plugins: [],
}