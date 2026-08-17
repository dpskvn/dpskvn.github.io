module.exports = {
  darkMode: 'class',
  content: [
    "./*.html", // Scan HTML files in the root
    "./**/*.html", // Scan HTML files in subdirectories if any
    // Add other file types or paths if needed, e.g., './src/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--c-paper)',
        surface: 'var(--c-surface)',
        'surface-hover': 'var(--c-surface-hover)',
        line: 'var(--c-line)',
        ink: 'var(--c-ink)',
        muted: 'var(--c-muted)',
        accent: 'var(--c-accent)',
      },
      fontFamily: {
        sans: ['var(--font-body)', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
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
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'slide-down-fade-in': 'slideDownFadeIn 0.8s ease-in-out forwards',
        'fade-in-main': 'fadeIn 0.5s ease-out 0.8s forwards',
        'fade-in-footer': 'fadeIn 0.5s ease-out 1.0s forwards',
        'cursor-blink': 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
}