module.exports = {
  // ... other config
  theme: {
    extend: {
      animation: {
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'reveal': 'reveal 0.8s ease-out forwards',
        'reveal-delay': 'reveal 0.8s ease-out 0.2s forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-words': 'slideWords 8s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        reveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideWords: {
          '0%, 20%': { transform: 'translateY(0%)' },
          '25%, 45%': { transform: 'translateY(-100%)' },
          '50%, 70%': { transform: 'translateY(-200%)' },
          '75%, 95%': { transform: 'translateY(-300%)' },
          '100%': { transform: 'translateY(-400%)' },
        },
      },
    },
  },
}; 